import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../../components/authScreens/Home/HomePage";
import ProfilePage from "../../components/authScreens/Profile/ProfilePage";
import Header from "../../components/authScreens/Header/Header";
import UserReport from "../../components/authScreens/UserFile/UserReport";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeBottomTab = ({ navigation }) => {
  const getTabBarIcon = (route, focused, size, color) => {
    let iconName;

    if (route.name == "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name == "UserReport") {
      iconName = focused ? "file-alert" : "file-alert-outline";
    } else if ((route.name = "Profile")) {
      iconName = focused ? "account" : "account-outline";
    }

    return (
      <MaterialCommunityIcons name={iconName} size={size + 6} color={color} />
    );
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) =>
      getTabBarIcon(route, focused, size, color),
    tabBarActiveTintColor: "#000",
    tabBarInactiveTintColor: "#838581",
    tabBarStyle: {
      height: 60,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: "Poppins-Bold"
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: true,
          header: () => <Header />,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="UserReport"
        component={UserReport}
        options={{ headerShown: false, tabBarLabel: "Report" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false, tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTab;
