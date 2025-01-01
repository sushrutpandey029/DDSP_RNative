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
      <SafeAreaView style={globalContainer}>
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
              {" "}
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
        {/* <View style={styles.imageContainer} >
        <View style={styles.imageContainerIn}>
           <Image source={splash_img} style={styles.image1} />
        </View>
       
      </View> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: "3%",
  },
  backgroundImage: {
    flex: 1,
    // justifyContent: 'center', // Aligns children vertically
    // alignItems: 'center', // Aligns children horizontally
    //  width: '100%',
    // height: '100%',
  },
  textContainer: {
    // flex : 1,
  },
  textContainerIn: {
    marginTop: "30%",
  },
  imageContainer: {
    flex: 1,
    //  alignItems :'center',
    // backgroundColor: 'grey',
    // justifyContent : 'flex-end',
  },
  imageContainerIn: {},
  image1: {
    height: "100%",
    width: Dimensions.get("window").width,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  farmingText: {
    color: "#5B8A39",
    fontSize: 25,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  startButton: {
    height: 34,
    width: 141,
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    fontWeight: "400",
    color: "#fff",
  },
  btnContainer: {
    marginVertical: "4%",
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
});
