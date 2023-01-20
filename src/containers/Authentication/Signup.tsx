import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import { SignupHeader, InputArea, PasswordInput } from '../../components';
import { GoogleLogo, FacebookLogo } from '../../svg';

import AppStyles from '../../AppStyles';
import { signupStyles } from './Styles';


type SignupType = {
  email: string;
  password: string;
};

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState<SignupType>({ email: "", password: "" })
  const [checked, setChecked] = useState<boolean>(false)

  function toggleCheck() { setChecked(prevState => !prevState) }

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
      <View style={signupStyles.checkboxContainer} >
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={toggleCheck} color={AppStyles.GrayColor2} />
        <Text style={signupStyles.checkboxText} >
          By continuing you accept our
          <Text style={{ textDecorationLine: 'underline' }} > Privacy Policy </Text>
          and
          <Text style={{ textDecorationLine: 'underline' }} > Terms of use.</Text>
        </Text>
      </View>
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

