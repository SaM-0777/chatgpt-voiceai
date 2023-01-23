import { useState } from 'react';
import { View, TextInput, KeyboardTypeOptions } from 'react-native';
import { Octicons, } from '@expo/vector-icons';

import Styles from '../../AppStyles';
import { inputAreaStyles } from './Styles';


type accountInfoType = {
  email: string;
  password: string;
};

type InputAreaPropsType = {
  inputFor: string;
  text: accountInfoType;
  setText: (accountInfo: accountInfoType) => void;
};

export default function InputArea({ inputFor, text, setText }: InputAreaPropsType) {
  const [value, setValue] = useState<string>()

  function handleChangeText(t:string) {
    setText({...text, [inputFor]: t})
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

