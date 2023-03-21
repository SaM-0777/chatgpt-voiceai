import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType, PermissionResponse } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';

import { CameraOverlay } from '../../svg';

import Styles from './Styles';
import TextRecognition from '@react-native-ml-kit/text-recognition';


export default function CameraScreen() {
  const navigation = useNavigation()
  const [image, setImage] = useState<string | null>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState<PermissionResponse | null>(null)
  const [hasImagePickerPermission, setHasImagePickerPermission] = useState(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [scannedText, setScannedText] = useState(null)

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
      //const imageText = await TextRecognition.recognize(result.assets[0].uri)
      //let text = ""
      //for (let block of imageText.blocks) {
      //  // console.log('Block text:', block.text)
      //  // text = text + block.text
      //  //console.log('Block frame:', block.frame)
        
      //  for (let line of block.lines) {
      //    text = text + line.text + " "
      //    // console.log('Line text:', line.text)
      //    // console.log('Line frame:', line.frame)
      //  }
      //}
      //console.log("Recognozed Text: ", text)
      //setMessage(text)
      // setImage(result.assets[0].uri)
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
    navigation.navigate("chat-room", {
      initialValue: text
    })
  }

  useEffect(() => {
    if (image !== null && typeof image === 'string') {
      (async () => getTextFromImage(image))()
    }

    return () => {}
  }, [image])
  
  return (
    <SafeAreaView style={Styles.container} >
      <StatusBar translucent backgroundColor='transparent' />
      {hasCameraPermission === null ?
        (<ActivityIndicator color={'#000'} />)
        :
        hasCameraPermission.granted === false ? (<Text style={{ color: '#000', fontSize: 20, fontFamily: "PoppinsRegular", }} >No access to camera</Text>)
        :
        <View style={Styles.container} >
          <Camera style={Styles.cameraContainer} type={cameraType} ref={cameraRef} ratio="4:3" >
            <View style={Styles.cameraOverlayContainer} >
              <CameraOverlay />
            </View>
            </Camera>
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
      }
    </SafeAreaView>
  )
};

