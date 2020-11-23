import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";

import { LineChart, BarChart } from "react-native-chart-kit";

import MainNav from "../components/MainNav";
import BottomNav from "../components/BottomNav";

export default function Chart() {
  const screenWidth = Dimensions.get("window").width - 40;
  const scrrenHeight = Dimensions.get("window").height / 4;
  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>통계</Text>
      </View>

      <View style={styles.halfContainer}>
        <Text style={styles.subtitle}>연령별 소득</Text>
        <LineChart
          style={styles.chart}
          data={{
            labels: ["10대", "20대", "30대", "40대", "50대", "60대 ↑"],
            datasets: [
              {
                data: [
                  1/1321 * 100 ,
                  416/6489 * 100,
                  1890/6878 * 100,
                  2133/5726 * 100,
                  1348/3494 * 100,
                  517/2141 * 100,
                ],
              },
            ],
          }}
          width={screenWidth}
          height={scrrenHeight}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text></Text>
        <Text style={styles.subtitle}>업종별 소득</Text>
        <LineChart
          data={{
            labels: ["경영진", "전문직", "영업", "수공", "사무", "운송", "기술지원"],
            datasets: [
              {
                data: [
                  1593/3246 * 100,
                  1491/3304 * 100,
                  811/2998 * 100,
                  738/3262 * 100,
                  402/2983 * 100,
                  253/1270 * 100,
                  224/742 * 100,
                ],
              },
            ],
          }}
          width={screenWidth}
          height={scrrenHeight}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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

  subtitle: {
    fontSize: 25,
    textAlign: "left",
  },

  halfContainer: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 20,
  },
});
