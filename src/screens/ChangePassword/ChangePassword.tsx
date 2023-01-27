import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { change } from '../../utils/api';

import { ChangePasswordHeader, ChangePasswordEmailInput } from '../../components';

import Styles from './Styles';


export default function ChangePassword() {
  const [loading, setLoading] = useState<boolean>(true)
  const [reqLoading, setReqLoading] = useState<boolean>(false)
  const [token, setToken] = useState<string>()
  const [email, setEmail] = useState<string>("")


  async function getUserToken() {
    setLoading(true)
    try {
      const userToken = await AsyncStorage.getItem('@user')
      if (userToken) {
        const storedToken = JSON.parse(userToken)
        setToken(storedToken)
      }
      setLoading(false)
    } catch (error) {
      ToastAndroid.show(error as string, ToastAndroid.SHORT)
      setLoading(false)
    }
  }

  // get user token
  useEffect(() => {
    getUserToken()
  }, [])

  async function onPress() {
    setReqLoading(true)
    if (token) {
      const response = await change(email, token)
      ToastAndroid.show(response, ToastAndroid.LONG)
    } else {
      ToastAndroid.show("Server connection failed", ToastAndroid.SHORT)
    }
    setReqLoading(false)
  }

  return (
    <SafeAreaView style={Styles.conatiner} >
      {loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, opacity: 0.4  }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 110, height: 50, backgroundColor: '#000', borderRadius: 10, }} >
            <ActivityIndicator color="white" />
            <Text style={{ fontFamily: "PoppinsRegular", marginLeft: 10, color: "#FFF", fontSize: 15, }} >Loading</Text>
          </View>
        </View>
        :
        <View style={Styles.wrapper} >
          <ChangePasswordHeader />
          <ChangePasswordEmailInput setText={setEmail} />
          <TouchableOpacity disabled={reqLoading} activeOpacity={0.95} onPress={onPress} style={Styles.btnContainer} >
            {!reqLoading ? <Text style={Styles.logintext} >Submit</Text> : <ActivityIndicator color={'#FFF'} />}
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  )
};

