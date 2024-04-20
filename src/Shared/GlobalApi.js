import { create } from "apisauce";
//192.168.77.12 192.168.81.12
const api = create({
  baseURL: "http://192.168.51.12:1337",
  headers: {
    "X-API-Key":
      "249c85bba47fef83ec7b16c4e38c47ff77e909dfda455ab07a47e5a177bdf29ba82c4c182fc32fa9a66047b7ca5946dbe895d6c4c908f7d66059aa6efa4bacb0381b78be61e94f91e40935ac8905809313fd61ada314319a10addde2432d9f78e04b7feb8de1b49b254e0e4dc7cd1db34f4c0a2b1ff32fab86cd4d02a4bdfdb8",
  },
});

const getUserInfoData = async () => {
  try {
    const response = await api.get("/api/datas");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

const setUser = async (user) => {
  try {
    await api.post("/api/datas", { data: user });
    // console.log("hi")
  } catch (error) {
    console.error("Error setting user data:", error);
    throw error;
  }
};

const getTruckerInfoData = async () => {
  try {
    const response = await api.get("/api/truckers");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

const setTruckerInfo = async (info) => {
  try {
    await api.post("/api/truckers", { data: info }).then((response) => {
      console.log("Data posted successfully:", response.data);
    });
  } catch (error) {
    console.error("Error setting user data:", error);
    throw error;
  }
};

const getProvedTrucker = async () => {
  try {
    const response = await api.get("/api/aproved-truckers");
    return response.data;
  } catch (error) {
    console.error("Error setting user data:", error);
    throw error;
  }
};
export default {
  getUserInfoData,
  setUser,
  setTruckerInfo,
  getTruckerInfoData,
  getProvedTrucker,
};
