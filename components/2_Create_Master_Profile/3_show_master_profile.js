import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function MasterProfileHome({navigation}) {
    function pressHandler() {
        navigation.navigate('EditMasterProfileScreen')

    }

    return (
      <View style={styles.container}>
        <Button title="Edit"
                onPress={pressHandler}>

        </Button>
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
});