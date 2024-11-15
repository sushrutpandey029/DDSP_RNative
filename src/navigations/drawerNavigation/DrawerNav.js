import { View, Text, Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Setting from "../../components/authScreens/Settings/Setting";
import ListItem from "../../components/authScreens/ListItem/ListItem";
 import Header from "../../components/authScreens/Header/Header";
import HomeBottomTab from "../homeNavigation/HomeBottomTab";
import CustomDrawerContent from "../../components/authScreens/Header/CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerPosition: "right", 
      drawerType : Platform.OS === 'ios' ? 'front' : 'front'
    }}
    >
      <Drawer.Screen name="HomeStack" component={HomeBottomTab} />
{/* 
      <Drawer.Screen name="Settings" component={Setting} />
      <Drawer.Screen name="ListItem" component={ListItem} />
      <Drawer.Screen name="Forms" component={Forms} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
