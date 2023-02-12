import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import Root from './src';


export default function App() {
  const [fontsLoaded] = useFonts({
    "PoppinsLight": require("./assets/fonts/Poppins-Light.ttf"),
    "PoppinsRegular": require("./assets/fonts/Poppins-Regular.ttf"),
    "PoppinsSemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "PoppinsBold": require("./assets/fonts/Poppins-Bold.ttf"),
    "PoppinsExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
  })

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

