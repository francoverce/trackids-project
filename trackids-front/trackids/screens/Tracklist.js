import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from "react-native-a11y-slider";
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Dimensions } from "react-native";
import Constants from 'expo-constants';

const Tracklist = ({ route, navigation }) => {
    const { song, audioFiles, cover } = route.params;

    const [sounds, setSounds] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const soundObjects = useRef([]);
    const [volumeValues, setVolumeValues] = useState([50, 50, 50, 50]);

    const [IsModalVisible, setIsModalVisible] = useState(false);

    const loadSounds = async () => {
        const loadedSounds = await Promise.all(audioFiles.map(file => Audio.Sound.createAsync(file)));
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
        console.log('INX: ' + index + ' VAL: ' + value)
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
                    <Icon name='info-circle' size={30} color='blue' onPress={() => mostrarModal()} />
                </View>
                <View style={styles.coverContainer}>
                    <Image source={cover} style={styles.cover} />
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
                        <Icon name='volume-off' size={30} color='black' />
                        <Slider
                            min={0}
                            max={100}
                            step={1}
                            values={[volumeValues[index]]}
                            onChange={(value) => handleVolumeChange(index, value)}
                            markerColor='yellow'
                        />
                        <Icon name='volume-up' size={30} color='black' />
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
    topContainer: {
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get("window").width - 50,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 50,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#8ECDDD',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: 40,
        height: 40,
    },
    buttonText: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 14,
        color: '#22668D',
        textAlign: 'center',
    },
    trackName: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
    },
    artistName: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 16,
        color: '#1C1C1C',
        textAlign: 'center',
        textAlign: 'left',
    },
    modalText: {
        fontSize: 20,
        textAlign: "center",
        color: 'black', // Puedes ajustar el color del texto
        lineHeight: 24, // Puedes ajustar el espaciado entre líneas
    },
    modalContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#6372ff',
        borderWidth: 5,
        borderRadius: 30,
        width: Dimensions.get("window").width - 50,
        height: Dimensions.get("window").width - 50,
    },
});

export default Tracklist;

/* import RNFetchBlob from 'react-native-fetch-blob';

const uploadAudio = async (audioData) => {
  const formData = new FormData();
  formData.append('audio', {
    uri: audioData.uri,
    type: 'audio/mp3',
    name: 'audio.mp3',
  });

  try {
    const response = await fetch('http://tu-backend.com/audio/', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.ok) {
      console.log('Archivo de audio subido con éxito.');
    } else {
      console.error('Error al subir el archivo de audio.');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};

import { RNFetchBlob } from 'react-native-fetch-blob';

const downloadAudio = async (audioId) => {
  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', `http://tu-backend.com/audio/${audioId}/`);

    // Usa la respuesta como sea necesario (por ejemplo, reproducir el audio).
    console.log('Archivo de audio descargado con éxito:', response.path());
  } catch (error) {
    console.error('Error al descargar el archivo de audio:', error);
  }
}; */