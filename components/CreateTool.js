import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

const CreateTool = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [html, setHtml] = useState("");
  const { saveTools, tools } = route.params;

  const createTool = () => {
    const newTool = { name, html };
    saveTools([...tools, newTool]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Tool</Text>
      <Text>Tool Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tool Name"
        value={name}
        onChangeText={setName}
      />
      <Text>Tool Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="HTML Code"
        value={html}
        onChangeText={setHtml}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={createTool}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default CreateTool;
