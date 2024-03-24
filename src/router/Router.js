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
import HomeTrucker from "../screens/trucker/HomeTrucker";
import Trucker_info from "../screens/trucker/Trucker_Info/Trucker_info";
import Set_Info from "../screens/trucker/set-info/Set_Info";
import Tow_Infos from "../screens/trucker/Tow_infos/Tow_Infos";
import Trucker_vision from "../screens/trucker/Trucker_vision/Trucker_vision";
import Requsete_course from "../components/trucker/Requsete_course";
import Truck_Req from "../screens/trucker/Truck_Req/Truck_Req";
import Start_Truck from "../screens/trucker/Start_truck/Start_Truck";
import ReceiptTrucker from "../screens/trucker/cach_in/ReceiptTrucker";
import FeedbackTrucker from "../screens/trucker/feedback/FeedbackTrucker";
import History from "../screens/trucker/History/History";
import Income from "../screens/trucker/cach_in/Income";
import Support from "../screens/trucker/support/Support";
import MonthlyTotal from "../screens/trucker/cach_in/MonthlyTotal";

const Router = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
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
        <Stack.Screen
          name="HomeTrucker"
          component={HomeTrucker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Trucker_info"
          component={Trucker_info}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Set_Info"
          component={Set_Info}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Tow_Infos"
          component={Tow_Infos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Trucker_vision"
          component={Trucker_vision}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Requsete_course"
          component={Requsete_course}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Truck_Req"
          component={Truck_Req}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start_Truck"
          component={Start_Truck}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ReceiptTrucker"
          component={ReceiptTrucker}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="FeedbackTrucker"
          component={FeedbackTrucker}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Income"
          component={Income}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{ headerShown: false }}
        /> 
         <Stack.Screen
          name="MonthlyTotal"
          component={MonthlyTotal}
          options={{ headerShown: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
