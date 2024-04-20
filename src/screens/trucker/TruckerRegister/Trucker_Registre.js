import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  Fontisto,
  Feather,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import TruckerServices from "../../../Shared/TruckerServices.js";
import TruckerDBServices from "../../../Shared/TruckerDBServices.js";
import { Truck } from "react-native-feather";

import Basic_info from "../Trucker_Info/Basic_info.js";
import Driver_License from "../Trucker_Info/Driver_License.js";
import Trucker_info from "../Trucker_Info/Trucker_info.js";
import Tow_Infos from "../Tow_infos/Tow_Infos.js";
import Set_Info from "../set-info/Set_Info.js";

import BasicContext from "../../../Context/trucker/BasicContext.js";

const Trucker_Registre = () => {
  const navigation = useNavigation();

  const [basic, setBasic] = useState(true);
  const [driverLicense, setDriverLicense] = useState(false);
  const [truckerInfo, setTruckerInfo] = useState(false);
  const [towInfo, setTowInfo] = useState(false);
  const [insertInfo, setInsertInfo] = useState(false);

  const handleLogout = () => {
    TruckerServices.Logout();
    navigation.navigate("ClientOrTrucker");
  };

  return (
    <View>
      <View className="pl-4 mt-8 flex-row items-center justify-between pr-4">
        <View>
          <Image
            source={require("../../../../assets/imageApp/logo.png")}
            className="w-14 h-14"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center space-x-2"
          >
            <Text>Log out</Text>
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View>{basic ? <Basic_info /> : null}</View>
      <View>{driverLicense ? <Driver_License /> : null}</View>
      <View>{truckerInfo ? <Trucker_info /> : null}</View>
      <View>{towInfo ? <Tow_Infos /> : null}</View>
      <View>{insertInfo ? <Set_Info /> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Trucker_Registre;
