import React from "react";
import { ImageBackground, View, StyleSheet } from 'react-native';
import Tutorial from '../components/Tutorial';
import background from '../assets/background9.png';
import { Dimensions } from "react-native";

const YouTubeTutorial = ({ navigation }) => {
    return (
        <View>
            <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
                <Tutorial navigation={navigation} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default YouTubeTutorial;