import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, TextInput, Linking, Image, ActivityIndicator } from 'react-native';
import background from '../assets/background2.jpg';
import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import NavButton from '../components/NavButton';
import { useFonts } from 'expo-font';
import helpIcon from '../assets/icons/help.png'

const YouTubeSearch = ({ navigation }) => {

    const [fontLoaded] = useFonts({
        FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    const inputUrlRef = useRef();
    const [text, onChangeText] = React.useState('https://www.youtube.com/watch?v=BuW1SqwH_g0');

    const [songName, setSongName] = useState('');
    const [songImage, setSongImage] = useState('');
    const [songAudioFiles, setSongAudioFiles] = useState([]);
    const [songUrl, setSongUrl] = useState('');

    const [songData, setSongData] = useState([])

    const [loadingMessage, setLoadingMessage] = useState('Descargando... Esto puede tardar un par ee minutos');
    const [allowDownload, setAllowDownload] = useState(false);

    const apiKey = 'AIzaSyBPG_YBrzywGdaIODBbIiJF6TI4oOjpMqI';

    const token = '9d761062fbdb4ec1a3ef57132f74191b';

    async function downloadAudio() {
        try {
            const response = await fetch('http://10.0.2.2:8000/AppTracKids/obtenerSeparacionPorYoutube', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ link: text }),
            });
            const data = await response.json();
            console.log(data);
            setSongData([data.id]);
            setSongAudioFiles([data.vocals, data.drums, data.bass, data.other]);

            if (data.id && data.vocals && data.drums && data.bass && data.other) {
                toTracklist();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const toTracklist = () => {
        navigation.navigate('Tracklist', {
            song: {
                id: songData[0],
                title: songName,
                artist: '',
                info: '',
            },
            cover: songImage,
            audioFiles: songAudioFiles,
        });
    }

    const handleSearchSubmit = async () => {
        try {
            await getYouTubeVideoInfo(text);
            await downloadAudio();
            setAllowDownload(true);
        } catch (error) {
            console.error(error);
            setAllowDownload(false);
        }
    }

    async function getYouTubeVideoInfo(videoUrl) {
        try {
            const videoId = videoUrl.match(/[?&]v=([^?&]+)/)[1];
            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error al obtener información del video. Código de estado: ${response.status}`);
            }
            const responseData = await response.json();

            const videoInfo = responseData.items[0].snippet;

            console.log('Nombre del video:', videoInfo.title);
            console.log('Miniatura del video:', videoInfo.thumbnails.default.url);
            setSongName(videoInfo.title);
            setSongImage(videoInfo.thumbnails.default.url);

            return { title: videoInfo.title, thumbnail: videoInfo.thumbnails.default.url };
        } catch (error) {
            console.error('Error al obtener información del video:', error);
            return null;
        }
    }

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return (
            <TouchableOpacity
                onPress={handlePress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
                <Text style={styles.header}>IMPORTACIÓN DE YOUTUBE</Text>
                <View style={styles.topContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="URL de YouTube"
                        onSubmitEditing={() => handleSearchSubmit()}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('YouTubeTutorial')} >
                        <Image source={helpIcon} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                {songName && !songUrl ? (
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.trackName}>{loadingMessage}</Text>
                    </View>
                ) : null}
                {songName && songUrl && (
                    <View style={styles.downloadInfo}>
                        <Text style={styles.trackName}>{songName}</Text>
                        <OpenURLButton url={songUrl}>GUARDAR</OpenURLButton>
                    </View>
                )}
                <View style={styles.bottomContainer}>
                    <Text style={styles.tipText}>
                        IMPORTÁ TU CANCIÓN FAVORITA DESDE YOUTUBE!
                    </Text>
                    <Text style={styles.tipText}>
                        SI TENÉS DUDAS, PRESIONÁ EL BOTÓN DE "?" AZUL
                    </Text>
                </View>
                <NavButton navigation={navigation} currentScreen="YouTubeSearch" />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontFamily: 'FugazOne',
        color: '#22668D',
        textAlign: 'center',
        marginTop: Constants.statusBarHeight,
        borderBottomWidth: 5,
        borderBottomColor: '#22668D',
        width: '100%',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get("window").width - 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    icon: {
        width: 40,
        height: 40,
        margin: 5,
    },
    downloadInfo: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 150,
    },
    buttonText: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    trackName: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        height: 80,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    tipText: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 10,
    },
});

export default YouTubeSearch;

