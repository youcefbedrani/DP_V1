import { Platform, View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import HeaderTap from "../../../components/trucker/HeaderTab";
import WelcomeMessage from "../../../components/trucker/WelcomeMessage";
import Services from "../../../components/trucker/Services";
import Ads_Card from "../../../components/Ads_Card";
import Menu from "../../../components/Menu";
import { useNavigation } from "@react-navigation/native";
import TruckerServices from "../../../Shared/TruckerServices";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Trucker_vision = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await TruckerServices.getBasicInfo();
      console.log(response.firstName);
      setUserName(response.firstName);
    };
    fetchData();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    console.log(expoPushToken);
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { data } = notification.request.content;

        console.log(`Data received with notification: ${JSON.stringify(data)}`);

        if (data.notificationType === "ride_request") {
          const {
            username,
            userToken,
            currentLocation,
            destinationLocation,
            totalDistance,
            cost,
          } = data;

          navigation.navigate("Requsete_course", {
            username: username,
            userToken: userToken,
            currentLocation: currentLocation,
            destinationLocation: destinationLocation,
            totalDistance: totalDistance,
            cost: cost,
          });
        } else {
          console.log(
            "Notification type is not 'ride_request'. Ignoring the notification."
          );
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Menu navigation={navigation} role="trucker">
      <View className="flex-1 bg-white items-center px-4">
        <HeaderTap />
        <ScrollView
          vertical
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <WelcomeMessage name={userName} />
          <Services navigation={navigation} />
          <View
            style={{ width: "100%", marginBottom: 170 }}
            className="flex-column h-40 justify-between"
          >
            <Ads_Card
              icon={require("../../../../assets/imageApp/car-service.png")}
              imgUrl={require("../../../../assets/imageApp/ads1.png")}
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
              icon={require("../../../../assets/imageApp/car-service.png")}
              imgUrl={require("../../../../assets/imageApp/ads1.png")}
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
              icon={require("../../../../assets/imageApp/car-service.png")}
              imgUrl={require("../../../../assets/imageApp/ads1.png")}
              title="Thanks to you"
              subTitle="We thank you for your trust"
              short_descrption="Depenage Dz has been voted product of the year 2024"
            />
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </Menu>
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

export default Trucker_vision;
