import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import {Avatar, Title, Caption, Text, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function MasterProfileHome({navigation}) {
    function pressHandler() {
        navigation.navigate('EditMasterProfileScreen')

    }

    return (
      <View style={styles.container_main}>

          <View style={styles.container_1}>
              <View style={styles.container_2}>

                  <View style={[styles.container_3, {marginRight: 20}]}>
                      <Avatar.Image
                          source={{
                              uri: 'https://i.pinimg.com/originals/f4/ef/70/f4ef70f1cc35032f0df30641d60f7d58.jpg'
                          }}
                          size={120} />
                  </View>

                  <View style={[styles.container_3, {marginTop: 30}]}>
                      <Title style={styles.title}>
                          John Doe
                      </Title>
                      <Caption style={styles.caption}>
                          @johndoe
                      </Caption>
                  </View>
              </View>
          </View>

          <View style={styles.container_1}>
              <View style={styles.infoBoxWrapper}>
                  <View style={[styles.container_2, {marginTop: 0, marginBottom: 0}]}>

                      <View style={[styles.container_3, {margin: "auto"}]}>
                          <Title>
                            Contact Details
                          </Title>
                      </View>

                      <View style={[styles.container_3, {marginTop: "auto", marginBottom: "auto"}]}>
                          <Button title="Edit"
                                  onPress={pressHandler}>
                          </Button>
                      </View>
                  </View>
              </View>
          </View>

          <ScrollView style={[styles.inputsContainer, {width: 300}]}>
              <View style={styles.container_2}>

                          <Title>
                              LinkedIn:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              @johndoe
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Facebook:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              @johndoe
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Twitter
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              @johndoe
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Work:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              johndoe@work.com
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Academics:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              johndoe@uiuc.edu
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Orkut:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              @johndoe
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Apple Music:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              @johndoe
                          </Title>

              </View>

              <View style={styles.container_2}>

                          <Title>
                              Spotify:
                          </Title>

                          <Title style={{marginLeft: 10}}>
                              @johndoe
                          </Title>

              </View>

          </ScrollView>



      </View>
  )
}

const styles = StyleSheet.create({
    container_main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },

  container_1: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  container_2: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection:"row"
  },

  container_3: {
    marginLeft: 10,
    marginRight: 10,
    width: '25%',
  },

    title: {
    alignItems: "center",
    justifyContent: "center",
  },

    caption: {
    alignItems: "center",
    justifyContent: "center",
  },

    infoBoxWrapper: {
        borderBottomColor: '#0a0909',
        borderBottomWidth: 1,
        borderTopColor: '#0a0909',
        borderTopWidth: 1,
        height: 100,
        width: 400,
        alignItems: "center",
        justifyContent: "center"

    },

    inputsContainer: {
    flex: 1, marginBottom: 20
  },

});