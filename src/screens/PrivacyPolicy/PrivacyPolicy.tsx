import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Styles from './Styles';
import AppStyles from '../../AppStyles';


export default function PrivacyPolicy({ navigation }: any): JSX.Element {
  function onPressGoback() { navigation.goBack() }

  return (
    <View style={Styles.container} >
      <View style={Styles.header} >
        <Ionicons name='chevron-back' color={'#000'} size={25} onPress={onPressGoback} />
        <Text style={Styles.headerText} >Privacy Policy</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} scrollEventThrottle={16} decelerationRate={"fast"} contentContainerStyle={{ flex: 1, paddingVertical: 10, }} >
        <Text style={[Styles.text, { fontFamily: AppStyles.PoppinsRegular, }]} >
          {`This privacy notice for RealmWave Software (`}
          <Text style={{ fontFamily: AppStyles.PoppinsSemiBold, }} >{`"Company," `}</Text>
          <Text style={{ fontFamily: AppStyles.PoppinsSemiBold, }} >{`"we," `}</Text>
          <Text style={{ fontFamily: AppStyles.PoppinsSemiBold, }} >{`"us," `}</Text>
          {`or `}
          <Text style={{ fontFamily: AppStyles.PoppinsSemiBold, }} >{`"our," `}</Text>
          {`), describes how and why we might collect, store, use, and/or share (`}
          <Text style={{ fontFamily: AppStyles.PoppinsSemiBold, }} >{`"process,"`}</Text>
          {`) your information when you use our services (`}
          <Text style={{ fontFamily: AppStyles.PoppinsSemiBold, }} >{`"Services,"`}</Text>
          {`), such as when you:
          Download and use our mobile application (Ask Ai), \t\t\t\t or any other application of ours that links to this\n\t\t\t\t privacy notice\n
          Engage with us in other related ways, including any sales, marketing, or events
          Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at arcademaster.gm@gmail.com.`}
        </Text>
      </ScrollView>
    </View>
  )
};

