import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const CardPreference = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          {/* <Image source={require('../assets/user.png')} style={styles.icon} /> */}
          <View style={styles.icon}>
            <Entypo name="address" size={24} color="white" />
          </View>
          <Text style={styles.name}>Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.icon}>
            <Entypo name="heart" size={24} color="white" />
          </View>
          <Text style={styles.name}>Favorite Stops</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.icon}>
          <MaterialIcons name="schedule" size={24} color="white" />
          </View>
          <Text style={styles.name}>Scheduling</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.icon}>
            <FontAwesome name="support" size={24} color="white" />
          </View>
          <Text style={styles.name}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  card: {
    flex: 1,
    backgroundColor:"#FFFFFF",
    // borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    borderRadius: 50,
    textAlign: "center",
  },
  name: {
    fontSize: 16,
  },
});

export default CardPreference;
