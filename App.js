import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Camara from './screens/Camara';
import Audio from './screens/Audio';
import Movil from './screens/Movil';
import Welcome from './screens/welcome';
import Contactos from './screens/Contactos';
import Auth from './screens/autentica-local'

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome}  />
            <Stack.Screen name="Audio" component={Audio} />
            <Stack.Screen name="Camara" component={Camara} />
            <Stack.Screen name="Movil" component={Movil} />
            <Stack.Screen name="Contactos" component={Contactos} />
            <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
