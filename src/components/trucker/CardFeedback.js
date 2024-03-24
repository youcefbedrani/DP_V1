import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardFeedback = ({navigation}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.userContainer}>
        <Image
          style={styles.userImage}
          source={require('../../../assets/imageApp/user.jpg')}
        />
        <Text style={styles.userName}>Adel Bedra..</Text>
      </View>
      
      <View style={styles.ratingContainer}>
        <View style={styles.starIcons}>
          <Ionicons name="star" size={24} color="gold" />
          <Ionicons name="star" size={24} color="gold" />
          <Ionicons name="star" size={24} color="gold" />
          <Ionicons name="star" size={24} color="gold" />
          <Ionicons name="star" size={24} color="gold" />
        </View>
        <Text>Great experience!</Text>
      </View>
      
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add your comment"
          multiline={true}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.okButton}
         onPress={()=>{navigation.navigate("Trucker_vision")}}
        >
          <Text style={styles.okButtonText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  userContainer: {
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  starIcons: {
    flexDirection: "row",
    marginBottom: 5,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  okButton: {
    backgroundColor: "#FBD50E",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardFeedback;