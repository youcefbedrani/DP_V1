import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Income = ({navigation}) => {
  const data = [
    { id: "1", month: "January", amount: 1000 },
    { id: "2", month: "February", amount: 1500 },
    { id: "3", month: "March", amount: 1200 },
    { id: "4", month: "April", amount: 1800 },
    { id: "5", month: "May", amount: 2000 },
    { id: "6", month: "June", amount: 1700 },
    { id: "7", month: "July", amount: 1900 },
    { id: "8", month: "August", amount: 1600 },
    { id: "9", month: "September", amount: 2200 },
    { id: "10", month: "October", amount: 2500 },
    { id: "11", month: "November", amount: 2100 },
    { id: "12", month: "December", amount: 2300 },
  ];

  const renderIncomeItem = ({ item }) => (
    <TouchableOpacity
     style={styles.itemContainer}
     onPress={() => navigation.navigate("MonthlyTotal")}
     >
      <Text style={styles.month}>{item.month}</Text>
      <Text style={styles.amount}>{item.amount}</Text>
      <Text style={styles.paidText}>Paid</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: 40 }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Trucker_vision")}
          style={styles.goBackButton}
        >
          <Ionicons name="arrow-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Income</Text>
        <View style={styles.headerRight}></View>
      </View>
      <FlatList
        data={data}
        renderItem={renderIncomeItem}
        keyExtractor={(item) => item.id}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#dcdcdc",
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  goBackButton: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  month: {
    flex: 1,
  },
  amount: {
    flex: 1,
    textAlign: "center",
  },
  paidText: {
    flex: 1,
    textAlign: "right",
    color:"#FBD50E",
    fontWeight:"900",
  },
});

export default Income;
