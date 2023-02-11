import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text, ToastAndroid, KeyboardAvoidingView, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { MicrophoneModal } from "../../containers";
import { Message } from "../../containers";
import { CustomInputToolbar } from "../../components";

import { generate, getPreviousChats } from "../../utils/api";

import AppStyles from "../../AppStyles";
import Styles from './Styles';


type ChatRoomPropsType = {
  navigation: any;
  route: any;
};

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

export interface IChat {
  _id: string;
  user: string;
  message: string;
  response: string;
  createdAt: string | Date;
};


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
        setToken(storedToken)
        // get previous chats
        try {
          const chats: IChat[] = await getPreviousChats(storedToken)
          // append to messages
          formatMessages(chats)
        } catch (error) {
          ToastAndroid.show('An error occured. Try again later', ToastAndroid.LONG)
        }
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

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#FFFFFF", }} >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 100 }} enableOnAndroid={true} scrollEnabled={false} keyboardShouldPersistTaps="handled" >
          {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }} >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 110, height: 50, backgroundColor: '#000', borderRadius: 10, }} >
                  <ActivityIndicator color="white" size={"small"} />
                  <Text style={{ fontFamily: "PoppinsRegular", marginLeft: 10, color: "#FFF", fontSize: 15, }} >Loading</Text>
                </View>
              </View>
            )
            :
            <>
              <View style={{ flex: 1 }} >
                <FlashList
                  data={messages}
                  renderItem={({ item }) => <Message message={item} />}
                  inverted
                  estimatedItemSize={850}
                />
                <CustomInputToolbar userMessage={userMessage} setUserMessage={setUserMessage} messages={messages} setMessages={setMessages} responseLoading={responseLoading} setResponseLoading={setResponseLoading} getResponse={getResponse} />
              </View>
            </>
          }
          {/*<KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, }} nestedScrollEnabled extraScrollHeight={120} showsVerticalScrollIndicator={false} enableOnAndroid={true} >
          </KeyboardAwareScrollView>*/}
      </KeyboardAwareScrollView>
          </SafeAreaView>
  )
};

