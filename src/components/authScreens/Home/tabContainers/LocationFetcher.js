import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { addUserLocation } from "../../../services/ApiFile";

const LocationFetcher = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const getLocation = async () => {
    try {
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch your location."
        );
        return;
      }

      // const isServicesEnabled = await Location.hasServicesEnabledAsync();
      // if (!isServicesEnabled) {
      //   Alert.alert(
      //     "Location Services Disabled",
      //     "Please enable location services to fetch your location."
      //   );
      //   return;
      // }      

      // fetch the current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;

      const addressData = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const address =
        addressData[0]?.formattedAddress ||
        `${addressData[0]?.city || "},${addressData[0]?.region || "}`;
      console.log("Address", address);

      setLocationData({
        latitude,
        longitude,
        address,
      });

      Alert.alert(
        "Location Fetched Successfully",
        `Latitude: ${latitude}, Longitude: ${longitude}`
      );
    } catch (error) {
      if (error.code === "E_LOCATION_TIMEOUT") {
        Alert.alert(
          "Timeout",
          "Location fetching took too long. Please try again."
        );
      } else {
        console.error("Unexpected error fetching location:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred while fetching your location."
        );
      }
     }
  };

  const handleSubmitAttendance = async () => {
    if (!locationData.latitude || !locationData.longitude) {
      Alert.alert(
        "Error",
        "Location not available. Please fetch your location first."
      );
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        userId: user?.id,
        fullname: user?.fullname,
        role: user?.role,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        address: locationData?.address,
      };

      const response = await addUserLocation(payload);
      console.log("addlocation-resp", response);
      if (response.success) {
        Alert.alert("Success", "Attendance marked successfully");
      } else {
        Alert.alert("Failed", response.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error submitting attendance:", err.response?.data || err);
      Alert.alert("Error", "Failed to mark attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoFunction = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={getLocation}
        disabled={isSubmitting}
        style={[styles.button, isSubmitting && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Processing..." : "Fetch Location"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSubmitAttendance}
        disabled={isSubmitting}
        style={[styles.button, isSubmitting && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Processing..." : "Mark Attendance"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationFetcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 16,
   },
  button: {
    padding: 15, 
    backgroundColor: "#e7eae1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginVertical: 10,
   },
  buttonText: {
    color: "#7b576d",
    fontWeight: "bold",
    fontSize: 16,
  },
  locationContainer: {
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "grey",
    
  },
});
