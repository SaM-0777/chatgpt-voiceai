import { useState, useCallback, useEffect } from "react";
import { View, Text, ToastAndroid, TextInput, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, Send, Bubble, IChatMessage, QuickReplies, User } from "react-native-gifted-chat";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { MicrophoneModal } from "../../containers";
import { CustomInputToolbar } from "../../components";

import { generate, getPreviousChats } from "../../utils/api";

import AppStyles from "../../AppStyles";
import Styles from './Styles';
import { StatusBar } from "expo-status-bar";


type ChatRoomPropsType = {
  navigation: any;
  route: any;
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
  quickReplies?: QuickReplies
};

export interface IChat {
  _id: string;
  user: string;
  message: string;
  response: string;
  createdAt: string | Date;
};

function RenderSend(props: any) {
  return(
    <Send {...props} >
      <View style={{ marginRight: 5 }} >
        <MaterialCommunityIcons name="send" size={25} color="black" />
      </View>
    </Send>
  )
};

function MessageBubble(props: any) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {

        },
        left: {
          backgroundColor: '#FFF'
        },
      }}
      textStyle={{
        right: {
          color: '#FFF',
          fontFamily: "PoppinsRegular",
        },
        left: {
          color: AppStyles.DarkColor,
          fontFamily: "PoppinsRegular",
        },
      }}
    />
  )
};

function ScrollToBottomComponent(props: any) {
  return (
    <View {...props} >
      <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
    </View>
  )
};

export default function ChatRoom({ route, navigation }: ChatRoomPropsType) {
  const [loading, setLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [responseLoading, setResponseLoading] = useState(false)
  const [token, setToken] = useState<string>()
  const [userMessage, setUserMessage] = useState<string>(route?.params?.initialValue)
  const [messages, setMessages] = useState<IMessage[]>([])

  // get user access-token and previous chats
  async function getUserToken() {
    setLoading(true)
    try {
      const userToken = await AsyncStorage.getItem('@user')
      if (userToken) {
        const storedToken = JSON.parse(userToken)
        setToken(storedToken)
        // get previous chats
        const chats: IChat[] = await getPreviousChats(storedToken)
        // append to messaged
        formatMessages(chats)
      } 
      setLoading(false)
    } catch (error) {
      ToastAndroid.show(error as string, ToastAndroid.SHORT)
      setLoading(false)
    }
  }

  // get response from bot
  async function getResponse(text:string) {
    if (token) {
      setResponseLoading(true)
      const response = await generate(token, text)
      // format the chat and append it to messages
      if (typeof response !== 'object') {
        let fResponse = response.trim()
        let rResponse = response.trim().replace(/[^\w\s]/gi, " ")
        // console.log(rResponse)
        let replyMessage: IMessage[] = [{
          _id: Math.floor(Math.random() * (999999999 - 999999 + 1)) + 1,
          text: fResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
            avatar: require("../../../assets/images/bot-280.jpg"),
          }
        }]
        setMessages((previousMessage: IMessage[]) => GiftedChat.append(previousMessage, replyMessage))
        // speakResponse(rResponse)
        setResponseLoading(false)
      } else {
        setResponseLoading(false)
        ToastAndroid.show(response.error, ToastAndroid.LONG)
      }
    } else {
      setResponseLoading(false)
      ToastAndroid.show('An error occured', ToastAndroid.LONG)
    }
    // setResponseLoading(false)
  }

  // format the chats
  function formatMessages(chats: IChat[]) {
    let formatedMessages: IMessage[] = []

    chats.map(chat => {
      let userMessage: IMessage = {
        _id: "",
        text: "",
        createdAt: 0,
        user: {
          _id: "",
          name: "",
        },
      }
      let botMessage: IMessage = {
        _id: "",
        text: "",
        createdAt: 0,
        user: {
          _id: "",
          name: "",
          avatar: require("../../../assets/images/bot-280.jpg"),
        },
      }

      botMessage._id = chat._id + 'bot'
      botMessage.text = chat.response
      botMessage.createdAt = new Date(chat.createdAt)
      botMessage.user._id = 2
      botMessage.user.name = "Bot"
      
      formatedMessages.push(botMessage)

      userMessage._id = chat._id
      userMessage.text = chat.message
      userMessage.createdAt = new Date(chat.createdAt)
      userMessage.user._id = 1
      userMessage.user.name = "Me"

      formatedMessages.push(userMessage)

    })
    // console.log("Messages: ", formatedMessages)
    setMessages(formatedMessages)
  }

  useEffect(() => {
    getUserToken()
    // speakResponse('Hi bro')
    return () => {}
  }, [])

  function onStartSpeaking() { setIsSpeaking(true) }
  function onEndSpeaking() { setIsSpeaking(false) }
  function onStopSpeaking() {
    Speech.stop()
    setIsSpeaking(false)
  }

  // speak
  async function speakResponse(text: string) {
    Speech.speak(text, {
      // voice: 'uk-UA-language',
      language: 'en-US',
      onStart: onStartSpeaking,
      onDone: onEndSpeaking,
      // onError: onError,
      // onStopped: onEndSpeaking,
    })
  }

  function onLongPress(context: any, message: any) {
    // console.log(context, message);
    const options = ['copy', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({ options, cancelButtonIndex },
      (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setStringAsync(message.text);
            break;
        }
    });
  }

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessage => GiftedChat.append(previousMessage, messages))
  }, [])

  return (
    <View style={{ flex: 1, paddingBottom: 20 }} >
      <StatusBar style="auto" />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex:99, opacity: 0.4 }} >
          <ActivityIndicator color="white" />
        </View>
      )
        :
        <>
          {/*<MicrophoneModal />*/}
          <GiftedChat
            onLongPress={onLongPress}
            messages={messages}
            // onSend={messages => onSend(messages)}
            user={{
              _id: 1
            }}
            renderBubble={MessageBubble}
            renderSend={RenderSend}
            scrollToBottom
            scrollToBottomComponent={ScrollToBottomComponent}
            renderInputToolbar={() => CustomInputToolbar(userMessage, setUserMessage, messages, setMessages, responseLoading, setResponseLoading, getResponse, isSpeaking, onStopSpeaking)}
          />
        </>
      }
    </View>
  )
};

