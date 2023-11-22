import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, TextInput, Linking, Button } from 'react-native';
import background from '../assets/background2.jpg';
import Constants from 'expo-constants';
import NavButton from '../components/NavButton';

const YouTubeSearch = ({ navigation }) => {

    const inputUrlRef = useRef();
    const [text, onChangeText] = React.useState('https://www.youtube.com/watch?v=1Sul2b0Uf7Y');
    const idVideo = youtube_parser(text);
    const rapidKey = '09baaeda1cmsh701b9c278e4f8efp14d149jsn6689f5697ac7';
    const rapidHost = 'youtube-mp36.p.rapidapi.com';

    const [songName, setSongName] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [allowDownload, setAllowDownload] = useState(false);

    function youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    const handleSearchSubmit = async () => {
        const url = 'https://youtube-mp36.p.rapidapi.com/dl?id=' + idVideo;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': rapidHost
            }
        };

        try {
            const response = await fetch(url, options);
            const resultText = await response.text();
            const result = JSON.parse(resultText);
            setSongName(result.title);
            setSongUrl(result.link);
            setAllowDownload(true);
        } catch (error) {
            console.error(error);
            setAllowDownload(false);
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
                <View style={styles.topContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="URL de YouTube"
                        onSubmitEditing={() => handleSearchSubmit()}
                    />
                    <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('YouTubeTutorial')}>
                        <Text style={styles.helpButtonText}>?</Text>
                    </TouchableOpacity>
                </View>
                {songName && songUrl && (
                    <View style={styles.downloadInfo}>
                        <Text style={styles.trackName}>{songName}</Text>
                        <OpenURLButton url={songUrl}>Descargar</OpenURLButton>
                    </View>
                )}
                <View style={styles.bottomContainer}>
                    <Text style={styles.tipText}>
                        Importá tu canción favorita directamente desde YouTube!
                    </Text>
                    <Text style={styles.tipText}>
                        Si tenés dudas, presióná el boton de "?" arriba a la derecha
                    </Text>
                </View>
                <NavButton navigation={navigation} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Constants.statusBarHeight*2,
    },
    bg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: Constants.statusBarHeight,
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
    helpButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        padding: 10,
        margin: 10, // Agrega espacio entre los botones
        width: 50, // Ajusta el ancho de los botones aquí
    },
    helpButtonText: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
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
        margin: 10, // Agrega espacio entre los botones
        width: 150, // Ajusta el ancho de los botones aquí
    },
    buttonText: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    trackName: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
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
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
});

export default YouTubeSearch;