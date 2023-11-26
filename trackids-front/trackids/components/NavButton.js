import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import libraryIcon from '../assets/icons/library.png'
import recordingIcon from '../assets/icons/recording.png'
import youtubeIcon from '../assets/icons/youtube.png'
import libraryBWIcon from '../assets/icons/library-bw.png'
import recordingBWIcon from '../assets/icons/recording-bw.png'
import youtubeBWIcon from '../assets/icons/youtube-bw.png'

const NavButton = ({ navigation, currentScreen }) => {

    const isLibraryScreen = currentScreen === 'Library';
    const isRecordingScreen = currentScreen === 'Recording';
    const isYouTubeSearchScreen = currentScreen === 'YouTubeSearch';

    const getIconStyle = (screenName) => {
        return {
            width: 50,
            height: 50,
            opacity: currentScreen === screenName ? 1 : 0.75, // Ajusta la opacidad según la pantalla actual
        };
    };

    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={() => navigation.navigate('YouTubeSearch')}>
                <Image source={isYouTubeSearchScreen ? youtubeIcon : youtubeBWIcon} style={getIconStyle('YouTubeSearch')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                <Image source={isLibraryScreen ? libraryIcon : libraryBWIcon} style={getIconStyle('Library')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Recording')}>
                <Image source={isRecordingScreen ? recordingIcon : recordingBWIcon} style={getIconStyle('Recording')} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        width: Dimensions.get("window").width - 30,
        padding: 5,
        position: 'absolute',
        bottom: 0,
        marginBottom: Constants.statusBarHeight,
        backgroundColor: '#FFCC70',
        borderRadius: 45,
        borderColor: '#22668D',
        borderWidth: 3,
        // Sombras para Android e iOS
        elevation: 5, // Para Android
        shadowColor: 'black', // Para iOS
        shadowOffset: { width: 0, height: 3 }, // Para iOS
        shadowOpacity: 0.5, // Para iOS
        shadowRadius: 5, // Para iOS
    },
    image: {
        width: 50,
        height: 50,
    },
})

export default NavButton