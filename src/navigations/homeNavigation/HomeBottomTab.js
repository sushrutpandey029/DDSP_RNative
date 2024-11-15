import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../../components/authScreens/Home/HomePage";
import ProfilePage from "../../components/authScreens/Profile/ProfilePage";
import UserFilePage from "../../components/authScreens/UserFile/UserFilePage";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/authScreens/Header/Header";

const Tab = createBottomTabNavigator();

const HomeBottomTab = ({ navigation }) => {
  const getTabBarIcon = (route, focused, size, color) => {
    let iconName;

    if (route.name == "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name == "UserFile") {
      iconName = focused ? "document" : "document-outline";
    } else if ((route.name = "Profile")) {
      iconName = focused ? "person" : "person-outline";
    }

    return <Icon name={iconName} size={size + 4} color={color} />;
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) =>
      getTabBarIcon(route, focused, size, color),
    tabBarActiveTintColor: "green",
    tabBarInactiveTintColor: "gray",
    tabBarLabel: "",
   });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="UserFile"
        component={UserFilePage}
        options={{ headerShown: true, header: () => <Header   /> }}
      />
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: true, header: () => <Header  /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: true, header: () => <Header  /> }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTab;
