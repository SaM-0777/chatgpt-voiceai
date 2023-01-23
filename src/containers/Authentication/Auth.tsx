import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import Signup from './Signup';
import Login from './Login';

import { authStyles } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthPropsType = {
  setUser: (token: string) => void;
}

export default function Auth({ setUser }: AuthPropsType) {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState<boolean>(true)

  // remove stored user
  async function removerolduser() {
    await AsyncStorage.removeItem('@user')
  }

  useEffect(() => {
    removerolduser()
    return () => {}
  }, [])

  return (
    <View style={authStyles.container} >
      {state ?
        <Signup loading={loading} setLoading={setLoading} setUser={setUser} />
        :
        <Login loading={loading} setLoading={setLoading} setUser={setUser} />
      }
      <Text style={authStyles.footerText} >
        {state ? "Already have an account? " : "Don't have an account yet? "}
        <Text onPress={loading ? () => {} : () => setState(prevState => !prevState)} style={authStyles.text} >
          {state ? "Login" : "Signup"}
        </Text>
      </Text>
    </View>
  )
};

