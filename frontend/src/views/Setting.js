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

import axios from "axios";
import SERVER from "../server";

export default function Setting() {
  const [id, setId] = useState("");
  // const [pw, setPw] = useState("");
  // const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seePw, setSeePw] = useState(true);

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

  useEffect((token) => {
    async function fetchUser(token) {
      // console.log(token);
      // console.log({
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      const request = await axios
        .get(SERVER.BASE_URL + "accounts/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          // console.log("success", res.data);
          setId(res.data.username);
          setName(res.data.nickname);
          setEmail(res.data.email);
        })
        .catch((err) => console.log(err));
      return request;
    }
    _retrieveData("auth_token").then((res) => fetchUser(res));
  }, []);

  function emailCheck(email) {
    let pattern3 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (pattern3.test(email) == false) {
      return false;
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{id}님 정보 수정</Text>
      </View>

      <View style={styles.halfContainer}>
        {/* <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setId(text);
            }}
            value={id}
            placeholder="id"
          ></TextInput>
        </View> */}

        {/* <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setPw(text);
            }}
            value={pw}
            placeholder="password"
            secureTextEntry={seePw}
          ></TextInput>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setPw2(text);
            }}
            value={pw2}
            placeholder="password check"
            secureTextEntry={seePw}
          ></TextInput>
        </View> */}
        <View style={styles.item}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
            placeholder="name"
          ></TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            placeholder="email"
          ></TextInput>
        </View>

        {/* <View style={styles.item}>
          <Text onPress={() => setSeePw(!seePw)} style={styles.next}>
            비밀번호 확인하기
          </Text>
        </View> */}

        <View style={styles.item}>
          <Text
            onPress={() => {
              axios
                .patch(
                  SERVER.BASE_URL + "accounts/user/",
                  {
                    username: id,
                    email: email,
                    nickname: name,
                  },
                  {
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  }
                )
                .then((res) => {
                  Alert.alert("수정되었습니다");
                })
                .catch((err) => console.log(err));
            }}
            style={{
              ...styles.next,
              backgroundColor:
                !name.length || !email.length || !emailCheck(email)
                  ? "gray"
                  : "blue",
            }}
            disabled={!name.length || !email.length || !emailCheck(email)}
          >
            수정
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
