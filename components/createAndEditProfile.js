import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar, View, Button, Icon, Colors, Assets, Incubator, Picker } from "react-native-ui-lib";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONTACT_KEYS } from "../utils/constants";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const { TextField } = Incubator;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const dropdown = require('../assets/chevron.png');
const dropdownIcon = <Icon 
  source={dropdown} 
  style={{ 
    resizeMode: 'contain', 
    height: 20, 
    width: 20,
   }} 
  tintColor={Colors.$iconDefault}/>;

export default function CreateAndEditProfile({ route, navigation }) {
  const { forceUpdate, master, autofill, initialRef, currentProfile, changeProfile } = route.params;
  const [image, setImage] = useState(currentProfile ? currentProfile['photo'] : master['photo']);
  const [firstName, setFirstName] = useState(currentProfile ? currentProfile['firstName'] : master['firstName']);
  const [lastName, setLastName] = useState(currentProfile ? currentProfile['lastName'] : master['lastName']);
  const [icon, setIcon] = useState(currentProfile ? currentProfile['icon'] : '');
  const [title, setTitle] = useState(currentProfile ? currentProfile['profileName'] : '');
  
  const [titleValue, setTitleValue] = useState('');
  const [valValue, setValValue] = useState('');
  const [numInputs, setNumInputs] = useState(initialRef.length);
  const refInputs = useRef(initialRef);

  useEffect(() => {
    async function fetchData() {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted'){
        alert('Permission denied!')
      }
    }
    fetchData();
  }, [])

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.cancelled){
      setImage(result.uri)
    }
  }

  const addHandler = () => {
    refInputs.current.push({key: '', value: ''});
    setNumInputs(value => value + 1);
  }

  const deleteHandler = (index) => {
    refInputs.current.splice(index, 1)[0];
    setNumInputs(value => value - 1);
  }

  const inputTitleHandler = (index, value) => {
    refInputs.current[index]['key'] = value;
    refInputs.current[index]['value'] = master[value];
    setTitleValue(value);
    setValValue(master[value]);
  }

  const inputValueHandler = (index, value) => {
    refInputs.current[index]['value'] = value;
    setValValue(value);
  }

  const navigate = () => {
    navigation.goBack();
  }

  async function saveProfile() {
    const currProfile = { 
      'profileName': title, 
      'icon': icon, 
      'photo': image, 
      'firstName': firstName, 
      'lastName': lastName
    };
    for (let i = 0; i < numInputs; i++) {
      currProfile[refInputs.current[i]['key']] = refInputs.current[i]['value'];
    }
    let key = '@profile';
    if (title !== null) {
      key = '@' + title.toLowerCase().replace(/\s/g, '');
    }
    try {
      await AsyncStorage.setItem(key, JSON.stringify(currProfile))
    } catch (e) {
      // saving error
    }
    if (changeProfile) {
      changeProfile(currProfile);
    }
    forceUpdate();
    navigate();
  }

  var inputs = []

  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={styles.container_2}>
        <View style={{ width: '90%', justifyContent: 'center', marginHorizontal: 20 }}>
          <Picker
            onChange={item => inputTitleHandler(i, item.value)}
            placeholder={CONTACT_KEYS[refInputs.current[i]['key']]}
            placeholderTextColor={Colors.$textDefault}
            style={{ fontSize: 15, }}
            containerStyle={styles.pickerContainer}
            trailingAccessory={dropdownIcon}
            migrateTextField
            useSafeArea
          >
            {autofill.map(option => (
              <Picker.Item key={option.key} value={option.value} label={option.label}/>
            ))}
          </Picker>
          <View style={styles.row}>
            <TextField
              containerStyle={[styles.textContainer, { width: width * 0.82 }]}
              style={{ fontSize: 17 }}
              onChangeText={(text) => inputValueHandler(i, text)}
              value={refInputs.current[i]['value']}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            <Button 
              backgroundColor={Colors.transparent}
              style={{ height: 30, width: 30, marginTop: 7 }}
              color={Colors.grey10}
              iconSource={require('../assets/close.png')}
              iconStyle={{ resizeMode: 'contain', height: 25, width: 25 }}
              onPress={() => deleteHandler(i)} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container_main}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextField 
          onChangeText={(value) => setIcon(value)}
          defaultValue={icon}
          textAlign={"center"}
          placeholder={'❔'}
          containerStyle={[styles.textContainer, { marginRight: 5 }]}
          style={{ fontSize: 25 }}>
        </TextField>
        <TextField
          containerStyle={[styles.textContainer, { minWidth: width-175 }]}
          style={{ fontSize: 25 }}
          onChangeText={(value) => setTitle(value)}
          defaultValue={title}
          placeholder={'Profile Name'}
          textAlign={"center"}
        />
      </View> 
      <View style={{ alignItems: 'center', justifyContent: 'center' }} >
        <Avatar 
          source={image ? { uri: image } : require('../assets/placeholder.png')} 
          size={100} 
          style={{ marginBottom: 10 }} />
        <Button label={image ? "Edit" : "Choose Image"}
          onPress={PickImage}
          backgroundColor={Colors.transparent}
          color={Colors.blue30}
          iconSource={Assets.icons.plusSmall} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: width, marginBottom: 20 }}>
          <TextField
            containerStyle={[styles.textContainer, { marginRight: 5, width: 0.3 * width }]}
            style={{ fontSize: 17 }}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            placeholder={'First'}
            autoCapitalize={'none'}
            />
          <TextField
            containerStyle={[styles.textContainer, { width: 0.45 * width  }]}
            style={{ fontSize: 17 }}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholder={'Last'}
            autoCapitalize={'none'}
            />
        </View>
        <View style={{ maxHeight: 0.35 * height }} >
          <ScrollView>{inputs}</ScrollView>
        </View>
      </View>
      <View style={[styles.container_1, { flex: 1, alignItems: 'center', justifyContent: 'flex-end' }]}>
        <Button 
          size={'large'}
          borderRadius={10}
          backgroundColor={Colors.transparent}
          color={Colors.blue30}
          iconSource={Assets.icons.plusSmall}
          style={{ marginBottom: 20 }}
          label={'Add Field'}
          onPress={addHandler} />
        <Button 
          size={'large'}
          borderRadius={10}
          backgroundColor={Colors.grey10}
          iconSource={Assets.icons.plusSmall}
          label={'Save'}
          style={{ marginBottom: 35}}
          onPress={() => {
            saveProfile();
          }} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container_main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    width: width
  },
  container_1: {
    alignItems: "center",
    justifyContent: "center",
    width: width
  },
  container_2: {
    flexDirection:"row",
    width: width
  },
  container_3: {
    marginLeft: 10,
    marginRight: 10,
    width: '25%',
  },
  row: { 
    flex: 1, 
    flexDirection: 'row', 
    width: width, 
    marginBottom: 5, 
    justifyContent: 'flex-start' 
  },
  fields: {
    fontSize: 20, 
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    paddingBottom: 4,
  },
  textContainer: {
    padding: 7,
    backgroundColor: Colors.grey70,
    borderRadius: 5,
    marginVertical: 5, 
    marginRight: 7,
  },
  pickerContainer: { 
    padding: 2,
    height: 25, 
    width: width * 0.3,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.$textDisabled
  },
});