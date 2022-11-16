import React, {Component, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Dimensions, 
         ScrollView, ScrollViewBase } from "react-native";
import { View, Button, GridList, Colors, Spacings, Icon,
         Text, Assets, Image } from 'react-native-ui-lib';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var profileData = [];
function getProfileAttributes(profile) {
  profileData = [];
  for (let key in profile) {
    if (key != "title" && (key != "icon") & (key != "Name")) {
      profileData.push({
        caption: key,
        value: profile[key]
      })
    }
  }
}

export default function EditProfilePage({ route, navigation }) {
  const { itemId, profile } = route.params;
  getProfileAttributes(profile)
  var customData = profile
  // console.log(customData)
  // const [selectedValue, setSelectedValue] = useState("");
  const [bodyText , setBodyText ] = useState("");
  const [text, onChangeText] = useState("");
  const [nameText, onChangenameText] = useState("");

  const changeProfileValue = (value, field) =>{
    setBodyText(value)
    customData[field] = value
  }

  const updateProfile = (itemId, profile) => {
    console.log("Update Profile")
    // let data=customData
    // writeJsonFile('./test.json', data)
    console.log("Finish Update Profile")
    navigation.navigate('Profile', {
      itemId: itemId,
      profile: profile
    })
  }

  const [fieldsname, setFieldsname] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fieldsname];
    // console.log(values)
    values[i].value = event;
    setFieldsname(values);
  }

  const [fieldsvalue, setFieldsvalue] = useState([{ value: null }]);

  function handleChangeValue(i, event) {
    const values = [...fieldsvalue];
    // console.log(values)
    values[i].value = event;
    setFieldsvalue(values);
  }


  function handleAdd() {
    const names = [...fieldsname];
    names.push({ value: null });
    setFieldsname(names);

    const values = [...fieldsvalue];
    values.push({ value: null });
    setFieldsvalue(values);
  }

  function handleRemove(i) {
    const names = [...fieldsname];
    names.splice(i, 1);
    setFieldsname(names);

    const values = [...fieldsvalue];
    values.splice(i, 1);
    setFieldsvalue(values);
  }



  return (
    <View style={styles.container}>
      <View style={styles.profileName}>
        <Text style={{ fontSize: 40, marginVertical: 25, paddingRight: 20 }}>
          {profile.icon}
        </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={onChangeText}
          defaultValue={profile.title}
          textAlign={"center"}
          backgroundColor={Colors.grey50}
        />
      </View>
      <Image
        source={require("../assets/placeholder.png")}
        style={{
          borderRadius: height / 20,
          resizeMode: "contain",
          height: height / 10,
          aspectRatio: 1,
        }}
      />
      <TextInput 
        style={{ fontSize: 18, marginVertical: 5 }}
        onChangeText={onChangenameText}
        defaultValue={profile.Name}
        backgroundColor={Colors.grey50}
      />
      <GridList styles={styles.grid}
        data={profileData}
        containerWidth={width}
        numColumns={1}
        itemSpacing={Spacings.s1}
        listPadding={Spacings.s1}
        renderItem={({ item }) => (
          <View>
            <Text style={{fontSize: 15, marginBottom: 2, color: Colors.grey20}}>
              {item.caption}
            </Text>
            <TextInput style={{fontSize: 18, marginBottom: 6}}
              onChangeText={event => changeProfileValue(event, item.caption)}              
              defaultValue={item.value}
              backgroundColor={Colors.grey50}
              // value={bodyText}
              multiline
              numberOfLines={2}
              
            >
            </TextInput>
          </View>

        )}
      />


      {/* <ScrollView style={styles.scrollView}>
        {fieldsname.map((field, idx) => {
          return (
            <View key={`${field}-${idx}`}>
              <Button 
                title="sub" 
                label={'Delete this contact'}
                size={'small'}
                iconSource={Assets.icons.x}
                onPress={() => handleRemove(idx)} 
              />

              <TextInput
                type="text"
                placeholder="Enter field name"
                value={field.value}
                onChangeText={(text) => handleChange(idx, text)}
              />
              <TextInput
                type="text"
                placeholder="Enter field data"
                value={fieldsvalue[idx]}
                onChangeText={(text) => handleChangeValue(idx, text)}
              />
              
            </View>
          );
        })}

        <Button 
          title="add" 
          label={'Add new contacts'}
          size={'small'}
          iconSource={Assets.icons.plusSmall}
          onPress={() => handleAdd()} 
        />

      </ScrollView> */}


      <Button 
        size={'large'}
        borderRadius={10}
        backgroundColor={Colors.grey10}
        iconSource={Assets.icons.checkSmall}
        label={'Done'}
        onPress={event => updateProfile(itemId, profile)} 
        style={styles.button}
      />
      <StatusBar style="auto" />
    </View>
  );
};


const styles = StyleSheet.create({
  profileName:{
    flexDirection: 'row',
  },
  textinput: {
    fontSize: 35,
    marginVertical: 25,
    width: width-180,
    borderWidth: 1,
  },
  grid:{
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginVertical: 20,
    height: 60
  },
  button: {
    marginBottom: 35
  }
}); 
