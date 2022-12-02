import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import {
  View,
  Button,
  Text,
  GridList,
  Avatar,
  LoaderScreen,
  Colors,
  Spacings,
  Assets,
} from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONTACT_KEYS } from "../../utils/constants";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function MasterProfileHome({ navigation }) {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [master, setMaster] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function getMasterProfile() {
      try {
        const jsonValue = await AsyncStorage.getItem('@master');
        const profile = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (profile !== null) {
          temp = [];
          for (let key in profile) {
            if (key == 'photo') {
              setImage(profile[key]);
            } else if (key == 'firstName') {
              setFirstName(profile[key]);
            } else if (key == 'lastName') {
              setLastName(profile[key]);
            } else {
              temp.push({
                key: key,
                value: profile[key]
              });
            }
          }
          setProfileData(temp);
          setMaster(profile);
        }
      } catch (error) {
        // Any needed logic for failure
      }
    }
    getMasterProfile();
    setLoading(false);
  }, []);

  if (isLoading) {
    return(
      <View>
        <LoaderScreen />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Avatar 
          source={image ? { uri: image } : require('../../assets/placeholder.png')} 
          size={120} 
          style={{ marginBottom: 10 }} />
        { firstName ? 
          (lastName ? (<Text style={{ fontSize: 20, marginVertical: 10 }}>{firstName + ' ' + lastName}</Text>) 
            : <Text style={{ fontSize: 20, marginVertical: 10 }}>{firstName}</Text>) 
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
              iconSource={require("../../assets/edit.png")}
              iconStyle={styles.icon}
              onPress={() => navigation.navigate('EditMasterProfile', {
                currentMaster: master,
                initialRef: profileData,
                setHasMaster: null
              })}
            />
            <Button
              size={"large"}
              style={{ padding: 15 }}
              borderRadius={10}
              backgroundColor={Colors.grey50}
              iconSource={Assets.icons.check}
              iconStyle={styles.icon}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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