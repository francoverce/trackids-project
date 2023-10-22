import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Home = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Tracklist')} title='Tracklist'></Button>
      <Button onPress={() => navigation.navigate('Recording')} title='Recording'></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;