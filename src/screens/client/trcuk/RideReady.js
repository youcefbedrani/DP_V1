import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RideReady = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text1}>Slot 3</Text>
        <Image source={require('../../../../assets/imageApp/car.png')} style={styles.icon} />
        <Text style={styles.text2}>Your ride is ready!</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} 
          onPress={() => {navigation.navigate("OnTrip")}}>
            <Text style={styles.buttonText}>I'm Coming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',

  },
  text1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 75,
    height: 75,
    marginTop: 10,
    marginBottom: 10,
  },
  text2: {
    fontSize: 20,
    margin:5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    gap:10
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default RideReady;