import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons ,FontAwesome } from "@expo/vector-icons";

const MonthlyTotal = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: 40 }]}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}

        style={styles.goBackButton}
        >
        <Ionicons name="arrow-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Monthly Total</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.normalText}>January</Text>
        <Text style={styles.boldOrangeText}>390809,00 DA</Text>
        <View style={styles.doubleItemContainer}>
          <View style={styles.leftItem}>
            <Text style={styles.itemTextTop}>Courses</Text>
            <Text style={styles.itemTextBottom}>29</Text>
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.itemTextTop}>Duration </Text>
            <Text style={styles.itemTextBottom}>40 h</Text>
          </View>
        </View>
        <Text style={styles.normalText}>Free DapanageDZ</Text>
        <Text style={styles.boldOrangeText}>900 DA</Text>
      </View>
      <TouchableOpacity style={styles.bankPaymentButton}>
        <Text style={styles.bankPaymentText}>Bank Payment</Text>
        <FontAwesome name="bank" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    marginTop: 30,
    padding: 10,
  },
  goBackButton: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flex: 0.9,
    marginTop: 20,
    alignItems: "center",
    justifyContent:"space-start",
  },
  normalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
  },
  boldOrangeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "orange",
    marginTop: 20,

  },
  doubleItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftItem: {
    flex: 1,
    marginRight: 10,
  },
  rightItem: {
    flex: 1,
    marginLeft: 10,
  },
  itemTextTop: {
    textAlign: "center",
  },
  itemTextBottom: {
    textAlign: "center",
    marginTop: 5,
  },
  bankPaymentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dcdcdc",
    marginVertical: 20,
    marginHorizontal:10,
    padding: 10,
  },
  bankPaymentText: {
    marginRight: 10,
  },
});

export default MonthlyTotal;