import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MiPerfil = () => {

  const DatosUsuario = {
    name: 'Fernando Cardozo',
    email: 'fercardozo@uade.edu.ar',

  };

  const CerrarSesion = () => {
    alert('Has cerrado sesión');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.info}>{user.name}</Text>
      <Text style={styles.label}>Correo Electrónico:</Text>
      <Text style={styles.info}>{user.email}</Text>
      <Button title="Cerrar Sesión" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MiPerfil;
