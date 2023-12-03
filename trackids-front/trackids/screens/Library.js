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
/*   SecureStore.getItemAsync("token").then((token) => setToken(token)); */

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const [category, setCategory] = useState('trackids');
  const [songs, setSongs] = useState([]);
  const [projects, setProjects] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("called");

    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      setToken(storedToken);
      // Llamar a getSongs y getProjects después de obtener el token
      await getSongs();
      await getProjects(storedToken);
    };

    // Call only when screen open or when back on screen 
    if (isFocused) {
      fetchToken();
    }
  }, [isFocused]);

  const getSongs = async () => {
    // Puedes cargar las canciones de la manera que necesites aquí
    const loadedSongs = [
      {
        id: '0',
        title: 'Feel Good Inc.',
        artist: 'Gorillaz',
        info: 'Feel Good Inc. es la cuarta canción de la banda virtual británica Gorillaz; y la sexta canción de su segundo álbum Demon Days. La canción es el primer sencillo del álbum, y fue lanzada el 9 de mayo de 2005 en todo el mundo.',
        audioFiles: [
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701474804/ku8xfbksi8lcubpc409u.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701474699/tdomsmvtcdnjzd5rplfg.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701474628/xdqst3ga5drjpj0f414x.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701474749/ge6pwk1do6muozfpo5h8.mp3',
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG',
      },
      {
        id: '1',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        info: 'Lanzada por Epic Records el 2 de enero de 1983, como el segundo sencillo del sexto álbum de estudio de Jackson, Thriller (1982), Billie Jean fue escrita y compuesta por Jackson y producida por Jackson y Quincy Jones. Fusiona post-disco, rythm and blues, funk y dance-pop.',
        audioFiles: [
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560201/u78u7v8dd9kyzokz2ptj.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560184/pbccutbv4ubl8qnlxvar.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560174/rp5s50h9w7nxhdu2tw0v.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560189/vujaoddxxhnv9ktqmhna.mp3',
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
      },
      {
        id: '2',
        title: 'Woman',
        artist: 'Little Simz',
        info: 'Woman es una canción de la rapera británica Little Simz con la también cantante británica Cleo Sol. Fue lanzado el 6 de mayo de 2021, como parte del álbum Sometimes I Might Be Introvert. La canción fue escrita por Simz, Sol y el productor discográfico Inflo.',
        audioFiles: [
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560201/u78u7v8dd9kyzokz2ptj.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560184/pbccutbv4ubl8qnlxvar.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560174/rp5s50h9w7nxhdu2tw0v.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560189/vujaoddxxhnv9ktqmhna.mp3',
        ],
        imagen: 'https://i.discogs.com/6HwBif-XJNcgDnYu_pOMoYAL9pgvMW9b416L2eOHgDQ/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwMDY2/OTQ3LTE2MzA4NDAy/NjEtNzI2Mi5qcGVn.jpeg',
      },
      {
        id: '3',
        title: 'Hips Dont Lie',
        artist: 'Shakira',
        info: 'Hips Dont Lie (en español Las caderas no mienten) es una canción interpretada por la cantante colombiana Shakira con la colaboración del rapero haitiano Wyclef Jean, incluida originalmente en la reedición del quinto álbum de estudio de Shakira, Oral Fixation vol. 2 (2006).',
        audioFiles: [
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560784/nprvvadqxkz4isc8htxa.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560768/zgshju82iks4hlgrbyh3.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560764/utwarf8ml3zpi4ivlxsi.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701560780/v4knvo12xgxjix9pvtp3.mp3',
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Shakira-HipsDon%27tLie.jpg/220px-Shakira-HipsDon%27tLie.jpg',
      },
      {
        id: '4',
        title: 'Arabesque',
        artist: 'Coldplay',
        info: 'Arabesque es una canción de la banda de rock británica Coldplay de su octavo álbum de estudio Everyday Life. Fue lanzado el 24 de octubre de 2019. Cuenta con la voz del cantante belga Stromae y secciones de trompa de Femi Kuti y su banda.',
        audioFiles: [
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561155/d6ef9sqbtm5lcy61pszb.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561079/w8idospiuhwfonzkx3jd.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561052/hbcvlprnshlqjnbd5y9s.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561134/pwwk7mctpujzgf9sptbr.mp3',
        ],
        imagen: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Coldplay_-_Everyday_Life.png',
      },
      {
        id: '5',
        title: 'Deja Vu',
        artist: 'Gustavo Cerati',
        info: 'Déjà vu es una canción del músico de rock argentino Gustavo Cerati, producida por él y Héctor Castillo. Está incluida en el quinto y último álbum de estudio en solitario del compositor, Fuerza Natural. Fue lanzado el día 20 de julio de 2009.',
        audioFiles: [
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561403/jhowqebyl3nqbvffrptp.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561376/ugytuf5mqyd1ob9fcbf3.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561374/q17axm6zyjwhn7szlx7g.mp3',
          'https://res.cloudinary.com/dewiieivf/raw/upload/v1701561393/td8c9wmt9wwlj9v7cobv.mp3',
        ],
        imagen: 'https://www.infobae.com/new-resizer/24mL70CZP2dEsd2HUtpEzGTeD74=/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/30080756/cerati-fuerza-natural-2009.jpg',
      },
      // Otras canciones...
    ];
    setSongs(loadedSongs);
  };

  const getProjects = async (storedToken) => {
    try {
      const response = await fetch('http://10.0.2.2:8000/AppTracKids/getProyectos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
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