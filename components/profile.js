import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View, Button, Text, GridList, Colors, Spacings } from 'react-native-ui-lib';

var profileData = [];

function getProfileAttributes(profile) {
  profileData = [];
  for (let key in profile) {
    if (key != 'name' && key != 'icon') {
      profileData.push({
        caption: key,
        value: profile[key]
      })
    }
  }
}

export default function ProfilePage({ route, navigation }) {
  console.log('profile');
  const { itemId, profile } = route.params;
  getProfileAttributes(profile);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50, marginTop: 25}}>{profile.icon + ' ' + profile.name}</Text>
      <GridList
        data={profileData}
        containerWidth={360}
        numColumns={1}
        itemSpacing={Spacings.s1}
        listPadding={Spacings.s1}
        renderItem={({ item }) => (
          <View>
            <Text style={{fontSize: 15, marginBottom: 2, color: Colors.grey20}}>{item.caption}</Text>
            <Text style={{fontSize: 20, marginBottom: 7}}>{item.value}</Text>
          </View>

        )}
        style={{margin: 25, height: '50%'}}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 75}}>
        <View style={styles.buttonView}>
          <Button 
            size={'large'}
            style={{padding: 15}}
            borderRadius={10}
            backgroundColor={Colors.grey50}
            iconSource={require('../assets/edit.png')}
            iconStyle={styles.icon} />
          <Button 
            size={'large'}
            style={{padding: 15}}
            borderRadius={10}
            backgroundColor={Colors.grey50}
            iconSource={require('../assets/share.png')}
            iconStyle={styles.icon} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  grid: {
    marginHorizontal: 'auto',
    marginVertical: 25,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    width: '90%'
  },
  icon: {
    tintColor: Colors.grey10,
    resizeMode: "contain",
    height: 50,
    width: 50
  }
});
