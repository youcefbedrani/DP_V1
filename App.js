import { View, Text } from "react-native";
import React from "react";
import Router from "./src/router/Router";
import Menu from "./src/components/Menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Menu>
        <Router />
      </Menu>
    </GestureHandlerRootView>
  );
};

export default App;
