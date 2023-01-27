import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Octicons, } from '@expo/vector-icons';

import Styles from '../../AppStyles';
import { emailInputStyles } from './Styles';


type ChangePasswordEmailInputPropsType = {
  // inputFor: string;
  // text: string;
  setText: (email: string) => void;
};

export default function ChangePasswordEmailInput({ setText }: ChangePasswordEmailInputPropsType) {
  const [value, setValue] = useState<string>()

  function handleChangeText(t:string) {
    setText(t)
  }

  return (
    <View style={emailInputStyles.container} >
      <View style={emailInputStyles.iconContainer} >
        <Octicons name={'mail'} size={20} color={Styles.GrayColor1} style={emailInputStyles.icon} />
      </View>
      <TextInput value={value} onChangeText={t => handleChangeText(t)} placeholder={"Email"} keyboardType='email-address' cursorColor={Styles.DarkColor} style={emailInputStyles.input} />
    </View>
  )
};

