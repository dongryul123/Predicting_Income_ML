import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import MainNav from "../components/MainNav";
import BottomNav from "../components/BottomNav";

import { getStatusBarHeight } from "react-native-status-bar-height";

import { Actions } from "react-native-router-flux";

import axios from "axios";
import SERVER from "../server";

const topHeight = getStatusBarHeight() + 40;

export default function Board() {
  // const [board, setBoard] = useState([
  //   {
  //     id: 0,
  //     title: "수준봐라",
  //     content:
  //       "무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 ",
  //     writer: "초코냥",
  //     time: "2020-10-14 15:09:22",
  //   },
  //   {
  //     id: 1,
  //     title: "ㅁㄴㅇㄻㄴㄴㅇㄹ",
  //     content: "무엇을 위하여 광야에서 방황하였으며",
  //     writer: "위키위키",
  //     time: "2020-10-14 15:20:22",
  //   },
  // ]);

  const [board, setBoard] = useState([{ id: 0, title: "", user: { username: "", nickname: "" } },]);

  async function fetchBoard() {
    const request = await axios
      .get(SERVER.BASE_URL + "articles/")
      .then((res) => {
        // console.log("success", res.data);
        setBoard(res.data);
      })
      .catch((err) => console.log(err));
    return request;
  }

  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>게시판</Text>
      </View>

      <View style={styles.halfContainer}>
        <View style={{ height: 25, flexDirection: "row" }}>
          <Text
            style={{
              width: "10%",
              color: "black",
              backgroundColor: "#ddd",
              textAlign: "center",
              textAlignVertical: "center",
              borderBottomColor: "black",
              borderBottomWidth: 2,
            }}
          >
            {"번호"}
          </Text>
          <Text
            style={{
              width: "60%",
              color: "black",
              backgroundColor: "#ddd",
              textAlign: "center",
              textAlignVertical: "center",
              borderBottomColor: "black",
              borderBottomWidth: 2,
            }}
          >
            {"제목"}
          </Text>
          <Text
            style={{
              width: "30%",
              color: "black",
              backgroundColor: "#ddd",
              textAlign: "center",
              textAlignVertical: "center",
              borderBottomColor: "black",
              borderBottomWidth: 2,
            }}
          >
            {"작성자"}
          </Text>
          {/* <Text
            style={{
              width: "10%",
              color: "black",
              backgroundColor: "#ddd",
              textAlign: "center",
              textAlignVertical: "center",
              borderBottomColor: "black",
              borderBottomWidth: 2,
            }}
          >
            {"조회"}
          </Text>
          <Text
            style={{
              width: "10%",
              color: "black",
              backgroundColor: "#ddd",
              textAlign: "center",
              textAlignVertical: "center",
              borderBottomColor: "black",
              borderBottomWidth: 2,
            }}
          >
            {"추천"}
          </Text> */}
        </View>
        {board.map((item) => (
          <View
            style={{ height: 25, flexDirection: "row" }}
            key={item.id}
            onPress={() => {}}
          >
            <Text
              style={{
                width: "10%",
                color: "black",
                backgroundColor: "white",
                textAlign: "center",
                textAlignVertical: "center",
                borderBottomColor: "#ddd",
                borderBottomWidth: 2,
              }}
            >
              {item.id}
            </Text>
            <Text
              style={{
                width: "60%",
                color: "black",
                backgroundColor: "white",
                textAlign: "center",
                textAlignVertical: "center",
                borderBottomColor: "#ddd",
                borderBottomWidth: 2,
              }}
              onPress={() => {
                Actions.detailboard({ id: item.id });
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                width: "30%",
                color: "black",
                backgroundColor: "white",
                textAlign: "center",
                textAlignVertical: "center",
                borderBottomColor: "#ddd",
                borderBottomWidth: 2,
              }}
            >
              {`${item.user.nickname}(${item.user.username})`}
            </Text>
            {/* <Text
              style={{
                width: "10%",
                color: "black",
                backgroundColor: "white",
                textAlign: "center",
                textAlignVertical: "center",
                borderBottomColor: "#ddd",
                borderBottomWidth: 2,
              }}
            >
              {item.click}
            </Text>
            <Text
              style={{
                width: "10%",
                color: "black",
                backgroundColor: "white",
                textAlign: "center",
                textAlignVertical: "center",
                borderBottomColor: "#ddd",
                borderBottomWidth: 2,
              }}
            >
              {item.recommend}
            </Text> */}
          </View>
        ))}
      </View>

      <View style={{ ...styles.inputContainer, flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            textAlignVertical: "center",
            marginLeft: "80%",
            width: "20%",
            height: 40,
            backgroundColor: "brown",
            color: "white",
            borderRadius: 10,
          }}
          onPress={() => {
            Actions.createboard();
          }}
        >
          글쓰기
        </Text>
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#828282",
    margin: 20,
  },

  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
