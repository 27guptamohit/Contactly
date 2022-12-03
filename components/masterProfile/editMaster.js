import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar, View, Button, Colors, Icon, Assets, Incubator, Picker } from "react-native-ui-lib";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIELDS, CONTACT_KEYS } from '../../utils/constants';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const { TextField } = Incubator;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const dropdown = require('../../assets/chevron.png');
const dropdownIcon = <Icon 
  source={dropdown} 
  style={{ 
    resizeMode: 'contain', 
    height: 20, 
    width: 20,
   }} 
  tintColor={Colors.$iconDefault}/>;

export default function EditMasterProfile({ route, navigation }) {
  const { currentMaster, initialRef, setHasMaster } = route.params
  const [image, setImage] = useState(currentMaster ? currentMaster['photo'] : null);
  const [firstName, setFirstName] = useState(currentMaster ? currentMaster['firstName'] : '');
  const [lastName, setLastName] = useState(currentMaster ? currentMaster['lastName'] : '');

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
      console.log(image);
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
    setTitleValue(value);
  }

  const inputValueHandler = (index, value) => {
    refInputs.current[index]['value'] = value;
    setValValue(value);
  }

  const navigate = () => {
    navigation.goBack();
  }

  async function saveMasterProfile() {
    const masterProfile = { 
      'photo': image, 
      'firstName': firstName, 
      'lastName': lastName
    };
    if (numInputs > 0) {
      for (let i = 0; i < numInputs; i++) {
        if (refInputs.current[i]['value'] !== "") {
          masterProfile[refInputs.current[i]['key']] = refInputs.current[i]['value'];
        }
      }
      console.log(masterProfile);
      try {
        await AsyncStorage.setItem('@master', JSON.stringify(masterProfile))
      } catch (e) {
        // saving error
      }
      if (setHasMaster !== null) {
        setHasMaster();
      } else {
        navigate();
      }
    }
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
            {FIELDS.map(option => (
              <Picker.Item 
                key={option.key} value={option.value} label={option.label} 
              />
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
              style={{ marginTop: 5, height: 30, width: 30 }}
              color={Colors.grey10}
              iconSource={require('../../assets/close.png')}
              iconStyle={{ resizeMode: 'contain', height: 25, width: 25 }}
              onPress={() => deleteHandler(i)} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container_main}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }} >
        <Avatar 
          source={image ? { uri: image } : require('../../assets/placeholder.png')} 
          size={120} 
          style={{ marginBottom: 10 }} />
        <Button label={image ? "Edit" : "Choose Image"}
          onPress={PickImage}
          backgroundColor={Colors.transparent}
          color={Colors.blue30}
          iconSource={Assets.icons.plusSmall} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: width, marginBottom: 10 }}>
          <TextField
            containerStyle={[styles.textContainer, { width: 0.3 * width }]}
            style={{ fontSize: 17 }}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            placeholder={'First'}
            autoCapitalize={'none'}
            />
          <TextField
            containerStyle={[styles.textContainer, { width: 0.45 * width }]}
            style={{ fontSize: 17 }}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholder={'Last'}
            autoCapitalize={'none'}
            />
        </View>
        <View style={{ maxHeight: 0.34 * height }} >
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
            saveMasterProfile();
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
    marginTop: 25,
    width: width,
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
  textContainer: {
    padding: 5,
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
  }
});