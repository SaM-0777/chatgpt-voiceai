import React from 'react';
import { View, Text, ToastAndroid, TouchableOpacity, } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import AppStyles from "../../AppStyles";
import { messageStyles } from "./Styles";


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

type MessagePropsType = {
  message: IMessage
};

export default function Message({ message }: MessagePropsType) {
  const hh = new Date(message.createdAt).getHours()
  const mm = new Date(message.createdAt).getMinutes()

  const time = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm

  function onLongPressMessage() {
    Clipboard.setStringAsync(message.text);
    ToastAndroid.show('Message Copied', ToastAndroid.SHORT)
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onLongPress={onLongPressMessage}
      style={[
        messageStyles.container,
        {
          alignSelf: message.user._id === 1 ? "flex-end" : "flex-start",
          marginLeft: message.user._id === 1 ? 0 : 10,
          marginRight: message.user._id === 1 ? 10 : 0,
        },
      ]}
    >
      <View style={[messageStyles.messageContainer,
        {
          backgroundColor: message.user._id === 1 ? '#343434' : '#f1f1f1',
          borderBottomEndRadius: message.user._id === 1 ? 5 : 15,
          borderBottomStartRadius: 15,
          borderTopEndRadius: 15,
          borderTopStartRadius: message.user._id === 1 ? 15 : 5,
        },
      ]} >
        <Text style={[messageStyles.text, { color: message.user._id === 1 ? '#FFF' : AppStyles.DarkColor }]} >{message.text}</Text>
        <Text style={[messageStyles.time, { color: '#929292' }]}>{time}</Text>
      </View>
    </TouchableOpacity>
  )
};

