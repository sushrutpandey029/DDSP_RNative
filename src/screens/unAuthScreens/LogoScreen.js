import {SafeAreaView, Animated, StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import logo from "../../../assets/logos/welcome_logo.jpg";

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

  useEffect(() => {
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
    }, 6000);

    return () => clearTimeout(timer);

  }, [scaleAnim, rotateAnim, opacityAnim, navigation]);

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
