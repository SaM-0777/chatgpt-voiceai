import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Octicons, MaterialIcons } from '@expo/vector-icons';

import Styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


type SettingsPropsType = {
  route: any;
  navigation: any;
}

export default function Settings({ route, navigation }: SettingsPropsType) {
  const { setUser } = route?.params

  async function onLogout() {
    try {
      await AsyncStorage.removeItem('@user')
      setUser(undefined)
      navigation.navigate('home')
    } catch (error) {
      console.log("Settings.Logout: ", error)
    }
  }

  function navigateToChangePassword() {
    navigation.navigate('change-password')
  }

  return (
    <View style={Styles.container} >
      <View style={Styles.wrapper} >
        <TouchableOpacity onPress={navigateToChangePassword} activeOpacity={0.85} style={Styles.btn} >
          <Octicons name="person" size={24} color="black" />
          <Text style={Styles.btnText} >Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} activeOpacity={0.85} style={Styles.btn} >
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={Styles.btnText} >logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}