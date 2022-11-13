import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View, Card, Button, Text, GridList, Colors, Spacings, Assets } from 'react-native-ui-lib';

var profiles = require('./data.json');
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
  console.log('home');
  getProfilesData();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact.ly</Text>
      <GridList
        data={cardData}
        containerWidth={360}
        numColumns={2}
        itemSpacing={Spacings.s1}
        listPadding={Spacings.s1}
        renderItem={({ item }) => (
          <Card 
            style={styles.card} 
            onPress={() => navigation.navigate('Profile', {
              itemId: item.key,
              profile: profiles[item.key]
            })}
          >
            <Text style={{fontSize: 20}}>{item.name}</Text>
            <Text style={{fontSize: 50}}>{item.icon}</Text>
          </Card>
        )}
        style={{margin: 25}}
      />
      <Button 
        size={'large'}
        borderRadius={10}
        backgroundColor={Colors.grey10}
        iconSource={Assets.icons.plusSmall}
        label={'Create'} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  grid: {
    marginHorizontal: 'auto',
    marginVertical: 25,
  },
  card: {
    height: 150, 
    width: 150, 
    backgroundColor: Colors.grey50,
    paddingVertical: 25,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 50,
    marginTop: 25
  }
});
