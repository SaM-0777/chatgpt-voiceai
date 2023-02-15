import { StyleSheet } from 'react-native';

import AppStyles from '../../AppStyles';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    width: '100%',
    paddingTop: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: AppStyles.GrayColor1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btnText: {
    color: AppStyles.DarkColor,
    fontFamily: "PoppinsRegular",
    marginLeft: 20,
  },
})