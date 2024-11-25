import { View, Text } from "react-native";
import React, { useDebugValue, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import LogoScreen from "../components/unAuthScreens/LogoScreen";
import SplashScreen from "../components/unAuthScreens/SplashScreen";
import LoginScreen from "../components/unAuthScreens/Login/LoginScreen";
import HomeBottomTab from "./homeNavigation/HomeBottomTab";
import DrawerNav from "./drawerNavigation/DrawerNav";
import FormPage from "../components/authScreens/Forms/FormPage";
import CustomDrawerContent from "../components/authScreens/Header/CustomDrawerContent";
import FarmerInformation from "../components/authScreens/Forms/allForms/FarmerInformation";
import DetailOfCultivation from "../components/authScreens/Forms/allForms/DetailOfCultivation";
import DetailOfProduction from "../components/authScreens/Forms/allForms/DetailOfProduction";
import FieldsWorkerDetails from "../components/authScreens/Forms/allForms/FieldsWorkerDetails";
import ProjectCoordinationWork from "../components/authScreens/Forms/allForms/ProjectCoordinationWork";
import { defineAnimation } from "react-native-reanimated";
import FormHeader from "../components/authScreens/Forms/FormHeader";
import { initializeUser } from "../components/redux/slices/AuthSlice";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeUser());
  },[dispatch])

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        // AuthStack screen
        <>
          <Stack.Screen
            name="Drawer"
            component={DrawerNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeStack"
            component={HomeBottomTab}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FormPage"
            component={FormPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomDrawer"
            component={CustomDrawerContent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FarmerInformation"
            component={FarmerInformation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailOfCultivation"
            component={DetailOfCultivation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailOfProduction"
            component={DetailOfProduction}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FieldWork"
            component={FieldsWorkerDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProjectWork"
            component={ProjectCoordinationWork}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // UnauthStack screen
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
