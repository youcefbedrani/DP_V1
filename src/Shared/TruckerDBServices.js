import AsyncStorage from "@react-native-async-storage/async-storage";

const setBasicDBInfo = async (value) => {
  await AsyncStorage.setItem("BasicDBInfo", JSON.stringify(value));
};

const getBasicDBInfo = async () => {
  const value = await AsyncStorage.getItem("BasicDBInfo");
  return JSON.parse(value);
};

const setDriverLicenseDBInfo = async (value) => {
  await AsyncStorage.setItem("DriverLicenseDBInfo", JSON.stringify(value));
};

const getDriverLicenseDBInfo = async () => {
  const value = await AsyncStorage.getItem("DriverLicenseDBInfo");
  return JSON.parse(value);
};

const setVehicleDBInfo = async (value) => {
  await AsyncStorage.setItem("VehicleDBInfo", JSON.stringify(value));
};

const getVehicleDBInfo = async () => {
  const value = await AsyncStorage.getItem("VehicleDBInfo");
  return JSON.parse(value);
};

export default {
  setBasicDBInfo,
  getBasicDBInfo,
  setDriverLicenseDBInfo,
  getDriverLicenseDBInfo,
  setVehicleDBInfo,
  getVehicleDBInfo,
};
