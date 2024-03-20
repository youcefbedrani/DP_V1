import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import {
  AntDesign,
  Fontisto,
  Feather,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Tow_Infos = () => {
  const navigation = useNavigation();
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
          <TouchableOpacity className="flex-row items-center space-x-2">
            <Text>Log out</Text>
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="my-6  flex-row mx-auto space-x-2 items-center">
        <Text className="text-center font-bold text-xl">
          Vehicle informations
        </Text>
        <MaterialCommunityIcons name="tow-truck" size={24} color="orange" />
      </View>
      <View style={styles.shadow} className="h-80 mx-auto bg-white">
        <TouchableOpacity
          style={styles.border}
          className="p-4 flex-row items-center justify-between"
        >
          <Text className="text-lg text-gray-800">Select Tronsport</Text>
          <AntDesign name="right" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.border}
          className="p-4 flex-row items-center justify-between"
        >
          <Text className="text-lg text-gray-800">Number plate</Text>
          <AntDesign name="right" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.border}
          className="p-4 flex-row items-center justify-between"
        >
          <Text className="text-lg text-gray-800">Photo of your vehicle</Text>
          <AntDesign name="right" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.borderless}
          className="p-4 flex-row items-center justify-between"
        >
          <Text className="text-lg text-gray-800">
            Cirtificate of vehicle registration
          </Text>
          <AntDesign name="right" size={24} color="orange" />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.shadow, { opacity: 0.5 }]}
        className="w-80 h-14 bg-gray-100 mt-4 rounded-lg mx-auto items-center justify-center"
      >
        <Text className="text-center font-bold text-xl">Done</Text>
      </View>
      <View className="bg-yellow-100 pl-4 pt-2 rounded-md mx-auto my-4 w-80 h-14">
        <Text>if you have questions, please contact our customer support</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  border: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: 80,
  },
  borderless: {
    height: 80,
  },
});

export default Tow_Infos;
