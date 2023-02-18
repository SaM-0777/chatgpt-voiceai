import { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

import Styles from './Styles';


type VerifyEmailModalPropsType = {
  onPressLater: () => void;
  messageLength: number;
}

export default function VerifyEmailModal({ onPressLater, messageLength }: VerifyEmailModalPropsType) {
  const navigation = useNavigation()
  const [verifyloading, setVerifyloading] = useState<boolean>(false)

  function onPressVerify() {
    setVerifyloading(true)
    auth().currentUser?.sendEmailVerification().then(() => {
      auth()
      .signOut()
      .then(() => {
        navigation.navigate('home')
        ToastAndroid.show('A verification email has been sent to. Make sure to check SPAM folder', ToastAndroid.LONG)
        onPressLater()
        setVerifyloading(false)
      }).catch((error) => {
        ToastAndroid.show('A verification email has been sent to. Make sure to check SPAM folder', ToastAndroid.LONG)
        onPressLater()
        setVerifyloading(false)
      })
    }).catch((error) => {
      ToastAndroid.show('Something went wrong.', ToastAndroid.LONG)
      setVerifyloading(false)
    })
  }

  return (
    <View style={Styles.container} >
      <View style={Styles.mask} />
      <View style={[Styles.wrapper, {  }]} >
        <View style={{ flex: 1 }} >
          <Text style={Styles.text} >Verify your Email</Text>
        </View>
        <View style={{ flex: 1 }} >
          <Text style={Styles.subText} >You'll need to verify your email in order to access our services.</Text>
        </View>
        <View style={[Styles.btnWrapper, { flex: 1 }]} >
          {messageLength <= 20 && (
            <TouchableOpacity activeOpacity={0.9} disabled={verifyloading} onPress={onPressLater} style={[Styles.btn, { borderWidth: 2, borderColor: '#8f8f8f', borderStyle: 'solid', width: '47%', }]} >
              <Text style={[Styles.btnText, { color: '#8f8f8f' }]} >Later</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity activeOpacity={0.9} disabled={verifyloading} onPress={onPressVerify} style={[Styles.btn, { backgroundColor: '#101010', width: messageLength <= 20 ? '47%' : '100%', }]} >
            {verifyloading ? <ActivityIndicator color={'#FFF'} /> : <Text style={[Styles.btnText, { color: '#FFF', }]} >Verify</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

