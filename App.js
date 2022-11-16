import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Demo from "./components/demo";
import Onboarding from "./components/1_Onboarding_Screen/02.0_onboarding_demo_screen";
import HomeCreateButton from "./components/2_Create_Master_Profile/1_create_master_profile_button";
import EditMasterProfile from "./components/2_Create_Master_Profile/2_edit_master_profile";
import Navigator from './routes/homeStack'

export default function App() {
  return (
    <Navigator />
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