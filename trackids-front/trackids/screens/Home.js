import React, { useEffect } from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import background from '../assets/background.jpg';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';

const Home = ({ navigation }) => {

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <Text style={styles.header}>TRACKIDS</Text>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recording')}>
            <Text style={styles.buttonText}>¡GRABEMOS UNA CANCIÓN!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Library')}>
            <Text style={styles.buttonText}>QUIERO VER MI LIBRERÍA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('YouTubeSearch')}>
            <Text style={styles.buttonText}>QUIERO BUSCAR UNA CANCIÓN</Text>
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
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: 300,
  },
  buttonText: {
    fontFamily: "FugazOne",
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default Home;