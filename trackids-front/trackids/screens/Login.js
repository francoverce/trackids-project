import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import background from '../assets/background5.png';
import { guardarToken } from '../secureStore';
import { Dimensions } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const dataUser = {
        email: email,
        password: password
      }
      const response = await fetch('http://10.0.2.2:8000/AppTracKids/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
      });
      const data = await response.json();
      if (data.keyValidate) {
        guardarToken(data.keyValidate);
        console.log(data.keyValidate)
        navigation.navigate('Home');
      } else {
        alert(data.error || 'Error en la respuesta');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>INICIO DE SESIÓN</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

export default Login;
