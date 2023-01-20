import { View, Text } from 'react-native'

import { headerStyles } from './Styles'


export default function LoginHeader() {
  return (
    <View style={headerStyles.container} >
      <Text style={[headerStyles.text, { fontFamily: "PoppinsRegular", fontSize: 18, }]} >Hey there,</Text>
      <Text style={[headerStyles.text, { fontFamily: "PoppinsBold", fontSize: 24, }]} >Login to continue</Text>
    </View>
  )
};

