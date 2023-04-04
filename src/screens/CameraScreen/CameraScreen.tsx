import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image, ToastAndroid, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType, PermissionResponse } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { Modal } from '../../containers';
import { CameraOverlay } from '../../svg';

import Styles from './Styles';


type CameraScreenPropsType = {
  setMessage: (text: string) => void;
  closeImageScreen: () => void;
};

export default function CameraScreen({ setMessage, closeImageScreen }: CameraScreenPropsType) {
  const navigation = useNavigation()
  const [image, setImage] = useState<string>("")
  const [hasCameraPermission, setHasCameraPermission] = useState<PermissionResponse | null>(null)
  const [hasImagePickerPermission, setHasImagePickerPermission] = useState(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [scannedText, setScannedText] = useState(null)
  const [isModalShownAlready, setIsModalShownAlready] = useState<boolean>()

  async function checkIsModalShown() {
    try {
      const response = await AsyncStorage.getItem("@isModalShown")
      //console.log("response: ", response)
      if (response !== null) {
        // value previously stored
        const jsonValue = JSON.parse(response)
        //console.log("jsonValue: ", jsonValue)
        
        setIsModalShownAlready(jsonValue)
      } else {
        setIsModalShownAlready(false)
      }
    } catch (error) {
      
    }
  }
  async function storeIsModalShown() {
    try {
      await AsyncStorage.setItem("@isModalShown", JSON.stringify(true))
      setIsModalShownAlready(true)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    (async () => await checkIsModalShown())()

    return () => {}
  }, [])

  useEffect(() => {
    function backAction() {
      closeImageScreen()
      return true
    }

    const handleBack = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => handleBack.remove()
  }, [])

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.getCameraPermissionsAsync()
      if (cameraStatus.granted === false) {
        await Camera.requestCameraPermissionsAsync()
      }
      setHasCameraPermission(cameraStatus)
    })()
  }, [])

  const cameraRef = useRef(null)
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: true, allowsEditing: true }
      const data = await cameraRef.current.takePictureAsync(options)
      setImage(data.uri)
      // console.log("ImageN: ", image)
      await getTextFromImage(data.uri)
    }
  }

  async function handlePickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {      
      setImage(result.assets[0].uri)
      const imageText = await TextRecognition.recognize(result.assets[0].uri)
      let text = ""
      for (let block of imageText.blocks) {
        // console.log('Block text:', block.text)
        // text = text + block.text
        //console.log('Block frame:', block.frame)
        
        for (let line of block.lines) {
          text = text + line.text + " "
          // console.log('Line text:', line.text)
          // console.log('Line frame:', line.frame)
        }
      }
      setMessage(text)
      console.log("Recognozed Text: ", text)
      // setMessage(text)
      closeImageScreen()
      setImage(result.assets[0].uri)
    }
  }

  async function getTextFromImage(image: string) {
    const imageText = await TextRecognition.recognize(image)
    let text = ""
    for (let block of imageText.blocks) {
      // console.log('Block text:', block.text)
      // text = text + block.text
      //console.log('Block frame:', block.frame)
      
      for (let line of block.lines) {
        text = text + line.text + " "
        // console.log('Line text:', line.text)
        // console.log('Line frame:', line.frame)
      }
    }
    //console.log("Recognozed Text: ", text)
    setMessage(text)
    closeImageScreen()
  }

  //useEffect(() => {
  //  if (image !== null && typeof image === 'string') {
  //    (async () => getTextFromImage(image))()
  //  }

  //  return () => {}
  //}, [image])
  
  return (
    <SafeAreaView style={Styles.container} >
      <StatusBar style='light' translucent backgroundColor='#000' />
      {isModalShownAlready === false ? <Modal onPressOk={storeIsModalShown} />
        :
        <>
          {hasCameraPermission === null ?
            (<ActivityIndicator color={'#FFF'} />)
            :
            hasCameraPermission.granted === false ? (<Text style={{ color: '#FFF', fontSize: 20, fontFamily: "PoppinsRegular", }} >No access to camera</Text>)
            :
            <>
              {(isModalShownAlready === true) && (
                <View style={Styles.container} >
                  <View style={{ width: Dimensions.get('window').width, alignItems: 'flex-start', paddingHorizontal: 20, paddingVertical: 20, }}  >
                    {/*<AntDesign name="arrowleft" size={30} color="white" onPress={closeImageScreen} />*/}
                    <Ionicons name='chevron-back' color={'#FFF'} size={25} onPress={closeImageScreen} />
                  </View>  
                  <Camera ref={cameraRef} style={Styles.cameraContainer} type={CameraType.back} ratio={'4:3'} autoFocus useCamera2Api >
                    <View style={Styles.cameraOverlayContainer} >
                      <CameraOverlay />
                    </View>
                  </Camera>
                  <View style={{ flex: 0.2, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center' }} >
                    <View style={Styles.controlsContainer} >
                      <TouchableOpacity activeOpacity={0.9} onPress={handlePickImage} style={[Styles.imageContainer, { backgroundColor: '#000' }]} >
                        <Ionicons name="images" size={36} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.9} style={Styles.btn} onPress={takePicture} >
                        <View style={Styles.btnCenter} />
                      </TouchableOpacity>
                      <View style={[Styles.imageContainer, { backgroundColor: 'transparent' }]} />
                    </View>
                  </View>
                </View>
              )}
            </>
          }
        </>
      }
    </SafeAreaView>
  )
};

