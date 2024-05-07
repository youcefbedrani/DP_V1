import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  MaterialIcons,
  Feather,
  FontAwesome5,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Servicess from "../../../Shared/Servicess";
import { WebView } from "react-native-webview";
import MapComponentHTML from "../../../components/Template/map-trucker";
import GlobalApi from "../../../Shared/GlobalApi";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";

const Truck_Options = () => {
  const StartPoint = useMemo(() => ["38%", "50%", "80%"], []);
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);

  //Api map
  let webRef = null || {};
  let [mapCenter, setMapCenter] = useState("-121.913, 37.361");
  const [destination, setDestination] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [manageHistory, setManageHistory] = useState([]);
  const [trucker, serTrucker] = useState();
  const [truckerdb, settruckerdb] = useState([]);
  const [truckerNow, setTruckerNow] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [clickedTruckers, setClickedTruckers] = useState([]);
  const [fetchDataTrip, setFetchDataTrip] = useState([]);
  const [truckerToken, setTruckerToken] = useState("");

  const ApiDataLocation = {
    Latitude: Latitude,
    Longitude: Longitude,
  };

  const handleMapEvent = (data) => {
    const {
      duration,
      distance,
      data: searchLocation,
      Location,
    } = JSON.parse(data.nativeEvent.data);
    setManageHistory([...manageHistory, searchLocation]);
    setDestination(distance + " km");
    console.log(distance + " km  |  " + duration + " min ", data, Location);
  };

  let jsCode = `handleRequest(${parseFloat(
    ApiDataLocation.Latitude
  )}, ${parseFloat(ApiDataLocation.Longitude)});`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalApi.getProvedTrucker();
        // settruckerdb(response);
        const onlineTruckers = response.data.filter(
          (trucker) => trucker.attributes.Online === true
        );
        onlineTruckers.forEach((item) => {
          const lat = item.attributes.Location.lat;
          const long = item.attributes.Location.long;
          const trucker_info = item.attributes.firstname + "-" + item.id;
          console.log(lat + long + trucker_info);
        });
        response.data.forEach((trucker, index) => {
          settruckerdb(response.data);
        });
        // trip information from client to trucker
        const fetchTrip = await Servicess.getTripInfo();
        console.log(fetchTrip);
        setFetchDataTrip(...fetchDataTrip, fetchTrip);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const anyTruckerClicked = clickedTruckers.some((truck) => truck === true);
    setIsClicked(anyTruckerClicked);
  }, [Latitude, Longitude]);

  console.log(fetchDataTrip.duration);

  // if distance is less than 10km ===> 1km = 300da done
  // if distance is more than 10km ===> 1km = 250da done
  // if distance is more than 10km and less than 50km ===> 1km = 200da done
  // if distance is more than 50km and less than 200km ===> 1km = 150da done
  // if distance is more than 200km ===> 1km = 100da

  // exp:  distance == fetchDataTrip.distance == 8.579 km > 8.6 km
  // 1km = 300 da ||||| => 2580 da for 8.6 km

  let price = 0;
  let distanceKM = parseFloat(fetchDataTrip.distance);
  let OneKM = 0;

  if (distanceKM < 10) {
    OneKM = 300;
    price = OneKM * distanceKM;
  } else if (distanceKM >= 10 && distanceKM <= 50) {
    OneKM = 250;
    price = OneKM * distanceKM;
  } else if (distanceKM > 50 && distanceKM <= 200) {
    OneKM = 200;
    price = OneKM * distanceKM;
  } else if (distanceKM > 200) {
    OneKM = 150;
    price = OneKM * distanceKM;
  } else {
    // Default case
    OneKM = 100;
    price = OneKM * distanceKM;
  }

  // Later we add the price according to the trucker rating and hours work

  //  H E R E

  useEffect(() => {
    try {
      Servicess.getApp().then((res) => {
        setLatitude(res["Latitude"]);
        setLongitude(res["Longitude"]);
        setCity(res["city"]);
        setCountry(res["country"]);
      });
    } catch (e) {
      setErrorMsg("Error fetching location");
    }
  }, []);

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

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${Latitude}, Longitude: ${Longitude}`;
  }
  // renders

  const hamdleorder = (data) => {
    setIsClicked(true);
    // setTruckerNow(data);
    console.log(data);
    // Alert.alert("You have selecte trucker Order now!");
  };

  const handleTruckerClick = (index) => {
    setClickedTruckers((prevState) => {
      const updatedClickedTruckers = [...prevState];
      updatedClickedTruckers[index] = !updatedClickedTruckers[index];
      return updatedClickedTruckers;
    });
  };

  // we need the trucker expo_notification we import it from database
  const sendPushNotification = async (expoPushToken) => {
    const tripInfo = await Servicess.getTripInfo();
    const username = tripInfo.username;
    const userToken = tripInfo.expo_push_token;

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "New ride request!",
      body: "You have a new ride request",
      data: {
        username: username,
        userToken: userToken,
        notificationType: "ride_request",
        currentLocation: ApiDataLocation,
        destinationLocation: destination,
        totalDistance: totalDistance,
        cost: price,
      },
    };

    try {
      const response = await axios.post(
        "https://exp.host/--/api/v2/push/send",
        message
      );
    } catch (error) {
      console.error(error);
    }
  };

  const OrderNow = async () => {
    console.log(truckerToken);
    await sendPushNotification(truckerToken);
    // Continue with other actions
  };
  // Tell me about the trucker position and how much came to me ==> {trucker lat and long and make route with it} then if he came tell me that he come to my position
  // Send notification to trucker that i want him to pick me in this position {lat and long} and go to my destination location { with lat and long }
  //navigation.navigate("RideReady");
  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        ref={(ref) => {
          this.webview = ref;
        }}
        onMessage={handleMapEvent}
        mixedContentMode="compatibility"
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        injectedJavaScript={jsCode}
        source={{ html: MapComponentHTML }}
      />
      <BottomSheet
        snapPoints={StartPoint}
        handleIndicatorStyle={{ backgroundColor: "orange" }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView className="flex-1">
            {truckerdb
              .filter((trucker) => trucker.attributes.Online === true)
              .map((trucker, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    hamdleorder(trucker.attributes.Location);
                    handleTruckerClick(index);
                    setTruckerToken(trucker.attributes.expo_push_token.token);
                  }}
                  style={{
                    borderLeftColor: "orange",
                    borderLeftWidth: 4,
                    backgroundColor: clickedTruckers[index]
                      ? "orange"
                      : "rgb(243, 244, 246)",
                  }}
                  className="flex-row w-80 h-20 bg-gray-100 rounded-xl mb-2 justify-between pr-4 items-center"
                >
                  <View className="flex-column pl-10 py-2 justify-between">
                    <MaterialCommunityIcons
                      name="tow-truck"
                      size={40}
                      color={clickedTruckers[index] ? "white" : "orange"}
                    />
                    <Text className="text-black mx-auto font-bold">
                      {trucker.attributes.firstname}_{trucker.id}
                    </Text>
                  </View>
                  <View className="mx-auto">
                    <Text key={index} className="text-lg text-black font-bold">
                      {price}DA
                    </Text>
                  </View>
                  <View className="bg-yellow-300 rounded-xl w-11 itmes-center justify-center h-6">
                    <Text className="text-md text-center font-bold text-white">
                      {fetchDataTrip.duration} min
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
      <View style={styles.shadowProp} className="bg-white h-20 pt-4">
        {isClicked ? (
          <View className="w-80 h-10 bg-orange-400 rounded-xl items-center justify-center pt-4 ml-6">
            <TouchableOpacity
              className="w-full h-10 items-center pt-1"
              onPress={OrderNow}
            >
              <Text className="text-center text-white font-bold text-md">
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View>
          <Text
            style={{ fontSize: 12 }}
            className="text-gray-300 text-sm text-center"
          >
            I Accept the general conditions and the privacy policy
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#f5f3ee",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default Truck_Options;
