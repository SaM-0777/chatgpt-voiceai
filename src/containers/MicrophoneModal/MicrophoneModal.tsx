import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import LottieFiles from 'lottie-react-native';

import Styles from './Styles';


type MicrophoneModalPropsType = {
  setMicrophoneModal: (value: boolean) => void;
}

export default function MicrophoneModal({ setMicrophoneModal }: MicrophoneModalPropsType) {
  /*const [voiceRecordingStarted, setVoiceRecordingStarted] = useState<boolean>(false)
  const [speechToTextResult, setSpeechToTextResult] = useState<any[]>([])

  async function startTextToSpeech() {
    await Voice.start('en-US')
    setVoiceRecordingStarted(true)
  }
  async function stopTextToSpeech() {
    await Voice.stop()
    setVoiceRecordingStarted(false)
  }
  async function textToSpeechError(error: any) {

  }
  async function textToSpeechResult(result: any) {
    console.log(result.value)
    setSpeechToTextResult(result.value)
  }

  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])*/

  function onPressMask() {
    setMicrophoneModal(false)
  }
  
  return (
    <View style={Styles.container} >
      <TouchableOpacity activeOpacity={0.4} onPress={onPressMask} style={Styles.mask} />
      <View style={Styles.modal} >
        <LottieFiles source={require('../../animations/listening.json')} speed={1} autoPlay loop />
      </View>
    </View>
  )
};

