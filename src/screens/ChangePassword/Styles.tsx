import { StyleSheet } from "react-native";

import AppStyles from "../../AppStyles";


export default StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  btnContainer: {
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginVertical: 30,
    backgroundColor: AppStyles.DarkColor,
  },
  logintext: {
    color: '#FFF',
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
});

