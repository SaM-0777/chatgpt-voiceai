import { View, Text } from 'react-native'

import { headerStyles } from './Styles'


export default function ForgotPasswordHeader() {
  return (
    <View style={headerStyles.container} >
      <Text style={[headerStyles.text, { fontFamily: "PoppinsRegular", fontSize: 18, }]} >Forgot Password</Text>
      <Text style={[headerStyles.text, { fontFamily: "PoppinsBold", fontSize: 24, }]} >Enter your Email</Text>
    </View>
  )
};

