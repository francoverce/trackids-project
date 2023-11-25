import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

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
    <ImageBackground source={require('../assets/images/fondo.jpg')} style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.headingText}>BIENVENIDO</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={Login}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={Register}>
              <Text style={styles.buttonText}>Crear una cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    paddingVertical: 100,
    paddingHorizontal: 45,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  headingText: {
    fontSize: 35,
    marginBottom: 20,
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'FugazOne'
  },
  buttonContainer: {
    marginTop: 20,
    shadowColor: '#000000',
    width: 300,
  },
  button: {
    width: 320,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
