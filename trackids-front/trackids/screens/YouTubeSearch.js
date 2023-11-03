import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import background from '../assets/background.jpg';
import Tutorial from '../components/Tutorial';

const YouTubeSearch = ({ navigation }) => {

    const inputUrlRef = useRef();
    const [text, onChangeText] = React.useState('https://www.youtube.com/watch?v=1Sul2b0Uf7Y');
    const idVideo = youtube_parser(text);

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
                'X-RapidAPI-Key': '09baaeda1cmsh701b9c278e4f8efp14d149jsn6689f5697ac7',
                'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
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
                <View style={styles.bottomContainer}>
                    <Text style={styles.tipText}>
                        Importá tu canción favorita directamente desde YouTube!
                    </Text>
                    <Text style={styles.tipText}>
                        Si tenés dudas, presióná el boton de "?" arriba a la derecha
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
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
        backgroundColor: '#22668D',
        borderRadius: 20,
        padding: 10,
        margin: 10, // Agrega espacio entre los botones
        width: 50, // Ajusta el ancho de los botones aquí
    },
    button: {
        backgroundColor: '#8ECDDD',
        borderRadius: 10,
        padding: 10,
        margin: 10, // Agrega espacio entre los botones
        width: 300, // Ajusta el ancho de los botones aquí
    },
    helpButtonText: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        color: '#8ECDDD',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        /*     fontFamily: 'FugazOne-Regular', */
        fontSize: 18,
        color: '#22668D',
        textAlign: 'center',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: '100',
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