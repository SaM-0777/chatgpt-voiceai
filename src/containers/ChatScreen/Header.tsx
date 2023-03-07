import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { headerStyles } from "./Styles";


export default function Header() {
  const navigation = useNavigation()

  function onPressBack() {
    navigation.goBack()
  }

  return (
    <View style={headerStyles.container} >
      <View style={headerStyles.wrapper} >
        <Ionicons name='chevron-back' color={'#FFF'} size={25} onPress={onPressBack} />
        <Image source={require("../../../assets/images/bot-280.jpg")} style={headerStyles.image} />
        <Text>Sam</Text>
      </View>
    </View>
  )
};

