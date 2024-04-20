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
  Button,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  MaterialIcons,
  Feather,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import Servicess from "../../../Shared/Servicess";

//This is TomTom api from web view
import { WebView } from "react-native-webview";
import MapComponentHTML from "../../../components/Template/map-template";
import { axios } from "axios";

const Truck_Search = () => {
  const StartPoint = useMemo(() => ["18%" , "40%"], []);
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  //TomTom Api map
  let webRef = null || {};
  let [mapCenter, setMapCenter] = useState("-121.913, 37.361");
  const [destination, setDestination] = useState("");
  const [manageHistory, setManageHistory] = useState([]);

  const ApiDataLocation = {
    Latitude: Latitude,
    Longitude: Longitude,
  };

  const jsCode = `handleDestinationPosition(${parseFloat(
    Longitude
  )}, ${parseFloat(Latitude)})`;

  // var jsCode2;
  const onButtonPress = () => {
    jsCode2 = `
    if (typeof handleDestinationPosition === 'function') {
      delete window.handleDestinationPosition;
      handleShowOnMap(${parseFloat(Longitude)}, ${parseFloat(Latitude)})
    }
  `;
  };
  console.log(manageHistory);

  const handleMapEvent = (data) => {
    const {duration, distance, data: searchLocation } = JSON.parse(data.nativeEvent.data);
    setDestination(searchLocation);
    setManageHistory([...manageHistory, searchLocation]);
    console.log(distance + ' km  |  ' + duration + " min ");
  };

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

  let initialRegion = {
    latitude: Latitude || 36.7642,
    longitude: Longitude || 3.1468,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (Latitude && Longitude) {
    text = `Latitude: ${Latitude}, Longitude: ${Longitude}`;
  }

  return (
    <View style={styles.container}>
      {/* Here we  add our tom tom api from web  view */}
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
            style={styles.shadowProp}
            className="w-80 mx-auto h-20 flex-column bg-white rounded-xl px-3"
          >
            <View
              style={{ borderBottomColor: "gray", width: "100%" }}
              className=" border-b-2 mx-auto h-10 flex-row items-center space-x-2"
            >
              <MaterialIcons name="my-location" size={24} color="orange" />
              <TextInput
                placeholder="My Location"
                value={`${city}, ${country}`}
              />
            </View>
            <View className=" w-80 mx-auto h-10 flex-row items-center space-x-3">
              <FontAwesome5 name="location-arrow" size={20} color="orange" />
              <ScrollView>
                <TextInput
                  style={{ width: 260 }}
                  placeholder="Search Location"
                  selection={{ start: 0, end: 0 }}
                  value={destination}
                />
              </ScrollView>
            </View>
          </View>
          {/* show on map */}
          <View style={{ marginLeft: -180 }}>
            <TouchableOpacity
              onPress={onButtonPress}
              className="flex-row space-x-3 mt-4 items-center"
            >
              <FontAwesome name="map-pin" size={24} color="orange" />
              <Text>Show on Map</Text>
            </TouchableOpacity>
          </View>
          {/* History Location  */}
          <Text
            style={{ marginLeft: -180 }}
            className="text-gray-500 mt-6 mb-2 text-lg"
          >
            Recent Research
          </Text>
          <ScrollView horizontal={false}>
            <View style={{ marginLeft: -20 }}>
              {manageHistory.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <View className="flex-row mx-12 mt-2 mb-4 space-x-4 items-center ">
                    <FontAwesome name="map-marker" size={24} color="orange" />
                    <View
                      style={{
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                      }}
                      className="flex-column w-64 mb-2 pb-2"
                    >
                      <Text className="text-gray-700 text-md ">{item}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          <View className="w-full mx-14 items-center">
            <TouchableOpacity
              className="w-full h-12 rounded-xl bg-orange-800 py-2 px-4"
              onPress={() => navigation.navigate("SearchingDriver")}
            >
              <Text className="text-center font-bold text-white text-lg">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
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

export default Truck_Search;

{
  /* <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {/* Add markers here if needed
        {Latitude && Longitude && (
          <Marker
            coordinate={{ latitude: Latitude, longitude: Longitude }}
            title="Marker Title"
            description="Marker Description"
          />
        )}
      </MapView> */
}
{
  /* <View>
        <TextInput
          className="h-20"
          onChangeText={setMapCenter}
          value={mapCenter}
        ></TextInput>
        <Button title="Set Center" onPress={onButtonPress}></Button>
      </View> */
}
