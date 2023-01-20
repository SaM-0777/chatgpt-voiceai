import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { SignupHeader, InputArea, PasswordInput } from '../../components';

import { GoogleLogo, FacebookLogo } from '../../svg';
import { signupStyles } from './Styles';


type SignupType = {
  email: string;
  password: string;
};

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState<SignupType>({email: "", password: ""})

  async function signup() {
    console.log(signupInfo)
  }

  async function googleSignIn() {
    
  }
  async function facebookSignIn() {
    
  }

  return (
    <View style={signupStyles.container} >
      <SignupHeader />
      <InputArea inputFor='email' text={signupInfo!} setText={setSignupInfo} />
      <PasswordInput inputFor='password' text={signupInfo!} setText={setSignupInfo} />
      <TouchableOpacity activeOpacity={0.95} onPress={signup} style={signupStyles.signupBtnContainer} >
        <Text style={signupStyles.signuptext} >Signup</Text>
      </TouchableOpacity>
      <View style={signupStyles.orContainer} >
        <View style={signupStyles.orVector} />
        <Text style={signupStyles.orText} >Or</Text>
        <View style={signupStyles.orVector} />
      </View>
      <View style={signupStyles.socialIconContainer} >
        <TouchableOpacity activeOpacity={0.7} onPress={googleSignIn} style={[signupStyles.socialButton, { marginRight: 20 }]} >
          <SvgXml xml={GoogleLogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={facebookSignIn} style={[signupStyles.socialButton, { marginLeft: 20 }]} >
          <SvgXml xml={FacebookLogo} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

