import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, ChatRoom, Settings, ChangePassword, } from '../screens';


const Stack = createNativeStackNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,        
      }} >
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='chat-room' component={ChatRoom} />
        <Stack.Screen name='settings' component={Settings} />
        <Stack.Screen name='change-password' component={ChangePassword} />
        {/*<Stack.Screen name='privacy-policy' component={PrivacyPolicy} />*/}
        {/*<Stack.Screen name='camera-screen' component={CameraScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

