import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import background from '../assets/background.jpg';

const Recording = () => {
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
        <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
          <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording\n\n\n'}</Text>
        </TouchableOpacity>
        {getRecordingLines()}
        <TouchableOpacity style={styles.button} onPress={clearRecordings}>
          <Text style={styles.buttonText}>{recordings.length > 0 ? '\n\n\nClear Recordings' : ''}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#8ECDDD',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 150,
  },
  buttonText: {
    /*     fontFamily: 'FugazOne-Regular', */
    fontSize: 18,
    color: '#22668D',
    textAlign: 'center',
  },
});

export default Recording;