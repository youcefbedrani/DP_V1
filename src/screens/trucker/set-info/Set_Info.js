import { View, Text, TouchableOpacity, StyleSheet , Image } from "react-native";
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
const Set_Info = () => {
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
      <View className="m-auto mt-14">
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => navigation.navigate("Trucker_info")}
          className="flex-row px-4 items-center justify-between w-80 h-14 bg-gray-100 mb-2 rounded-lg"
        >
          <FontAwesome6 name="users-viewfinder" size={24} color="black" />
          <Text className="mr-24 text-center font-bold">Trucker Info</Text>
          <FontAwesome name="check-circle" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => navigation.navigate("Tow_Infos")}
          className="flex-row px-4 items-center justify-between w-80 h-14 bg-gray-100 mb-2 rounded-lg"
        >
          <MaterialCommunityIcons name="tow-truck" size={24} color="black" />
          <Text className="mr-24 text-center font-bold">Vehicle Info</Text>
          <AntDesign name="right" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>navigation.navigate("Trucker_vision")}
          style={[styles.shadow, { opacity: 0.5 }]}
          className="w-80 h-14 bg-gray-100 rounded-lg items-center justify-center"
        >
          <Text className="text-center font-bold">Submit Your Application</Text>
        </TouchableOpacity>
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

export default Set_Info;
