import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoScreen from "../screens/unAuthScreens/LogoScreen";
import SplashScreen from "../screens/unAuthScreens/SplashScreen";
import LoginScreen from "../screens/unAuthScreens/LoginScreen";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logo"
        component={LogoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
