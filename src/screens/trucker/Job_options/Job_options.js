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
const Job_options = () => {
const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Set_Info")}
        style={styles.shadow}
        className="flex-row pt-1 items-center shadow-lg pl-6 pr-4 w-80 h-16 mt-8 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Image
          source={require("../../../../assets/imageApp/truck.png")}
          className="w-12 h-12"
        />
        <Text className="font-bold"> Trucker </Text>
        <AntDesign name="right" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Set_Info")}
        style={styles.shadow}
        className="flex-row items-center pt-1 shadow-lg pl-6 pr-4 w-80 h-16 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Image
          source={require("../../../../assets/imageApp/mechanic.png")}
          className="w-12 h-12"
        />
        <Text className="font-bold"> Mechanical </Text>
        <AntDesign name="right" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Set_Info")}
        style={styles.shadow}
        className="flex-row items-center shadow-lg w-80 h-16 pl-6 pr-4 pt-1 bg-white mx-auto justify-between rounded-lg mb-4"
      >
        <Image
          source={require("../../../../assets/imageApp/car-service.png")}
          className="w-12 h-12"
        />
        <Text className="font-bold"> Wacher </Text>
        <AntDesign name="right" size={24} color="orange" />
      </TouchableOpacity>
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

export default Job_options;
