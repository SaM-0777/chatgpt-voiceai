import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import LottieFiles from 'lottie-react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { generate } from '../../utils/api';

import { CustomInputToolbarStyle } from './Styles';


export default function CustomInputToolbar(userMessage: string, setUserMessage: (text: string) => void, messages: IMessage[], setMessages: (messages: IMessage[] | ((previousMessage: IMessage[]) => IMessage[])) => void, responseLoading: boolean, setResponseLoading: (loadin: boolean) => void, getResponse: (value: string) => void, isSpeaking: boolean, onStopSpeaking: () => void) {

  async function onPress() {
    // console.log(userMessage)
    if (userMessage && userMessage !== "") {
      setResponseLoading(true)
      // reset the userMessage
      setUserMessage("")
      let enteredMessage: IMessage[] = [{
        _id: Math.floor(Math.random() * (100000000 - 100000 + 1)) + 1,
        text: userMessage,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Me',
        }
      }]
      setMessages((previousMessage: IMessage[]) => GiftedChat.append(previousMessage, enteredMessage))
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
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} disabled={responseLoading} onPress={isSpeaking ? onStopSpeaking : onPress} style={CustomInputToolbarStyle.textToolbarIcon} >
        {/*{userMessage === "" ?
          <FontAwesome name="microphone" size={24} color="white" />
          :
          <>
            {responseLoading ?
              <ActivityIndicator size={'small'} color='white' />
              :
              <MaterialCommunityIcons name="send" size={25} color={"white"} />
            } 
          </>
        }*/}
        {isSpeaking ? 
        <LottieFiles source={require('../../animations/speaking-white.json')} autoPlay loop />
        :
        <MaterialCommunityIcons name="send" size={25} color={"white"} />
        }
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

