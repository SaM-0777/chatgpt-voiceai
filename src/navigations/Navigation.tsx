import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PortalHost } from '@gorhom/portal';

import { Home, ChatRoom, Settings, ChangePassword } from '../screens';


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
      </Stack.Navigator>
      <PortalHost name='microphone-modal' />
    </NavigationContainer>
  )
};

