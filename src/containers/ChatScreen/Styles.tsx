import { StyleSheet } from "react-native";

import AppStyles from "../../AppStyles";


export const messageStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: "80%",
    margin: 5,
  },
  messageContainer: {
    padding: 10,

  },
  image: {
    width: 35,
    height: 35,
    marginRight: 5,
    borderRadius: 1000,
  },
  text: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    // fontFamily: "RobotoBlack",
  },
  time: {
    marginTop: 10,
    alignSelf: "flex-end",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#000',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    marginLeft: 10,
  },
});

