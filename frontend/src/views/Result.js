import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
// import { getStatusBarHeight } from "react-native-status-bar-height";

import { LineChart, BarChart } from "react-native-chart-kit";

// const topHeight = getStatusBarHeight() + 40;

import MainNav from "../components/MainNav";
import BottomNav from "../components/BottomNav";

export default function Result({ arr }) {
  const screenWidth = Dimensions.get("window").width - 40;
  const scrrenHeight = Dimensions.get("window").height / 4;

  return (
    <View style={styles.container}>
      <MainNav />
      <BottomNav />
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>정확도 : {"87.985%"}  </Text>
        <Text style={styles.title}>{arr[0] ? "5K↑" : "5K↓"}</Text>

        
      </View>
      <View style={styles.halfContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={styles.item}>
            {"LGBM"} : {"87.985%"} {arr[0] ? "5K↑" : "5K↓"}
          </Text>
          <Text style={styles.item}>
            {"RandomForest"} : {"85.817%"} {arr[1] ? "5K↑" : "5K↓"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={styles.item}>
            {"GradientBoosting"} : {"86.675%"} {arr[2] ? "5K↑" : "5K↓"}
          </Text>
          <Text style={styles.item}>
            {"AdaBoost"} : {"85.907%"} {arr[3] ? "5K↑" : "5K↓"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={styles.item}>
            {"ExtraTrees"} : {"84.688%"} {arr[4] ? "5K↑" : "5K↓"}
          </Text>
          <Text style={styles.item}>
            {"Gaussian"} : {"82.364%"} {arr[5] ? "5K↑" : "5K↓"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={styles.item}>
            {"K-Neighbors"} : {"81.525%"} {arr[6] ? "5K↑" : "5K↓"}
          </Text>
          <Text style={styles.item}>
            {"SGD"} : {"85.739%"} {arr[7] ? "5K↑" : "5K↓"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={styles.item}>
            {"SVC"} : {"85.462%"} {arr[8] ? "5K↑" : "5K↓"}
          </Text>
          <Text style={styles.item}>
            {"XGB"} : {"87.082%"} {arr[9] ? "5K↑" : "5K↓"}
          </Text>
        </View>
      </View>
      <View style={{...styles.halfContainer, justifyContent:"flex-start"}}>
        {/* <Text style={styles.subtitle}>알고리즘 별 정확도</Text> */}
        <BarChart
          style={styles.chart}
          data={{
            labels: [
              "LGBM",
              "RF",
              "GB",
              "AB",
              "ET",
              "G",
              "KN",
              "SGD",
              "SVC",
              "XGB",
            ],
            datasets: [
              {
                data: [
                  87.985,
                  85.817,
                  86.675,
                  85.907,
                  84.688,
                  82.364,
                  81.525,
                  85.739,
                  85.462,
                  87.082,
                ],
              },
            ],
          }}
          width={screenWidth}
          height={scrrenHeight}
          chartConfig={{
            backgroundColor: "#CCFFF9",
            backgroundGradientFrom: "#005793",
            backgroundGradientTo: "#3FEAFF",
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
    alignItems: "flex-end",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    flexDirection:"row",
  },
  title: {
    fontSize: 40,
    textAlign: "left",
    paddingLeft: 20,
    color: "black",
  },

  halfContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "black",
    fontSize: 16,
  },

  subtitle: {
    fontSize: 25,
    textAlign: "left",
  },
});
