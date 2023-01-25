import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CustomInputToolbarStyle } from './Styles';
import { IMessage } from 'react-native-gifted-chat';


type CustomInputToolbarPropsType = {
  props: any;
}

export default function CustomInputToolbar(userMessage: string, setUserMessage: (text: string) => void, setMessages: (messages: IMessage[]) => void, responseLoading: boolean, setResponseLoading: (loadin: boolean) => void) {

  function onPress() {
    console.log(userMessage)
  }

  return (
    <View style={CustomInputToolbarStyle.textToolbarContainer} >
      <View style={CustomInputToolbarStyle.textContainer} >
        <TextInput
          cursorColor={'#000'}
          style={CustomInputToolbarStyle.input}
          placeholder='Type a Message'
          value={userMessage}
          onChangeText={setUserMessage}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={CustomInputToolbarStyle.textToolbarIcon} >
        <MaterialCommunityIcons name="send" size={25} color="white" />
      </TouchableOpacity>
    </View>
  )
};


/**
 * 
{
  _id: 1,
  text: 'Hello developer',
  createdAt: new Date('2023-01-23T23:18:45.816Z'),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any',
  },
},
 */

