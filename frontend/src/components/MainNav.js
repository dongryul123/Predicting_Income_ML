import React from "react";
import { StyleSheet, View, Text, StatusBar, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Actions } from "react-native-router-flux";

export default function MainNav() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="logo-github"
          style={{ ...styles.item }}
          size={30}
          color="white"
        />
        <Text style={styles.title}>5K</Text>
      </View>
      <Text
        style={styles.logout}
        onPress={() => {
          AsyncStorage.removeItem("auth_token");
          Actions.popTo("login");
        }}
      >
        Logout
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    height: 60,
    padding: 10,
    textAlign: "center",
  },
  title: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 20,
    color: "white",
  },
  logout: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "white",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "gray",
  },
});
