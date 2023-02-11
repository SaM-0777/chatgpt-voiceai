import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator, } from 'react-native';
import LottieView from 'lottie-react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { CustomInputToolbarStyle } from './Styles';
import AppStyles from '../../AppStyles';


export interface User {
  _id: string | number;
  name?: string;
  avatar?: string | number;
};

export interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: User
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
};

type CustomInputToolbarPropsType = {
  userMessage: string,
  setUserMessage: (text: string) => void,
  messages: IMessage[],
  responseLoading: boolean;
  setResponseLoading: (loading: boolean) => void;
  setMessages: (messages: IMessage[] | ((previousMessage: IMessage[]) => IMessage[])) => void,
  getResponse: (value: string) => void,
}

export default function CustomInputToolbar({userMessage, setUserMessage, messages, responseLoading, setResponseLoading, setMessages, getResponse}: CustomInputToolbarPropsType) {
  async function onPress() {
    // if (!isPressedOut) console.log("Pressed")
    // console.log(userMessage)
    if (userMessage && userMessage !== "") {
      setResponseLoading(true)
      let enteredMessage: IMessage[] = [{
        _id: Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1,
        text: userMessage,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Me',
        }
      }]
      setMessages((previousMessage: IMessage[]) => GiftedChat.append(previousMessage, enteredMessage))
      // reset the userMessage
      setUserMessage("")
      // post the chat
      getResponse(userMessage)
      // setResponseLoading(false)
    } else {
      ToastAndroid.show("No Message", ToastAndroid.SHORT)
    }
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
          keyboardType='default'
        />
      </View>
      {!responseLoading ?
        <TouchableOpacity activeOpacity={1} disabled={responseLoading} onPress={onPress} style={[CustomInputToolbarStyle.textToolbarIcon]} >
          <MaterialCommunityIcons name="send" size={25} color={"white"} />
        </TouchableOpacity>
        :
        <View style={CustomInputToolbarStyle.textToolbarLoadingIcon} >
          {/*<LottieView
            source={require('../../animations/loading.json')}
            autoPlay
            loop
          />*/}
          <ActivityIndicator size={'small'} color={AppStyles.DarkColor} />
        </View>
      }
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

