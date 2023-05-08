import { useEffect, useState } from 'react';
import { View, Dimensions, ToastAndroid, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import Animated, { useSharedValue, useAnimatedStyle, FadeIn, runOnJS, withTiming, FadeOut, } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { Octicons } from '@expo/vector-icons';

import { verify } from '../../utils/api';
import { useUser } from '../../utils';

import { OnBoarding, Auth, Chat } from '../../containers';

import Styles from './Styles';
import { BannerAds } from '../../components';
import { StatusBar } from 'expo-status-bar';




type HomePropsType = {
  navigation: any;
};

const ToOffsetY = -0.37 * Dimensions.get('window').height
const ToScale = 0.4
const Delay = 1000
const Duration = 500

export default function Home({ navigation }: HomePropsType) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const offsetY = useSharedValue(0)
  const scale = useSharedValue(1)
  const animateLottieContainer = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }, { scale: scale.value }],
    }
  })

  // Handle user state changes
  function onAuthStateChanged(user:any) {
    setUser(user)
    if (initializing) {
      // setInitializing(false)
      offsetY.value = withTiming(ToOffsetY, { duration: Duration }, (finished) => {
        if (finished) {
          runOnJS(loadingFinish)()
        }
      })
      scale.value = withTiming(ToScale, {
        duration: Duration
      })
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  // check async-storage if user exists
  /*async function getLocalUser() {
    try {
      const localUser = await AsyncStorage.getItem('@user')
      if (localUser) {
        // verify token
        const token = JSON.parse(localUser)
        const response = await verify(token)
        if (Object.keys(response)[0] === 'success') {
          await AsyncStorage.setItem('@user', JSON.stringify(response.success))
          // set user with fresh token
          setUser(response.success!)
        } else {
          setUser(undefined)
          ToastAndroid.show(response.error, ToastAndroid.LONG)
        }
        // render chat modal
      } else {
        // render auth modal
        setUser(undefined)
      }
    } catch (error) {
      console.log("Root.getLocalUser: ", error)
    } finally {
      offsetY.value = withTiming(ToOffsetY, { duration: Duration }, (finished) => {
        if (finished) {
          runOnJS(loadingFinish)()
        }
      })
      scale.value = withTiming(ToScale, {
        duration: Duration
      })
    }
  }*/

  function loadingFinish() { setInitializing(false) }

  function emptyUser() {
    setUser(undefined)
  }

  function onPressSettings() {
    navigation.navigate('settings')
  }

  useEffect(() => {
    // getLocalUser()
    return () => {}
  }, [])

  return (
    <View style={[{ flex: 1, backgroundColor: "#FFF" },]} >
      <StatusBar backgroundColor='#FFF' animated translucent />
      <View style={[Styles.container,]} >
        {user && <Octicons onPress={onPressSettings} name="gear" size={24} color="black" style={{ position: 'absolute', top: 10, right: 20 }} />}
        <Animated.View style={[Styles.animationContainer, animateLottieContainer,]} >
          <LottieView
            source={require('../../animations/ai-animation.json')}
            autoPlay
            loop
          />
        </Animated.View>
        <View style={[Styles.wrapper]} >
          <ScrollView scrollEnabled style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1, flexGrow: 1 }} >
            {!initializing && (
              <>
                {user ?
                  <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} >
                    <Chat navigation={navigation} />
                  </Animated.View>
                  :
                  <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} >
                    <Auth />
                  </Animated.View>
                }
              </>
            )}
          </ScrollView>
        </View>
      </View>
      <BannerAds />
    </View>
  )
};

