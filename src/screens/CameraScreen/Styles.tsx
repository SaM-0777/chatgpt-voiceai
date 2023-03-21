import { Dimensions, StyleSheet } from "react-native";

import AppStyles from "../../AppStyles";


export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  cameraContainer: {
    position: 'relative',
    flex: 1,
    width: Dimensions.get('window').width,
    //aspectRatio: 16/9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOverlayContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  controlsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    zIndex: 100,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  btn: {
    width: 64,
    height: 64,
    backgroundColor: AppStyles.GrayColor1,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: '#FFF',
    padding: 5,
  },
  btnCenter: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 9999,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FFF',
  },
});

