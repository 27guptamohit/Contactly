import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { View, Card, Button, Text, GridList, Colors, LoaderScreen, Spacings, Assets } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrayEquals, ArrayDeepEquals, DeepEquals } from '../utils/utilFunctions';
import { CONTACT_KEYS } from '../utils/constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HomePage({ navigation }) {
  const [profileKeys, setProfileKeys] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [value, setValue] = useState(0);
  const [autofill, setAutofill] = useState([]);
  const [master, setMaster] = useState({});

  function useForceUpdate() {
    setValue(value => value + 1);
  }
 
  useEffect(() => {
    setLoading(true);
    async function getProfileKeys() {
      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
        if (keys !== []) {
          keys.splice(keys.findIndex(element => element === '@master'), 1);
          if (!ArrayEquals(keys, profileKeys)) {
            setProfileKeys(keys);
          }
        }
      } catch (error) {
        // Any needed logic for failure
      }
      if (profileKeys.length > 0) {
        try {
          const profileArr = await AsyncStorage.multiGet(profileKeys);
          let temp = {};
          for (let i = 0; i < profileArr.length; i++) {
            let curr_key = profileArr[i][0];
            let curr_val = JSON.parse(profileArr[i][1]);
            temp[curr_key] = curr_val;
          }
          if (!DeepEquals(temp, profiles)) {
            setProfiles(temp);
          }
        } catch (error) {
          // Any needed logic for failure
        }
      } else {
        if (!DeepEquals([], profiles)) {
          setProfiles([]);
        }
      }
      let cards = [];
      for (let key in profiles) {
        cards.push({
          key: key,
          profileName: profiles[key]?.profileName,
          icon: profiles[key]?.icon,
        })
      }
      if (!ArrayDeepEquals(cards, cardData)) {
        setCardData(cards);
      }
    }
    async function getMaster() {
      const jsonValue = await AsyncStorage.getItem('@master');
      const masterObj = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (masterObj !== null && !DeepEquals(masterObj, master)) {
        setMaster(masterObj);
      }
      var keys = Object.keys(masterObj);
      keys.splice(0, 3);
      var transformed = keys.map(element => ({ key: element, label: CONTACT_KEYS[element], value: element }));
      if (!ArrayDeepEquals(transformed, autofill)) {
        setAutofill(transformed);
      }
    }
    getProfileKeys();
    getMaster();
    setLoading(false);
  }, [profileKeys, cardData, profiles, value, master, autofill]);

  if (isLoading) {
    return(
      <View>
        <LoaderScreen />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.text}>Contact.ly</Text>
          {cardData.length == 0 ? 
            (<Text 
              style={{ 
                fontSize: 20, 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>Make a Profile</Text>) : null}
          <View style={styles.gridList} >
            <GridList
              data={cardData}
              containerWidth={width * 0.95}
              numColumns={2}
              itemSpacing={Spacings.s2}
              listPadding={Spacings.s3}
              renderItem={({ item }) => (
                <Card 
                  style={styles.card} 
                  onPress={() => navigation.navigate('Profile', {
                    itemId: item.key,
                    profile: profiles[item.key],
                    forceUpdate: useForceUpdate,
                    master: master,
                    autofill: autofill
                  })}
                >
                  <Text style={{fontSize: 18}}>{item.profileName}</Text>
                  <Text style={{fontSize: 50}}>{item.icon}</Text>
                </Card>
              )}
              contentContainerStyle={{ alignItems: 'flex-start' }}
            />
          </View>
          <Button 
            size={'large'}
            borderRadius={10}
            backgroundColor={Colors.grey10}
            iconSource={Assets.icons.plusSmall}
            onPress={() => navigation.navigate('Create', {
              forceUpdate: useForceUpdate,
              master: master,
              autofill: autofill,
              initialRef: [{key: '', value: ''}],
              currentProfile: null
            })}
            style={styles.button}
            label={'Create'} />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container2: { 
    flex: 1, 
    width: '90%', 
    alignItems: 
    'center', 
    justifyContent: 'flex-start' 
  },
  gridList: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    justifyContent: 'center'
  },
  card: {
    aspectRatio: 1,
    width: '90%',
    backgroundColor: Colors.grey50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 40,
    margin: 25
  },
  button: {
    marginBottom: 35
  }
});
