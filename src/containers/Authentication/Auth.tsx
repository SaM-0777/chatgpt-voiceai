import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

import { authStyles } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FacebookLogo, GoogleLogo } from '../../svg';


type AuthPropsType = {
  setUser: (token: string) => void;
};

GoogleSignin.configure({
  webClientId: '177945594154-o70aafe41m38as1toh5fcceueule5nqg.apps.googleusercontent.com',
});

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState<boolean>(false)
  const [forgotPassword, setForgotPassword] = useState<boolean>(false)

  // remove stored user
  /*async function removerolduser() {
    await AsyncStorage.removeItem('@user')
  }*/

  useEffect(() => {
    // removerolduser()
    return () => {}
  }, [])

  return (
    <View style={authStyles.container} >
      {forgotPassword ? 
        <ForgotPassword loading={loading} setLoading={setLoading} />
        :
        <>
          {state ?
            <Signup loading={loading} setLoading={setLoading} />
            :
            <Login loading={loading} setLoading={setLoading} setForgotPassword={setForgotPassword} />
          }
        </>
      }
      <Text style={authStyles.footerText} >
        {forgotPassword ? "Back to " : state ? "Already have an account? " : "Don't have an account yet? "}
        <Text onPress={loading ? () => {} : forgotPassword ? () => setForgotPassword(prevState => !prevState) : () => setState(prevState => !prevState)} style={authStyles.text} >
          {forgotPassword ? "Login" : state ? "Login" : "Signup"}
        </Text>
      </Text>
    </View>
  )
};

