import {
  Share,
  StyleSheet,
  Text
} from "react-native";
import View from "react-native-ui-lib/view";
import Button from "react-native-ui-lib/button";
import React, { useEffect, useState } from "react";
import { PanningProvider } from "react-native-ui-lib";

import ShareContact from "./contactsharing/shareDialog";

export default function Demo() {
  const [createProfile, setCreateProfile] = useState(false);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const updateCount = () => {
    setCount(count + 1);
    if (count == 10) {
      setCreateProfile(true);
    }
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };
  if (!createProfile) {
    return (
      <View style={styles.container}>
        <Text>{count}</Text>
        <Button onPress={updateCount} label="Create Profile"></Button>
        <Button onPress={toggleDialog} label="Open Dialog"></Button>
        <ShareContact
          {...{
            visible: visible,
            panDirection: PanningProvider.Directions.DOWN,
            toggleDialog: toggleDialog
          }}
        ></ShareContact>
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
