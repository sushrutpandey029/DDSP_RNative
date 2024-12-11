import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { addUserLocation } from "../../../services/ApiFile";

const LocationFetcher = () => {
  const { user } = useSelector((state) => state.auth.user);
  console.log('user',user);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  const [formData, setFormData] = useState({
    userId: user?.id,
    fullname: user?.fullname,
    role: user?.role,
    latitude: "",
    longitude: "",
    address:""
  })

  const [disabled, setDisabled] = useState(false);

   

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch your location"
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;
      
      

      const address =await Location.reverseGeocodeAsync({latitude, longitude});
      console.log('Address',address);
      // console.log('latitude',latitude);
      // console.log('longitude',longitude);
      console.log('address-fltr',address[0]?.formattedAddress);

      setFormData((prevData) => ({
        ...prevData,
        latitude: latitude,
        longitude: longitude,
        address: address[0]?.formattedAddress
      }));

      setIsLocationFetched(true);
      // Alert.alert(
      //   "Location Retrieved",
      //   `Latitude: ${latitude}, Longitude: ${longitude}`
      // );

      // disable the buttons and renables after 1 minutes
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false)
      }, 10000);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch location");
    }
  };

  const handleSubmitAttendance = async () => {
    try{
      const response =await  addUserLocation(formData);
      console.log('addlocation-resp',response);
      if(response.success === true) {
        Alert.alert(response.message);
      }
    }catch(err) {
      console.log('addLocation-err',err.response.data)
    }
  }

  const demoFunction = () => {

  }

  useEffect(() => {
    if(isLocationFetched) {
      handleSubmitAttendance();
    }
  },[isLocationFetched])

  return (
    <View style={styles.container}>
       {/* {formData.latitude && formData.longitude ? (
        <View style={styles.locationContainer}>
          <Text>Latitude: {formData.latitude}</Text>
          <Text>Longitude: {formData.longitude}</Text>
        </View>
      ) : (
        <Text>No location fetched yet.</Text>
      )} */}
      <TouchableOpacity onPress={getLocation} 
      style={[styles.mark,disabled && styles.disabled]}
      disabled={disabled}
      >
        <Text style={styles.buttonText}>
          {disabled ? "Please wait..." : "Mark Attendance"}
          </Text>
      </TouchableOpacity>
     
    </View>
  );
};

export default LocationFetcher;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mark: {
    flex: 1,
    padding: 8,
    backgroundColor: "red",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 30
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  locationContainer: {
    marginTop: 10,
  },
  disabled : {
    backgroundColor:'grey'
  }
});
