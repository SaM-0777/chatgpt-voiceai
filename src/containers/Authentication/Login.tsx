import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { LoginHeader, InputArea, PasswordInput } from '../../components';

import { GoogleLogo, FacebookLogo } from '../../svg';
import { loginStyles } from './Styles';


type LoginType = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginType>({email: "", password: ""})

  async function login() {
    console.log(loginInfo)
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
      <TouchableOpacity activeOpacity={0.95} onPress={login} style={loginStyles.loginBtnContainer} >
        <Text style={loginStyles.logintext} >Login</Text>
      </TouchableOpacity>
      <View style={loginStyles.orContainer} >
        <View style={loginStyles.orVector} />
        <Text style={loginStyles.orText} >Or</Text>
        <View style={loginStyles.orVector} />
      </View>
      <View style={loginStyles.socialIconContainer} >
        <TouchableOpacity activeOpacity={0.7} onPress={googleSignIn} style={[loginStyles.socialButton, { marginRight: 20 }]} >
          <SvgXml xml={GoogleLogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={facebookSignIn} style={[loginStyles.socialButton, { marginLeft: 20 }]} >
          <SvgXml xml={FacebookLogo} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

