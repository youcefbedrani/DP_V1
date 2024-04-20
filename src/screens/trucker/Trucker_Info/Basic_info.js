import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  AntDesign,
  Fontisto,
  Feather,
  FontAwesome6,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TruckerServices from "../../../Shared/TruckerServices";
import TruckerDBServices from "../../../Shared/TruckerDBServices";

const Basic_info = () => {
  const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const [firsname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");
  const [makebool, setMakeBool] = useState({ info: false });
  const [data, setData] = useState({});

  useEffect(() => {
    if (
      firsname &&
      lastname &&
      birthDay &&
      phoneNumber &&
      email &&
      password &&
      confirmePassword
    ) {
      if (password === confirmePassword) {
        //send  to  firebase and  strapi db
        setData({
          firstname: firsname,
          lastname: lastname,
          birthDay: birthDay,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
        });
        setMakeBool({ ...makebool, info: true });
        setShow(true);
      } else {
        Alert.alert("Password  is  not match");
      }
    }
  }, [
    firsname,
    lastname,
    birthDay,
    phoneNumber,
    email,
    password,
    confirmePassword,
  ]);

  const Next_info = async () => {
    try {
      // await Servicess.setUserInfo(data);
      //console.log(data);
      await TruckerDBServices.setBasicDBInfo(data);
      await TruckerServices.setBasicInfo(makebool);
      navigation.navigate("DriverLicense");
    } catch (e) {
      console.log(e);
    } finally {
      // Set data to database
      // setData();
      Alert.alert("Once you enter data you can't change it again !");
      // And if we want to  go Login we use  Servicess.Logout(); with + navigation.navigate("LoginClient");
      navigation.navigate("DriverLicense");
    }
  };

  return (
    <View>
      <View className="mx-auto">
        <Text className="text-2xl font-bold">Basic Info</Text>
      </View>
      <ScrollView>
        <View className="space-y-2 flex-column mx-auto w-full p-4 ">
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="First name"
            value={firsname}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Last name"
            value={lastname}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Data of Birth"
            value={birthDay}
            onChangeText={(text) => setBirthDay(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            className="w-full h-14 rounded-md bg-white p-2"
            placeholder="Confirme Password"
            value={confirmePassword}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmePassword(text)}
          />
        </View>
        {show ? (
          <View className="mx-2 my-4 rounded-xl">
            <TouchableOpacity
              onPress={Next_info}
              style={{ height: 45 }}
              className="bg-orange-500 pt-2 rounded-xl"
            >
              <Text className="mx-auto text-white text-lg">Done</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Text className="text-sm text-gray-600 mx-auto mt-4 px-4">
          By tapping Done I Agree with Terms and Conditions , I acknowledge and
          agree with passing and transfer of personal data according to
          conditions of Privacy Policy
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Basic_info;
