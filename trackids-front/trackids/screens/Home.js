import React from 'react';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import background from '../assets/background.jpg';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recording')}>
          <Text style={styles.buttonText}>¡GRABEMOS UNA CANCIÓN!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Library')}>
          <Text style={styles.buttonText}>QUIERO VER MI LIBRERÍA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('YouTubeSearch')}>
          <Text style={styles.buttonText}>QUIERO BUSCAR UNA CANCIÓN</Text>
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
  button: {
    backgroundColor: '#8ECDDD',
    borderRadius: 10,
    padding: 10,
    margin: 5, 
    width: 300, 
  },
  buttonText: {

    fontSize: 18,
    color: '#22668D',
    textAlign: 'center',
  },
});

export default Home;