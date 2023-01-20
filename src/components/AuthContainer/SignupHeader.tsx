import { View, Text } from 'react-native'

import { headerStyles } from './Styles'


export default function SignupHeader() {
  return (
    <View style={headerStyles.container} >
      <Text style={[headerStyles.text, { fontFamily: "PoppinsRegular", fontSize: 18, }]} >Welcome</Text>
      <Text style={[headerStyles.text, { fontFamily: "PoppinsBold", fontSize: 24, }]} >Create an Account</Text>
    </View>
  )
};

