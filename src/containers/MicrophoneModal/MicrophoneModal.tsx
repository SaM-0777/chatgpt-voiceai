import { View, TouchableOpacity, Text } from 'react-native';
import LottieFiles from 'lottie-react-native';

import Styles from './Styles';


export default function MicrophoneModal() {
  return (
    <View style={Styles.container} >
      <TouchableOpacity activeOpacity={0.4} style={Styles.mask} />
      <View style={Styles.modal} >
        <LottieFiles source={require('../../animations/listening.json')} speed={1} autoPlay loop />
        <Text></Text>
      </View>
    </View>
  )
};

