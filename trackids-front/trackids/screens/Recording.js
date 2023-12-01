import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Button, Image, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';
import NavButton from '../components/NavButton';
import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import startIcon from '../assets/icons/recordingStart.png'
import stopIcon from '../assets/icons/recordingStop.png'
import deleteIcon from '../assets/icons/recordingDelete.png'
import playIcon from '../assets/icons/recordingPlay.png'
import downloadIcon from '../assets/icons/recordingDownload.png'
import * as SecureStore from 'expo-secure-store';

const Recording = ({ navigation }) => {

  const [token, setToken] = useState('');
  SecureStore.getItemAsync("token").then((token) => setToken(token));

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempRecordingName, setTempRecordingName] = useState('');
  const [recordingName, setRecordingName] = useState('');
  const [image, setImage] = useState(null);

  const [saving, setSaving] = useState(false);

  const [separatedTrack, setSeparatedTrack] = useState(null);

  async function separateAudio() {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('audio', {
        uri: recordings[0].file,
        type: 'audio/mpeg', // Ajusta el tipo de contenido según tu necesidad
        name: 'audio.mp3',
      });
      formData.append('title', tempRecordingName);
      formData.append('imagen', {
        uri: image,
        type: 'image/jpeg', // Ajusta el tipo de contenido según tu necesidad
        name: 'imagen.jpg',
      });
      console.log(JSON.stringify(formData))
      const response = await fetch('http://10.0.2.2:8000/AppTracKids/obtenerSeparacionPorAudio', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Indica que estás enviando datos de formdata
        },
        body: formData,
      });
      const data = await response.json();
      console.log('Separation Data:', data);
      // Continúa con el manejo de la respuesta según tus necesidades
      setSeparatedTrack(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    // Este efecto se ejecutará después de cada renderizado
    if (separatedTrack) {
      toTracklist();
    }
  }, [separatedTrack]);

  const toTracklist = () => {
    navigation.navigate('Tracklist', {
      song: {
        id: separatedTrack.id,
        title: tempRecordingName,
        artist: '',
        info: 'Esta es una grabación mía!',
      },
      cover: separatedTrack.imagen,
      audioFiles: [separatedTrack.vocals, separatedTrack.drums, separatedTrack.bass, separatedTrack.other],
    });
  }

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.LOW_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Grabación #{index + 1} | {recordingLine.duration}
          </Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => recordingLine.sound.replayAsync()}>
              <Image style={styles.icon} source={playIcon} />
              <Text style={styles.buttonText}>ESCUCHAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => openModal()}>
              <Image style={styles.icon} source={downloadIcon} />
              <Text style={styles.buttonText}>GUARDAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const RecordingModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>GUARDAR PROYECTO</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre increíble para mi nuevo proyecto"
              value={tempRecordingName}
              onChangeText={(text) => setTempRecordingName(text)}
              onSubmitEditing={() => {
                setRecordingName(tempRecordingName);
                Keyboard.dismiss();
              }}
            />
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#696eff' }]} onPress={() => pickImage()}>
              <Text style={styles.buttonText}>ELEGIR IMAGEN</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#69ff69' }]} onPress={() => separateAudio()}>
              <Text style={styles.buttonText}>GUARDAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ff6969' }]} onPress={() => (saving ? null : setModalVisible(false))}>
              {saving ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>CANCELAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  function clearRecordings() {
    setRecordings([])
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
        <Text style={styles.header}>GRABACIÓN</Text>
        <View style={styles.container}>
          {getRecordingLines()}
          {recordings.length > 0 && (
            <>
              <TouchableOpacity style={styles.button} onPress={clearRecordings}>
                <Image style={styles.icon} source={recordings.length > 0 ? deleteIcon : ''} />
                <Text style={styles.buttonText}>{recordings.length > 0 ? 'BORRAR GRABACIONES' : ''}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.button, { flexDirection: 'column', marginBottom: 50 }]} onPress={recording ? stopRecording : startRecording}>
            <Image source={recording ? stopIcon : startIcon} />
            <Text style={styles.buttonText}>{recording ? 'PAUSAR GRABACIÓN' : 'INICIAR GRABACIÓN'}</Text>
          </TouchableOpacity>
          <NavButton navigation={navigation} currentScreen="Recording" />
        </View>
        <RecordingModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 22,
    fontFamily: 'FugazOne',
    color: '#22668D',
    textAlign: 'center',
    marginTop: Constants.statusBarHeight,
    borderBottomWidth: 5,
    borderBottomColor: '#22668D',
    width: '100%',
  },
  icon: {
    width: 40,
    height: 40,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  fill: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 45,
    backgroundColor: 'white',
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: 'FugazOne',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFCC70',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height - 200,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#22668D',
    borderWidth: 5,
    borderRadius: 30,
  },
  modalTitle: {
    fontFamily: 'FugazOne',
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  modalButton: {
    borderRadius: 15,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
  },
});

export default Recording;