import {SafeAreaView, Animated, StyleSheet } from "react-native";
import React, { useRef, useEffect, useCallback } from "react";
import logo from "../../../assets/logos/welcome_logo.jpg";
import { useFocusEffect } from "@react-navigation/native";


const LogoScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const scaleInterpolation = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["250deg", "360deg"],
  });

  useFocusEffect(
    useCallback(() => {

      //reset animation values
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      opacityAnim.setValue(0);

      //start the animation

      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        if(navigation) {
          navigation.navigate('Splash')
        }
      }, 5000);
  
      return () =>{
        clearTimeout(timer);
      } 
    },[  scaleAnim, rotateAnim, opacityAnim])
  );


  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={logo}
        style={[
          {
            transform: [
              { scale: scaleInterpolation },
              { rotate: rotateInterpolation },
            ],
            opacity: opacityAnim,
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default LogoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
});
