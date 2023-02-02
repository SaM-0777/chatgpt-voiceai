import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import LottieFiles from 'lottie-react-native';
import Voice from "@react-native-voice/voice";

import Styles from './Styles';


type MicrophoneModalPropsType = {
  setMicrophoneModal: (value: boolean) => void;
}

export default function MicrophoneModal({ setMicrophoneModal }: MicrophoneModalPropsType) {
  
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

