import { useState, useCallback, useEffect } from "react";
import { View, Text, ToastAndroid, TextInput, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, Send, Bubble, IChatMessage, QuickReplies, User } from "react-native-gifted-chat";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { CustomInputToolbar } from "../../components";

import { generate, getPreviousChats } from "../../utils/api";

import AppStyles from "../../AppStyles";
import Styles from './Styles';


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
    <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
  )
};

/*type CustomInputToolbarPropsType = {
  props: any;
}*/

/*function CustomInputToolbar({ props }: CustomInputToolbarPropsType) {
  const [value, setValue] = useState<string>("")
  return (
    <View style={Styles.textToolbarContainer} >
      <View style={Styles.textContainer} >
        <TextInput
          {...props}
          cursorColor={'#000'}
          style={Styles.input}
          placeholder='Type a Message'
          />
      </View>
      <TouchableOpacity style={Styles.textToolbarIcon} >
        <MaterialCommunityIcons name="send" size={25} color="white" />
      </TouchableOpacity>
    </View>
  )
};*/

export default function ChatRoom({ route, navigation }: ChatRoomPropsType) {
  const [loading, setLoading] = useState(false)
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
        setToken(token)
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
    setResponseLoading(true)
    /*if (token) {
      const response = await generate(token, text)
      if (Object.keys(response)[0] === 'result') {
        const reply = {
          user: {
            _id: 2,
            name: 'ChatGPT',
          },
          text: JSON.parse(response.result),
        }
        console.log(reply)
        return reply
      } else {
        ToastAndroid.show('An error occured while generating response', ToastAndroid.SHORT)
      }
    }*/
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
    // getUserToken()
    /*setMessages([
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
      {
        _id: 1000,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 1010,
        text: 'Hello developerssss',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])*/
    return () => {}
  }, [])

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessage => GiftedChat.append(previousMessage, messages))

    // make request
    /*const { text } = messages[0]
    getResponse(text)*/
  }, [])

  return (
    <View style={{ flex: 1, paddingBottom: 20, }} >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex:99, opacity: 0.4 }} >
          <ActivityIndicator color="white" />
        </View>
      )
        :
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }}
          renderBubble={MessageBubble}
          renderSend={RenderSend}
          scrollToBottom
          scrollToBottomComponent={ScrollToBottomComponent}
          renderInputToolbar={() => CustomInputToolbar(userMessage, setUserMessage, setMessages, responseLoading, setResponseLoading)}
        />
      }
    </View>
  )
};

