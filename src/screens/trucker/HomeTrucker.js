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
import { useNavigation } from "@react-navigation/native";
import Job_options from "./Job_options/Job_options";
const HomeTrucker = () => {
  const navigation = useNavigation();
  return (
    <View className="pt-8 flex-column">
      {/* Tab bar */}
      <View className="pl-4 flex-row items-center justify-between pr-4">
        <View>
          <Image
            source={require("../../../assets/imageApp/logo.png")}
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
      {/* Body bar */}
      <View className="space-y-2 mt-20">
        <View className="mb-2">
          <Text className="text-center font-bold text-4xl">Join us !</Text>
          <Text className="text-center text-lg text-gray-400">
            The Best thing is to do job that can give you the Hero's
          </Text>
        </View>
      </View>
      <Job_options />
      {/* Footer bar */}
      <View className="space-y-2 mt-60">
        <View className="flex-row items-center justify-center space-x-2">
          <Fontisto name="email" size={24} color="black" />
          <Text className="text-center font-bold text-gray-600">
            depanage_DZ@gmail.com
          </Text>
        </View>
        <View className="flex-row items-center justify-center space-x-2">
          <Feather name="phone" size={24} color="black" />
          <Text className="text-center font-bold text-gray-600">
            0662628576
          </Text>
        </View>
        <View className="flex-row items-center justify-center space-x-2">
          <AntDesign name="copyright" size={20} color="black" />
          <Text className="text-center font-bold text-gray-600">
            Depanage-dz All right reserved{" "}
          </Text>
        </View>
      </View>
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

export default HomeTrucker;
