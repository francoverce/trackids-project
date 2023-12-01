import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import background from '../assets/background3.jpg';
import Constants from 'expo-constants';
import NavButton from '../components/NavButton';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/native";

const Library = ({ navigation }) => {

  const [token, setToken] = useState('');
  SecureStore.getItemAsync("token").then((token) => setToken(token));

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const [category, setCategory] = useState('trackids');
  const [songs, setSongs] = useState([]);
  const [projects, setProjects] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("called");

    // Call only when screen open or when back on screen 
    if (isFocused) {
      getSongs();
      getProjects();
    }
  }, [isFocused]);

  const getSongs = async () => {
    // Puedes cargar las canciones de la manera que necesites aquí
    const loadedSongs = [
      {
        id: 'feelgoodinc',
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        info: 'Esta canción fue grabada en bla bla bla por bla bla',
        audioFiles: [
          require('../assets/tracks/feelgoodinc/vocals.mp3'),
          require('../assets/tracks/feelgoodinc/drums.mp3'),
          require('../assets/tracks/feelgoodinc/bass.mp3'),
          require('../assets/tracks/feelgoodinc/other.mp3'),
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      {
        id: 'feelgoodinc2',
        title: 'Feel Good Inc.2',
        artist: 'Gorillaz2',
        info: 'Esta canción fue grabada en bla bla bla por bla bla2',
        audioFiles: [
          require('../assets/tracks/feelgoodinc/vocals.mp3'),
          require('../assets/tracks/feelgoodinc/drums.mp3'),
          require('../assets/tracks/feelgoodinc/bass.mp3'),
          require('../assets/tracks/feelgoodinc/other.mp3'),
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      {
        id: 'feelgoodinc3',
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        info: 'Esta canción fue grabada en bla bla bla por bla bla',
        audioFiles: [
          require('../assets/tracks/feelgoodinc/vocals.mp3'),
          require('../assets/tracks/feelgoodinc/drums.mp3'),
          require('../assets/tracks/feelgoodinc/bass.mp3'),
          require('../assets/tracks/feelgoodinc/other.mp3'),
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      {
        id: 'feelgoodinc4',
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        info: 'Esta canción fue grabada en bla bla bla por bla bla',
        audioFiles: [
          require('../assets/tracks/feelgoodinc/vocals.mp3'),
          require('../assets/tracks/feelgoodinc/drums.mp3'),
          require('../assets/tracks/feelgoodinc/bass.mp3'),
          require('../assets/tracks/feelgoodinc/other.mp3'),
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      {
        id: 'feelgoodinc5',
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        info: 'Esta canción fue grabada en bla bla bla por bla bla',
        audioFiles: [
          require('../assets/tracks/feelgoodinc/vocals.mp3'),
          require('../assets/tracks/feelgoodinc/drums.mp3'),
          require('../assets/tracks/feelgoodinc/bass.mp3'),
          require('../assets/tracks/feelgoodinc/other.mp3'),
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      {
        id: 'feelgoodinc6',
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        info: 'Esta canción fue grabada en bla bla bla por bla bla',
        audioFiles: [
          require('../assets/tracks/feelgoodinc/vocals.mp3'),
          require('../assets/tracks/feelgoodinc/drums.mp3'),
          require('../assets/tracks/feelgoodinc/bass.mp3'),
          require('../assets/tracks/feelgoodinc/other.mp3'),
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      // Otras canciones...
    ];
    setSongs(loadedSongs);
  };

  const getProjects = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/AppTracKids/getProyectos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      const data = await response.json();
  
      // Verificar si hay un error en la respuesta
      if (data.error) {
        console.error('Error:', data.error);
        // Manejar el error según tus necesidades
      } else {
        // Obtén solo los últimos 6 proyectos
        const last6Projects = data.slice(Math.max(data.length - 6, 0));
        setProjects(last6Projects);
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar otros errores, si es necesario
    }
  };

  const currentList = category === 'trackids' ? songs : projects;

  const toTracklist = (item) => {
    let songInfo = {};

    if (item.hasOwnProperty('artist') && item.hasOwnProperty('info')) {
      // Es una canción
      songInfo = {
        title: item.title,
        artist: item.artist,
        info: item.info,
      };
      itemAudioFiles = item.audioFiles;
    } else {
      // Es un proyecto
      songInfo = {
        title: item.title,
        artist: 'YouTube', // Puedes establecer esto como desees o dejarlo en blanco
        info: 'Esta canción fue descargada de YouTube, por lo cual no tenemos su información detallada',   // Puedes establecer esto como desees o dejarlo en blanco

      };
      itemAudioFiles = [
        item.vocals,
        item.bass,
        item.drums,
        item.other
      ]; // Asegúrate de que la estructura sea coherente
    }

    navigation.navigate('Tracklist', {
      song: songInfo,
      audioFiles: itemAudioFiles, // Asegúrate de que la estructura sea coherente
      cover: item.imagen,
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
          <View style={styles.gridContainer}>
            {currentList.map((item) => (
              <TouchableOpacity style={styles.gridItem} onPress={() => toTracklist(item)} key={item.id}>
                <ImageBackground style={styles.cover} source={{ uri: item.imagen }}>
                  <View style={styles.gradientOverlay} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.nameText}>{item.title}</Text>
                    {currentList === 'trackids' && (
                      <Text style={styles.artistText}>{item.artist}</Text>
                    )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
    backgroundColor: 'rgba(34, 102, 141, 0.25)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Opcional: ajusta según tus preferencias
  },
  gridItem: {
    width: '40%', // Ajusta según tus preferencias para dos elementos por fila
    aspectRatio: 1, // Para mantener una relación de aspecto cuadrada
    margin: 10, // Ajusta según tus preferencias
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
    marginTop: 110,
    height: 40,
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