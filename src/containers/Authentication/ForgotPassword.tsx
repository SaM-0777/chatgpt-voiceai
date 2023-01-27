import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';

import { ForgotPasswordHeader, ForgotPasswordEmailInput } from '../../components';

import { forgot } from '../../utils/api';

import { forgotPasswordStyles } from "./Styles";


type ForgotPasswordPropsType = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};

export default function ForgotPassword({ loading, setLoading }: ForgotPasswordPropsType) {
  const [email, setEmail] = useState<string>("")

  async function onPress() {
    setLoading(true)
    const response = await forgot(email)
    if (typeof response === 'string') {
      ToastAndroid.show(response, ToastAndroid.LONG)
    } else {
      ToastAndroid.show("Server connection failed", ToastAndroid.LONG)
    }
    setLoading(false)
  }

  return (
    <View style={forgotPasswordStyles.container} >
      <ForgotPasswordHeader />
      <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', }} >
        <ForgotPasswordEmailInput setText={setEmail} />
        <TouchableOpacity disabled={loading} activeOpacity={0.95} onPress={onPress} style={forgotPasswordStyles.btnContainer} >
          {!loading ? <Text style={forgotPasswordStyles.logintext} >Submit</Text> : <ActivityIndicator color={'#FFF'} />}
        </TouchableOpacity>
      </View>
    </View>
  )
};

