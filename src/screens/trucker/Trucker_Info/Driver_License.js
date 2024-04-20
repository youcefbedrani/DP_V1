import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  AntDesign,
  Fontisto,
  Feather,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import TruckerServices from "../../../Shared/TruckerServices";
import TruckerDBServices from "../../../Shared/TruckerDBServices";

const Driver_License = () => {
  const navigation = useNavigation();
  const [makebool, setMakeBool] = useState({ info: false });
  const [data, setData] = useState({});

  const [show, setShow] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedBackImage, setSelectedBackImage] = useState(false);
  const [FrontImagePhoto, setFrontImagePhoto] = useState(null);
  const [BackImagePhoto, setBackImagePhoto] = useState(null);

  const onClick = () => {
    setShowPicker(true);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatepicker();
    }
  };

  const pickFrontImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFrontImagePhoto(result.assets[0].uri);
    }
    setSelectedImage(true);
  };

  const pickBackImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setBackImagePhoto(result.assets[0].uri);
    }
    setSelectedBackImage(true);
  };

  useEffect(() => {
    if (licenseNumber && date && FrontImagePhoto && BackImagePhoto) {
      setData({
        date: date,
        licenseNumber: licenseNumber,
        frontImagePhoto: FrontImagePhoto,
        backImagePhoto: BackImagePhoto,
      });
      setMakeBool({ ...makebool, info: true });
      setShow(true);
    } else {
      setShow(false);
    }
  }, [licenseNumber, date, FrontImagePhoto, BackImagePhoto]);

  const Next_info = async () => {
    try {
      // await Servicess.setUserInfo(data);
      await TruckerDBServices.setDriverLicenseDBInfo(data);
      await TruckerServices.setDrtiverLicenseInfo(makebool);
      navigation.navigate("Trucker_info");
    } catch (e) {
    } finally {
      // Set data to database
      setData();
      // And if we want to  go Login we use  Servicess.Logout(); with + navigation.navigate("LoginClient");
      // navigation.navigate("HomeClient");
    }
  };

  const handleLogout = () => {
    TruckerServices.Logout();
    navigation.navigate("ClientOrTrucker");
  };

  return (
    <View className="pt-12">
      <ScrollView>
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
        <View className="mx-auto">
          <Text className="text-2xl font-bold">Driver License info</Text>
        </View>
        <View className="space-y-2 flex-column mx-auto w-full p-4 ">
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Driver License Number"
            onChangeText={(text) => setLicenseNumber(text)}
          />
          <View className="w-full h-64 rounded-md bg-white p-2">
            <Text className="mx-auto text-gray-500 font-bold text-md">
              The front of driver's license
            </Text>
            {selectedImage ? (
              <Image
                source={{ uri: FrontImagePhoto }}
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
              onPress={pickFrontImage}
              style={styles.border}
              className="mx-auto mt-2 p-1 rounded-lg"
            >
              <Text className="text-lg text-orange-400 ">Add a Photo</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full h-64 rounded-md bg-white p-2">
            <Text className="mx-auto text-gray-500 font-bold text-md">
              The back of driver's license
            </Text>
            {selectedBackImage ? (
              <Image
                source={{ uri: BackImagePhoto }}
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
              onPress={pickBackImage}
              style={styles.border}
              className="mx-auto mt-2 p-1 rounded-lg"
            >
              <Text className="text-lg text-orange-400 ">Add a Photo</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onClick}
            className="w-full flex-row space-x-2 items-center h-14 rounded-md bg-white p-2"
          >
            <Fontisto name="date" size={24} color="gray" />
            <Text className="text-gray-400 font-bold mt-2 text-lg ">
              Date of expirtation
            </Text>
          </TouchableOpacity>
          {showPicker ? (
            <DateTimePicker
              mo="date"
              display="spinner"
              value={new Date()}
              onChange={onChange}
            />
          ) : null}
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
        <Text className="text-sm text-gray-600 mx-auto mt-4 px-4">
          By tapping Done I Agree with Terms and Conditions , I acknowledge and
          agree with passing and transfer of personal data according to
          conditions of Privacy Policy
        </Text>
      </ScrollView>
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
  border: {
    borderWidth: 2,
    borderColor: "orange",
  },
});

export default Driver_License;
