import React, { createContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from "react-native";

export const MenuContext = createContext();

const Menu = ({ children, navigation, role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebar = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    sidebar.current.openDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={sidebar}
      drawerWidth={300}
      drawerPosition={"left"}
      drawerLockMode={isMenuOpen ? "unlocked" : "locked-closed"}
      drawerGestureEnabled={false}
      drawerOpen={isMenuOpen}
      renderNavigationView={() => (
        <View style={styles.container}>
          <View style={styles.section1}>
            <Image
              source={require("../../assets/imageApp/car.png")}
              style={styles.profilePicture}
            />
            <Text style={styles.username}>Tahar99</Text>
            <Text style={styles.email}>taharhadji99@gmail.com</Text>
          </View>
          <View style={styles.section2}>
            {role == "client" ? (
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setIsMenuOpen(false);
                    navigation.navigate("RideHistory");
                  }}
                >
                  <Text style={styles.buttonText}>Ride history</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Account information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Preference")}
                >
                  <Text style={styles.buttonText}>Preferences</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Support")}

                >
                  <Text style={styles.buttonText}>Support</Text>
                </TouchableOpacity>
                <View style={styles.loginButton}>
                  <TouchableOpacity style={styles.loginButtonText}>
                    <Text style={styles.loginButtonText}>LOG IN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    // setIsMenuOpen(false);
                    navigation.navigate("History");
                  }}
                >
                  <Text style={styles.buttonText}>my courses</Text>
                </TouchableOpacity>

               
                
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Income")}
                >
                  <Text style={styles.buttonText}>my income</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Support")}
                >
                  <Text style={styles.buttonText}>Support</Text>
                </TouchableOpacity>
                <View style={styles.loginButton}>
                  <TouchableOpacity style={styles.loginButtonText}>
                    <Text style={styles.loginButtonText}>LOG OUT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    >
      <MenuContext.Provider value={toggleMenu}>{children}</MenuContext.Provider>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  section1: {
    flex: 0.3,
    // alignItems: 'center',
    justifyContent: "center",
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
  section2: {
    flex: 0.7,
    padding: 20,
  },
  button: {
    // backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Menu;
