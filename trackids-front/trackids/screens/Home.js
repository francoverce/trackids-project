import React, { useEffect } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import background from '../assets/background8.png';
import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import libraryIcon from '../assets/icons/library.png'
import recordingIcon from '../assets/icons/recording.png'
import youtubeIcon from '../assets/icons/youtube.png'

const Home = ({ navigation }) => {

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <Text style={styles.header}>TRACKIDS</Text>
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('YouTubeSearch')}>
            <Image source={youtubeIcon} style={styles.icon} />
            <Text style={styles.buttonText}>QUIERO BUSCAR UNA CANCIÓN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Library')}>
            <Text style={styles.buttonText}>QUIERO VER MI LIBRERÍA</Text>
            <Image source={libraryIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recording')}>
            <Image source={recordingIcon} style={styles.icon} />
            <Text style={styles.buttonText}>¡GRABEMOS UNA CANCIÓN!</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 36,
    fontFamily: 'FugazOne',
    color: '#22668D',
    textAlign: 'center',
    marginTop: Constants.statusBarHeight,
    borderBottomWidth: 8,
    borderBottomColor: '#22668D',
    width: '100%',
  },
  button: {
    backgroundColor: '#FFB633',
    borderRadius: 30,
    padding: 10,
    margin: 20,
    width: Dimensions.get("window").width - 30,
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
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10
  },
});

export default Home;