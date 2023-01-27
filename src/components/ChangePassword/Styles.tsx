import { StyleSheet } from 'react-native';

import AppStyles from '../../AppStyles';


export const headerStyles =  StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    color: AppStyles.DarkColor,
    textAlign: 'center',
    // fontFamily: "PoppinsSemiBold",
  },
});


export const emailInputStyles =  StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: AppStyles.BorderColor,
    borderRadius: 10,
  },
  iconContainer: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
      
  },
  input: {
    width: '90%',
    // height: '100%',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
});

