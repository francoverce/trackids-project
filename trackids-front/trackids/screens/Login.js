import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import background from '../assets/background5.png';
import { guardarToken } from '../secureStore';

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
        <Text style={styles.title}>Inicio de Sesión</Text>
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
        <Button title="Iniciar Sesión" onPress={handleLogin} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '75%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Login;
