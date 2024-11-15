import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoScreen from "../components/unAuthScreens/LogoScreen";
import SplashScreen from "../components/unAuthScreens/SplashScreen";
import LoginScreen from "../components/unAuthScreens/LoginScreen";
import HomeBottomTab from "./homeNavigation/HomeBottomTab";
import DrawerNav from "./drawerNavigation/DrawerNav";

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
       <Stack.Screen
        name="HomeStack"
        component={HomeBottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Drawer" component={DrawerNav} options={{headerShown : false}} />
     </Stack.Navigator>
  );
};

export default RootNavigation;
