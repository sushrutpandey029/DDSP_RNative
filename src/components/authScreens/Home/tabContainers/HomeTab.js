import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { globalContainer } from "../../../../globals/style";
import { useDispatch, useSelector } from "react-redux";
import LocationFetcher from "./LocationFetcher";

const HomeTab = () => {
  // const { user } = useSelector((state) => state.auth.user);
  // console.log("user", user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.location}>
        <LocationFetcher />
      </View>
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    marginTop: "100%",
    width: "100%",
  },
});
