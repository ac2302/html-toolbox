import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const ToolsList = () => {
  const [tools, setTools] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      const storedTools = await AsyncStorage.getItem("tools");
      if (storedTools) {
        const parsedTools = JSON.parse(storedTools);
        // Sort tools by last used timestamp, with most recent first
        parsedTools.sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0));
        setTools(parsedTools);
      }
    } catch (error) {
      console.error("Failed to load tools:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTools();
    }, [])
  );

  const saveTools = async (newTools) => {
    try {
      const toolsWithLastUsed = newTools.map((tool) => ({
        ...tool,
        lastUsed: tool.lastUsed || 0,
      }));
      await AsyncStorage.setItem("tools", JSON.stringify(toolsWithLastUsed));
      setTools(toolsWithLastUsed);
    } catch (error) {
      console.error("Failed to save tools:", error);
    }
  };

  const deleteTool = (index) => {
    const newTools = [...tools];
    newTools.splice(index, 1);
    saveTools(newTools);
  };

  const updateLastUsed = async (index) => {
    const newTools = [...tools];
    newTools[index].lastUsed = Date.now();
    saveTools(newTools);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tools</Text>
      <ScrollView style={styles.scrollContainer}>
        {tools.map((tool, index) => (
          <View key={index} style={styles.toolItem}>
            <TouchableOpacity
              style={styles.toolName}
              onPress={() => {
                updateLastUsed(index);
                navigation.navigate("ToolView", { html: tool.html });
              }}
            >
              <Text>{tool.name}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditTool", {
                    index,
                    tool,
                    saveTools,
                    tools,
                  })
                }
              >
                <Text>🖊</Text>
              </TouchableOpacity>
              <Text>{"      "}</Text>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Confirm Delete",
                    `Are you sure you want to delete ${tool.name}?`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      { text: "OK", onPress: () => deleteTool(index) },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.spacer} />
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateTool", { saveTools, tools })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    // marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  toolItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  spacer: {
    height: 200,
  },
  toolName: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "green",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
});

export default ToolsList;
