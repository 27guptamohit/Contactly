import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Card, Button, Text, GridList, Colors, Spacings, Assets } from 'react-native-ui-lib';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var profiles = require('../data/data.json');
var cardData = [];

function getProfilesData() {
  cardData = [];
  for (let key in profiles) {
    cardData.push({
      key: key,
      name: profiles[key]?.name,
      icon: profiles[key]?.icon,
    })
  }
}

export default function HomePage({ navigation }) {
  getProfilesData();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact.ly</Text>
      <GridList
        data={cardData}
        containerWidth={width - 20}
        numColumns={2}
        itemSpacing={Spacings.s2}
        listPadding={Spacings.s3}
        renderItem={({ item }) => (
          <Card 
            style={styles.card} 
            onPress={() => navigation.navigate('Profile', {
              itemId: item.key,
              profile: profiles[item.key]
            })}
          >
            <Text style={{fontSize: 18}}>{item.name}</Text>
            <Text style={{fontSize: 50}}>{item.icon}</Text>
          </Card>
        )}
        contentContainerStyle={{alignItems: 'flex-start', margin: 10}}
      />
      <Button 
        size={'large'}
        borderRadius={10}
        backgroundColor={Colors.grey10}
        iconSource={Assets.icons.plusSmall}
        style={styles.button}
        label={'Create'} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
