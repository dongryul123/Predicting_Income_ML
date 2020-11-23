import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";

import { Actions } from "react-native-router-flux";

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="dashboard"
        style={{ ...styles.item }}
        size={30}
        color="white"
        onPress={() => {
          Actions.predict1();
        }}
      />
      <MaterialCommunityIcons
        name="chat-processing"
        style={{ ...styles.item }}
        size={30}
        color="white"
        onPress={() => {
          Actions.chat();
        }}
      />
      <Ionicons
        name="ios-paper"
        style={{ ...styles.item }}
        size={30}
        color="white"
        onPress={() => {
          Actions.board();
        }}
      />
      <Foundation
        name="graph-bar"
        style={{ ...styles.item }}
        size={30}
        color="white"
        onPress={() => {
          Actions.graph();
        }}
      />
      <Ionicons
        name="md-settings"
        style={{ ...styles.item }}
        size={30}
        color="white"
        onPress={() => {
          Actions.setting();
        }}
      />
      <Ionicons
        name="ios-heart"
        style={{ ...styles.item }}
        size={30}
        color="white"
        onPress={() => {
          Actions.inputdata();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 50,
    width: "100%",
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
  },
  item: {
    height: 60,
    width: "16.6%",
    padding: 10,
    textAlign: "center",
  },
});
