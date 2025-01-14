import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  ScrollView,
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
      <ScrollView >
        <View style={styles.tag}>
          <Text style={styles.text}>सर्वे भवन्तु सुखिनः।</Text>
          <Text style={styles.text}>सर्वे सन्तु निरामयाः।</Text>
          <Text style={styles.text}>सर्वे भद्राणि पश्यन्तु।</Text>
          <Text style={styles.text}>मा कश्चित् दुःखभाग् भवेत्।</Text>
        </View>
        <View style={styles.location}>
          <LocationFetcher />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
  },
  location: {
    marginTop: 10,
    // width: "100%",
  },
  tag: {
    paddingTop:8,
    paddingBottom:6,
    borderWidth: 2,
    width: "90%",
    // maxHeight: "42%",
    margin: "auto",

    marginTop: 30,
    marginBottom:15,
    borderRadius: 10,
    borderColor: "#efefef",

    backgroundColor: "#fff",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,

    elevation: 10,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    textAlign: "center",

    // marginVertical: 3,
  },
});
