import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import auth from "@react-native-firebase/auth";

import { ForgotPasswordHeader, ForgotPasswordEmailInput } from '../../components';

import { forgot } from '../../utils/api';

import { forgotPasswordStyles } from "./Styles";


type ForgotPasswordPropsType = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};

export default function ForgotPassword({ loading, setLoading }: ForgotPasswordPropsType) {
  const [email, setEmail] = useState<string>("")
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

  async function onPress() {
    if (email.length >= 1 && isEmailValid) {
      setLoading(true)
      auth().sendPasswordResetEmail(email).then(function(user) {
        ToastAndroid.show("An email has been send with instructions. Make sure to check the SPAM folders.", ToastAndroid.LONG)
        setLoading(false)
      }).catch(function(error) {
        console.log(error)
        setLoading(false)
      })
    } else {
      ToastAndroid.show('Provide a valid Email', ToastAndroid.SHORT)
    }
    /*const response = await forgot(email)
    if (typeof response === 'string') {
      ToastAndroid.show(response, ToastAndroid.LONG)
    } else {
      ToastAndroid.show("Server connection failed", ToastAndroid.LONG)
    }*/
  }

  return (
    <View style={forgotPasswordStyles.container} >
      <ForgotPasswordHeader />
      <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', }} >
        <ForgotPasswordEmailInput setText={setEmail} setIsEmailValid={setIsEmailValid} />
        <TouchableOpacity disabled={loading} activeOpacity={0.95} onPress={onPress} style={forgotPasswordStyles.btnContainer} >
          {!loading ? <Text style={forgotPasswordStyles.logintext} >Submit</Text> : <ActivityIndicator color={'#FFF'} />}
        </TouchableOpacity>
      </View>
    </View>
  )
};

