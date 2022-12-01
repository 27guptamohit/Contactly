import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar, View, Button, Colors, Icon, Assets, Incubator, Picker } from "react-native-ui-lib";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIELDS } from '../../utils/constants';

const { TextField, WheelPicker } = Incubator;
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
  const { setHasMaster } = route.params
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  const [titleValue, setTitleValue] = useState(FIELDS[0]['value']);
  const [valValue, setValValue] = useState('');
  const [numInputs, setNumInputs] = useState(1);
  const refInputs = useRef([{key: titleValue, value: valValue}]);

  useEffect(() => {
    async function fetchData() {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted'){
        alert('Permission denied!')
      }
    }
    fetchData()
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
    refInputs.current.push({key: FIELDS[0]['value'], value: ''});
    setNumInputs(value => value + 1);
  }

  const deleteHandler = (index) => {
    refInputs.current.splice(index, 1)[0];
    setNumInputs(value => value - 1);
  }

  const inputTitleHandler = (index, value) => {
    refInputs.current[index]['key'] = value;
    setTitleValue(value);
    console.log(refInputs.current);
  }

  const inputValueHandler = (index, value) => {
    refInputs.current[index]['value'] = value;
    setValValue(value);
  }

  async function saveMasterProfile() {
    const masterProfile = {'Image': image, 'Name': name};
    if (numInputs > 0) {
      for (let i = 0; i < numInputs; i++) {
        if (refInputs.current[i]['key'] in masterProfile) {
          masterProfile[refInputs.current[i]['key']].push(refInputs.current[i]['value']);
        } else {
          masterProfile[refInputs.current[i]['key']] = [refInputs.current[i]['value']];
        }
      }
      console.log(JSON.stringify(masterProfile));
      try {
        await AsyncStorage.setItem('@master', JSON.stringify(masterProfile))
      } catch (e) {
        // saving error
      }
      if (setHasMaster !== null) {
        setHasMaster();
      }
    }
    // navigate();
  }

  var inputs = []

  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={styles.container_2}>
        <View style={{ flex: 1, flexDirection: 'row', width: '90%', justifyContent: 'center' }}>
          <Picker
            onChange={item => inputTitleHandler(i, item.value)}
            value={refInputs.current[i]['key']}
            style={{ fontSize: 20, }}
            containerStyle={[{ paddingTop: 4, borderBottomWidth: 1,
              borderColor: Colors.$outlineDisabledHeavy,
              height: 35, width: width * 0.3 }]}
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
          <TextField
            style={[styles.fields, { marginLeft: 10, marginRight: 5, width: width / 2 }]}
            onChangeText={(text) => inputValueHandler(i, text)}
            value={refInputs.current[i]['value']}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Button 
            backgroundColor={Colors.$backgroundPrimaryLight}
            style={{ height: 30, width: 30 }}
            color={Colors.grey10}
            iconSource={require('../../assets/close.png')}
            iconStyle={{ resizeMode: 'contain', height: 25, width: 25 }}
            onPress={() => deleteHandler(i)} />
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
        <TextField
          style={[styles.fields, { marginBottom: 20, width: 0.4 * width }]}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder={'Your Name'}
          autoCapitalize={'none'}
          textAlign={'center'}
          />
        <View style={{ maxHeight: 0.45 * height }} >
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
  fields: {
    fontSize: 20, 
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    height: 35,
    paddingBottom: 4,
    marginBottom: 4, 
    marginLeft: '2.5%', 
  }
});