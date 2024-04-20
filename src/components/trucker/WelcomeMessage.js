import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../Context/client/InfoContext";
import GlobalApi from "../../Shared/GlobalApi";
import TruckerServices from "../../Shared/TruckerServices";

const WelcomeMessage = ({ name }) => {
  const { userInfo, setUserInfo } = useContext(InfoContext) || {};
  const [userData, setUserData] = useState("");
  useEffect(() => {
    getUser();
    setUserData(name);
  });

  const getUser = async () => {
    try {
      const result = await GlobalApi.getUserInfoData();
      const res = result.data[0];
      // const response = await TruckerServices.getBasicInfo();
      // console.log(response.lastName);
      // setUserData(response.firstName);
      // const res = result.data.map((item)=> ({
      //   id : item.id,
      //   firsname : item.attributes.firstname,
      // }));
      //console.log(res);
    } catch (error) {
      console.error("Error getting user info:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="w-full mb-8 mt-10 items-start space-y-3">
      <View>
        <View className="flex-row space-x-3 items-center">
          {userData ? (
            <Text className="text-3xl text-orange-900 font-bold">
              Wellcome {userData}
            </Text>
          ) : (
            <Text className="text-4xl text-orange-900 font-bold">
              Wellcome User
            </Text>
          )}
          <Image
            className="w-8 h-8"
            source={require("../../../assets/imageApp/waving-hand.png")}
          />
        </View>
        <Text className="text-md text-gray-400 mr-3">
          We're here to make your life Easy
        </Text>
      </View>
    </View>
  );
};

export default WelcomeMessage;
