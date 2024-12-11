import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../../components/authScreens/Home/HomePage";
import ProfilePage from "../../components/authScreens/Profile/ProfilePage";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/authScreens/Header/Header";
import UserReport from "../../components/authScreens/UserFile/UserReport";

const Tab = createBottomTabNavigator();

const HomeBottomTab = ({ navigation }) => {
  const getTabBarIcon = (route, focused, size, color) => {
    let iconName;

    if (route.name == "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name == "UserReport") {
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
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
       <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: true, header: () => <Header  /> }}
      />
      <Tab.Screen
        name="UserReport"
        component={UserReport}
        options={{ headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTab;
