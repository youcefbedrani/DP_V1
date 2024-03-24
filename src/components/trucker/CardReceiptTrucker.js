import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const CardReceiptTrucker = ({ navigation }) => {
  return (
    <View>
      <View style={styles.cardReceiptContainer}>
        <View style={styles.checkmark}>
          <Text>✔</Text>
        </View>
        <Text>you are complete in Course</Text>
        <Card />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.okButton, { width: "100%" }]}
          onPress={() => {
            navigation.navigate("FeedbackTrucker");
          }}
        >
          <Text>CASH IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Card = () => {
  return (
    <View style={[styles.card, { width: Dimensions.get("window").width - 40 }]}>
      <View style={styles.cardRow}>
        <Text style={styles.name}>travel cost</Text>
        <Text style={styles.value}>110 DA</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.name}>costs</Text>
        <Text style={styles.value}>10 DA</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.name}>your gain</Text>
        <Text style={styles.value}>100 DA</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.name}>payment method</Text>
        <Text style={styles.value}>cach</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.name}>type de course</Text>
        <Text style={styles.value}>rono classic</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardReceiptContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 40,
    paddingVertical: 40,
  },
  checkmark: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: "yellow",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  name: {
    marginRight: 10,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
});

export default CardReceiptTrucker;
