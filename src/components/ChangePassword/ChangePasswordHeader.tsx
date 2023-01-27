import { View, Text } from 'react-native'

import { headerStyles } from "./Styles";


export default function ChangePasswordHeader() {
  return (
    <View style={headerStyles.container} >
      <Text style={[headerStyles.text, { fontFamily: "PoppinsRegular", fontSize: 18, }]} >Change Password</Text>
      <Text style={[headerStyles.text, { fontFamily: "PoppinsBold", fontSize: 24, }]} >Enter your Email</Text>
    </View>
  )
}