import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Demo from "./components/demo";
import Onboarding from "./components/02.0_onboarding_demo_screen";

export default function App() {
  return <Onboarding></Onboarding>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});