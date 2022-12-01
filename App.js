import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomePage from "./components/home";
import ProfilePage from './components/profile';
import EditProfilePage  from "./components/editProfile"
import CreateProfile from './components/createProfile';
import CreateMasterButton from "./components/2_Create_Master_Profile/1_create_master_profile_button";
import EditMasterProfile from "./components/2_Create_Master_Profile/2_edit_master_profile";
import MasterProfileHome from "./components/2_Create_Master_Profile/3_show_master_profile";

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
    async function removeValue() {
      try {
        await AsyncStorage.removeItem('@master')
      } catch(e) {
        // remove error
      }
    
      console.log('Done.')
    }
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
    async function clearAllData() {
      AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => alert('success'));
    } 
    // clearAllData();
    // removeValue();
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
            component={EditProfilePage} />
          <Stack.Screen
            name="Create"
            component={CreateProfile}/>
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
