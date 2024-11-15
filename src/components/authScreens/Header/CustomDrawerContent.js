import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import userIcon from "../../../../assets/images/userIcon1.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { BaseUrl } from "../../api/Api";

const CustomDrawerContent = (props) => {
  const navigation = props.navigation;
  const userData = useSelector((state) => state.auth.user);
  // console.warn("userdetail", userData.user);
  const userName = userData.user.fullname;
  const userRole = userData.user.role;

  const handleLogin = async () => {
    try {
      navigation.navigate("FormPage");
    } catch (err) {
      console.log("login-err", err);
    }
  };
  return (
    <DrawerContentScrollView style={styles.customTextContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.imgContainer}>
          <Image source={ {uri : `${BaseUrl}/profile-images/1731496967029-996013307.png`}} style={styles.profileImage} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.customText}>{userName}</Text>
          <Text style={[styles.customText,{fontSize : 10}]}>{userRole}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.box}
        >
          <Icon name="person-outline" size={20} />
          <Text style={styles.customText}>View profile</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.box}>
          <Icon name="settings-outline" size={20} />
          <Text style={styles.customText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.box}>
          <Icon name="ellipse-outline" size={20} />
          <Text style={styles.customText}>List item</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("FormPage")}
          style={styles.box}
        >
          <Icon name="ellipse-outline" size={20} />
          <Text style={styles.customText}>Forms</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.box}>
          <Icon name="people-outline" size={20} />
          <Text style={styles.customText}>Team</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.box}>
          <Icon name="help-circle-outline" size={20} />
          <Text style={styles.customText}>Support</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.box}>
          <Icon name="log-out-outline" size={20} />
          <Text style={styles.customText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  customTextContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
    // backgroundColor : "#fff"
  },
  infoContainer: {
    flexDirection: "row",
  },
  imgContainer: {},
  nameContainer: {
    paddingLeft: 10,
  },
  customText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingLeft: 8,
    // fontWeight: "bold",
    // color: "#333",
  },
  profileImage: {
    height: 60,
    width: 60,
  },
  box: {
    flexDirection: "row",
    paddingTop: 15,
  },
});
