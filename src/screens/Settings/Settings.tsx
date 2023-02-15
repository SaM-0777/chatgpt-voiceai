import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

import Styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';


type SettingsPropsType = {
  route: any;
  navigation: any;
}

export default function Settings({ route, navigation }: SettingsPropsType) {
  const [loading, setLoading] = useState<boolean>(false)

  async function onLogout() {
    setLoading(true)
    auth()
    .signOut()
    .then(() => {
      console.log('User signed out!')
      navigation.navigate('home')
      // setLoading(false)
    }).catch((error) => {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG)
    })
  }

  function navigateToChangePassword() {
    if (!loading) navigation.navigate('change-password')
  }

  return (
    <View style={Styles.container} >
      <View style={Styles.wrapper} >
        <TouchableOpacity onPress={navigateToChangePassword} activeOpacity={0.85} style={Styles.btn} >
          <Octicons name="person" size={24} color="black" />
          <Text style={Styles.btnText} >Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={loading} onPress={onLogout} activeOpacity={0.85} style={[Styles.btn, { justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={Styles.btnText} >logout</Text>
          </View>
          {loading && <ActivityIndicator color='#101010' />}
        </TouchableOpacity>
      </View>
    </View>
  )
};

