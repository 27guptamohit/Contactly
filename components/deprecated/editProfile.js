import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions } from "react-native";
import { View, Button, GridList, Colors, Spacings,
         Text, Assets, Incubator } from 'react-native-ui-lib';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { TextField } = Incubator;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Only for filtering out title and icon, all the other changes are done in profile 
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
  console.log("------ Edit profile ------")

  getProfileAttributes(profile)

  const changeProfileValue = (value, field) =>{
    profile[field] = value
  }

  const updateProfile = (itemId, profile) => {
    console.log("Update Profile")
    async function saveProfile() {
      try {
        await AsyncStorage.setItem(itemId, JSON.stringify(profile))
        console.log('Done');
      } catch (e) {
        console.log(e);
        // saving error
      }
    }
    saveProfile();
    navigation.navigate('Profile', {
      itemId: itemId,
      profile: profile
    })
    console.log("Finish Update Profile")
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextField 
          onChangeText={event => changeProfileValue(event, "icon")}
          defaultValue={profile.icon}
          textAlign={"center"}
          style={[styles.textinput, {marginRight: 5}]}>
        </TextField>
        <TextField
          style={[styles.textinput, {minWidth: width-250}]}
          onChangeText={event => changeProfileValue(event, "title")}
          defaultValue={profile.title}
          textAlign={"center"}
        />
      </View>
      {/* <Image
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
      /> */}
      <GridList styles={{backgroundColor: 'gray'}}
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
        style={{marginBottom: 35}}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  }
}); 
