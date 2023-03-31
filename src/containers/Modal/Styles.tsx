import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center',
    zIndex: 9,
  },
  mask: {
    position: 'absolute', zIndex: 99, backgroundColor: '#000', opacity: 0.3, top: 0, left: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height,
  },
  wrapper: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.75 * 0.75,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    zIndex: 999,
  },
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  textBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: '#6f6f6f',
    textAlign: 'center',
  },
  btnWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontFamily: 'PoppinsBold',
  },
});

