import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
} from "react-native";

import MainNav from "../components/MainNav";
import BottomNav from "../components/BottomNav";

export default function Chat({ props }) {
  const [log, setLog] = useState([
    {
      id: "공자",
      content:
        "무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 무엇을 위하여 광야에서 방황하였으며 ",
      time: "2020-10-14 15:09:22",
    },
    {
      id: "맹자 친구 간달프",
      content: "무엇을 위하여 광야에서 방황하였으며",
      time: "2020-10-14 15:20:22",
    },
  ]);

  const [push, setPush] = useState("");

  const scrollView = useRef(null);

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>채팅</Text>
      </View>

      <View style={styles.halfContainer}>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={(width, height) =>
            scrollView.current.scrollTo({ y: height })
          }
        >
          {log.map((item) => (
            <View style={{ marginBottom: 10 }}>
              <Text>
                <Text
                  style={{
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  {" " + item.id + " "}
                </Text>
                <Text style={{ color: "white" }}> : {item.content}</Text>
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ ...styles.inputContainer, flexDirection: "row" }}>
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            fontSize: 25,
            paddingLeft: 10,
          }}
          value={push}
          placeholder="채팅을 입력하세요"
          multiline={true}
          onChangeText={(text) => {
            setPush(text);
          }}
          onKeyPress={(e) => {
            if (e.nativeEvent.key == "Enter") {
              setPush("");
            }
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
            setLog([...log, { id: "asdf", content: push }]);
            setPush("");
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
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#828282",
    margin: 20,
    padding: 20,
  },

  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
