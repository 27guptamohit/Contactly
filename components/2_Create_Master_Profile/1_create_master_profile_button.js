import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeCreateButton({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('EditMasterProfileScreen')
    }


    return (
      <View style={styles.container}>
        <Button title="Create Master Profile"
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