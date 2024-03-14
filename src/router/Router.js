import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import ClientOrTrucker from "../screens/ClientOrTrucker";
import LoginClient from "../screens/client/auth/LoginClient";
import HomeClient from "../screens/client/HomeClient";
import Truck_Search from "../screens/client/trcuk/Truck_Search";
import Mechanic_Search from "../screens/client/Mechanic/Mechanic_Search";
import Wash_Search from "../screens/client/Wash/Wash_Search";
import RideHistory from "../screens/client/portfolio/RideHistory";
import Preference from "../screens/client/portfolio/Preference";
import SearchingDriver from "../screens/client/trcuk/SearchingDriver";
import Truck_Options from "../screens/client/trcuk/Truck_Options";
import RideReady from "../screens/client/trcuk/RideReady";
import OnTrip from "../screens/client/trcuk/OnTrip";
import Arrived from "../screens/client/trcuk/Arrived";
import Feedback from "../screens/client/trip/Feedback";
import Receipt from "../screens/client/trip/Receipt";
const Router = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS, // Apply slide transition
          statusBar: false,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ClientOrTrucker"
          component={ClientOrTrucker}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoginClient"
          component={LoginClient}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeClient"
          component={HomeClient}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Mechanic_Search"
          component={Mechanic_Search}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wash_Search"
          component={Wash_Search}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RideHistory"
          component={RideHistory}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Preference"
          component={Preference}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Truck_Search"
          component={Truck_Search}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="SearchingDriver"
          component={SearchingDriver}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Truck_Options"
          component={Truck_Options}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RideReady"
          component={RideReady}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="OnTrip"
          component={OnTrip}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Arrived"
          component={Arrived}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Receipt"
          component={Receipt}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
