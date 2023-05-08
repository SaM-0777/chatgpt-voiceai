import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import auth, { firebase } from '@react-native-firebase/auth';
import { BannerAd, BannerAdSize, BannerAdProps, TestIds } from 'react-native-google-mobile-ads';

import Styles from './Styles';
import { ActivityIndicator } from 'react-native-paper';


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

type SettingsPropsType = {
  route: any;
  navigation: any;
}

export default function Settings({ route, navigation }: SettingsPropsType) {
  const [loading, setLoading] = useState<boolean>(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState<boolean>(false)

  async function onLogout() {
    setLoading(true)
    auth()
    .signOut()
    .then(() => {
      // console.log('User signed out!')
      navigation.navigate('home')
      // setLoading(false)
    }).catch((error) => {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG)
    })
  }

  async function onPressChangePassword() {
    // if (!loading) navigation.navigate('change-password')
    setChangePasswordLoading(true)
    auth().sendPasswordResetEmail(auth().currentUser?.email!).then(() => {
      ToastAndroid.show("An email has been sent with instructions to change Password. Make sure to Check SPAM folder", ToastAndroid.LONG)
      auth()
      .signOut()
      .then(() => {
        // console.log('User signed out!')
        navigation.navigate('home')
        // setLoading(false)
      })
      setChangePasswordLoading(false)
    }).catch((error) => {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT)
      setChangePasswordLoading(false)
    })
  }

  function onPressPrivacyPolicy() { navigation.navigate('privacy-policy') }

  return (
    <View style={Styles.container} >
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={() => <View></View>}
        
      />
      <View style={Styles.wrapper} >
        <TouchableOpacity disabled={loading || changePasswordLoading} onPress={onPressChangePassword} activeOpacity={0.85} style={[Styles.btn, { justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
            <Octicons name="person" size={24} color="black" />
            <Text style={Styles.btnText} >Change Password</Text>
          </View>
          {changePasswordLoading && <ActivityIndicator color='#101010' />}
        </TouchableOpacity>
        <TouchableOpacity disabled={loading || changePasswordLoading} onPress={onLogout} activeOpacity={0.85} style={[Styles.btn, { justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={Styles.btnText} >logout</Text>
          </View>
          {loading && <ActivityIndicator color='#101010' />}
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={onPressPrivacyPolicy} activeOpacity={0.85} style={[Styles.btn, { justifyContent: 'space-between' }]} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
            <MaterialIcons name="privacy-tip" size={24} color="black" />
            <Text style={Styles.btnText} >Privacy Policy</Text>
          </View>
          </TouchableOpacity>*/}
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={() => <View></View>}
        
      />
    </View>
  )
};

