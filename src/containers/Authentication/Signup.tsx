import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { SignupHeader, InputArea, PasswordInput } from '../../components';
import { GoogleLogo, FacebookLogo } from '../../svg';

import { register } from '../../utils/api';

// import AppStyles from '../../AppStyles';
import { signupStyles } from './Styles';
import AppStyles from '../../AppStyles';


type SignupPropsType = {
  // setUser: (token: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
};

type SignupType = {
  email: string;
  password: string;
};

export default function Signup({ loading, setLoading }: SignupPropsType) {
  const [signupLoading, setSignupLoading] = useState<boolean>(false)
  const [googleSignInLoading, setGoogleSignInLoading] = useState<boolean>(false)
  const [facebookSignInLoading, setFacebookSignInLoading] = useState<boolean>(false)
  const [signupInfo, setSignupInfo] = useState<SignupType>({ email: "", password: "" })

  async function signup() {
    setSignupLoading(true)
    setLoading(true)
    // const response = await register(signupInfo.email, signupInfo.password)
    /*if (Object.keys(response)[0] === 'success') {
      await AsyncStorage.setItem('@user', JSON.stringify(response.success))
      setUser(response.success!)
    } else {
      ToastAndroid.show(response.error, ToastAndroid.LONG)
    }*/
    auth().createUserWithEmailAndPassword(signupInfo.email, signupInfo.password)
    .then(({ user }) => {
      ToastAndroid.show('User account created & signed in!', ToastAndroid.SHORT)
      user.sendEmailVerification().then(() => {
        ToastAndroid.show("An verification email has been sent. Make sure to check SPAM folders.", ToastAndroid.LONG)
      }).catch((error) => {
        console.log("error: ", error)
      })
      setSignupLoading(false)
      setLoading(false)
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show('That email address is already in use!', ToastAndroid.LONG)
      }
      if (error.code === 'auth/invalid-email') {
        ToastAndroid.show('That email address is invalid!', ToastAndroid.LONG)
      }
      console.log(error)
      ToastAndroid.show("Something went wrong. Try Again later", ToastAndroid.LONG)
      setSignupLoading(false)
      setLoading(false)
    })
  }

  // Google signin
  async function googleSignIn() {
    setLoading(true)
    setSignupLoading(false)
    setFacebookSignInLoading(false)
    setGoogleSignInLoading(true)
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    const signIn = auth().signInWithCredential(googleCredential)
    signIn.then((user) => {
      // console.log("user form Google: ", user)
      setLoading(false)
      setSignupLoading(false)
      setFacebookSignInLoading(false)
      setGoogleSignInLoading(false)
    }).catch((error) => {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG)
      setLoading(false)
      setSignupLoading(false)
      setFacebookSignInLoading(false)
      setGoogleSignInLoading(false)
    }).finally(() => {
      setLoading(false)
      setSignupLoading(false)
      setFacebookSignInLoading(false)
      setGoogleSignInLoading(false)
    })
    setLoading(false)
    setSignupLoading(false)
    setFacebookSignInLoading(false)
    setGoogleSignInLoading(false)
  }
  /*async function facebookSignIn() {
    setLoading(true)
    setSignupLoading(false)
    setGoogleSignInLoading(false)
    setFacebookSignInLoading(true)
  }*/

  return (
    <View style={signupStyles.container} >
      <SignupHeader />
      <InputArea inputFor='email' text={signupInfo!} setText={setSignupInfo} />
      <View style={{ alignSelf: 'flex-start', marginBottom: 7, }} >
        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 12, color: '#a0a0a0' }} >You'll need to verify that you own this email account.</Text>
      </View>
      <PasswordInput inputFor='password' text={signupInfo!} setText={setSignupInfo} />
      {/*<View style={signupStyles.checkboxContainer} >
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={toggleCheck} color={AppStyles.GrayColor2} />
        <Text style={signupStyles.checkboxText} >
          By continuing you accept our
          <Text style={{ textDecorationLine: 'underline' }} > Privacy Policy </Text>
          and
          <Text style={{ textDecorationLine: 'underline' }} > Terms of use.</Text>
        </Text>
      </View>*/}
      <TouchableOpacity disabled={loading || signupLoading || googleSignInLoading || facebookSignInLoading} activeOpacity={0.95} onPress={signup} style={signupStyles.signupBtnContainer} >
        {!signupLoading ? <Text style={signupStyles.signuptext} >Signup</Text> : <ActivityIndicator color={'#FFF'} />}
      </TouchableOpacity>
      <View style={signupStyles.orContainer} >
        <View style={signupStyles.orVector} />
        <Text style={signupStyles.orText} >Or</Text>
        <View style={signupStyles.orVector} />
      </View>
      <View style={signupStyles.socialIconContainer} >
        <TouchableOpacity activeOpacity={0.7} disabled={loading || signupLoading || googleSignInLoading || facebookSignInLoading} onPress={googleSignIn} style={[signupStyles.socialButton, { marginBottom: 20 }]} >
          {googleSignInLoading ? <ActivityIndicator color={'#101010'} /> : (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <SvgXml xml={GoogleLogo} />
              <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14, marginLeft: 10 }} >Signin with Google</Text>
            </View>
          )}
        </TouchableOpacity>
        {/*<TouchableOpacity activeOpacity={0.7} disabled={loading || signupLoading || googleSignInLoading || facebookSignInLoading} style={[signupStyles.socialButton, { marginLeft: 20 }]} >
          <SvgXml xml={FacebookLogo} />
        </TouchableOpacity>*/}
      </View>
    </View>
  )
};

