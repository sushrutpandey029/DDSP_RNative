import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import MainImage from "../../../../assets/images/banner5.jpg";

const HomeFarmerImage = () => {
  return (
    <View style={styles.container}>
      <Image source={MainImage} style={styles.img} resizeMode="contain"/>
    </View>
  );
};

export default HomeFarmerImage;

const styles = StyleSheet.create({
  container:{
    // flex:1
    maxWidth:"100%",
    
  },
  img: {
    width: "100%",
    
    
  },
});
