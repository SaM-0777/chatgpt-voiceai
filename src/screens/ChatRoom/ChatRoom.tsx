import { useState, useCallback, useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { GiftedChat, Send, Bubble, IChatMessage } from "react-native-gifted-chat";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { generate } from "../../utils/api";

import AppStyles from "../../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";


type ChatRoomPropsType = {
  navigation: any;
  route: any;
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
}

export default function ChatRoom({ route, navigation }: ChatRoomPropsType) {
  const [loading, setLoading] = useState(true)
  const [responseLoading, setResponseLoading] = useState(false)
  const [initialChat, setInitialChat] = useState<string>(route?.params?.initialValue)
  const [token, setToken] = useState<string>()
  const [previousMessages, setPreviousMessages] = useState<object[]>([])
  const [messages, setMessages] = useState<IChatMessage[]>([])

  // get user access-token
  async function getUserToken() {
    setLoading(true)
    try {
      const userToken = await AsyncStorage.getItem('@user')
      if (userToken) {
        const token = JSON.parse(userToken)
        setToken(token)
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
    if (token) {
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
    }
  }

  useEffect(() => {
    getUserToken()
    return () => {}
  }, [])

  const onSend = useCallback((messages: []) => {
    setMessages(previousMessage => GiftedChat.append(previousMessage, messages))

    // make request
    const { text } = messages[0]
    getResponse(text)
  }, [])

  return (
    <>
      {loading && (
        <View style={{ flex: 1, backgroundColor: '#000', width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex:99, opacity: 0.4 }} >
          <ActivityIndicator color="white" />
        </View>
      )}
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
      />
    </>
  )
};

