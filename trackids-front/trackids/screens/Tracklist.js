import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';

const audioFiles = [
    require('../assets/tracks/feelgoodinc/bass.mp3'),
    require('../assets/tracks/feelgoodinc/drums.mp3'),
    require('../assets/tracks/feelgoodinc/other.mp3'),
    require('../assets/tracks/feelgoodinc/vocals.mp3'),
];

const cover = require('../assets/tracks/demon-days.png');

const Tracklist = () => {
    const [sounds, setSounds] = useState([]);

    useEffect(() => {
        const loadSounds = async () => {
            const loadedSounds = await Promise.all(audioFiles.map(file => Audio.Sound.createAsync(file)));
            setSounds(loadedSounds);
        };

        loadSounds();
    }, []);

    const playSound = async (index) => {
        if (sounds[index]) {
            await sounds[index].sound.playAsync();
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
                <Image source={cover} style={styles.cover} />
                <Text style={styles.trackName}>Feel Good Inc.</Text>
                <Text style={styles.artistName}>Gorillaz</Text>
                <TouchableOpacity style={styles.button} onPress={() => playSound(3)}>
                    <Text style={styles.buttonText}>VOZ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => playSound(0)}>
                    <Text style={styles.buttonText}>BAJO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => playSound(1)}>
                    <Text style={styles.buttonText}>BATERÍA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => playSound(2)}>
                    <Text style={styles.buttonText}>OTROS</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    cover: {
        width: 200,
        height: 200,
        margin: 10,
    },
    button: {
        backgroundColor: '#8ECDDD',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: 300,
    },
    buttonText: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        color: '#22668D',
        textAlign: 'center',
    },
    trackName: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    artistName: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 16,
        color: '#1C1C1C',
        textAlign: 'center',
    },
});

export default Tracklist;