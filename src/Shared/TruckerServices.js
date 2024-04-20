import AsyncStorage from "@react-native-async-storage/async-storage";

const setBasicInfo = async (value) => {
  await AsyncStorage.setItem("BasicInfo", JSON.stringify(value));
};

const getBasicInfo = async () => {
  const value = await AsyncStorage.getItem("BasicInfo");
  return JSON.parse(value);
};

const setDrtiverLicenseInfo = async (value) => {
  await AsyncStorage.setItem("DriverLicense", JSON.stringify(value));
};

const getDrtiverLicenseInfo = async () => {
  const value = await AsyncStorage.getItem("DriverLicense");
  return JSON.parse(value);
};

const setTruckerInfo = async (value) => {
  await AsyncStorage.setItem("TruckerInfo", JSON.stringify(value));
};

const getTruckerInfo = async () => {
  const value = await AsyncStorage.getItem("TruckerInfo");
  return JSON.parse(value);
};

const setTowInfo = async (value) => {
  await AsyncStorage.setItem("TowInfo", JSON.stringify(value));
};

const getTowInfo = async () => {
  const value = await AsyncStorage.getItem("TowInfo");
  return JSON.parse(value);
};

const Logout = () => {
  AsyncStorage.clear();
};

export default {
  setBasicInfo,
  getBasicInfo,
  setDrtiverLicenseInfo,
  getDrtiverLicenseInfo,
  setTruckerInfo,
  getTruckerInfo,
  setTowInfo,
  getTowInfo,
  Logout,
};
