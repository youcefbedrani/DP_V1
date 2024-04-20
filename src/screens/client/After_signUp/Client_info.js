import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Servicess from "../../../Shared/Servicess";
import GlobalApi from "../../../Shared/GlobalApi";
import { AuthContext } from "../../../Context/client/AuthContext";
import { InfoContext } from "../../../Context/client/InfoContext";
import { MenuBarContext } from "../../../Context/client/MenuBarContext";

const client_info = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { userData } = useContext(AuthContext) || {};
  const { userInfo, setUserInfo } = useContext(InfoContext) || {};

  const navigation = useNavigation();

  const handleShow = async () => {
    try {
      const userAuthData = await Servicess.getUserAuth().then((res) => res);
      setEmail(userAuthData["email"]);
      setPassword(userAuthData["password"]);
      if (!firstName || !lastName || !Email || !Password) {
        setShow(false);
      } else {
        setShow(true);
      }
    } catch (error) {
      console.error("Error fetching user authentication data:", error);
    }
  };

  useEffect(() => {
    handleShow();
  }, [firstName, lastName, Email]);

  const data = {
    firstName: firstName,
    lastName: lastName,
    number: number,
  };
  const setData = async () => {
    try {
      const user = {
        firstname: firstName,
        lastname: lastName,
        number: number,
        email: Email,
        password: Password,
      };
      // console.log(user);
      await GlobalApi.setUser(user);
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  };
  //Database connection
  // Store First name and  last name in firebase database
  // (Fname \ Lname)
  const Next_info = async () => {
    try {
      await Servicess.setUserInfo(data);
    } catch (e) {
    } finally {
      // Set data to database
      setData();
      // And if we want to  go Login we use  Servicess.Logout(); with + navigation.navigate("LoginClient");
      navigation.navigate("HomeClient");
    }
  };

  return (
    <View>
      {/* logo */}
      <View className="mx-auto mt-8">
        <Image
          source={require("../../../../assets/imageApp/logo.png")}
          className="w-20 h-20"
        />
      </View>
      {/* warnning client */}
      <View className="mx-2 my-2">
        <Text className="font-bold text-2xl text-black">Enter Your Name</Text>
        <Text className="font-bold text-lg text-gray-600">
          Use your real name so trucker can identify you faster and easier. This
          helps make your rides safer.
        </Text>
      </View>
      {/* enter info  */}
      <View className="flex-column space-y-2 mx-2">
        <View className="bg-gray-300 p-4 rounded-2xl">
          <TextInput
            placeholder="First Name"
            style={{ height: 40 }}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
        </View>
        <View className="bg-gray-300 p-4 rounded-2xl">
          <TextInput
            placeholder="Last Name"
            style={{ height: 40 }}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
        </View>
        <View className="bg-gray-300 p-4 rounded-2xl">
          <TextInput
            placeholder="+213 -- -- -- -- --"
            style={{ height: 40 }}
            onChangeText={(text) => setNumber(text)}
            value={number}
          />
        </View>
      </View>
      {/* go to Home page */}
      {show ? (
        <View className="mx-2 my-4 rounded-xl">
          <TouchableOpacity
            onPress={Next_info}
            style={{ height: 45 }}
            className="bg-orange-500 pt-2 rounded-xl"
          >
            <Text className="mx-auto text-white text-lg">Next</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default client_info;
