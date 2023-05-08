import "expo-dev-client";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import Root from './src';

import store from "./src/store";
import { useEffect, useState } from "react";


export default function App() {
  const [fontsLoaded] = useFonts({
    "PoppinsLight": require("./assets/fonts/Poppins-Light.ttf"),
    "PoppinsRegular": require("./assets/fonts/Poppins-Regular.ttf"),
    "PoppinsSemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "PoppinsBold": require("./assets/fonts/Poppins-Bold.ttf"),
    "PoppinsExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
  })
  
  useEffect(() => {
    mobileAds()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,

      // An array of test device IDs to allow.
      testDeviceIdentifiers: ['EMULATOR'],
    })
    .then(() => {
      // Request config successfully set!
    });
  }, [])

  

  if (!fontsLoaded) return null

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <StatusBar style="auto" />
        <Root />
      </PaperProvider>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});

