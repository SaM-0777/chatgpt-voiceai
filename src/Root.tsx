import { View, StyleSheet } from 'react-native';

import Navigation from './navigations';


export default function Root() {

  return (
    <View style={styles.container} >
      <Navigation />
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

