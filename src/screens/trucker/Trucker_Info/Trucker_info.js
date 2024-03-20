import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  Fontisto,
  Feather,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Trucker_info = () => {
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
          <TouchableOpacity className="flex-row items-center space-x-2">
            <Text>Log out</Text>
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.shadow}
        className="flex-row pt-6 shadow-lg pl-6 pr-4 w-80 h-16 mt-8 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Text className="font-bold"> Basic Info</Text>
        <AntDesign name="right" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shadow}
        className="flex-row pt-6 shadow-lg pl-6 pr-4 w-80 h-16 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Text className="font-bold"> Driver License Info</Text>
        <AntDesign name="right" size={24} color="orange" />
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
      <View
        style={[styles.shadow, { opacity: 0.5 }]}
        className="w-80 h-14 bg-gray-100 rounded-lg mx-auto items-center justify-center"
      >
        <Text className="text-center font-bold text-xl">Done</Text>
      </View>
      <Text className="text-sm text-gray-600 mx-auto mt-4 px-4">
        By tapping Done I Agree with Terms and
        Conditions , I acknowledge and  agree with
        passing and transfer of personal data according
        to conditions of Privacy Policy
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
