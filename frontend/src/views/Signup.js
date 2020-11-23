import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";

import { Actions } from "react-native-router-flux";

import axios from "axios";
import SERVER from "../server";

export default function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idCheck, setIdCheck] = useState(false);

  function pwdCheck(upw) {
    let pattern1 = /[0-9]/;
    let pattern2 = /[A-Za-z]/;
    //특수문자 확인
    // let pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;
    if (pattern1.test(upw) == false) {
      return false;
    }
    if (pattern2.test(upw) == false) {
      return false;
    }
    // if(pattern3.test(pwd) == false){
    //     return false;
    // }
    if (upw.length < 8) return false;
    return true;
  }

  function emailCheck(email) {
    let pattern3 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (pattern3.test(email) == false) {
      return false;
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign-up</Text>
      </View>

      <View style={styles.halfContainer}>
        <View style={styles.item}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              setId(text);
              setIdCheck(false);
            }}
            value={id}
            placeholder="id"
          ></TextInput>
          <Text
            onPress={() =>
              axios
                .post(
                  SERVER.BASE_URL + "accounts/idcheck/",
                  { username: id },
                  null
                )
                .then((res) => {
                  setIdCheck(true);
                  Alert.alert("사용가능한 아이디입니다.");
                })
                .catch((err) => {
                  Alert.alert("중복된 아이디입니다. 다른 아이디를 사용하세요.");
                })
            }
            style={styles.check}
          >
            확인
          </Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => setPw(text)}
            value={pw}
            placeholder="password 8자리 영문 숫자 혼용"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => setPw2(text)}
            value={pw2}
            placeholder="pw check 8자리 영문 숫자 혼용"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="name"
          ></TextInput>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email"
          ></TextInput>
        </View>
        <View style={styles.item}>
          <Text
            disabled={
              !id.length ||
              !idCheck ||
              pw !== pw2 ||
              !pwdCheck(pw) ||
              !name.length ||
              !email.length ||
              !emailCheck(email)
            }
            onPress={() => {
              axios
                .post(
                  SERVER.BASE_URL + "accounts/signup/",
                  {
                    username: id,
                    email: email,
                    password1: pw,
                    password2: pw2,
                    nickname: name,
                  },
                  null
                )
                .then((res) => {
                  Alert.alert("회원가입 되었습니다.");
                  Actions.login();
                })
                .catch((err) => {
                  console.error(err);
                  Alert.alert("비밀번호를 더 어렵게 바꿔주세요.");
                });
            }}
            style={{
              ...styles.signup,
              backgroundColor:
                !id.length ||
                !idCheck ||
                pw !== pw2 ||
                !pwdCheck(pw) ||
                !name.length ||
                !email.length ||
                !emailCheck(email)
                  ? "gray"
                  : "blue",
            }}
          >
            {!id.length ||
            !idCheck ||
            pw !== pw2 ||
            !pwdCheck(pw) ||
            !name.length ||
            !email.length ||
            !emailCheck(email)
              ? "정확하게 작성해주세요"
              : "회원가입"}
          </Text>
        </View>
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
  item: {
    flexDirection: "row",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  check: {
    height: 40,
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
  signup: {
    width: 250,
    height: 40,
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
