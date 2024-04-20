import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
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
import * as ImagePicker from "expo-image-picker";
import TruckerServices from "../../../Shared/TruckerServices";
import TruckerDBServices from "../../../Shared/TruckerDBServices";

const Tow_Infos = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [makebool, setMakeBool] = useState({ info: false });
  const [data, setData] = useState({});

  const [transport, setTransport] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [numberCirtificate, setNumberCirtificate] = useState("");

  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedCirtImage, setSelectedCirtImage] = useState(false);
  const [vehicleImage, setVehicleImage] = useState(false);
  const [cirtifcateImage, setCirtifcateImage] = useState(false);

  const pickVehicleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setVehicleImage(result.assets[0].uri);
    }
    setSelectedImage(true);
  };

  const pickCirtifcateImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setCirtifcateImage(result.assets[0].uri);
    }
    setSelectedCirtImage(true);
  };

  useEffect(() => {
    if (
      transport &&
      numberPlate &&
      vehicleImage &&
      cirtifcateImage &&
      numberCirtificate
    ) {
      setData({
        transport: transport,
        numberPlate: numberPlate,
        numberCirtificate: numberCirtificate,
        vehicleImage: vehicleImage,
        cirtifcateImage: cirtifcateImage,
      });
      setMakeBool({ ...makebool, info: true });
      setShow(true);
    }
  }, [vehicleImage, cirtifcateImage]);

  const Next_info = async () => {
    try {
      await TruckerDBServices.setVehicleDBInfo(data);
      await TruckerServices.setTowInfo(makebool);
      const TruckerTowInfo = await TruckerDBServices.getVehicleDBInfo();
      //console.log(TruckerTowInfo);
      //navigation.navigate("Set_Info");
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate("Set_Info");
    }
  };

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
      <ScrollView>
        <View className="mt-6 mb-1 flex-row mx-auto space-x-2 items-center">
          <Text className="text-center font-bold text-xl">
            Vehicle informations
          </Text>
          <MaterialCommunityIcons name="tow-truck" size={24} color="orange" />
        </View>

        <View className="space-y-2 flex-column mx-auto w-full p-4 ">
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Select Tronsport"
            value={transport}
            onChangeText={(text) => setTransport(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Number plate"
            value={numberPlate}
            onChangeText={(text) => setNumberPlate(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Cirtificate Number"
            value={numberCirtificate}
            onChangeText={(text) => setNumberCirtificate(text)}
          />
          <View className="w-full h-60 rounded-md bg-white p-2">
            <Text className="mx-auto text-gray-500 font-bold text-md">
              Photo of your vehicle
            </Text>
            {selectedImage ? (
              <Image
                source={{ uri: vehicleImage }}
                className="w-60 h-40 mt-2 mx-auto rounded-md"
              />
            ) : (
              <Image
                className="w-64 h-20 mt-10 mb-10 mx-auto rounded-md"
                source={{
                  uri: "https://res.cloudinary.com/doszhdiv2/image/upload/v1713090306/two_Show1_3ca98ef047.jpg",
                }}
              />
            )}
            <TouchableOpacity
              onPress={pickVehicleImage}
              style={styles.border}
              className="mx-auto mt-2 p-1 h-4 rounded-lg"
            >
              <Text className="text-lg text-orange-400 ">Add a Photo</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full h-60 rounded-md bg-white p-2">
            <Text className="mx-auto text-gray-500 font-bold text-md">
              Cirtificate of vehicle registration
            </Text>
            {selectedCirtImage ? (
              <Image
                source={{ uri: vehicleImage }}
                className="w-60 h-40 mt-2 mx-auto rounded-md"
              />
            ) : (
              <Image
                className="w-60 h-40 mt-2 mx-auto rounded-md"
                source={{
                  uri: "https://res.cloudinary.com/doszhdiv2/image/upload/v1713010583/driverlicense_b56b4e9f3a.jpg",
                }}
              />
            )}
            <TouchableOpacity
              onPress={pickCirtifcateImage}
              style={styles.border}
              className="mx-auto mt-2 p-1 rounded-lg"
            >
              <Text className="text-lg text-orange-400 ">Add a Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        {show ? (
          <View className="mx-2 my-4 rounded-xl">
            <TouchableOpacity
              onPress={Next_info}
              style={{ height: 45 }}
              className="bg-orange-500 pt-2 rounded-xl"
            >
              <Text className="mx-auto text-white text-lg">Done</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View className="bg-yellow-100 pl-4 pt-2 rounded-md mx-auto my-4 w-80 h-14">
          <Text>
            if you have questions, please contact our customer support
          </Text>
        </View>
      </ScrollView>
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
