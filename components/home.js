import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View, Card, Button, Text, Colors, Assets } from 'react-native-ui-lib';

var profiles = require('./data.json');
var cardData = [];

function getData() {
  for (let key in profiles) {
    cardData.push({
      name: profiles[key]?.name,
      icon: profiles[key]?.icon,
    })
  }
}

const Item = ({ item }) => {
  return (
    <Card style={styles.card}>
      <Text style={{fontSize: 20}}>{item.name}</Text>
      <Text style={{fontSize: 50}}>{item.icon}</Text>
    </Card>
  );
};

export default function HomePage() {
  getData();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact.ly</Text>
      <View style={styles.grid}>
        <FlatList
          data={cardData}
          numColumns={2}
          renderItem={Item}
          keyExtractor={(item) => item.alt}
        />
      </View>
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  grid: {
    marginHorizontal: 'auto',
    marginVertical: 25,
    width: 340
  },
  card: {
    height: 150, 
    width: 150, 
    backgroundColor: Colors.grey50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 50,
    paddingTop: 75, 
    paddingBottom: 25 
  }
});
