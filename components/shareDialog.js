import {Dialog, Button, Colors} from "react-native-ui-lib";
import QRCode from "react-native-qrcode-svg";
import Svg, { Path } from "react-native-svg";
import { Share, StyleSheet, TouchableOpacity } from "react-native";
import View from "react-native-ui-lib/view";
import React, { useEffect, useState } from "react";

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "React Native | A framework for building native apps using React",
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

export default function ShareContact(props) {
  return (
    <Dialog
      visible={props.visible}
      panDirection={props.panDirection}
      onDismiss={props.toggleOff}
      height={"70%"}
      width={"75%"}
    >
      <View style={styles.container}>
        <View flex center>
          <QRCode value={"https://google.com"}></QRCode>
        </View>
        <View flex center>
        <Button
            size={"medium"}
            style={{ padding: 15 }}
            borderRadius={10}
            backgroundColor={Colors.grey50}
            iconSource={require("../assets/share.png")}
            iconStyle={styles.icon}
            onPress={onShare}
          />
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },
  icon: {
    tintColor: Colors.grey30,
    resizeMode: "contain",
    height: 75,
    width: 75,
  }
});
