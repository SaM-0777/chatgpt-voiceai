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

