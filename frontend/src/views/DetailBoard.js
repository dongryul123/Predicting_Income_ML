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
  ScrollView,
} from "react-native";

import MainNav from "../components/MainNav";
import BottomNav from "../components/BottomNav";

import { Actions } from "react-native-router-flux";

import axios from "axios";
import SERVER from "../server";

export default function DetailBoard(props) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ username: "", nickname: "" });

  const _retrieveData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      setToken(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const [article, setArticle] = useState({
    title: "",
    user: { username: "", nickname: "" },
    updated_at: "",
  });

  const [comments, setComments] = useState([
    { id: 0, content: "", user: { username: "", nickname: "" } },
  ]);
  const [comment, setComment] = useState("");

  async function fetchArticle(id) {
    const request = await axios
      .get(SERVER.BASE_URL + `articles/${id}/`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => console.log(err));

    const request2 = await axios
      .get(SERVER.BASE_URL + `articles/comments/${id}/`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));

    const request3 = await axios
      .get(SERVER.BASE_URL + `accounts/user/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      });
    return request, request2, request3;
  }

  useEffect(() => {
    _retrieveData("auth_token");
    fetchArticle(props.id);
  }, []);

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <View style={{flexDirection: "row", flexWrap: "wrap",}}>

        <Text style={styles.title}>{"제목" + article.title}
        </Text>
        <Text
                style={{
                  color: "black",
                  borderColor: "black",
                  borderWidth: 1,
                  textAlignVertical: "center",
                  textAlign: "center",
                  height: 20,
                  width: 20,
                }}
                onPress={() => {
                  axios
                  .delete(
                    SERVER.BASE_URL + `articles/${article.id}/`,
                    {
                      headers: {
                        Authorization: `Token ${token}`,
                      },
                    } 
                    )
                    .then((res) => {
                      Alert.alert("게시물이 삭제되었습니다");
                      Actions.board();
                    })
                    .catch((err) => {
                      console.log(err)
                      Alert.alert("본인이 쓴 게시물만 삭제할 수 있습니다")
                    });              
                  }}
                  >
                {"x"}
              </Text>
          </View>
      </View>
      <View style={styles.halfContainer}>
        <View style={{ height: 25, flexDirection: "row" }}>
          <Text
            style={{
              width: "50%",
              color: "black",
              backgroundColor: "white",
              textAlign: "left",
              textAlignVertical: "center",
              borderBottomColor: "#ddd",
              borderBottomWidth: 2,
            }}
          >
            {"작성자 " +
              article.user.nickname +
              "(" +
              article.user.username +
              ")"}
          </Text>
          <Text
            style={{
              width: "50%",
              color: "black",
              backgroundColor: "white",
              textAlign: "left",
              textAlignVertical: "center",
              borderBottomColor: "#ddd",
              borderBottomWidth: 2,
            }}
          >
            {"수정 " +
              article.updated_at.substring(0, 4) +
              "-" +
              article.updated_at.substring(5, 7) +
              "-" +
              article.updated_at.substring(8, 10) +
              "-" +
              article.updated_at.substring(11, 19)}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.content}>{article.content}</Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text style={{ fontSize: 20, color: "white", marginBottom: 10 }}>
          댓글
        </Text>
        <ScrollView>
          {comments.map((item) => (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 10,
              }}
              key={item.id}
            >
              <Text
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              >
                {item.user.nickname + "(" + item.user.username + ")"}
              </Text>
              <Text
                style={{
                  color: "white",
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              >
                {" : " + item.content + "  "}
              </Text>
              <Text
                style={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 1,
                  textAlignVertical: "center",
                  textAlign: "center",
                  height: 20,
                  width: 20,
                }}
                onPress={() => {
                  axios
              .delete(
                SERVER.BASE_URL + `articles/${item.id}/comments/`,
                {
                  headers: {
                    Authorization: `Token ${token}`,
                  },
                } 
                )
                .then((res) => {
                  Alert.alert("댓글이 삭제되었습니다");
                  Actions.board();
                })
                .catch((err) => {
                  console.log(err)
                  Alert.alert("본인이 쓴 댓글만 삭제할 수 있습니다")
                });              
                }}
              >
                {"x"}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            fontSize: 25,
            paddingLeft: 10,
          }}
          value={comment}
          placeholder="댓글을 입력하세요"
          multiline={true}
          onChangeText={(text) => {
            setComment(text);
          }}
        ></TextInput>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            textAlignVertical: "center",
            width: "20%",
            height: 40,
            backgroundColor: "brown",
            color: "white",
          }}
          onPress={() => {
            if (comment) {
              axios
              .post(
                SERVER.BASE_URL + `articles/comments/${article.id}/`,
                {
                  content: comment,
                },
                {
                  headers: {
                    Authorization: `Token ${token}`,
                  },
                }
                )
                .then((res) => {
                  Alert.alert("댓글이 작성되었습니다");
                  Actions.board();
                })
                .catch((err) => console.log(err));
                setComment("");
              }
              }}
              >
              입력
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
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#828282",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    marginBottom: 5,
  },
  item: {
    marginBottom: 20,
  },
  content: {
    color: "white",
    padding: 20,
  },
  commentContainer: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#525252",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 20,
  },
});
