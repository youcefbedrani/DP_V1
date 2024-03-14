import { View, Text } from "react-native";
import React from "react";
import Router from "./src/router/Router";
import Menu from "./src/components/Menu";
const App = () => {
  return (
    <>
      <Menu>
      <Router />
      </Menu>
    </>
  );
};

export default App;
