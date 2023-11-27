import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Button, Image, Modal, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';
import NavButton from '../components/NavButton';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import startIcon from '../assets/icons/recordingStart.png'
import stopIcon from '../assets/icons/recordingStop.png'
import deleteIcon from '../assets/icons/recordingDelete.png'
import playIcon from '../assets/icons/recordingPlay.png'
import downloadIcon from '../assets/icons/recordingDownload.png'

const Recording = ({ navigation }) => {

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  const [image, setImage] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempRecordingName, setTempRecordingName] = useState('');
  const [recordingName, setRecordingName] = useState('');

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
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
            <Text style={styles.modalTitle}>Guardar Grabación</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la grabación"
              value={tempRecordingName}
              onChangeText={(text) => setTempRecordingName(text)}
              onSubmitEditing={() => {
                setRecordingName(tempRecordingName);
                Keyboard.dismiss();
              }}
            />
            <Button title="Seleccionar Imagen" onPress={() => pickImage()} />
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            <Button title="Guardar" onPress={() => alert(`Guardar grabación: ${tempRecordingName}`)} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
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
          <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
            <Image source={recording ? stopIcon : startIcon} />
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
    marginLeft: 10,
    marginRight: 40
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 25,
    padding: 10,
    margin: 5,
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
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default Recording;