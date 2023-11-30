import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import background from '../assets/background4.png';

const Register = ( navigation ) => {
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
        <Text style={styles.title}>Registro</Text>
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
        <Button title="Registrarse" onPress={handleRegister} />
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

export default Register;
