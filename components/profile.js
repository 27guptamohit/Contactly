import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import {
  View,
  Button,
  Text,
  GridList,
  Avatar,
  Colors,
  Spacings,
  PanningProvider,
} from "react-native-ui-lib";
import { useState } from "react";
import { CONTACT_KEYS } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShareContact from "./shareDialog";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

var profileData = [];

function getProfileAttributes(profile) {
  profileData = [];
  for (let key in profile) {
    if (key != "profileName" && key != "icon" && key != "firstName" && key != "lastName" && key != "photo") {
      profileData.push({
        key: key,
        value: profile[key],
      });
    }
  }
}

export default function ProfilePage({ route, navigation }) {
  const { itemId, profile, forceUpdate, master, autofill } = route.params;
  const [visible, setVisible] = useState(false);

  const [currProfile, setCurrProfile] = useState(profile);

  const toggleDialog = () => {
    setVisible(!visible);
  };
  const toggleOff = () => {
    setVisible(false);
  };

  const changeProfile = (newProfile) => {
    setCurrProfile(newProfile);
  };
  
  getProfileAttributes(currProfile);
  
  const navigate = () => {
    navigation.goBack();
  }

  async function deleteProfile() {
    try {
      await AsyncStorage.removeItem(itemId);
    } catch(e) {
      // remove error
    }
    forceUpdate();
    navigate();
  }  

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, marginVertical: 25 }}>
        {currProfile.icon ? currProfile.icon + " " + currProfile.profileName : currProfile.profileName}
      </Text>
      <Avatar 
          source={currProfile.photo ? { uri: currProfile.photo } : require('../assets/placeholder.png')} 
          size={120} 
          style={{ marginBottom: 10 }} />
        { currProfile.firstName ? 
          (currProfile.lastName ? 
            (<Text style={{ fontSize: 22, marginTop: 18 }}>{currProfile.firstName + ' ' + currProfile.lastName}</Text>) 
            : <Text style={{ fontSize: 20, marginVertical: 10 }}>{currProfile.firstName}</Text>) 
            : null }
      <GridList
        data={profileData}
        containerWidth={width}
        numColumns={1}
        itemSpacing={Spacings.s1}
        listPadding={Spacings.s1}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{ fontSize: 15, marginBottom: 2, color: Colors.grey20 }}
            >
              {CONTACT_KEYS[item.key]}
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 6 }}>{item.value}</Text>
          </View>
        )}
        style={{ margin: 25, height: 0.25 * height }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 50,
        }}
      >
        <View style={styles.buttonView}>
          <Button
            size={"large"}
            style={{ padding: 15 }}
            borderRadius={10}
            backgroundColor={Colors.grey50}
            iconSource={require("../assets/edit.png")}
            iconStyle={styles.icon}
            onPress={() => navigation.navigate('EditProfile', {
              forceUpdate: forceUpdate, 
              master: master, 
              autofill: autofill, 
              initialRef: profileData,
              currentProfile: profile,
              changeProfile: changeProfile
            })}
          />
          <Button
            size={"large"}
            style={{ padding: 15 }}
            borderRadius={10}
            backgroundColor={Colors.grey50}
            iconSource={require("../assets/share.png")}
            iconStyle={styles.icon}
            onPress={toggleDialog}
          />
          <Button
            size={"large"}
            style={{ padding: 15 }}
            borderRadius={10}
            backgroundColor={Colors.grey50}
            iconSource={require("../assets/trash.png")}
            iconStyle={styles.icon}
            onPress={deleteProfile}
          />
        </View>
      </View>
      <StatusBar style="auto" />
      <ShareContact
        {...{
          visible: visible,
          panDirection: PanningProvider.Directions.DOWN,
          toggleOff: toggleOff,
        }}
      ></ShareContact>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    width: width - 20,
  },
  icon: {
    tintColor: Colors.grey10,
    resizeMode: "contain",
    height: 50,
    width: 50,
  },
});
