import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text, View, Button, Colors } from 'react-native-ui-lib';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function CreateMasterButton({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Contact.ly!</Text>
      <Text style={styles.text}>First time here?</Text>
      <Button 
        label={'Create Your Master Profile'}
        onPress={() => navigation.navigate('EditMaster')}
        style={styles.button} >

      </Button>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  },
  button: {
    backgroundColor: Colors.grey10,
    marginTop: 50
  }
});