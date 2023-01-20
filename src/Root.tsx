import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { TransformStyleTypes, useSharedValue, useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import { OnBoarding, Auth, } from './containers';


const ToOffsetY = -0.37 * Dimensions.get('window').height
const ToScale = 0.4
const Delay = 1000
const Duration = 500

export default function Root() {
  const offsetY = useSharedValue(0)
  const scale = useSharedValue(1)
  const animateLottieContainer = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }, { scale: scale.value }],
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      // setAnimate(true)
      offsetY.value = withTiming(ToOffsetY, {
        duration: Duration
      })
      scale.value = withTiming(ToScale, {
        duration: Duration
      })
    }, Delay)

    return () => {
      clearTimeout(timer)
    }
  }, [])
  

  return (
    <View style={styles.container} >
      <Animated.View style={[styles.animationContainer, animateLottieContainer,]} >
        <LottieView
          source={require('./animations/ai-animation.json')}
          autoPlay
          loop
        />
      </Animated.View>
      <View style={[styles.wrapper]} >
        <Animated.View style={{  }} >
          <Auth />
        </Animated.View>
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    width: '100%',
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
  },
});

