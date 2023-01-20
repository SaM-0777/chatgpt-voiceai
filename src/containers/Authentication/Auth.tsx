import { useState } from 'react';
import { View, Text } from 'react-native';

import Signup from './Signup';
import Login from './Login';

import { authStyles } from './Styles';


export default function Auth() {
  const [state, setState] = useState<boolean>(false)

  return (
    <View style={authStyles.container} >
      {state ? <Signup /> : <Login />}
      <Text style={authStyles.footerText} >
        {state ? "Already have an account? " : "Don't have an account yet? "}
        <Text onPress={() => setState(prevState => !prevState)} style={authStyles.text} >
          {state ? "Login" : "Signup"}
        </Text>
      </Text>
    </View>
  )
};

