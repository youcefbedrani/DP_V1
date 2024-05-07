import {
  View,
  Platform,
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
import GlobalApi from "../../../Shared/GlobalApi.js";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  return token;
}

const Set_Info = () => {
  const navigation = useNavigation();
  const [strapiImage, setStrapiImage] = useState("");

  const [show, setShow] = useState(false);
  const [truckerInfo, setTruckerInfo] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState(false);
  const [files, setFiles] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    if (truckerInfo && vehicleInfo) {
      setShow(truckerInfo);
    } else {
      setShow(false);
    }
  }, [truckerInfo, vehicleInfo]);

  useEffect(() => {
    const handleinfo = async () => {
      try {
        const Trucker = await TruckerServices.getTruckerInfo();
        const Tow = await TruckerServices.getTowInfo();
        const TruckerTowInfo = await TruckerDBServices.getVehicleDBInfo();
        const TruckerDriverLicenseInfo =
          await TruckerDBServices.getDriverLicenseDBInfo();
        const TruckerBasicInfo = await TruckerDBServices.getBasicDBInfo();

        setTruckerInfo(Trucker.info);
        setVehicleInfo(Tow.info);

        const getToken = async () => {
          const token = await registerForPushNotificationsAsync();
          // Now you can use the token for whatever purpose you need
          const truckerInfoSent = {
            firstname: TruckerBasicInfo["firstname"],
            lastname: TruckerBasicInfo["lastname"],
            birthdate: TruckerBasicInfo["birthDay"],
            email: TruckerBasicInfo["email"],
            password: TruckerBasicInfo["password"],
            number: TruckerBasicInfo["phoneNumber"],
            DriveLicenceDataExpiration: TruckerDriverLicenseInfo["date"],
            License_Number: TruckerDriverLicenseInfo["licenseNumber"],
            Certificate_Number: TruckerTowInfo["numberCirtificate"],
            Tow_Transport: TruckerTowInfo["transport"],
            Number_Plate: TruckerTowInfo["numberPlate"],
            expo_push_token: { token: token },
          };

          await GlobalApi.setTruckerInfo(truckerInfoSent)
            .then(() => {
              console.log("seccuess");
            })
            .catch((e) => {
              console.log(e);
            });
        };

        getToken();

        console.log(truckerToken);

        console.log(truckerInfoSent);
        const req = await GlobalApi.getTruckerInfoData();
        console.log(req.data);

        //upload files to strapi
      } catch (e) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data");
      }
    };
    handleinfo();
  }, []);

  const handleLogout = () => {
    TruckerServices.Logout();
    navigation.navigate("ClientOrTrucker");
  };

  const handlSubmit = () => {
    navigation.navigate("WaitResponse");
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
      <View className="m-auto mt-14">
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => navigation.navigate("Trucker_Info")}
          disabled={truckerInfo}
          className="flex-row px-4 items-center justify-between w-80 h-14 bg-gray-100 mb-2 rounded-lg"
        >
          <FontAwesome6 name="users-viewfinder" size={24} color="black" />
          <Text className="mr-24 text-center font-bold">Trucker Info</Text>
          {truckerInfo ? (
            <FontAwesome name="check-circle" size={24} color="green" />
          ) : (
            <AntDesign name="right" size={24} color="orange" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => navigation.navigate("Tow_Infos")}
          disabled={vehicleInfo}
          className="flex-row px-4 items-center justify-between w-80 h-14 bg-gray-100 mb-2 rounded-lg"
        >
          <MaterialCommunityIcons name="tow-truck" size={24} color="black" />
          <Text className="mr-24 text-center font-bold">Vehicle Info</Text>
          {vehicleInfo ? (
            <FontAwesome name="check-circle" size={24} color="green" />
          ) : (
            <AntDesign name="right" size={24} color="orange" />
          )}
        </TouchableOpacity>
        {show ? (
          <View className="mx-2 my-4 rounded-xl">
            <TouchableOpacity
              onPress={handlSubmit}
              style={{ height: 45 }}
              className="bg-orange-500 pt-2 rounded-xl"
            >
              <Text className="mx-auto text-white text-lg">
                Submit Your Application
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
