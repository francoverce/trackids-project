import React from "react";
import { View, StyleSheet, Image, Text, useWindowDimensions } from 'react-native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';

const TutorialItem = ({ item }) => {

    const { width } = useWindowDimensions();

    const [fontLoaded] = useFonts({
        FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    return (
        <View style={[styles.container, { width }]}>
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Constants.statusBarHeight,
    },
    image: {
        width: 250,
        height: 250,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 32,
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 50,
    },
    description: {
        fontFamily: 'FugazOne',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        margin: 30,
    },
});

export default TutorialItem; // Exporta el componente de esta manera
