import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import auth from '@react-native-firebase/auth';

import { LoginHeader, InputArea, PasswordInput } from '../../components';

import { login } from '../../utils/api';

import { GoogleLogo, FacebookLogo } from '../../svg';
import { loginStyles } from './Styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


type LoginPropsType = {
  // setUser: (token: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  setForgotPassword: (state: boolean) => void;
};

type LoginType = {
  email: string;
  password: string;
};

export default function Login({ loading, setLoading, setForgotPassword }: LoginPropsType) {
  const [loginLoading, setLoginLoading] = useState<boolean>(false)
  const [googleSignInLoading, setGoogleSignInLoading] = useState<boolean>(false)
  const [facebookSignInLoading, setFacebookSignInLoading] = useState<boolean>(false)
  const [loginInfo, setLoginInfo] = useState<LoginType>({email: "", password: ""})

  async function onLogin() {
    setLoginLoading(true)
    setLoading(true)
    auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .then(() => {
        ToastAndroid.show('Login successful', ToastAndroid.LONG)
        setLoginLoading(false)
        setLoading(false)
      }).catch(error => {
        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show('User not found!', ToastAndroid.LONG)
        }
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Invalid Email!', ToastAndroid.LONG)
        }
        if (error.code === 'auth/wrong-password') {
          ToastAndroid.show('Wrong Password!', ToastAndroid.LONG)
        }
        // ToastAndroid.show("Something went wrong. Try Again later", ToastAndroid.LONG)
        setLoginLoading(false)
        setLoading(false)
      }).finally(() => {
        setLoginLoading(false)
        setLoading(false)
      })
    /*const response = await login(loginInfo.email, loginInfo.password)
    if (Object.keys(response)[0] === 'success') {
      await AsyncStorage.setItem('@user', JSON.stringify(response.success))
      setUser(response.success!)
    } else {
      ToastAndroid.show(response.error, ToastAndroid.LONG)
    }*/
    /*setLoginLoading(false)
    setLoading(false)*/
  }

  function onPressForgot() {
    setForgotPassword(true)
  }

  async function googleSignIn() {
    setLoading(true)
    setLoginLoading(false)
    setFacebookSignInLoading(false)
    setGoogleSignInLoading(true)
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    // Sign-in the user with the credential
    const signIn = auth().signInWithCredential(googleCredential)
    signIn.then((user) => {
      // console.log("user form Google: ", user)
      setLoading(false)
      setLoginLoading(false)
      setFacebookSignInLoading(false)
      setGoogleSignInLoading(false)
    }).catch((error) => {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG)
      setLoading(false)
      setLoginLoading(false)
      setFacebookSignInLoading(false)
      setGoogleSignInLoading(false)
    }).finally(() => {
      setLoading(false)
      setLoginLoading(false)
      setFacebookSignInLoading(false)
      setGoogleSignInLoading(false)
    })
  }

  /*async function facebookSignIn() {
    setLoading(true)
    setLoginLoading(false)
    setGoogleSignInLoading(false)
    setFacebookSignInLoading(true)
  }*/

  return (
    <View style={loginStyles.container} >
      <LoginHeader />
      <InputArea inputFor='email' text={loginInfo!} setText={setLoginInfo} validate={false} />
      <PasswordInput inputFor='password' text={loginInfo!} setText={setLoginInfo} validate={false} />
      <TouchableOpacity disabled={loading} activeOpacity={0.95} onPress={onPressForgot} style={loginStyles.forgotPasswordContainer} >
        <Text style={loginStyles.forgotText} >Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={loading || loginLoading || googleSignInLoading || facebookSignInLoading} activeOpacity={0.95} onPress={onLogin} style={loginStyles.loginBtnContainer} >
        {!loginLoading ? <Text style={loginStyles.logintext} >Login</Text> : <ActivityIndicator color={'#FFF'} />}
      </TouchableOpacity>
      <View style={loginStyles.orContainer} >
        <View style={loginStyles.orVector} />
        <Text style={loginStyles.orText} >Or</Text>
        <View style={loginStyles.orVector} />
      </View>
      <View style={loginStyles.socialIconContainer} >
        <TouchableOpacity disabled={loading || loginLoading || googleSignInLoading || facebookSignInLoading} activeOpacity={0.7} onPress={googleSignIn} style={[loginStyles.socialButton, { marginBottom: 20 }]} >
          {googleSignInLoading ? <ActivityIndicator color={'#101010'} /> : (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <SvgXml xml={GoogleLogo} />
              <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14, marginLeft: 10 }} >Signin with Google</Text>
            </View>
          )}
        </TouchableOpacity>
        {/*<TouchableOpacity disabled={loading || loginLoading || googleSignInLoading || facebookSignInLoading} activeOpacity={0.7} onPress={facebookSignIn} style={[loginStyles.socialButton, { marginLeft: 20 }]} >
          {facebookSignInLoading ? <ActivityIndicator color={'#101010'} /> : <SvgXml xml={FacebookLogo} />}
        </TouchableOpacity>*/}
      </View>
    </View>
  )
};

