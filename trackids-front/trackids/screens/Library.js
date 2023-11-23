import React from 'react';
import { ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import background from '../assets/background3.jpg';
import Constants from 'expo-constants';
import NavButton from '../components/NavButton';

const Library = ({ navigation }) => {

  const feelgoodinc = {
    id: 'feelgoodinc',
    title: 'Feel Good Inc.',
    artist: 'Gorillaz',
    info: 'Esta canción fue grabada en bla bla bla por bla bla'
  }

  const audioFiles = {
    feelgoodinc: [
      require('../assets/tracks/feelgoodinc/bass.mp3'),
      require('../assets/tracks/feelgoodinc/drums.mp3'),
      require('../assets/tracks/feelgoodinc/other.mp3'),
      require('../assets/tracks/feelgoodinc/vocals.mp3'),
    ],
    // Otras canciones...
  };

  const covers = {
    feelgoodinc: [
      require('../assets/tracks/feelgoodinc/cover.png')
    ],
    // Otras canciones...
  }

  const toTracklist = (songSelected) => {
    navigation.navigate('Tracklist', {
      song: songSelected,
      audioFiles: audioFiles[songSelected.id],
      cover: covers[songSelected.id][0],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <View style={styles.container}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.titleText}>Canciones de Trackids</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.titleText}>Mis Canciones</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => toTracklist(feelgoodinc)}>
              <Image style={styles.cover} source={require('../assets/tracks/feelgoodinc/cover.png')} />
              <Text style={styles.titleText}>Feel Good Inc.</Text>
              <Text style={styles.artistText}>Gorillaz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => toTracklist(feelgoodinc)}>
              <Image style={styles.cover} source={require('../assets/tracks/feelgoodinc/cover.png')} />
              <Text style={styles.titleText}>Feel Good Inc.</Text>
              <Text style={styles.artistText}>Gorillaz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => toTracklist(feelgoodinc)}>
              <Image style={styles.cover} source={require('../assets/tracks/feelgoodinc/cover.png')} />
              <Text style={styles.titleText}>Feel Good Inc.</Text>
              <Text style={styles.artistText}>Gorillaz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => toTracklist(feelgoodinc)}>
              <Image style={styles.cover} source={require('../assets/tracks/feelgoodinc/cover.png')} />
              <Text style={styles.titleText}>Feel Good Inc.</Text>
              <Text style={styles.artistText}>Gorillaz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => toTracklist(feelgoodinc)}>
              <Image style={styles.cover} source={require('../assets/tracks/feelgoodinc/cover.png')} />
              <Text style={styles.titleText}>Feel Good Inc.</Text>
              <Text style={styles.artistText}>Gorillaz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => toTracklist(feelgoodinc)}>
              <Image style={styles.cover} source={require('../assets/tracks/feelgoodinc/cover.png')} />
              <Text style={styles.titleText}>Feel Good Inc.</Text>
              <Text style={styles.artistText}>Gorillaz</Text>
            </TouchableOpacity>
          </View>
        </View>
        <NavButton navigation={navigation} />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: Constants.statusBarHeight,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: Constants.statusBarHeight * 2,
  },
  menuButton: {
    width: '50%',
    height: Constants.statusBarHeight * 2,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 150,
    height: 150,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cover: {
    width: 100,
    height: 100,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  artistText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
});

export default Library;