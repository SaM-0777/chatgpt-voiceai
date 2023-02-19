import { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
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
  validate: boolean;
  setText: (accountInfo: accountInfoType) => void;
};


export default function InputArea({ inputFor, text, setText, validate }: InputAreaPropsType) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const [value, setValue] = useState<string>()
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)

  function handleChangeText(t:string) {
    if (t?.length && t?.length > 0) {
      setIsEmailValid(pattern.test(t))
      console.log(pattern.test(t))
    } else {
      setIsEmailValid(true)
    }
    setText({...text, [inputFor]: t})
  }

  //useEffect(() => {
  //  return () => {}
  //}, [value])

  return (
    <View style={[inputAreaStyles.container, { borderWidth: 1 }, validate ? isEmailValid ?  { borderColor: 'transparent' } : { borderColor: 'red' } : { borderColor: 'transparent' }]} >
      <View style={inputAreaStyles.iconContainer} >
        <Octicons name={'mail'} size={20} color={Styles.GrayColor1} style={inputAreaStyles.icon} />
      </View>
      <TextInput value={value} onChangeText={t => handleChangeText(t)} placeholder={"Email"} keyboardType='email-address' cursorColor={Styles.DarkColor} style={[inputAreaStyles.input,]} />
    </View>
  )
};

