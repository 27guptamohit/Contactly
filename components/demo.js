import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Button from "react-native-ui-lib/button";
import { useEffect, useState } from "react";

export default function Demo() {
  const [createProfile, setCreateProfile] = useState(false);
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
    if (count == 10) {
      setCreateProfile(true);
    }
  };
  if (!createProfile) {
    return (
      <View style={styles.container}>
        <Text>{count}</Text>
        <Button onPress={updateCount} label="Create Profile"></Button>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>You are creating a profile</Text>
        <Button onPress={updateCount} label="Create Profile"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
