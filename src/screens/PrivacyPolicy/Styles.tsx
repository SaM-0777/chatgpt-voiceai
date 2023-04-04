import { StyleSheet } from "react-native";

import AppStyles from "../../AppStyles";


export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: AppStyles.PoppinsSemiBold,
    fontSize: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    //textAlign: 'justify',
  },
});

