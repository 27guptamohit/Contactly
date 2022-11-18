import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { Avatar, View, Button, Colors, Assets, Incubator } from "react-native-ui-lib";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { TextField } = Incubator;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function CreateProfile({ route, navigation }) {
  const { forceUpdate } = route.params;
  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');

  const [titleValue, setTitleValue] = useState('');
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

  // const PickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [1,1],
  //     quality: 1
  //   })

  //   if (!result.cancelled){
  //     setImage(result.uri)
  //   }
  // }

  const addHandler = () => {
    refInputs.current.push([{key: '', value: ''}]);
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

  async function saveProfile() {
    console.log(title, icon);
    const currProfile = {'title': title, 'icon': icon};
    for (let i = 0; i < numInputs; i++) {
      currProfile[refInputs.current[i]['key']] = refInputs.current[i]['value'];
    }
    console.log(currProfile);
    let key = '@profile';
    if (title !== null) {
      key = '@' + title.toLowerCase().replace(/\s/g, '');
    }
    console.log(key);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(currProfile))
      console.log('Done');
    } catch (e) {
      console.log(e);
      // saving error
    }
    forceUpdate();
    navigate();
  }

  var inputs = []

  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={styles.container_2}>
        <View style={{ flex: 1, flexDirection: 'row', width: '90%', justifyContent: 'center' }}>
          <TextField
            style={[styles.fields, { width: width / 4 }]}
            onChangeText={(text) => inputTitleHandler(i, text)}
            value={refInputs.current[i]['key']}
            placeholder={'Title'}
            autoCapitalize={'none'}
          />
          <TextField
            style={[styles.fields, { marginHorizontal: 10, width: width / 2 }]}
            onChangeText={(text) => inputValueHandler(i, text)}
            value={refInputs.current[i]['value']}
            placeholder={'Value'}
            autoCapitalize={'none'}
          />
          <Button 
            size={'small'}
            borderRadius={15}
            backgroundColor={Colors.transparent}
            color={Colors.grey10}
            iconSource={require('../assets/close.png')}
            iconStyle={{ resizeMode: 'contain', height: 25, width: 25 }}
            onPress={() => deleteHandler(i)} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container_main}>
      <View style={{ flexDirection: 'row' }}>
        <TextField 
          onChangeText={(value) => setIcon(value)}
          defaultValue={icon}
          textAlign={"center"}
          placeholder={'❔'}
          style={[styles.textinput, { marginRight: 5 }]}>
        </TextField>
        <TextField
          style={[styles.textinput, { minWidth: width-250 }]}
          onChangeText={(value) => setTitle(value)}
          defaultValue={title}
          placeholder={'Profile Name'}
          textAlign={"center"}
        />
      </View> 
      <View style={{ alignItems: 'center', justifyContent: 'center' }} >
        {/* <Avatar 
          source={image ? { uri: image } : require('../../assets/placeholder.png')} 
          size={120} 
          style={{ marginBottom: 10 }} />
        <Button label="Choose Profile Image"
          onPress={PickImage}
          backgroundColor={Colors.transparent}
          color={Colors.blue30}
          iconSource={Assets.icons.plusSmall} />
        <TextField
          style={[styles.fields, { width: 0.4 * width }]}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder={'Your Name'}
          autoCapitalize={'none'}
          textAlign={'center'}
          /> */}
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
    marginTop: 30,
    width: width
  },
  container_1: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: width
  },
  container_2: {
    marginVertical: 10,
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
    marginBottom: 6, 
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey40,
    marginLeft: '2.5%', 
    width: '90%',
  },
  inputsContainer: {
    flex: 1, 
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
  textinput: {
    fontSize: 35,
    marginVertical: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey40
  }
});