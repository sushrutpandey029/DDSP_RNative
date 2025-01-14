import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { addUserLocation } from "../../../services/ApiFile";
import {globalContainer} from "../../../../globals/style"

const LocationFetcher = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const getLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch your location."
        );
        return;
      }

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
        `${addressData[0]?.city || ""}, ${addressData[0]?.region || ""}`;
      console.log("Address", address);

      setLocationData({
        latitude,
        longitude,
        address,
      });

      setLoading(false)
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
    finally{
      setLoading(false)
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
      console.log("addlocation-resp",JSON.stringify(response,null,2) );
      if (response.success) {
        Alert.alert("Success", "Attendance marked successfully.");
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

  return (
    <View >
      <ScrollView  contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity
          onPress={getLocation}
          disabled={loading}
          style={[styles.button, loading && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Processing..." : "Fetch Location"}
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
      </ScrollView>
      {/* {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={50} color={"#ffffff"} />
          <Text style={[styles.label, { fontSize: 14, color: "#fff" }]}>
            processing...
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default LocationFetcher;

const styles = StyleSheet.create({
  container:{
    flex: 1, // Make the root View full screen
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 15,
    backgroundColor: "#e7eae1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    // marginVertical: 10,
    margin:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,

    elevation: 3,
  },
  buttonText: {
    color: "#7b576d",
    fontWeight: "bold",
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  loaderOverlay: {
    // flex:1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
});
