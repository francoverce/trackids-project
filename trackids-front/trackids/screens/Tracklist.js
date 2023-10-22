import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const audioFiles = [
    require('../assets/feelgoodinc/bass.mp3'),
    require('../assets/feelgoodinc/drums.mp3'),
    require('../assets/feelgoodinc/other.mp3'),
    require('../assets/feelgoodinc/vocals.mp3'),
];

const Tracklist = () => {

    const [sound, setSound] = useState();
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

    async function loadSound() {
        if (sound) {
            await sound.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(audioFiles[currentAudioIndex]);
        setSound(sound);
    }

    useEffect(() => {
        loadSound();
    }, [currentAudioIndex]);

    async function playSound() {
        if (sound) {
            alert('reproduciendo track '+currentAudioIndex)
            await sound.playAsync();
        }
    }

    function nextTrack() {
        if (currentAudioIndex < audioFiles.length - 1) {
            setCurrentAudioIndex(currentAudioIndex + 1);
        }
    }

    return (
        <View>
            <Button title="Reproducir" onPress={playSound} />
            <Button title="Siguiente pista" onPress={nextTrack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Tracklist;