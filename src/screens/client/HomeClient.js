import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import HeaderTap from "../../components/HeaderTab";
import WelcomeMessage from "../../components/WelcomeMessage";
import Services from "../../components/Services";
import Ads_Card from "../../components/Ads_Card";
import Menu from "../../components/Menu";
import { AuthContext } from "../../Context/client/AuthContext";
import Servicess from "../../Shared/Servicess";
import { InfoContext } from "../../Context/client/InfoContext";
import * as Location from "expo-location";
import axios from "axios";

const HomeClient = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [userInfo, setUserInfo] = useState();
  const [appInfo, setAppInfo] = useState();

  const [UserLocation, setUserLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState("");

  const appData = {
    Longitude : Longitude,
    Latitude : Latitude,
    city: city,
    country: country,
  };

  const apiKey = "45463da440d2a1cfdc30097314dc9625";
  //set user information to local storage
  useEffect(() => {
    Servicess.getUserAuth().then((res) => {
      if (res) {
        setUserData(res);
      } else {
        setUserData(null);
      }
    });
    Servicess.getUserInfo().then((res) => {
      if (res) {
        setUserInfo(res);
      } else {
        setUserInfo(null);
      }
    });
    Servicess.getApp().then((res) => {
      if (res) {
        setAppInfo(res);
      } else {
        setAppInfo(null);
      }
    });
  }, []);
  // get user location information
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (error) {
        setErrorMsg("Error fetching location");
      }
    })();
  }, []);

  let initialRegion = {
    latitude: Latitude || 36.7642,
    longitude: Longitude || 3.1468,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
  // set city and country for user
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${Latitude}, Longitude: ${Longitude}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${Latitude}&lon=${Longitude}&limit=1&appid=${apiKey}`
        );
        const data = response.data;
        if (data.length > 0) {
          const cityName = data[0].name;
          const countryName = data[0].country;
          const countryResponse = await axios.get(
            `https://restcountries.com/v3/alpha/${countryName}`
          );
          const countryData = countryResponse.data;
          if (countryData.status !== 404) {
            const countryName = countryData[0].name.common;
            setCity(cityName);
            setCountry(countryName);
            await Servicess.setApp(appData);
          }
        } else {
          setError("City not found");
        }
      } catch (error) {
        setError("Error fetching city");
      }
    };

    fetchData();
  }
  return (
    <>
      <AuthContext.Provider value={{ userData, setUserData }}>
        <InfoContext.Provider value={{ userInfo, setUserInfo }}>
          <Menu navigation={navigation} role="client">
            <View className="flex-1 bg-white items-center px-4">
              <HeaderTap/>
              <ScrollView
                vertical
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
              >
                <WelcomeMessage />
                <Services appinfo={appInfo} />
                <View
                  style={{ width: "100%", marginBottom: 170 }}
                  className="flex-column h-40 justify-between"
                >
                  <Ads_Card
                    icon={require("../../../assets/imageApp/car-service.png")}
                    imgUrl={require("../../../assets/imageApp/ads1.png")}
                    title="Thanks to you"
                    subTitle="We thank you for your trust"
                    short_descrption="Depenage Dz has been voted product of the year 2024"
                  />
                </View>
                <View
                  style={{ marginBottom: 140 }}
                  className="flex-column w-full h-40 justify-between"
                >
                  <Ads_Card
                    icon={require("../../../assets/imageApp/car-service.png")}
                    imgUrl={require("../../../assets/imageApp/ads1.png")}
                    title="Thanks to you"
                    subTitle="We thank you for your trust"
                    short_descrption="Depenage Dz has been voted product of the year 2024"
                  />
                </View>
                <View
                  style={{ marginBottom: 180 }}
                  className="flex-column w-full h-40 justify-between"
                >
                  <Ads_Card
                    icon={require("../../../assets/imageApp/car-service.png")}
                    imgUrl={require("../../../assets/imageApp/ads1.png")}
                    title="Thanks to you"
                    subTitle="We thank you for your trust"
                    short_descrption="Depenage Dz has been voted product of the year 2024"
                  />
                </View>
              </ScrollView>
              <StatusBar style="auto" />
            </View>
          </Menu>
        </InfoContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    width: "100%",
    flexDirection: "column",
    paddingTop: 12,
    paddingHorizontal: 15,
  },
});

export default HomeClient;
