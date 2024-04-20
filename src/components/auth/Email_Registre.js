import React, { useContext, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AntDesign, Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import { FirebaseAuth , db } from "../../Firebase/firebase_config"; // Import FirebaseAuth as a named import
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/client/AuthContext";
import Servicess from "../../Shared/Servicess";


const Email_Registre = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [backChecked, setBackChecked] = useState("bg-white");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const {userData , setUserData} = useContext(AuthContext) || {};

  const auth = FirebaseAuth;

  const navigation = useNavigation();

  const data = {
      email : email,
      password : password,
  }
  //Database connection
  // store info in firebase (POST)
  // store (email \ number \ password)
  const Database = async (data) => {
    try {
      await Servicess.setUserAuth(data);
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate("ClientInfo");
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (!email || !password || !passwordConfirm) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // go to enter more information CLIENT
      Alert.alert("Sign Up , Success", "Check Your Email", [
        {
          text: "OK",
          onPress: () => {
            //const colRef = collection(db , 'clientUser');
            //getDocs(colRef).then((snapshot)=>{
            //  console.log(snapshot.docs);
            //})
            //navigation.navigate("LoginClient");
            //Store info in database
            Database(data);
          },
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      alert("Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePress = () => {
    setChecked(!checked);
    setBackChecked(checked ? "bg-orange-500" : "bg-white");
  };

  return (
    <View>
      <View>
        <View
          style={{ width: 290 }}
          className="flex-row px-3 mt-1 mb-6 mx-auto border-b space-x-4"
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
            <MaterialIcons name="password" size={24} color="gray" />
          </View>
          <View className="pb-2">
            <TextInput
              placeholder="Password"
              onChangeText={(Text) => setPassword(Text)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View
          style={{ width: 290 }}
          className="flex-row px-3 mt-2 mb-6 mx-auto border-b space-x-4"
        >
          <View>
            <MaterialIcons name="password" size={24} color="gray" />
          </View>
          <View className="pb-2">
            <TextInput
              placeholder="Password Confirmation"
              onChangeText={(Text) => setPasswordConfirm(Text)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View className="flex-row my-3 items-center justify-center space-x-3">
          <Pressable
            className={`w-6 h-6 items-center justify-center rounded-md border border-2 border-orange-500 ${backChecked}`}
            onPress={handlePress}
          >
            {!checked && <AntDesign name="check" size={20} color="white" />}
          </Pressable>
          <Text className="text-gray-500">
            Do you agree to all terms and conditoin
          </Text>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <>
          {/* Button Phone */}
          <View className="flex-row mx-auto">
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={true && checked}
              style={{ backgroundColor: "#FF9B63" }}
              className="w-80 rounded-xl p-4"
            >
              <Text className="text-white font-bold text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Email_Registre;
