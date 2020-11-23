import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  CheckBox,
  Alert,
  StatusBar,
  AsyncStorage,
} from "react-native";

import axios from "axios";
import SERVER from "../server";

import { Actions } from "react-native-router-flux";

export default function Login() {
  const [isSelected, setSelection] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const _retrieveData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _retrieveData("auth_token")
      .then((res) => {
        if (res) {
          Actions.predict1();
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>5K</Text>
      </View>
      <View style={styles.halfContainer}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setId(text)}
              value={id}
              placeholder="id"
            ></TextInput>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                setPw(text);
              }}
              value={pw}
              placeholder="password"
              secureTextEntry={true}
              textContentType="none"
            ></TextInput>
          </View>
          <Text
            onPress={() => {
              axios
                .post(
                  SERVER.BASE_URL + "accounts/login/",
                  {
                    username: id,
                    password: pw,
                  },
                  null
                )
                .then((res) => {
                  AsyncStorage.setItem("auth_token", res.data.key);
                  setPw("");
                  setId("");
                  Actions.predict1();
                })
                .catch((err) => {
                  console.error(err);
                  setPw("");
                  // if (isSelected) {
                  //   AsyncStorage.setItem("isSelected", true);
                  //   AsyncStorage.setItem("rememberId", id);
                  // } else {
                  //   setId("");
                  // }
                  setId("");

                  Alert.alert("아이디와 비밀번호를 정확히 입력해주세요");
                });
            }}
            style={styles.login}
          >
            로그인
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text></Text>
          {/* <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={{ textAlignVertical: "center" }}>아이디 기억하기</Text> */}
        </View>
        <Text
          onPress={() => {
            Actions.signup();
          }}
        >
          회원가입
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  halfContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 60,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  login: {
    height: 80,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  checkbox: {
    alignSelf: "center",
  },
});
