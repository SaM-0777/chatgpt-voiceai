import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Octicons, MaterialIcons } from '@expo/vector-icons';

import Styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


type SettingsPropsType = {
  navigation: any;
}

export default function Settings({ navigation }: SettingsPropsType) {

  async function onLogout() {
    try {
      await AsyncStorage.removeItem('@user')
      navigation.navigate('home')
    } catch (error) {
      console.log("Settings.Logout: ", error)
    }
  }

  return (
    <View style={Styles.container} >
      <View style={Styles.wrapper} >
        <TouchableOpacity activeOpacity={0.85} style={Styles.btn} >
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