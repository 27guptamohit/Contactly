import { Dialog, Button, Colors, Incubator } from "react-native-ui-lib";
import QRCode from "react-native-qrcode-svg";
import Svg, { Path } from "react-native-svg";
import { Share, StyleSheet, TouchableOpacity } from "react-native";
import View from "react-native-ui-lib/view";
import React, { startTransition, useEffect, useState } from "react";
import vCard from "./vcard/vcard";
import { getContactCard } from "./vcard/converter";

const onShare = async () => {
  try {
    const result = await Share.share({
      message: getContactCard(),
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

const addNote = (message, profile) => {
  profile.notes = message;
};

export default function ShareContact(props) {
  const [note, setNote] = useState("");
  const [isCompleted, setisCompleted] = useState(false);

  if (!isCompleted) {
    return (
      <Dialog
        visible={props.visible}
        panDirection={props.panDirection}
        onDismiss={() => {
              setisCompleted(false);
              return props.toggleOff;
        }}
        height={"50%"}
        width={"75%"}
      >
        <View style={styles.container}>
          <View flex center style={styles.qrcode}>
            <Incubator.TextField
              placeholder={"Add an optional note"}
              onChangeText={(text) => setNote(text)}
              showCharCounter
              width={100}
              multiline={true}
            />
            <Button
              size={'large'}

              style={styles.button}
              label={"Continue"}
              onPress={(pressed) => {if(pressed){ 
                setisCompleted(true);
              }}}
            ></Button>
          </View>
          <View flex center></View>
        </View>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        visible={props.visible}
        panDirection={props.panDirection}
        onDismiss={props.toggleOff}
        height={"50%"}
        width={"75%"}
      >
        <View style={styles.container}>
          <View flex center style={styles.qrcode}>
            <QRCode size={200} value={getContactCard(props.profile, note)}></QRCode>
          </View>
          <View flex center></View>
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  qrcode: {
    flex: 4,
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    height: 500,
    width: 300,
    borderRadius: 15,
  },
  icon: {
    tintColor: Colors.black,
    resizeMode: "contain",
    height: 150,
    width: 150,
  },
  button: {
    marginTop: 100,
  },
});
