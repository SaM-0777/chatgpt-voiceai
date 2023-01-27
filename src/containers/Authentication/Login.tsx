import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { LoginHeader, InputArea, PasswordInput } from '../../components';

import { login } from '../../utils/api';

import { GoogleLogo, FacebookLogo } from '../../svg';
import { loginStyles } from './Styles';


type LoginPropsType = {
  setUser: (token: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  setForgotPassword: (state: boolean) => void;
};

type LoginType = {
  email: string;
  password: string;
};

export default function Login({ setUser, loading, setLoading, setForgotPassword }: LoginPropsType) {
  const [loginInfo, setLoginInfo] = useState<LoginType>({email: "", password: ""})

  async function onLogin() {
    setLoading(true)
    const response = await login(loginInfo.email, loginInfo.password)
    if (Object.keys(response)[0] === 'success') {
      await AsyncStorage.setItem('@user', JSON.stringify(response.success))
      setUser(response.success!)
    } else {
      ToastAndroid.show(response.error, ToastAndroid.LONG)
    }
    setLoading(false)
  }

  function onPressForgot() {
    setForgotPassword(true)
  }

  async function googleSignIn() {
    
  }
  async function facebookSignIn() {
    
  }

  return (
    <View style={loginStyles.container} >
      <LoginHeader />
      <InputArea inputFor='email' text={loginInfo!} setText={setLoginInfo} />
      <PasswordInput inputFor='password' text={loginInfo!} setText={setLoginInfo} />
      <TouchableOpacity disabled={loading} activeOpacity={0.95} onPress={onPressForgot} style={loginStyles.forgotPasswordContainer} >
        <Text style={loginStyles.forgotText} >Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={loading} activeOpacity={0.95} onPress={onLogin} style={loginStyles.loginBtnContainer} >
        {!loading ? <Text style={loginStyles.logintext} >Login</Text> : <ActivityIndicator color={'#FFF'} />}
      </TouchableOpacity>
      <View style={loginStyles.orContainer} >
        <View style={loginStyles.orVector} />
        <Text style={loginStyles.orText} >Or</Text>
        <View style={loginStyles.orVector} />
      </View>
      {/*<View style={loginStyles.socialIconContainer} >
        <TouchableOpacity activeOpacity={0.7} onPress={googleSignIn} style={[loginStyles.socialButton, { marginRight: 20 }]} >
          <SvgXml xml={GoogleLogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={facebookSignIn} style={[loginStyles.socialButton, { marginLeft: 20 }]} >
          <SvgXml xml={FacebookLogo} />
        </TouchableOpacity>
      </View>*/}
    </View>
  )
};

