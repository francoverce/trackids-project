import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import background from '../assets/background6.png';
import { Dimensions } from "react-native";

const Main = ({ navigation }) => {

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const Login = () => {
    navigation.navigate('Login')
  }

  const Register = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.subtitleText}>EXPERIMENTA CON</Text>
            <Text style={styles.headingText}>TRACKIDS</Text>
            <View style={styles.buttonContainer}>
              <Text style={styles.questionText}>¿Es tu primera vez en Trackids?</Text>
              <TouchableOpacity style={styles.button} onPress={Login}>
                <Text style={styles.buttonText}>NO, YA TENGO UNA CUENTA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={Register}>
                <Text style={styles.buttonText}>SÍ, QUIERO REGISTRARME</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    paddingVertical: 100,
    paddingHorizontal: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 54,
    marginBottom: 20,
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    borderBottomWidth: 5,
    borderColor: 'black',
    fontFamily: 'FugazOne'
  },
  subtitleText: {
    fontSize: 24,
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'FugazOne'
  },
  questionText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'FugazOne'
  },
  buttonContainer: {
    marginTop: 20,
    shadowColor: '#000000',
    width: 300,
    justifyContent: 'center',
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
  buttonSpacing: {
    height: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Main;
