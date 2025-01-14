import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { BaseUrl } from "../../api/Api";
import { logoutUser } from "../../redux/slices/AuthSlice";

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const {user} = useSelector((state) => state.auth.user)

  const handleLogout = async () => {
    const result = dispatch(logoutUser());
    if (result.meta?.requestStatus === "fullfilled") {
      navigation.navigate("Logo");
    }
  };

  const handleNavigation = async (name) => {
    navigation.navigate(name);
  };

  return (
    <DrawerContentScrollView style={styles.customTextContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: `${BaseUrl}/profile-images/${user.profileimage}`,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.nameContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.nameText}>{user.fullname}</Text>
            <Text
              style={[
                styles.customText,
                { fontSize: 14, fontFamily: "Poppins-SemiBold" },
              ]}
            >
              {user.role}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => handleNavigation("Profile")}
          style={styles.box}
        >
          <Icon name="person" size={20} />
          <Text style={styles.customText}>View profile</Text>
        </TouchableOpacity>
      </View>


      <View>
        <TouchableOpacity
          onPress={() => handleNavigation("FormPage")}
          style={styles.box}
        >
          <Icon name="information-circle" size={20} />
          <Text style={styles.customText}>Forms</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleNavigation("AttendanceList")}
        >
          <Icon name="checkmark-circle" size={20} />
          <Text style={styles.customText}>Attendance List</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleNavigation("FarmerInteractionList")}
        >
          <Icon name="checkmark-circle" size={20} />
          <Text style={styles.customText}>Interaction List</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleNavigation("ChangePassword")}
        >
          <Icon name="compass" size={20} />
          <Text style={styles.customText}>Change password</Text>
        </TouchableOpacity>
      </View>



      <View>
        <TouchableOpacity style={styles.box} onPress={handleLogout}>
          <Icon name="log-out" size={20} />
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
    backgroundColor: "#fff",
  },
  infoContainer: {
  },
  imgContainer: {},
  nameContainer: {
     marginTop:10
  },
  customText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    paddingLeft: 8,
  },
  nameText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    paddingLeft: 8,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  box: {
    flexDirection: "row",
    marginTop: 30,
  },
});
