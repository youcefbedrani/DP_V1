import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext } from "react";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { FirebaseAuth } from "../../../Firebase/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../../../Shared/GlobalApi";
import Servicess from "../../../Shared/Servicess";
import TruckerServices from "../../../Shared/TruckerServices";
import { AuthContext } from "../../../Context/client/AuthContext";
import { InfoContext } from "../../../Context/client/InfoContext";
import { MenuBarContext } from "../../../Context/client/MenuBarContext";
import { Feather } from "react-native-feather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Phone from "../../../components/auth/Phone";

const EmailTrucker = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FirebaseAuth;
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(AuthContext) || {};
  const { userInfo, setUserInfo } = useContext(InfoContext) || {};

  const data = {
    email: email,
    password: password,
  };

  const handleResponse = async () => {
    const response = await GlobalApi.getUserInfoData();
    response.data.map((item) => {
      if (item.attributes.email == data.email) {
        const UserInformation = {
          firstName: item.attributes.firstname,
          lastName: item.attributes.lastname,
          number: item.attributes.number,
        };
        const menu = {
          email: item.attributes.email,
          password: item.attributes.password,
          firstName: item.attributes.firstname,
          lastName: item.attributes.lastname,
          number: item.attributes.number,
        };
        Servicess.setUserInfo(UserInformation);
        Servicess.setMenu(menu);
        console.log(menu);
      }
    });
  };

  const Database = async (data) => {
    try {
      const response = await GlobalApi.getProvedTrucker();
      // console.log(response.data);
      response.data.map((item) => {
        if (item.attributes.email == data.email) {
          console.log(item);
          const basicInfo = {
            firstName: item.attributes.firstname,
            lastName: item.attributes.lastname,
            number: item.attributes.number,
            password: item.attributes.password,
            email: item.attributes.email,
          };
          const truckerInfo = {
            Cirtificate_Number: item.attributes.Certificate_Number,
            DriverLicenseDateEXP: item.attributes.DriveLicenceDataExpiration,
            License_Number: item.attributes.License_Number,
            NetProfit: item.attributes.NetProfit,
            Number_Plate: item.attributes.Number_Plate,
            Online: item.attributes.Online,
            Location: item.attributes.Location,
            Tow_Transport: item.attributes.Tow_Transport,
            Trip: item.attributes.Trip,
          };
          console.log(basicInfo);
          console.log(truckerInfo);
          TruckerServices.setBasicInfo(basicInfo);
          TruckerServices.setTruckerInfo(truckerInfo);
          navigation.navigate("Trucker_vision");
        }
      });
      // await Servicess.setUserAuth(data);
      // navigation.navigate("HomeClient");
    } catch (e) {
      navigation.navigate("WaitResponse");
      console.log(e);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      console.log(data);
      const response = await signInWithEmailAndPassword(auth, email, password);
      Database(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Sign In Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 items-start justify-start w-full h-screen bg-white pt-24 ">
      <Text style={{ fontSize: 20 }} className="text-black font-bold pl-9 mb-1">
        Login Account
      </Text>
      <Text style={{ fontSize: 15 }} className="text-gray-400 font-bold pl-9">
        Hello, welcome back to your account
      </Text>
      <View className="mx-auto">
        <View>
          <View
            style={{ width: 290 }}
            className="flex-row px-3 mt-11 mb-6 mx-auto border-b space-x-4"
          >
            <View>
              <Entypo name="email" size={24} color="gray" />
            </View>
            <View className="pb-2">
              <TextInput
                placeholder="Email"
                onChangeText={(Text) => setEmail(Text)}
                value={email}
              />
            </View>
          </View>
          <View
            style={{ width: 290 }}
            className="flex-row px-3 mt-2 mb-6 mx-auto border-b space-x-4"
          >
            <View>
              <MaterialIcons name="password" size={24} color="black" />
            </View>
            <View className="pb-2">
              <TextInput
                placeholder="Password"
                onChangeText={(Text) => setPassword(Text)}
                value={password}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <>
            <View>
              <View className="flex-row mx-auto">
                <TouchableOpacity
                  style={{ backgroundColor: "#FF9B63" }}
                  className="w-80 rounded-xl p-4"
                  onPress={signIn}
                >
                  <Text className="text-white font-bold text-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
      {/* Or  */}
      <View className="flex-row w-full space-x-3 items-center justify-center mt-10">
        <View style={{ width: 130 }} className="border-b">
          <Text className="text-white">Or</Text>
        </View>
        <Text className="mt-1">Or</Text>
        <View style={{ width: 130 }} className="border-b">
          <Text className="text-white">Or</Text>
        </View>
      </View>
      {/* or google */}
      <View className="flex-row mt-6  mx-auto">
        <TouchableOpacity className="flex-row space-x-10 shadow-lg items-center border border-gray-200 w-80 rounded-xl bg-white px-8 py-4">
          <Image
            source={require("../../../../assets/imageApp/google.png")}
            className="w-6 h-6"
          />
          {/* <AntDesign name="google" size={24} color="white" /> */}
          <Text className="font-bold text-black text-center">
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
      {/* Not registre yet */}
      <View className="mx-14 mt-4 flex-row space-x-2">
        <Text className="text-gray-400">Not Registered yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("HomeTrucker")}>
          <Text className="text-orange-500">Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailTrucker;
