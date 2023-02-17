import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text, ToastAndroid, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { MicrophoneModal } from "../../containers";
import { Message, VerifyEmailModal } from "../../containers";
import { CustomInputToolbar } from "../../components";

import { getPreviousChats } from "../../utils/api";

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
  const [isEmailVerifyModal, setIsEmailVerifyModal] = useState<boolean>(false)
  // const [responseLoading, setResponseLoading] = useState(false)
  const [token, setToken] = useState<string>()
  const [userMessage, setUserMessage] = useState<string>(route?.params?.initialValue)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // get user access-token and previous chats
  /*async function getUserToken() {
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
  }*/

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

  // check if user-email is verified
  useEffect(() => {
    // getUserToken()
    // speakResponse('Hi bro')

    if (!auth().currentUser?.emailVerified) {
      setIsEmailVerifyModal(true)
    }
    else {
      setIsEmailVerifyModal(false)
    }

    return () => {}
  }, [])

  function closeVerifyEmailmodal() { setIsEmailVerifyModal(false) }

  // keyboard offset
  /*useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      console.log("Here")
      setKeyboardHeight(e.endCoordinates.height)
    })

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0)
    })

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])*/
  

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#FFFFFF", }} >
      <StatusBar style="auto" backgroundColor="#FFFFFF" />
      {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }} >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 110, height: 50, backgroundColor: '#000', borderRadius: 10, }} >
              <ActivityIndicator color="white" size={"small"} />
              <Text style={{ fontFamily: "PoppinsRegular", marginLeft: 10, color: "#FFF", fontSize: 15, }} >Loading</Text>
            </View>
          </View>
        )
        :
        <View style={{ flex: 1, paddingBottom: 10, position: 'relative' }} >
          <FlashList
            data={messages}
            renderItem={({ item }) => <Message message={item} />}
            inverted
            estimatedItemSize={850}
                          
            // stickyHeaderHiddenOnScroll={false}
            // StickyHeaderComponent={() => }
          />
          <CustomInputToolbar userMessage={userMessage} setUserMessage={setUserMessage} setMessages={setMessages} />
          {isEmailVerifyModal && <VerifyEmailModal onPressLater={closeVerifyEmailmodal} messageLength={messages.length} />}
        </View>
      }
    </SafeAreaView>
  )
};

