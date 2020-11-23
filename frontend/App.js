import React from "react";

import { View, StatusBar } from "react-native";

import Login from "./src/views/Login";
import Signup from "./src/views/Signup";
import Result from "./src/views/Result";
import Predict1 from "./src/views/Predict1";
import Chat from "./src/views/Chat";
import Board from "./src/views/Board";
import CreateBoard from "./src/views/CreateBoard";
import DetailBoard from "./src/views/DetailBoard";
import Graph from "./src/views/Graph";
import Setting from "./src/views/Setting";

import BottomNav from "./src/components/BottomNav";
import MainNav from "./src/components/MainNav";

import { getStatusBarHeight } from "react-native-status-bar-height";

import { Router, Stack, Scene } from "react-native-router-flux";
import InputData from "./src/views/InputData";

const topHeight = getStatusBarHeight() + 40;

export default function App() {
  return (
    <Router>
      <Stack key="root" hideNavBar={true} duration={0}>
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
        <Scene key="result" component={Result} />
        <Scene key="predict1" component={Predict1} />
        <Scene key="chat" component={Chat} />
        <Scene key="board" component={Board} />
        <Scene key="createboard" component={CreateBoard} />
        <Scene key="detailboard" component={DetailBoard} />
        <Scene key="graph" component={Graph} />
        <Scene key="setting" component={Setting} />
        <Scene key="inputdata" component={InputData} />
      </Stack>
    </Router>
  );
}
