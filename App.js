import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Demo from "./components/demo";
export default function App() {
  return <Demo></Demo>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});