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
import { useNavigation } from "@react-navigation/native";
import TruckerServices from "../../../Shared/TruckerServices.js";
import Trucker_vision from "../Trucker_vision/Trucker_vision.js";

const Wait_Response = () => {
  const navigation = useNavigation();

  //when the devs accespt this user from dashboard it return confirmation to true and show the Trucker_vision That's all
  const [confirmation, setConfirmation] = useState(false);

  const handleLogout = () => {
    TruckerServices.Logout();
    navigation.navigate("ClientOrTrucker");
  };

  return (
    <>
      {confirmation ? (
        <Trucker_vision />
      ) : (
        <View className="bg-white h-full">
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
          <View className="m-auto mt-14">
            <Image
              source={{
                uri: "https://res.cloudinary.com/doszhdiv2/image/upload/v1713184445/vecteezy_search_data_information_in_documents_4689144_ebb8fc6548.jpg",
              }}
              className="mx-auto w-44 h-44"
            />
            <Text className="text-gray-700 font-bold mt-4 mx-4 text-lg">
              You need to wait to receive your documentation before we can
              respond. Once you have the necessary documentation, you'll be able
              to use the app correctly.{" "}
            </Text>
            <Text
              style={styles.border}
              className="text-orange-400 font-bold w-full mt-2"
            >
              If there any probleme you can contact support
            </Text>
          </View>
        </View>
      )}
    </>
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
  border: {
    marginLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: "orange",
  },
});

export default Wait_Response;
