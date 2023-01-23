import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import * as GoogleAuth from 'expo-auth-session/providers/google';

import { SignupHeader, InputArea, PasswordInput } from '../../components';
import { GoogleLogo, FacebookLogo } from '../../svg';

import { register } from '../../utils/api';

// import AppStyles from '../../AppStyles';
import { signupStyles } from './Styles';
import AppStyles from '../../AppStyles';


type SignupPropsType = {
  setUser: (token: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
};

type SignupType = {
  email: string;
  password: string;
};

export default function Signup({setUser, loading, setLoading}: SignupPropsType) {
  /*const [loading, setLoading] = useState(false)*/
  const [signupInfo, setSignupInfo] = useState<SignupType>({ email: "", password: "" })
  // Google
  /*const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
    androidClientId: "1081080270484-8k0afvjatgoo33q07p7t69j0h4qq33uq.apps.googleusercontent.com",
    expoClientId: "1081080270484-ic01a648fnhcis23qlmnfju66pn9c77p.apps.googleusercontent.com",
  })*/
  /*const [checked, setChecked] = useState<boolean>(false)

  function toggleCheck() { setChecked(prevState => !prevState) }*/

  async function signup() {
    setLoading(true)
    const response = await register(signupInfo.email, signupInfo.password)
    if (Object.keys(response)[0] === 'success') {
      await AsyncStorage.setItem('@user', JSON.stringify(response.success))
      setUser(response.success!)
    } else {
      ToastAndroid.show(response.error, ToastAndroid.LONG)
    }
    setLoading(false)
  }

  /*async function googleSignIn() {
    const authSessionResult = await promptAsync()
    // set result.user to Asyncstorage @user
    console.log(authSessionResult)
  }
  async function facebookSignIn() {
    
  }*/

  return (
    <View style={signupStyles.container} >
      <SignupHeader />
      <InputArea inputFor='email' text={signupInfo!} setText={setSignupInfo} />
      <PasswordInput inputFor='password' text={signupInfo!} setText={setSignupInfo} />
      {/*<View style={signupStyles.checkboxContainer} >
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={toggleCheck} color={AppStyles.GrayColor2} />
        <Text style={signupStyles.checkboxText} >
          By continuing you accept our
          <Text style={{ textDecorationLine: 'underline' }} > Privacy Policy </Text>
          and
          <Text style={{ textDecorationLine: 'underline' }} > Terms of use.</Text>
        </Text>
      </View>*/}
      <TouchableOpacity disabled={loading} activeOpacity={0.95} onPress={signup} style={signupStyles.signupBtnContainer} >
        {!loading ? <Text style={signupStyles.signuptext} >Signup</Text> : <ActivityIndicator color={'#FFF'} />}
      </TouchableOpacity>
      <View style={signupStyles.orContainer} >
        <View style={signupStyles.orVector} />
        <Text style={signupStyles.orText} >Or</Text>
        <View style={signupStyles.orVector} />
      </View>
      {/*<View style={signupStyles.socialIconContainer} >
        <TouchableOpacity activeOpacity={0.7} onPress={googleSignIn} style={[signupStyles.socialButton, { marginRight: 20 }]} >
          <SvgXml xml={GoogleLogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={facebookSignIn} style={[signupStyles.socialButton, { marginLeft: 20 }]} >
          <SvgXml xml={FacebookLogo} />
        </TouchableOpacity>
      </View>*/}
    </View>
  )
};

