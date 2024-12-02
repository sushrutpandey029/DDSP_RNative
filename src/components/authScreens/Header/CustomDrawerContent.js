import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import userIcon from "../../../../assets/images/userIcon1.png";
import Icon from "react-native-vector-icons/Ionicons";
import FIcon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { BaseUrl } from "../../api/Api";
import { logoutUser } from "../../redux/slices/AuthSlice";

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const userData = useSelector((state) => state.auth.user);
  console.warn("userdetail", userData.user);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <DrawerContentScrollView style={styles.customTextContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: `${BaseUrl}/profile-images/${userData.user.profileimage}`,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.nameContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.nameText}>{userData.user.fullname}</Text>
            <Text
              style={[
                styles.customText,
                { fontSize: 12, fontFamily: "Poppins-SemiBold" },
              ]}
            >
              {userData.user.role}
            </Text>
          </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Icon name="compass-outline" size={20} />
          <Text style={styles.customText}>Change password</Text>
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
        <TouchableOpacity style={styles.box} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} />
          <Text style={styles.customText}>Log out </Text>
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
    paddingHorizontal: 2,
  },
  customText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    paddingLeft: 8,
    // fontWeight: "bold",
    // color: "#333",
  },
  nameText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    paddingLeft: 8,
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  box: {
    flexDirection: "row",
    // paddingTop: 15,
    marginTop: 30,
  },
});
