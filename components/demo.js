import { Share, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import View from "react-native-ui-lib/view"
import Button from "react-native-ui-lib/button";
import React, { useEffect, useState } from "react";
import Dialog from "react-native-ui-lib/dialog";
import { PanningProvider } from "react-native-ui-lib";
import QRCode from "react-native-qrcode-svg";
import Svg, { Path } from "react-native-svg";


const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

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
        <Dialog
          visible={visible}
          panDirection={PanningProvider.Directions.DOWN}
          onDismiss={toggleDialog}
          height={"70%"}
          width={"75%"}
        >
          <View style={styles.container}>
            <View flex center>
              <QRCode value={"https://google.com"}></QRCode>
            </View>
            <View flex center>
              <TouchableOpacity onPress={onShare}>
              <Svg width={48} height={48} xmlns="http://www.w3.org/2000/svg">
                  <Path d="M30.3 13.7 25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z" fill={"#000000"}/>
                  <Path d="M24 7h2v21h-2z"fill={"#000000"} />
                  <Path fill={"#000000"} d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z" />
              </Svg>
            </TouchableOpacity>
            </View>
          </View>
        </Dialog>
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
