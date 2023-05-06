import { View, StyleSheet } from 'react-native';
import Navigation from './navigations';
import mobileAds from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';


export default function Root() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    mobileAds()
    .initialize()
    .then(adapterStatuses => {
      setIsInitialized(true)
      // Initialization complete!
    }).catch(() => setIsInitialized(true))
  
    return () => { }
  }, [])
  

  return (
    <View style={styles.container} >
      {isInitialized && <Navigation />}
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*alignItems: 'center',
    justifyContent: 'center',*/
  },
  /*animationContainer: {
    width: '80%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    // flex: 0.7,
    position: 'absolute',
    // top: -ToOffsetY / 1.25,
    top: '30%',
    // left: '50%',
    width: Dimensions.get('window').width,
    // height: 0.5 * Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    // backgroundColor: 'green',
  },*/
});

