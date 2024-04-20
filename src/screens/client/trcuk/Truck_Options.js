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
import MapComponentHTML from "../../../components/Template/map-template";
import GlobalApi from "../../../Shared/GlobalApi";

const Truck_Options = () => {
  const StartPoint = useMemo(() => ["38%", "50%", "80%"], []);
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);

  //TomTom Api map
  let webRef = null || {};
  let [mapCenter, setMapCenter] = useState("-121.913, 37.361");
  const [destination, setDestination] = useState("");
  const [manageHistory, setManageHistory] = useState([]);
  const [trucker, serTrucker] = useState();

  const ApiDataLocation = {
    Latitude: Latitude,
    Longitude: Longitude,
  };

  const handleMapEvent = (data) => {
    const {
      duration,
      distance,
      data: searchLocation,
    } = JSON.parse(data.nativeEvent.data);
    setDestination(searchLocation);
    setManageHistory([...manageHistory, searchLocation]);
    console.log(distance + " km  |  " + duration + " min ");
  };
  const jsCode = `
          handleDestinationPosition(${parseFloat(Longitude)}, ${parseFloat(Latitude)});
        `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalApi.getTruckerInfoData();
        response.data.forEach((item) => {
          console.log(item.attributes.Location);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [Latitude, Longitude]);

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
          <View
            style={{ borderLeftColor: "orange", borderLeftWidth: 4 }}
            className="flex-row w-80 h-20 bg-gray-100 rounded-xl mb-2 justify-between pr-4 items-center"
          >
            <View className="flex-column pl-10 py-2 justify-between">
              <FontAwesome5 name="truck-loading" size={34} color="orange" />
              <Text>Stander</Text>
            </View>
            <View className="mx-auto">
              <Text className="text-lg text-black font-bold">793DA</Text>
            </View>
            <View className="bg-yellow-300 rounded-xl w-11 itmes-center justify-center h-6">
              <Text className="text-md text-center font-bold text-white">
                4 min
              </Text>
            </View>
          </View>
          <View
            style={{ borderLeftColor: "orange", borderLeftWidth: 4 }}
            className="flex-row w-80 h-20 bg-gray-100 rounded-xl mb-2 justify-between pr-4 items-center"
          >
            <View className="flex-column pl-10 py-2 justify-between">
              <FontAwesome6 name="truck-plane" size={34} color="orange" />
              <Text>Stander</Text>
            </View>
            <View className="mx-auto">
              <Text className="text-lg text-black font-bold">800DA</Text>
            </View>
            <View className="bg-yellow-300 rounded-xl w-11 itmes-center justify-center h-6">
              <Text className="text-md text-center font-bold text-white">
                4 min
              </Text>
            </View>
          </View>
          <View
            style={{ borderLeftColor: "orange", borderLeftWidth: 4 }}
            className="flex-row w-80 h-20 bg-gray-100 rounded-xl mb-2 justify-between pr-4 items-center"
          >
            <View className="flex-column pl-10 py-2 justify-between">
              <MaterialCommunityIcons
                name="tow-truck"
                size={44}
                color="orange"
              />
              <Text>Stander</Text>
            </View>
            <View className="mx-auto">
              <Text className="text-lg text-black font-bold">543DA</Text>
            </View>
            <View className="bg-yellow-300 rounded-xl w-11 itmes-center justify-center h-6">
              <Text className="text-md text-center font-bold text-white">
                4 min
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <View style={styles.shadowProp} className="bg-white h-20 pt-4">
        <View className="w-80 h-10 bg-orange-400 rounded-xl items-center justify-center pt-4 ml-6">
          <TouchableOpacity
            className="w-full h-10 items-center pt-1"
            onPress={() => {
              navigation.navigate("RideReady");
            }}
          >
            <Text className="text-center text-white font-bold text-md">
              Order Now
            </Text>
          </TouchableOpacity>
        </View>
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
