import React from "react";
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
    button: {
        backgroundColor: '#FFB633',
        borderRadius: 30,
        padding: 10,
        margin: 20,
        width: Dimensions.get("window").width - 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        borderWidth: 3,
        borderColor: '#22668D',
    },
    buttonText: {
        fontFamily: "FugazOne",
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
});

export default YouTubeTutorial;