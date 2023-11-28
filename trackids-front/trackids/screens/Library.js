import React, { useState } from 'react';
import { ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import background from '../assets/background3.jpg';
import Constants from 'expo-constants';
import NavButton from '../components/NavButton';
import { useFonts } from 'expo-font';

const Library = ({ navigation }) => {

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const [category, setCategory] = useState('trackids');

  const songs = {
    trackids: [
      { id: 'feelgoodinc', title: 'Feel Good Inc.', artist: 'Gorillaz', info: 'Esta canción fue grabada en bla bla bla por bla bla' },
      { id: 'feelgoodinc2', title: 'Feel Good Inc.2', artist: 'Gorillaz2', info: 'Esta canción fue grabada en bla bla bla por bla bla2' },

      // ...
    ],
    proyectos: [
      { id: 'feelgoodinc3', title: '', artist: 'Alizée - La Isla Bonita', info: 'Esta canción fue grabada en bla bla bla por bla bla3' },
      // ...
    ],
  };

  const feelgoodinc = {
    id: 'feelgoodinc',
    title: 'Feel Good Inc.',
    artist: 'Gorillaz',
    info: 'Esta canción fue grabada en bla bla bla por bla bla'
  }

  const audioFiles = {
    feelgoodinc: [
      require('../assets/tracks/feelgoodinc/vocals.mp3'),
      require('../assets/tracks/feelgoodinc/drums.mp3'),
      require('../assets/tracks/feelgoodinc/bass.mp3'),
      require('../assets/tracks/feelgoodinc/other.mp3'),
    ],
    feelgoodinc2: [
      require('../assets/tracks/feelgoodinc/vocals.mp3'),
      require('../assets/tracks/feelgoodinc/drums.mp3'),
      require('../assets/tracks/feelgoodinc/bass.mp3'),
      require('../assets/tracks/feelgoodinc/other.mp3'),
    ],
    feelgoodinc3: [
      { uri: "https://res.cloudinary.com/dewiieivf/raw/upload/v1701197687/asrfjf8rmay9nghhgsou.mp3" },
      { uri: "https://res.cloudinary.com/dewiieivf/raw/upload/v1701197687/asrfjf8rmay9nghhgsou.mp3" },
      { uri: "https://res.cloudinary.com/dewiieivf/raw/upload/v1701197687/asrfjf8rmay9nghhgsou.mp3" },
      { uri: "https://res.cloudinary.com/dewiieivf/raw/upload/v1701197687/asrfjf8rmay9nghhgsou.mp3" },
    ],
    // Otras canciones...
  };

  const covers = {
    feelgoodinc: [
      require('../assets/tracks/feelgoodinc/cover.png')
    ],
    feelgoodinc2: [
      require('../assets/tracks/feelgoodinc/cover.png')
    ],
    feelgoodinc3: [
      { uri: 'https://i.ytimg.com/vi/xq-aTe77bkA/default.jpg' }
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
        <Text style={styles.header}>BIBLIOTECA</Text>
        <View style={styles.container}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={[styles.menuButton, category === 'trackids' && styles.selectedMenuButton]}
              onPress={() => setCategory('trackids')}
            >
              <Text style={styles.titleText}>Canciones de Trackids</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuButton, category === 'proyectos' && styles.selectedMenuButton]}
              onPress={() => setCategory('proyectos')}
            >
              <Text style={styles.titleText}>Mis Proyectos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            {songs[category].map((song) => (
              <TouchableOpacity style={styles.button} onPress={() => toTracklist(song)} key={song.id}>
                <ImageBackground style={styles.cover} source={covers[song.id][0]}>
                  <View style={styles.gradientOverlay} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.nameText}>{song.title}</Text>
                    <Text style={styles.artistText}>{song.artist}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <NavButton navigation={navigation} currentScreen="Library" />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'flex-start',
  },
  bg: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontFamily: 'FugazOne',
    color: '#22668D',
    textAlign: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#22668D',
    width: '100%',
    marginTop: Constants.statusBarHeight,
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
  selectedMenuButton: {
    backgroundColor: 'rgba(34, 102, 141, 0.4)',
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Necesario para superponer el texto y el degradado
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopEndRadius: 30,
    position: 'absolute',
    marginTop: 90,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajusta según sea necesario
  },
  titleContainer: {
    position: 'absolute',
    bottom: 10, // Ajusta según sea necesario
    left: 10, // Ajusta según sea necesario
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'FugazOne',
    color: 'black', // Color del texto
    textAlign: 'center',
  },
  nameText: {
    fontSize: 16,
    fontFamily: 'FugazOne',
    color: 'white', // Color del texto
    textAlign: 'left',
  },
  cover: {
    width: 150,
    height: 150,
  },
  artistText: {
    fontSize: 14,
    fontFamily: 'FugazOne',
    color: '#e3e3e3',
    textAlign: 'left',
  },
});

export default Library;