import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import Phone_Registre from "../../../components/auth/Phone_Registre";
import Email_Registre from "../../../components/auth/Email_Registre";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithCredential,
// } from "firebase/auth";

// import { FirebaseAuth } from "../../../Firebase/firebase_config.js";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [click, setClick] = useState(false);
  const [backColor, setBackColor] = useState("");
  const [backColorN, setBackColorN] = useState("bg-white");
  const [userInfo, setUserInfo] = useState("");
  const [accessToken, setAccessToken] = useState();

  // WebBrowser.maybeCompleteAuthSession();

  //native: "DepanageDz://"

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId:
  //     "212174765374-d9qpddnur8kq48r3oitjql0m6feskism.apps.googleusercontent.com",
  //   expoClientId:
  //     "212174765374-8ca9trdeqcg1re646s11rub4co9ae6ou.apps.googleusercontent.com",
  //     redirectUri: makeRedirectUri({
  //       native: 'DepanageDz://',
  //       useProxy: true
  //     }),
  //     scopes: [
  //       'profile',
  //       'email'
  //     ]
  // } , {});

  // useEffect(() => {
  //   if (response?.type == "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(FirebaseAuth, credential);
  //   }
  // }, [response]);

  //   useEffect (() => {
  //     if (response?.type === 'success') {
  //         setAccessToken(response.authentication.accessToken)
  //     }
  // }, [response])
  const handlePressPhone = () => {
    setClick(true);
    setBackColor(click ? "bg-white" : "");
    setBackColorN(click ? "" : "bg-white");
  };
  const handlePressEmail = () => {
    setClick(false);
    setBackColorN(click ? "" : "bg-white");
    setBackColor(click ? "bg-white" : "");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 items-start justify-start w-full h-screen bg-white pt-14 mt-14">
        <Text
          style={{ fontSize: 20 }}
          className="text-black font-bold pl-9 mb-1"
        >
          Sign Up Account
        </Text>
        <Text style={{ fontSize: 15 }} className="text-gray-400 font-bold pl-9">
          Hello, welcome back to our account
        </Text>
        {/* Phone or Email */}
        <View
          style={{ width: 300, height: 56, backgroundColor: "#EDEDED" }}
          className="rounded-xl mt-9 mb-4 mx-auto flex-row p-2"
        >
          <View>
            <TouchableOpacity
              style={{ width: 140, height: 40 }}
              className={`${backColor} justify-center rounded-xl shadow-md `}
              onPress={handlePressPhone}
            >
              <Text
                style={{ color: "#4F4F4F" }}
                className="text-center font-bold"
              >
                Phone Number
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{ width: 140, height: 40 }}
              className={`${backColorN} justify-center ml-1 rounded-xl`}
              onPress={handlePressEmail}
            >
              <Text
                style={{ color: "#4F4F4F" }}
                className="text-center font-bold"
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Phone  */}
        <View className="mx-auto">
          {click ? <Phone_Registre /> : <Email_Registre />}
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
          <TouchableOpacity
            // onPress={() => promptAsync({ useProxy: true })}
            className="flex-row space-x-10 shadow-lg items-center border border-gray-200 w-80 rounded-xl bg-white px-8 py-4"
          >
            <Image
              source={require("../../../../assets/imageApp/google.png")}
              className="w-6 h-6"
            />
            {/* <AntDesign name="google" size={24} color="white" /> */}
            <Text className="font-bold text-black text-center">
              Sign Up With Google
            </Text>
          </TouchableOpacity>
        </View>
        {/* Not registre yet */}
        <View className="mx-14 mt-4 flex-row space-x-2">
          <Text className="text-gray-400">Do You have Account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginClient")}>
            <Text className="text-orange-500">Login Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
