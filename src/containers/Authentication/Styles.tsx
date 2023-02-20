import { StyleSheet, Dimensions } from 'react-native';

import AppStyles from '../../AppStyles';


export const authStyles = StyleSheet.create({
  container: {
    width: '100%',
    // height: Dimensions.get('window').height,
    flex: 1,
    paddingHorizontal: 15,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: 'center',
    marginVertical: 10,
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
    marginVertical: 15,
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
    width: 220,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 7,
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
    height: '100%',
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
    backgroundColor: '#101010'
  },
  orContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
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
    width: 220,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: AppStyles.GrayColor3
  },
  footerText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: 'center',
    marginVertical: 30,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
  },
  forgotText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});


export const forgotPasswordStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
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

