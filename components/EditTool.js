import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const EditTool = ({ navigation, route }) => {
  const { index, tool, saveTools, tools } = route.params;
  const [name, setName] = useState(tool.name);
  const [html, setHtml] = useState(tool.html);

  const updateTool = () => {
    const newTools = [...tools];
    newTools[index] = { name, html };
    saveTools(newTools);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Tool</Text>
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
      <TouchableOpacity
        style={[styles.deleteButton, !html ? styles.buttonDisabled : null]}
        onPress={() =>
          Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete the HTML?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "OK", onPress: () => setHtml("") },
            ],
            { cancelable: false }
          )
        }
        disabled={!html}
      >
        <Text style={styles.buttonText}>Delete HTML</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={updateTool}>
        <Text style={styles.buttonText}>Update</Text>
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
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: "gray",
    marginBottom: 10,
  },
});

export default EditTool;
