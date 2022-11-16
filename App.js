import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from "./components/home";
import ProfilePage from './components/profile';
import EditProfilePage  from "./components/creatFilePage"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="EditProfile" component={EditProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
