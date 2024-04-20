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
import { FirebaseAuth } from "../../Firebase/firebase_config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../../Shared/GlobalApi";
import Servicess from "../../Shared/Servicess";
import { AuthContext } from "../../Context/client/AuthContext";
import { InfoContext } from "../../Context/client/InfoContext";
import { MenuBarContext } from "../../Context/client/MenuBarContext";

const Email = () => {
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
        }
        Servicess.setUserInfo(UserInformation);
        Servicess.setMenu(menu);
        console.log(menu);
      }
    });
  };

  const Database = async (data) => {
    try {
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
          // console.log(UserInformation);
        }
      });
      await Servicess.setUserAuth(data);
      navigation.navigate("HomeClient");
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      Database(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Sign In Failed");
    } finally {
      setLoading(false);
    }
  };
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Check Your Email");
    } catch (error) {
      console.error("Error:", error);
      alert("Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default Email;

// ()=>navigation.navigate("HomeClient")
