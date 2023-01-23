import { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import AppStyles from "../../AppStyles";


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
  const [value, setValue] = useState<string>(route?.params?.initialValue)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'Hello Developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React-Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages: []) => {
    setMessages(previousMessage => GiftedChat.append(previousMessage, messages))
  }, [])

  return (
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
  )
};

