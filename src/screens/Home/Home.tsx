import { useEffect, useState, createContext } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { useSharedValue, useAnimatedStyle, FadeIn, runOnJS, withTiming, FadeOut, } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { Octicons } from '@expo/vector-icons';

import { verify } from '../../utils/api';

import { OnBoarding, Auth, Chat } from '../../containers';

import Styles from './Styles';


type HomePropsType = {
  navigation: any;
}

const ToOffsetY = -0.37 * Dimensions.get('window').height
const ToScale = 0.4
const Delay = 1000
const Duration = 500


interface UserContextType {
  // user: string | object | undefined;
  setUser: (newValue: string | object | undefined) => void;
}
export const UserContext = createContext<UserContextType>({ setUser: () => {} })

export default function Home({ navigation }: HomePropsType) {
  const [user, setUser] = useState<string | object | undefined>()
  const [loading, setLoading] = useState(true)
  const offsetY = useSharedValue(0)
  const scale = useSharedValue(1)
  const animateLottieContainer = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }, { scale: scale.value }],
    }
  })

  // check async-storage if user exists
  async function getLocalUser() {
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
  }

  function loadingFinish() { setLoading(false) }

  function onPressSettings() { navigation.navigate('settings') }

  useEffect(() => {
    getLocalUser()
    return () => {}
  }, [])

  return (
    <View style={Styles.container} >
      <Animated.View style={[Styles.animationContainer, animateLottieContainer,]} >
        <LottieView
          source={require('../../animations/ai-animation.json')}
          autoPlay
          loop
        />
      </Animated.View>
      <View style={[Styles.wrapper]} >
        {!loading && (
          <>
            {user ?
              <>
                <Octicons onPress={onPressSettings} name="gear" size={24} color="black" style={{ position: 'absolute', top: -(Dimensions.get('window').height / 3.52), right: 25 }} />
                <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} >
                  <Chat navigation={navigation} />
                </Animated.View>
              </>
              :
              <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} >
                <Auth setUser={setUser} />
              </Animated.View>
            }
          </>
        )}
      </View>
    </View>
  )
};

