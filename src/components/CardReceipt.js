import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CardHistory from "../components/CardHistory";

const CardReceipt = ({navigation}) => {
  return (
    <View >
        <View style={styles.cardReceiptContainer}>
          <View style={styles.checkmark}>
            <Text>✔</Text>
          </View>
          <Text>Your trip has ended</Text>
          <CardHistory />
        </View>
        <View>
          <TouchableOpacity style={[styles.okButton, { width: "100%" }]}
           onPress={()=>{navigation.navigate("Feedback")}}
          >
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  cardReceiptContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginVertical:40,
    paddingVertical:40
  },
  checkmark: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  okButton: {
    marginTop:20,
    backgroundColor: "yellow",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
});

export default CardReceipt;
