import React from 'react';
import { View, Text } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1333780334100105/8457076840';

export default function BannerAds() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={() => <View />}
    />
  )
}

