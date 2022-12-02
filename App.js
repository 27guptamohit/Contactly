import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomePage from "./components/home";
import ProfilePage from './components/profile';
import CreateAndEditProfile from './components/createAndEditProfile';
import CreateMasterButton from "./components/masterProfile/createButton";
import EditMasterProfile from "./components/masterProfile/editMaster";
import MasterProfileHome from "./components/masterProfile/master";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="HomeScreen" 
        component={HomePage} 
        options={{ 
          title: 'Home'
        }} />
      <Drawer.Screen 
        name="MasterProfile" 
        component={MasterProfileHome}
        options={{
          title: 'Master Profile'
        }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [hasMaster, setHasMaster] = useState(false);

  const createdMaster = () => {
    setHasMaster(true);
  }

  useEffect(() => {
    async function checkMasterProfile() {
      try {
        const value = await AsyncStorage.getItem('@master');
        if (value !== null) {
          setHasMaster(true);
        }
      } catch (error) {
        setInitialRoute('CreateMaster');
        // Any needed logic for failure
      }
    }
    checkMasterProfile();
  }, []);

  return (
    <NavigationContainer>
      {hasMaster ? (
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
              headerShown: false
            }} />
          <Stack.Screen 
            name="EditMasterProfile" 
            component={EditMasterProfile}
            options={{
              title: 'Edit Master'
            }} />
          <Stack.Screen 
            name="Profile" 
            component={ProfilePage} />
          <Stack.Screen 
            name="EditProfile" 
            component={CreateAndEditProfile}
            options={{title: 'Edit Profile'}} />
          <Stack.Screen
            name="Create"
            component={CreateAndEditProfile}
            options={{title: 'Create Profile'}}/>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen 
            name="CreateMaster" 
            component={CreateMasterButton} 
            options={{title: 'Welcome!'}} />
          <Stack.Screen 
            name="EditMaster" 
            component={EditMasterProfile} 
            initialParams={{ currentMaster: null, initialRef: [{key: '', value: ''}], setHasMaster: createdMaster }}
            options={{title: 'Edit'}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
