import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Picker,
  View,
  Alert,
  StatusBar,
  AsyncStorage,
} from "react-native";

import MainNav from "../components/MainNav";
import BottomNav from "../components/BottomNav";

import { Actions } from "react-native-router-flux";

import axios from "axios";
import SERVER from "../server";

export default function CreateBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [token, setToken] = useState("");

  const _retrieveData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      setToken(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  _retrieveData("auth_token");

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>게시글 작성</Text>
      </View>
      <View style={styles.halfContainer}>
        <View style={styles.item}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setTitle(text);
            }}
            value={title}
            placeholder="제목"
          ></TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setContent(text);
            }}
            value={content}
            placeholder="내용"
          ></TextInput>
        </View>

        <View style={styles.item}>
          <Text
            onPress={() => {
              axios
                .post(
                  SERVER.BASE_URL + "articles/",
                  {
                    title: title,
                    content: content,
                  },
                  {
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  }
                )
                .then((res) => {
                  Alert.alert("게시글이 작성되었습니다");
                  Actions.board();
                })
                .catch((err) => console.log(err));
            }}
            style={{
              ...styles.next,
              backgroundColor:
                !title.length || !content.length ? "gray" : "blue",
            }}
            disabled={!title.length || !content.length}
          >
            작성
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },

  titleContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    textAlign: "left",
    paddingLeft: 20,
  },

  halfContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 5,
  },
  item: {
    // flexDirection: "row",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  next: {
    width: 250,
    height: 40,
    backgroundColor: "gray",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
