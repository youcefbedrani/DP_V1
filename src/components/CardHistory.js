import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CardHistory = () => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.date}>March 8, 2023</Text>
      <View style={styles.line} />
      <View style={styles.row}>
        <Text style={styles.time}>10:00 AM</Text>
        <View style={styles.circle} />
        <Text style={styles.location}>New York City</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.row}>
        <Text style={styles.time}>11:00 AM</Text>
        <View style={styles.circle} />
        <Text style={styles.location}>Los Angeles</Text>
      </View>
    </View>
  );
};

export default CardHistory;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "yellow",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  time: {
    fontSize: 16,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  location: {
    fontSize: 16,
  },
  verticalLine: {
    width: 1,
    height: 50,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
});
