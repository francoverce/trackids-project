import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';
import NavButton from '../components/NavButton';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';

const Recording = ({ navigation }) => {

  const [fontLoaded] = useFonts({
    FugazOne: require('../assets/fonts/FugazOne-Regular.ttf'),
  });

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets);
        setRecording(recording);
      }
    } catch (err) { }
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
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => recordingLine.sound.replayAsync()}>
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([])
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.bg}>
      <Text style={styles.header}>GRABACIÓN</Text>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
            <Text style={styles.buttonText}>{recording ? 'PARAR GRABACIÓN' : 'INICIAR GRABACIÓN\n\n\n'}</Text>
          </TouchableOpacity>
          {getRecordingLines()}
          <TouchableOpacity style={styles.button} onPress={clearRecordings}>
            <Text style={styles.buttonText}>{recordings.length > 0 ? '\n\n\nClear Recordings' : ''}</Text>
          </TouchableOpacity>
        </View>
        <NavButton navigation={navigation} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    flex: 1,
    justifyContent: 'flex-end',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40
  },
  fill: {
    flex: 1,
    margin: 15
  },
  button: {
    backgroundColor: '#FFB633',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 150,
  },
  buttonText: {
    fontFamily: 'FugazOne',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default Recording;