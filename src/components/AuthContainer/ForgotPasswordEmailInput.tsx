import { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Octicons, } from '@expo/vector-icons';

import Styles from '../../AppStyles';
import { inputAreaStyles } from './Styles';


type InputAreaPropsType = {
  // inputFor: string;
  // text: string;
  setText: (email: string) => void;
  setIsEmailValid: (o: boolean) => void;
};

export default function ForgotPasswordEmailInput({ setText, setIsEmailValid }: InputAreaPropsType) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const [value, setValue] = useState<string>()
  

  function handleChangeText(t:string) {
    if (t?.length && t?.length > 0) {
      setIsEmailValid(pattern.test(t))
    } else {
      setIsEmailValid(true)
    }
    setText(t)
  }

  return (
    <View style={inputAreaStyles.container} >
      <View style={inputAreaStyles.iconContainer} >
        <Octicons name={'mail'} size={20} color={Styles.GrayColor1} style={inputAreaStyles.icon} />
      </View>
      <TextInput value={value} onChangeText={t => handleChangeText(t)} placeholder={"Email"} keyboardType='email-address' cursorColor={Styles.DarkColor} style={inputAreaStyles.input} />
    </View>
  )
};

