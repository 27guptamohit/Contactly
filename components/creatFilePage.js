// import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions } from "react-native";
import { View, Button, GridList, Colors, Spacings,
         Text, Assets, Image, Incubator } from 'react-native-ui-lib';
const {TextField} = Incubator;

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

  // const [selectedValue, setSelectedValue] = useState("");
  // const [bodyText , setBodyText ] = useState("");
  // const [text, onChangeText] = useState("");
  // const [nameText, onChangenameText] = useState("");

  const changeProfileValue = (value, field) =>{
    customData[field] = value
  }

  const updateProfile = (itemId, profile) => {
    console.log("Update Profile")
    navigation.navigate('Profile', {
      itemId: itemId,
      profile: profile
    })
    console.log("Finish Update Profile")
  }

  // const [fieldsname, setFieldsname] = useState([{ value: null }]);

  // function handleChange(i, event) {
  //   const values = [...fieldsname];
  //   // console.log(values)
  //   values[i].value = event;
  //   setFieldsname(values);
  // }

  // const [fieldsvalue, setFieldsvalue] = useState([{ value: null }]);

  // function handleChangeValue(i, event) {
  //   const values = [...fieldsvalue];
  //   // console.log(values)
  //   values[i].value = event;
  //   setFieldsvalue(values);
  // }


  // function handleAdd() {
  //   const names = [...fieldsname];
  //   names.push({ value: null });
  //   setFieldsname(names);

  //   const values = [...fieldsvalue];
  //   values.push({ value: null });
  //   setFieldsvalue(values);
  // }

  // function handleRemove(i) {
  //   const names = [...fieldsname];
  //   names.splice(i, 1);
  //   setFieldsname(names);

  //   const values = [...fieldsvalue];
  //   values.splice(i, 1);
  //   setFieldsvalue(values);
  // }



  return (
    <View style={styles.container}>
      <View style={styles.profileName}>
        <TextField 
          onChangeText={event => changeProfileValue(event, "icon")}
          defaultValue={profile.icon}
          textAlign={"center"}
          maxLength={1}
          style={[styles.textinput, {marginRight: 5}]}>
        </TextField>
        <TextField
          style={[styles.textinput, {minWidth: width-250}]}
          onChangeText={event => changeProfileValue(event, "title")}
          defaultValue={profile.title}
          textAlign={"center"}
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
      <TextField 
        style={styles.name}
        onChangeText={event => changeProfileValue(event, "Name")}
        defaultValue={profile.Name}
      />
      <GridList styles={styles.grid}
        data={profileData}
        containerWidth={width}
        numColumns={1}
        itemSpacing={Spacings.s1}
        listPadding={Spacings.s1}
        renderItem={({ item }) => (
          <View>
            <Text style={{fontSize: 15, marginBottom: 2, marginLeft: '2.5%', color: Colors.grey40}}>
              {item.caption}
            </Text>
            <TextField style={styles.fields}
              onChangeText={event => changeProfileValue(event, item.caption)}              
              defaultValue={item.value}
              multiline
              numberOfLines={2}
            />
          </View>

        )}
      />
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
  profileName: {
    flexDirection: 'row',
  },
  textinput: {
    fontSize: 35,
    marginVertical: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey40
  },
  name: { 
    fontSize: 18, 
    marginVertical: 5, 
    paddingHorizontal: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: 
    Colors.grey40 
  },
  fields: {
    fontSize: 18, 
    marginBottom: 6, 
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey40,
    marginLeft: '2.5%', 
    width: '90%',
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
