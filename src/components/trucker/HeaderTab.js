import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { MenuContext } from "./Menu";
import Servicess from "../../Shared/Servicess";
import TruckerServices from "../../Shared/TruckerServices";
import * as Location from "expo-location";
import axios from "axios";

const HeaderTap = ({ appinfo }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState("");
  const [isSetPhoto, setIsSetPhoto] = useState(true);
  const toggleMenu = useContext(MenuContext);

  useEffect(() => {
    const getLocationAndAddress = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=03394454ec0881efd19fd262c64a69cc`
        );

        if (response.data && response.data.length > 0) {
          const address = `${response.data[0].name}, ${response.data[0].state}`;
          setAddress(address);
        } else {
          throw new Error("Invalid response from OpenWeatherMap API");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        Alert.alert("Error", "Failed to fetch location. Please try again later.");
        setAddress("Error fetching location");
      }
    };

    getLocationAndAddress();
  }, []);

  useEffect(() => {
    // try {
    //   TruckerServices.getBasicInfo().then((res) => {
    //     setCity(res["city"]);
    //     setCountry(res["country"]);
    //   });
    // } catch (e) {
    //   setErrorMsg("Error fetching location");
    // }
  }, []);

  return (
    <View>
      <View
        style={[{ width: "100%", height: 70 }, styles.shadowTop]}
        className="bg-orange-50 mt-12 justify-between rounded-lg px-4 flex-row"
      >
        <View className="justify-center mr-1">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={toggleMenu}
          >
            <View
              // style={styles.shadow}
              className="items-center justify-center w-10 h-10 bg-white rounded-lg"
            >
              <Image
                source={require("../../../assets/imageApp/menu.png")}
                className="w-10 h-10"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="justify-center mr-14">
          <Text className="text-orange-900 text-lg font-bold">Location</Text>
          {/* our location from home context */}
          {address ? (
            <Text className="text-sm text-gray-500">{address}</Text>
          ) : null}
        </View>
        {/* Default case in Registre */}
        <View className="justify-center">
          <TouchableOpacity className="items-center justify-center">
            {isSetPhoto ? (
              <View
                style={[styles.user, styles.shadow]}
                className="items-center justify-center"
              >
                <Image
                  source={require("../../../assets/imageApp/user.jpg")}
                  style={[styles.user, styles.shadow]}
                  className="w-12 h-12 "
                />
              </View>
            ) : (
              <View
                style={[styles.user, styles.shadow]}
                className="bg-yellow-500 border-2 border-white w-12 h-12 items-center justify-center"
              >
                <Text className="text-2xl text-black font-bold">A</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowTop: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  user: {
    borderRadius: 40,
  },
});

export default HeaderTap;
