import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  Fontisto,
  Feather,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TruckerServices from "../../../Shared/TruckerServices";

const Trucker_info = () => {
  const navigation = useNavigation();
  const [makebool, setMakeBool] = useState({ info: false });

  const [show, setShow] = useState(false);
  const [driverLicense, setDriverLicense] = useState(false);
  const [basicInfo, setBasicinfo] = useState(false);

  useEffect(() => {
    handleinfo();
    if (driverLicense && basicInfo) {
      setMakeBool({ ...makebool, info: true });
      setShow(true);
    } else {
      setShow(false);
    }
  }, [driverLicense, basicInfo]);

  const handleinfo = async () => {
    const Basic = await TruckerServices.getBasicInfo();
    const License = await TruckerServices.getDrtiverLicenseInfo();
    setBasicinfo(Basic.info);
    setDriverLicense(License.info);
  };

  const handleLogout = () => {
    TruckerServices.Logout();
    navigation.navigate("ClientOrTrucker");
  };

  const handlePress = () => {
    if (basicInfo && driverLicense) {
      TruckerServices.setTruckerInfo(makebool);
    }
    navigation.navigate("Tow_Infos");
  };
  return (
    <View className="pt-12">
      <View className="pl-4 flex-row items-center justify-between pr-4">
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
      <TouchableOpacity
        onPress={() => navigation.navigate("BasicInfo")}
        disabled={basicInfo}
        style={styles.shadow}
        className="flex-row pt-6 shadow-lg pl-6 pr-4 w-80 h-16 mt-8 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Text className="font-bold"> Basic Info</Text>
        {basicInfo ? (
          <FontAwesome name="check-circle" size={24} color="green" />
        ) : (
          <AntDesign name="right" size={24} color="orange" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("DriverLicense")}
        disabled={driverLicense}
        style={styles.shadow}
        className="flex-row pt-6 shadow-lg pl-6 pr-4 w-80 h-16 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Text className="font-bold"> Driver License Info</Text>
        {driverLicense ? (
          <FontAwesome name="check-circle" size={24} color="green" />
        ) : (
          <AntDesign name="right" size={24} color="orange" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shadow}
        className="flex-row shadow-lg w-80 h-16 pl-6 pr-4 pt-6 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Text className="font-bold"> Criminal record/taxi app</Text>
        <Text className="text-gray-400">(Optional)</Text>
        <AntDesign name="right" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shadow}
        className="flex-row shadow-lg pl-6 pt-6 pr-4 w-80 h-16 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Text className="font-bold">Agent Referral Code</Text>
        <Text className="text-gray-400">(Optional)</Text>
        <AntDesign name="right" size={24} color="orange" />
      </TouchableOpacity>
      {show ? (
        <View className="mx-2 my-4 rounded-xl">
          <TouchableOpacity
            onPress={handlePress}
            style={{ height: 45 }}
            className="bg-orange-500 pt-2 rounded-xl"
          >
            <Text className="mx-auto text-white text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <Text className="text-sm text-gray-600 mx-auto mt-4 px-4">
        By tapping Done I Agree with Terms and Conditions , I acknowledge and
        agree with passing and transfer of personal data according to conditions
        of Privacy Policy
      </Text>
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

export default Trucker_info;
