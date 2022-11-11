import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View, Card, Button, Text, Colors, Assets } from 'react-native-ui-lib';

const itemData = [
  {
    key: 'professional',
    icon: (
      <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 20}}>Professional</Text>
        <Text style={{fontSize: 50}}>🤝</Text>
      </View>
    )
  },
  {
    key: 'personal',
    icon: (
      <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 20}}>Personal</Text>
        <Text style={{fontSize: 50}}>🔒</Text>
      </View>
    )
  },
  {
    key: 'academic',
    icon: (
      <View style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 20}}>Academic</Text>
        <Text style={{fontSize: 50}}>📚</Text>
      </View>
    )
  },
];

const Item = ({ item }) => {
  return <Card style={styles.card}>{item.icon}</Card>;
};

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact.ly</Text>
      <View style={styles.grid}>
        <FlatList
          data={itemData}
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
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 50,
    paddingTop: 75, 
    paddingBottom: 25 
  }
});
