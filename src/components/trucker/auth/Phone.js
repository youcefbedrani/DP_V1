import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  Entypo,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../Firebase/firebase_config";
import { FIREEBASE_APP } from "../../Firebase/firebase_config";
import { FirebaseAuth } from "../../Firebase/firebase_config";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
const Phone = () => {
  const [visibleOTP, setVisibleOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const RecaptchaVerifier = useRef(null);
  const auth = FirebaseAuth;

  const sendVerification = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        phoneNumber, RecaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setVisibleOTP(true);
    } catch (error) {
      console.error("Error sending verification code: ", error);
      Alert.alert(
        "Error",
        "Failed to send verification code. Please try again."
      );
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      setCode("");
      Alert.alert("Success", "You have successfully logged in!");
    } catch (error) {
      console.error("Error confirming code: ", error);
      Alert.alert(
        "Error",
        "Failed to confirm verification code. Please try again."
      );
    }
  };
  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={RecaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      {visibleOTP ? (
        <>
          {/* Input OTP */}
          <View
            style={{ width: 290 }}
            className="flex-row px-3 my-11 mx-auto border-b space-x-4"
          >
            <View>
              <MaterialCommunityIcons
                name="cellphone-message"
                size={24}
                color="black"
              />
            </View>
            <View className="pb-2">
              <TextInput
                placeholder="Phone OTP"
                onChangeText={(Text) => setCode(Text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          {/* Button Phone */}
          <View className="flex-row mx-auto">
            <TouchableOpacity
              onPress={() => {
                confirmedCode();
              }}
              style={{ backgroundColor: "#FF9B63" }}
              className="w-80 rounded-xl p-4"
            >
              <Text className="text-white font-bold text-center">
                Confirmation OTP
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* Input Phone */}
          <View
            style={{ width: 290 }}
            className="flex-row px-3 my-11 mx-auto border-b space-x-4"
          >
            <View>
              <Feather name="phone" size={24} color="black" />
            </View>
            <View className="pb-2">
              <TextInput
                placeholder="Phone Number"
                onChangeText={(Text) => setPhoneNumber(Text)}
                keyboardType="phone-pad"
                autoCompleteType="tel"
              />
            </View>
          </View>
          {/* Button Phone */}
          <View className="flex-row mx-auto">
            <TouchableOpacity
              onPress={() => {
                sendVerification();
                setVisibleOTP(true);
              }}
              style={{ backgroundColor: "#FF9B63" }}
              className="w-80 rounded-xl p-4"
            >
              <Text className="text-white font-bold text-center">
                Request OTP
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Phone;
