import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CardHistory from "../../../components/trucker/CardHistory";

const History = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: 30 }]}>
        <Text style={styles.headerText}>My Course</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("Trucker_vision");
          }}
        >
          <Feather name="arrow-right-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <CardHistory/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    width: 30,
    height: 30,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "orange",
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

export default History;
