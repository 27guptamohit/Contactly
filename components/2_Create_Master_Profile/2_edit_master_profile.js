import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect } from "react";
import {StyleSheet, Text, View, Image, Button, Platform, TouchableOpacity, TextInput, ScrollView} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Constants from "expo-constants";


export default function EditMasterProfile() {
  const [image, setImage] = useState(null)
  const [inputs, setInputs] = useState([{key: '', value: ''}]);


  useEffect( () => {

    async function fetchData() {
      if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted'){
        alert('Permission denied!')
      }
      }
    }
    fetchData()
  }, [])

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    })
    console.log(result)

    if (!result.cancelled){
      setImage(result.uri)
    }
  }


  const addHandler = ()=>{
    const _inputs = [...inputs];
    _inputs.push({key: '', value: ''});
    setInputs(_inputs);
  }

  const deleteHandler = (key)=>{
    const _inputs = inputs.filter((input,index) => index != key);
    setInputs(_inputs);
  }

  const inputTitleHandler = (text, key)=>{
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key   = key;
    setInputs(_inputs);

  }

  const inputValueHandler = (text, key)=>{
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key   = key;
    setInputs(_inputs);

  }

  return (

      <View style={styles.container_main}>

        <ScrollView style={styles.inputsContainer}>
        <View style={styles.container_1}>
          {image && <Image source={{uri:image}} style={{width:100, height: 100, marginBottom:10}}/>}
            <Button title="Choose Profile Image"
                onPress={PickImage} />
        </View>

        <View style={styles.container_1}>

          {inputs.map((input,key) => (
              <View style={styles.container_2}>

            <View style={styles.container_3}>
              <TextInput
                  style={styles.inputStyle}
                  onChangeText={(text)=>inputTitleHandler(text,key)}
                  placeholder={'Title'}
              />
            </View>

            <View style={styles.container_3}>
              <TextInput
                  style={styles.inputStyle}
                  onChangeText={(text)=>inputValueHandler(text,key)}
                  placeholder={'Value'}
              />
            </View>

            <View style={styles.container_3}>
              <TouchableOpacity style={styles.addButtonStyle}
                  onPress={()=> deleteHandler(key)}>
                <Text style={styles.addButtonText}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          ))}

        </View>

        <View style={styles.container_1}>
          <TouchableOpacity style={styles.addButtonStyle}
          onPress={addHandler}>
            <Text style={styles.addButtonText}>
              Add Fields
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container_1}>
          <Button title="Save"/>
        </View>

        </ScrollView>

      </View>
  )
}

const styles = StyleSheet.create({

  container_main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container_1: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  container_2: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection:"row"
  },

  container_3: {
    marginLeft: 10,
    marginRight: 10,
    width: '25%',
  },

  addButtonStyle: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#c55858"
  },

  addButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },

  inputStyle: {
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    fontSize: 16,
    backgroundColor: '#f3f3f3'

  },

  inputsContainer: {
    flex: 1, marginBottom: 20
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  }



});