import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello eSports!</Text>
      <Button title="Hey!" />
      <Button title="Ho!" />
      <Button title="Let's go!" />
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => console.log(`Button ${props.title}`)}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
  },
  button: {
    borderRadius: 6,
    marginTop: 16,
    width: 125,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    color: "#000",
  },
});
