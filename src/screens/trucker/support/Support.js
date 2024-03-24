import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, Feather, AntDesign, FontAwesome } from "@expo/vector-icons";

const Support = ({ navigation }) => {
  const data = [
    {
      id: "1",
      title: "Phone",
      description: "+213 55200000",
      iconName: <Feather name="phone-call" size={24} color="black" />,
    },
    {
      id: "2",
      title: "Message",
      description: "taharhadji99@gmail.com",
      iconName: <Feather name="message-square" size={24} color="black" />,
    },
    {
      id: "3",
      title: "Q.A",
      description: "Description for issue 1",
      iconName: <AntDesign name="questioncircleo" size={24} color="black" />,
    },
    {
      id: "4",
      title: "Facebook",
      description: "Hadji Mohamed",
      iconName: <FontAwesome name="facebook-f" size={24} color="black" />,
    },
  ];

  const renderSupportItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.iconName}
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: 30 }]}>
        <TouchableOpacity
          // onPress={() => navigation.navigate("Trucker_vision")}
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Ionicons name="arrow-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Support</Text>
        <View style={styles.headerRight}></View>
      </View>
      <FlatList
        data={data}
        renderItem={renderSupportItem}
        keyExtractor={(item) => item.id}
      />
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemDescription: {
    color: "#666",
  },
});

export default Support;
