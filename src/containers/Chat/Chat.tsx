import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import Styles from './Styles';


type ChatPropsType = {
  navigation: any
}

export default function Chat({ navigation }: ChatPropsType) {
  
  function navigateToChatRoom(text: string) {
    navigation.navigate("chat-room", {
      initialValue: text
    })
  }

  return (
    <View style={Styles.main} >
      <View style={Styles.container} >
        <View style={Styles.wrapper} >
          <View style={Styles.titleContainer} >
            <Feather name="sun" size={24} color="black" />
            <Text style={Styles.title} >Example</Text>
          </View>
          <View style={Styles.boxContainer} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigateToChatRoom("Explain quantum computing in simple terms")} style={Styles.box} >
              <Text style={Styles.boxText} >Explain quantum computing in simple terms</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigateToChatRoom("Got any creative ideas for a 10 year old’s birthday?")} style={Styles.box} >
              <Text style={Styles.boxText} >Got any creative ideas for a 10 year old’s birthday?</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigateToChatRoom("How do I make an HTTP request in Javascript?")} style={Styles.box} >
              <Text style={Styles.boxText} >How do I make an HTTP request in Javascript?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.wrapper} >
          <View style={Styles.titleContainer} >
            <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="black" />
            <Text style={Styles.title} >Capabilities</Text>
          </View>
          <View style={Styles.boxContainer} >
            <View style={Styles.box} >
              <Text style={Styles.boxText} >Remembers what user said earlier in the conversation</Text>
            </View>
            <View style={Styles.box} >
              <Text style={Styles.boxText} >Allows user to provide follow-up corrections</Text>
            </View>
            <View style={Styles.box} >
              <Text style={Styles.boxText} >Trained to decline inappropriate requests</Text>
            </View>
          </View>
        </View>
        <View style={Styles.wrapper} >
          <View style={Styles.titleContainer} >
            <AntDesign name="warning" size={24} color="black" />
            <Text style={Styles.title} >Limitations</Text>
          </View>
          <View style={Styles.boxContainer} >
            <View style={Styles.box} >
              <Text style={Styles.boxText} >May occasionally generate incorrect information</Text>
            </View>
            <View style={Styles.box} >
              <Text style={Styles.boxText} >May occasionally produce harmful instructions or biased content</Text>
            </View>
            <View style={Styles.box} >
              <Text style={Styles.boxText} >Limited knowledge of world and events after 2021</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.85} onPress={() => navigateToChatRoom("")} style={Styles.startBtn} >
        <Text style={Styles.startText} >Start</Text>
        <MaterialCommunityIcons name="arrow-right-thin" size={25} color="#FFF" style={{ marginLeft: 5, }} />
      </TouchableOpacity>
    </View>
  )
};

