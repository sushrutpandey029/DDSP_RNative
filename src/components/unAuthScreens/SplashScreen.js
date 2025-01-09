import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import splash_img from "../../../assets/images/splash2.jpg";
import { globalContainer } from "../../globals/style";

const SplashScreen = ({ navigation }) => {
  const handleGetStart = async () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={splash_img}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textContainerIn}>
            <View>
              <Text style={styles.welcomeText}>Welcome to RNFP</Text>
            </View>
            <View>
              <Text style={styles.farmingText}>Farming App</Text>
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              Natural farming for farmers’ prosperity
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleGetStart}
            >
              <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 150,
    backgroundColor: "rgba(255, 255, 255, 0.72)", // Semi-transparent white background
    borderRadius: 20,
    padding: 20,
    // Shadow for iOS
    shadowColor: "rgb(0, 0, 0)", // Red shadow color for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  backgroundImage: {
    flex: 1,
  },
  textContainer: {
     // top:50
  },
  textContainerIn: {
   },
  imageContainer: {
    flex: 1,
  },
  imageContainerIn: {},
  image1: {
    height: "100%",
    width: Dimensions.get("window").width,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 30,
    // fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
   },
  farmingText: {
    color: "#ff9935",
    fontSize: 25,
     fontFamily: "Poppins-Bold",
   },
  startButton: {
    // height: 34,
    width: 200,
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    padding:10
  },
  btnContainer: {
    marginVertical: "4%",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize:16
  },
});
