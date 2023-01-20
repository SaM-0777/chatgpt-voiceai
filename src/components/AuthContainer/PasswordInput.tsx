import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import Styles from '../../AppStyles';
import { passwordInputStyles } from './Styles';


type accountInfoType = {
  email: string;
  password: string;
};

type PasswordInputPropsType = {
  inputFor: string;
  text: accountInfoType;
  setText: (accountInfo: accountInfoType) => void;
}

export default function PasswordInput({ inputFor, text, setText }: PasswordInputPropsType) {
  const [secureEntry, setSecureEntry] = useState<boolean>(true)
  const [value, setValue] = useState<string>()

  function handleChangeText(t:string) {
    setText({...text, [inputFor]: t})
  }

  function onToggleSecureEntry() { setSecureEntry(prevState => !prevState) }

  return (
    <View style={passwordInputStyles.container} >
      <View style={passwordInputStyles.iconContainer} >
        <Octicons name={"lock"} size={20} color={Styles.GrayColor1} style={passwordInputStyles.icon} />
      </View>
      <TextInput value={value} onChangeText={t => handleChangeText(t)} placeholder={"Password"} secureTextEntry={secureEntry} keyboardType={"default"} cursorColor={Styles.DarkColor} style={passwordInputStyles.input} />
      <View style={passwordInputStyles.iconContainer} >
        <Octicons onPress={onToggleSecureEntry} name={secureEntry ? "eye" : "eye-closed"} size={20} color={Styles.GrayColor1} style={passwordInputStyles.icon} />
      </View>
    </View>
  )
};

