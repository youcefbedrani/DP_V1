import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserAuth = async (value) => {
  await AsyncStorage.setItem("userData", JSON.stringify(value));
};

const getUserAuth = async () => {
  const value = await AsyncStorage.getItem("userData");
  return JSON.parse(value);
};

const Logout = () => {
  AsyncStorage.clear();
};

//----------------------------------------------------------------

const setUserInfo = async (value) => {
  await AsyncStorage.setItem("userInfo", JSON.stringify(value));
};

const getUserInfo = async () => {
  const value = await AsyncStorage.getItem("userInfo");
  return JSON.parse(value);
};

//----------------------------------------------------------------


const setMenu = async (value) => {
  await AsyncStorage.setItem("menu", JSON.stringify(value));
};

const getMenu = async () => {
  const value = await AsyncStorage.getItem("menu");
  return JSON.parse(value);
};


//----------------------------------------------------------------


const setApp = async (value) => {
  await AsyncStorage.setItem("app", JSON.stringify(value));
};

const getApp = async () => {
  const value = await AsyncStorage.getItem("app");
  return JSON.parse(value);
};



//----------------------------------------------------------------

const setTripInfo = async (value) => {
  await AsyncStorage.setItem("trpinfo ", JSON.stringify(value));
};

const getTripInfo  = async () => {
  const value = await AsyncStorage.getItem("trpinfo ");
  return JSON.parse(value);
};



export default {
  setUserAuth,
  getUserAuth,
  setUserInfo,
  getUserInfo,
  setMenu,
  getMenu,
  getApp,
  setApp,
  Logout,
  setTripInfo,
  getTripInfo,
};
