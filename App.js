import { Platform, View, Text } from "react-native";
import React, { useEffect } from "react";
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
