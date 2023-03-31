import { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

import Styles from './Styles';


type ModalPropsType = {
  onPressOk: () => void;
}

export default function Modal({ onPressOk }: ModalPropsType) {
  return (
    <View style={Styles.container} >
      <View style={Styles.mask} />
      <View style={[Styles.wrapper, {  }]} >
        <Text style={Styles.text} >Warning</Text>
        <View style={Styles.textBody} >
          <Text style={Styles.subText} >Please note that this feature is currently experimental and may not be compatible with handwritten inputs. We recommend using typed inputs to ensure optimal performance of the feature.</Text>
        </View>
        <TouchableOpacity activeOpacity={0.9} disabled={false} onPress={onPressOk} style={[Styles.btn, { backgroundColor: '#101010', width: '100%', }]} >
          <Text style={[Styles.btnText, { color: '#FFF', }]} >I, Understand</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

