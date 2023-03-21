import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { headerStyles } from "./Styles";
import { StatusBar } from 'expo-status-bar';


type HeaderPropsType = {
  setMessage: (s: string) => void;
}

export default function Header({ setMessage }: HeaderPropsType) {
  const navigation = useNavigation<any>()

  //async function handlePickImage() {
  //  // No permissions request is necessary for launching the image library
  //  let result = await ImagePicker.launchImageLibraryAsync({
  //    mediaTypes: ImagePicker.MediaTypeOptions.All,
  //    allowsEditing: true,
  //    aspect: [16, 9],
  //    quality: 1,
  //  })

  //  if (!result.canceled) {
  //    const imageText = await TextRecognition.recognize(result.assets[0].uri)
  //    let text = ""
  //    for (let block of imageText.blocks) {
  //      // console.log('Block text:', block.text)
  //      // text = text + block.text
  //      //console.log('Block frame:', block.frame)
        
  //      for (let line of block.lines) {
  //        text = text + line.text + " "
  //        // console.log('Line text:', line.text)
  //        // console.log('Line frame:', line.frame)
  //      }
  //    }
  //    console.log("Recognozed Text: ", text)
  //    setMessage(text)
  //    // setImage(result.assets[0].uri)
  //  }
  //}

  function handleNavigateToCameraScreen() {
    navigation.navigate("camera-screen", {})
  }

  function onPressBack() {
    navigation.goBack()
  }

  return (
    <View style={headerStyles.container} >
      <View style={headerStyles.wrapper} >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }} >
          <Ionicons name='chevron-back' color={'#FFF'} size={25} onPress={onPressBack} />
          {/*<Image source={require("../../../assets/images/bot-280.jpg")} style={headerStyles.image} />*/}
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700', fontFamily: "PoppinsRegular", marginLeft: 10 }} >Ask AI</Text>
        </View>
        <View style={headerStyles.utilsContainer} >
          {/*<MaterialIcons name="content-copy" size={25} color="white" style={{ marginLeft: 15, }} />*/}
          <AntDesign name="scan1" size={24} color="white" onPress={handleNavigateToCameraScreen} style={{ marginLeft: 15, }} />
        </View>
      </View>
    </View>
  )
};

