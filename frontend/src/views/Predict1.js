import React, { useState } from "react";
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

export default function Predict1() {
  const [sex, setSex] = useState("남자");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [finalEdu, setFinalEdu] = useState("");
  const [marital, setMarital] = useState("");
  const [job, setJob] = useState("");
  const [rel, setRel] = useState("");
  const [hours, setHours] = useState("");

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

  _retrieveData("auth_token")

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>개인 정보 입력</Text>
      </View>

      <View style={styles.halfContainer}>
        <View style={styles.item}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              width: 100,
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            성별
          </Text>
          <Picker
            selectedValue={sex}
            mode="dropdown"
            style={{ ...styles.textInput, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="남자" value="Male" />
            <Picker.Item label="여자" value="Female" />
          </Picker>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              if (!isNaN(text) && text < 123 && text > -1) {
                setAge(text);
              } else {
                setAge("");
              }
            }}
            value={age}
            placeholder="나이"
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={styles.item}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              width: 100,
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            결혼관계
          </Text>
          <Picker
            selectedValue={marital}
            mode="dropdown"
            style={{ ...styles.textInput, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMarital(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="기혼" value="Married-civ-spouse" />
            <Picker.Item label="이혼" value="Divorced" />
            <Picker.Item label="미혼" value="Never-married" />
            <Picker.Item label="별거" value="Separated" />
            <Picker.Item label="주말부부" value="Married-spouse-absent" />
            <Picker.Item label="사별" value="Widowed" />
          </Picker>
        </View>
        <View style={styles.item}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              width: 100,
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            가족관계
          </Text>
          <Picker
            selectedValue={rel}
            mode="dropdown"
            style={{ ...styles.textInput, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setRel(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="미혼" value="Unmarried" />
            <Picker.Item label="남편" value="Husband" />
            <Picker.Item label="아내" value="Wife" />
            <Picker.Item label="자녀" value="Own-child" />
            <Picker.Item label="가족 없음" value="Not-in-family" />
            <Picker.Item label="다른 관계" value="Other-relative" />
          </Picker>
        </View>
        <View style={styles.item}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              width: 100,
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            최종학력
          </Text>
          <Picker
            selectedValue={finalEdu}
            mode="dropdown"
            style={{ ...styles.textInput, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setFinalEdu(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="초등학교" value="5th-6th" />
            <Picker.Item label="중학교" value="9th" />
            <Picker.Item label="고등학교" value="HS-grad" />
            <Picker.Item label="전문대" value="Assoc-voc" />
            <Picker.Item label="대학교" value="Bachelors" />
            <Picker.Item label="대학원-석사" value="Masters" />
            <Picker.Item label="대학원-박사" value="Doctorate" />
          </Picker>
        </View>
        <View style={styles.item}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              width: 100,
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            고용형태
          </Text>
          <Picker
            selectedValue={work}
            mode="dropdown"
            style={{ ...styles.textInput, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setWork(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="무직" value="Never-worked" />
            <Picker.Item label="무급" value="Without-pay" />
            <Picker.Item label="자영업" value="Private" />
            <Picker.Item label="개인사업자" value="Self-emp-not-inc" />
            <Picker.Item label="법인사업자" value="Self-emp-inc" />
            <Picker.Item label="국가직 공무원" value="Federal-gov" />
            <Picker.Item label="지방직 공무원" value="Local-gov" />
            <Picker.Item label="기타" value="?" />
          </Picker>
        </View>

        <View style={styles.item}>
          <Text
            style={{
              height: 40,
              paddingHorizontal: 10,
              width: 100,
              textAlignVertical: "center",
              fontSize: 15,
            }}
          >
            업종
          </Text>
          <Picker
            selectedValue={job}
            mode="dropdown"
            style={{ ...styles.textInput, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setJob(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="전문직" value="Prof-specialty" />
            <Picker.Item label="공예" value="Craft-repair" />
            <Picker.Item label="경영진" value="Exec-managerial" />
            <Picker.Item label="사무직" value="Adm-clerical" />
            <Picker.Item label="영업직" value="Sales" />
            <Picker.Item label="생산직" value="Machine-op-inspct" />
            <Picker.Item label="운송직" value="Transport-moving" />
            <Picker.Item label="핸들러클리너" value="Handlers-cleaners" />
            <Picker.Item label="농어업직" value="Farming-fishing" />
            <Picker.Item label="기술지원직" value="Tech-support" />
            <Picker.Item label="보안서비스" value="Protective-serv" />
            <Picker.Item label="룸서비스" value="Priv-house-serv" />
            <Picker.Item label="서비스직" value="Other-service" />
            <Picker.Item label="무장용병" value="Armed-Force" />
            <Picker.Item label="기타" value="?" />
          </Picker>
        </View>
        <View style={styles.item}>
          <TextInput
            style={{ ...styles.textInput, width: 250 }}
            onChangeText={(text) => {
              if (!isNaN(text) && text < 169 && text > -1) {
                setHours(text);
              } else {
                setHours("");
              }
            }}
            value={hours}
            placeholder="주당 근로 시간"
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={styles.item}>
          <Text
            onPress={() => {
              if (
                sex.length &&
                work.length &&
                finalEdu.length &&
                marital.length &&
                job.length &&
                rel.length &&
                String(age).length &&
                String(hours).length
              ) {
                axios
                  .post(
                    SERVER.BASE_URL + "income/test/",
                    {
                      age: Number(age),
                      hours_per_week: Number(hours),
                      workclass: work,
                      education: finalEdu,
                      marital_status: marital,
                      relationship: rel,
                      occupation: job,
                      sex: sex,
                    },
                    {
                      headers: {
                        Authorization: `Token ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    Alert.alert("결과값을 계산중입니다");
                    Actions.result({arr:res.data});
                  })
                  .catch((err) => console.log(err));
              }
            }}
            style={{
              ...styles.next,
              backgroundColor:
                sex.length &&
                work.length &&
                finalEdu.length &&
                marital.length &&
                job.length &&
                rel.length &&
                String(age).length &&
                String(hours).length
                  ? "blue"
                  : "gray",
            }}
          >
            다음으로
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
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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

  next: {
    width: 250,
    height: 40,
    backgroundColor: "gray",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
