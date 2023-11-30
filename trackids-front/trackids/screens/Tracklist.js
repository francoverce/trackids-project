import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from "react-native-a11y-slider";
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Dimensions } from "react-native";
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import voiceIcon from '../assets/icons/voice.png'
import drumsIcon from '../assets/icons/drums.png'
import bassIcon from '../assets/icons/bass.png'
import otherIcon from '../assets/icons/other.png'
import muteIcon from '../assets/icons/mute.png'
import unmuteIcon from '../assets/icons/unmute.png'
import infoIcon from '../assets/icons/info.png'

const Tracklist = ({ route, navigation }) => {

    const [fontLoaded] = useFonts({
        FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    const { song, audioFiles, cover } = route.params;

    const [sounds, setSounds] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const soundObjects = useRef([]);
    const [volumeValues, setVolumeValues] = useState([50, 50, 50, 50]);

    const trackInfo = [
        { name: 'VOZ', icon: voiceIcon, color: 'blue' },
        { name: 'BATERÍA', icon: drumsIcon, color: 'orange' },
        { name: 'BAJO', icon: bassIcon, color: 'red' },
        { name: 'OTROS', icon: otherIcon, color: 'yellow' },
    ];

    const [IsModalVisible, setIsModalVisible] = useState(false);

    const loadSounds = async () => {
        const loadedSounds = await Promise.all(audioFiles.map(file => Audio.Sound.createAsync({ uri: file })));
        setSounds(loadedSounds);

        // Guardar las referencias a las pistas de audio en soundObjects.current
        soundObjects.current = loadedSounds.map(sound => sound.sound);
    };

    useEffect(() => {
        loadSounds();
    }, []);

    const handlePlayPress = async () => {
        if (!isPlaying) {
            const soundObjs = [];
            for (let i = 0; i < sounds.length; i++) {
                const { sound } = sounds[i];
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    if (status.isPlaying) {
                        await sound.pauseAsync();
                    } else {
                        await sound.playAsync();
                    }
                    soundObjs.push(sound);
                }
            }

            for (let i = 0; i < sounds.length; i++) {
                const { sound } = sounds[i];
                sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate); // Aquí se asigna el listener
            }

            soundObjects.current = soundObjs; // Actualizar las referencias en soundObjects

        } else {
            soundObjects.current.forEach(async (sound) => {
                await sound.pauseAsync();
            });
        }
        setIsPlaying(!isPlaying);
    };


    // Nueva función para manejar las actualizaciones de estado de reproducción
    const onPlaybackStatusUpdate = async (status) => {
        if (!status.isLoaded) return;

        if (status.didJustFinish) {
            setIsPlaying(false); // Cambiar el estado de reproducción
            loadSounds();
        }
    };

    const handleVolumeChange = async (index, value) => {
        const sound = soundObjects.current[index]; // Obtener la referencia al objeto de sonido específico
        if (sound) {
            await sound.setVolumeAsync(value / 100); // Establecer el volumen para la pista de audio específica
            const newVolumeValues = [...volumeValues];
            newVolumeValues[index] = value;
            setVolumeValues(newVolumeValues);
        }
    };

    useEffect(() => {
        // Crear y asignar referencias a los sonidos al cargar el componente
        audioFiles.forEach(async (file) => {
            const { sound } = await Audio.Sound.createAsync(file);
            soundObjects.current.push(sound);
        });

        return () => {
            // Limpiar y descargar los recursos de audio al desmontar el componente
            soundObjects.current.forEach(async (sound) => {
                await sound.unloadAsync();
            });
        };
    }, []); // Vacío, para que se ejecute solo una vez al montar el componente

    const mostrarModal = () => {
        setIsModalVisible(true);
    };

    const cerrarModal = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
                <View style={styles.topContainer}>
                    <Icon name='arrow-left' size={30} onPress={() => navigation.navigate('Library')} />
                    <Text style={styles.header}>{song.title.toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => mostrarModal()} >
                        <Image source={infoIcon} style={styles.infoIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.coverContainer}>
                    <Image source={{ uri: cover }} style={styles.cover} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.trackName}>{song.title}</Text>
                        <Text style={styles.artistName}>{song.artist}</Text>
                        <Icon
                            name={isPlaying ? 'pause-circle' : 'play-circle'}
                            size={60}
                            onPress={() => handlePlayPress()}
                        />
                    </View>
                </View>
                {audioFiles.map((audio, index) => (
                    <View key={index} style={styles.trackContainer}>
                        <View style={styles.trackControls}>
                            <Image source={trackInfo[index].icon} style={styles.icon} />
                            <Slider
                                min={0}
                                max={100}
                                step={1}
                                values={[volumeValues[index]]}
                                onChange={(value) => handleVolumeChange(index, value)}
                                markerColor={trackInfo[index].color}
                                showLabel={false}
                            />
                            {/* <Image source={muteIcon} style={styles.icon} /> */}
                        </View>
                        <Text style={styles.trackName}>{trackInfo[index].name}</Text>
                    </View>
                ))}
                <Modal style={{ alignItems: 'center' }} isVisible={IsModalVisible} onBackdropPress={() => cerrarModal()}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>{song.info}</Text>
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        fontSize: 22,
        fontFamily: 'FugazOne',
        color: '#22668D',
        textAlign: 'center',
    },
    topContainer: {
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get("window").width - 50,
        borderBottomWidth: 5,
        borderBottomColor: '#22668D',
    },
    infoIcon: {
        width: 35,
        height: 35,
    },
    coverContainer: {
        flexDirection: 'row',
    },
    titleContainer: {
        justifyContent: 'flex-end',
    },
    cover: {
        width: 200,
        height: 200,
        margin: 10,
    },
    trackContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: 50,
    },
    icon: {
        width: 40,
        height: 40,
        margin: 5,
    },
    trackControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    trackName: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
    },
    artistName: {
        fontFamily: 'FugazOne',
        color: '#1C1C1C',
        fontSize: 16,
        textAlign: 'center',
        textAlign: 'left',
    },
    modalText: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 24,
    },
    modalContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFCC70',
        borderColor: '#22668D',
        borderWidth: 5,
        borderRadius: 30,
        width: Dimensions.get("window").width - 50,
        height: Dimensions.get("window").height / 2,
    },
});

export default Tracklist;