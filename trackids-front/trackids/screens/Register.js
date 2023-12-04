import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import background from '../assets/background4.png';
import { Dimensions } from "react-native";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      const dataUser = {
        email: email,
        password: password,
        name: username
      }
      const response = await fetch('http://10.0.2.2:8000/AppTracKids/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('Login');
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>REGISTRO</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>LISTO!</Text>
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  title: {
    fontFamily: "FugazOne",
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    margin: 20,
    textShadowColor: 'black',  // Color del "borde"
    textShadowOffset: { width: 1, height: 1 },  // Ajusta según sea necesario
    textShadowRadius: 2,  // Ajusta según sea necesario
  },
  input: {
    width: '75%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
    paddingLeft: 10,
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

export default Register;
