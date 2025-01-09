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
      <View style={styles.tag}>
        <Text style={styles.text}>सर्वे भवन्तु सुखिनः।</Text>
        <Text style={styles.text}>सर्वे सन्तु निरामयाः।</Text>
        <Text style={styles.text}>सर्वे भद्राणि पश्यन्तु।</Text>
        <Text style={styles.text}>मा कश्चित् दुःखभाग् भवेत्।</Text>
      </View>
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
    // marginTop: "70%",
    // width: "100%",
  },
  tag: {
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor:"#ff9935",
    width:250,
    height:250,
    margin:"auto",
    borderRadius:200,
    lineHeight:20,
    // paddingTop:20

  },
  text:{
    fontFamily:"Poppins-Medium",
    fontSize:16,
    // paddingTop:20
  }
});
