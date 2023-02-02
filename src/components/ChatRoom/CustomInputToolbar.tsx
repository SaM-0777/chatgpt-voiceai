import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import LottieFiles from 'lottie-react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { generate } from '../../utils/api';

import { CustomInputToolbarStyle } from './Styles';


type CustomInputToolbarPropsType = {
  userMessage: string,
  setUserMessage: (text: string) => void,
  messages: IMessage[],
  setMessages: (messages: IMessage[] | ((previousMessage: IMessage[]) => IMessage[])) => void,
  responseLoading: boolean,
  setResponseLoading: (loading: boolean) => void,
  getResponse: (value: string) => void,
  isMicrophoneModal: boolean,
  setMicrophoneModal: (value: boolean) => void,
  startTextToSpeech: () => void;
  stopTextToSpeech: () => void;
  isSpeaking: boolean,
  onStopSpeaking: () => void,
}

export default function CustomInputToolbar({userMessage, setUserMessage, messages, setMessages, responseLoading, setResponseLoading, getResponse, isMicrophoneModal, setMicrophoneModal, startTextToSpeech, stopTextToSpeech, isSpeaking, onStopSpeaking}: CustomInputToolbarPropsType) {

  function openMicrophoneModal() {
    setMicrophoneModal(true)
  }
  function closeMicrophoneModal() {
    setMicrophoneModal(false)
  }

  function onLongPress() {
    /*if (!isMicrophoneModal && userMessage === "") {
      openMicrophoneModal()
      // startTextToSpeech()
    }*/
    // console.log("Long presssed")
  }

  function onPressIn() { console.log("In") }
  function onPressOut() {
    // closeMicrophoneModal()
    // stopTextToSpeech()
    // console.log("Out")
  }

  async function onPress() {
    // if (!isPressedOut) console.log("Pressed")
    // console.log(userMessage)
    if (userMessage && userMessage !== "") {
      setResponseLoading(true)
      // reset the userMessage
      setUserMessage("")
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
      <TouchableOpacity activeOpacity={1} disabled={responseLoading} onPress={onPress} style={[CustomInputToolbarStyle.textToolbarIcon, responseLoading ? { backgroundColor: '#DDDADA' } : { backgroundColor: '#1D1617', }]} >
        {responseLoading ?
          <ActivityIndicator size={'small'} color='white' />
          :
          <MaterialCommunityIcons name="send" size={25} color={"white"} />
        }
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
        {/*{isSpeaking ? 
        <LottieFiles source={require('../../animations/speaking-white.json')} autoPlay loop />
        :
        <MaterialCommunityIcons name="send" size={25} color={"white"} />
        }*/}
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

