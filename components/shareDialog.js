import { View, Dialog, Button, Colors, Incubator } from "react-native-ui-lib";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { getContactCard } from "./vcard/converter";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

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
          props.toggleOff();
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
              width={200}
              multiline={true}
              containerStyle={{
                padding: 15,
                backgroundColor: Colors.grey70,
                borderRadius: 5
              }}
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
    marginLeft: 5,
    borderRadius: 15
  },
  container: {
    flex: 1,
    height: 500,
    width: 290,
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
    borderRadius: 10,
    backgroundColor: Colors.grey10
  },
});
