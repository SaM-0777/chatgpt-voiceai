import { Dimensions, StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999,
  },
  mask: {
    position: 'absolute',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
    opacity: 0.4,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 999999,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    width: '90%',
    height: 400,
    borderRadius: 15,
    backgroundColor: '#FFF',
    zIndex: 9999999,
  },
});

