import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import TruckerServices from "../../Shared/TruckerServices";
import { useNavigation } from "@react-navigation/native";

const Services = () => {
  const navigation = useNavigation();

  const [online, setOnline] = useState(false);
  const [porfit, setProfit] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await TruckerServices.getTruckerInfo();
      setProfit(response.NetProfit);
      setOnline(response.Online);
    };
    fetchData();
  }, []);

  const makeOffLine = () => {
    setOnline(false);
  };
  const makeOnline = () => {
    setOnline(true);
  };
  return (
    <View>
      <View style={styles.shadow} className="bg-white rounded-lg p-2">
        <Text className="text-black text-xl font-bold">Net Profit :</Text>
        {porfit ? (
          <Text className="text-black font-bold text-2xl">{porfit} DA</Text>
        ) : null}
      </View>
      <View className="flex-row my-4 mr-10">
        {online ? (
          <Text className="text-lg text-orange-900 font-bold">
            You are in the servise :
          </Text>
        ) : (
          <Text className="text-lg text-orange-900 font-bold">
            You are out of the servise :
          </Text>
        )}
      </View>
      <View style={{ width: "100%" }} className="flex-row space-x-3">
        <TouchableOpacity
          style={{
            width: "43%",
            height: 100,
            shadowColor: "#000",
            shadowOffset: { width: 10, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          className="bg-white items-center justify-center rounded-md flex-column space-y-1"
          onPress={() => {
            navigation.navigate("");
            makeOnline();
          }}
        >
          <FontAwesome
            name="power-off"
            size={44}
            color={online ? "green" : "gray"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "43%",
            height: 100,
            shadowColor: "#000",
            shadowOffset: { width: 10, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          className="bg-white items-center justify-center rounded-md flex-column space-y-1"
          onPress={() => {
            navigation.navigate("Requsete_course");
            makeOffLine();
          }}
        >
          <FontAwesome
            name="power-off"
            size={44}
            color={!online ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Services;
