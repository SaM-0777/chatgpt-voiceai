import { StyleSheet } from 'react-native';

import AppStyles from '../../AppStyles';


export const authStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 15,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: 'center',
    marginVertical: 30,
  },
  text: {
    // color: AppStyles.SecondaryColor1
    fontFamily: "PoppinsBold",
  },
});

export const signupStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  signuptext: {
    color: '#FFF',
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  checkboxText: {
    width: '77%',
    color: AppStyles.GrayColor2,
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    marginLeft: 5,
  },
  signupBtnContainer: {
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: AppStyles.DarkColor,
  },
  orContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  orVector: {
    width: '44%',
    height: 1,
    backgroundColor: AppStyles.GrayColor3,
  },
  orText: {
    color: AppStyles.DarkColor,
    fontFamily: "PoppinsRegular",
    marginHorizontal: 10,
  },
  socialIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButton: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: AppStyles.GrayColor3
  },
  footerText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: 'center',
    marginVertical: 30,
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  logintext: {
    color: '#FFF',
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  checkboxText: {
    width: '77%',
    color: AppStyles.GrayColor2,
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    marginLeft: 5,
  },
  loginBtnContainer: {
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: AppStyles.DarkColor,
  },
  orContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  orVector: {
    width: '44%',
    height: 1,
    backgroundColor: AppStyles.GrayColor3,
  },
  orText: {
    color: AppStyles.DarkColor,
    fontFamily: "PoppinsRegular",
    marginHorizontal: 10,
  },
  socialIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButton: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: AppStyles.GrayColor3
  },
  footerText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: 'center',
    marginVertical: 30,
  },
});



