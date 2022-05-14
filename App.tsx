import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, fontWeight: "bold", fontStyle: "italic" }}>
        Universal Expo!!!!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff000",
    alignItems: "center",
    justifyContent: "center",
  },
});
