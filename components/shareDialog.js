import { View, Dialog, Button, Colors, Incubator } from "react-native-ui-lib";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { getContactCard } from "./vcard/converter";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ShareContact(props) {
  const [note, setNote] = useState("");
  const [isCompleted, setisCompleted] = useState(false);

  if (!isCompleted) {
    return (
      <View>
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
                width={width * 0.5}
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
      </View>
    );
  } else {
    return (
      <View>
        <Dialog
          visible={props.visible}
          panDirection={props.panDirection}
          onDismiss={props.toggleOff}
          height={"50%"}
          width={"75%"}
        >
          <View style={styles.container}>
            <View flex center style={styles.qrcode}>
              <QRCode size={width * 0.5} value={getContactCard(props.profile, note)}></QRCode>
            </View>
            <View flex center></View>
          </View>
        </Dialog>
      </View>
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
    height: height * 0.6,
    width: width * 0.75,
    borderRadius: 15,
  },
  button: {
    marginTop: 100,
    borderRadius: 10,
    backgroundColor: Colors.grey10
  },
});
