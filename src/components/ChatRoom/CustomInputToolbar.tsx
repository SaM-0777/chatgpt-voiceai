import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator, } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import auth from "@react-native-firebase/auth";

import { CustomInputToolbarStyle } from './Styles';
import AppStyles from '../../AppStyles';
import { generate } from '../../utils/api';


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
  setMessages: (messages: IMessage[] | ((previousMessage: IMessage[]) => IMessage[])) => void,
}

export default function CustomInputToolbar({userMessage, setUserMessage, setMessages}: CustomInputToolbarPropsType) {
  const [responseLoading, setResponseLoading] = useState(false)

  // get response from bot
  async function getResponse(text:string) {
    /*if (token) {
      setResponseLoading(true)
      const response = await generate(token, text)
      // format the chat and append it to messages
      if (typeof response !== 'object') {
        let fResponse = response.trim()
        // let rResponse = response.trim().replace(/[^\w\s]/gi, " ")
        // console.log(rResponse)
        let replyMessage: IMessage[] = [{
          _id: Math.floor(Math.random() * (999999999 - 999999 + 1)) + 1,
          text: fResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
          }
        }]
        setMessages((previousMessage: IMessage[]) => [...replyMessage, ...previousMessage])
        // speakResponse(rResponse)
        setResponseLoading(false)
      } else {
        setResponseLoading(false)
        ToastAndroid.show(response.error, ToastAndroid.LONG)
      }
    } else {
      setResponseLoading(false)
      ToastAndroid.show('An error occured', ToastAndroid.LONG)
    }*/
    // setResponseLoading(false)
  }
  
  async function onPress() {
    // if (!isPressedOut) console.log("Pressed")
    // console.log(userMessage)
    /*if (userMessage && userMessage !== "") {
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
      setMessages((previousMessage: IMessage[]) => [...enteredMessage, ...previousMessage])
      // reset the userMessage
      setUserMessage("")
      // post the chat
      getResponse(enteredMessage[0].text)
      // setResponseLoading(false)
    } else {
      ToastAndroid.show("No Message", ToastAndroid.SHORT)
    }*/
    setResponseLoading(true)
    try {
      const idToken = await auth().currentUser?.getIdToken()
      const response = await fetch('http://10.0.1.190:3333/api/user/generateV2', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'userid': 'Bearer ' + idToken,
        },
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log("Request error: ", error)
    }
    setResponseLoading(false)
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

