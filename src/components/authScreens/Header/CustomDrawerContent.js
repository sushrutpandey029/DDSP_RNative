import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import userIcon from "../../../../assets/images/userIcon1.png";
import  Icon  from "react-native-vector-icons/Ionicons";

const CustomDrawerContent = () => {
  return (
    <DrawerContentScrollView style={styles.customTextContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.imgContainer}>
          <Image source={userIcon} style={styles.profileImage} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.customText}>Vivek Kumar</Text>
          <Text style={styles.customText}>vivek@gmail.com</Text>
        </View>
      </View>

      <View style={styles.box}>
         <Icon name="person-outline" size={20} />
        <Text style={styles.customText} >
                View profile
        </Text>
      </View>

      <View style={styles.box}>
               <Icon name="settings-outline" size={20} />

        <Text style={styles.customText}>
            Settings
        </Text>
      </View>

      <View style={styles.box}>
               <Icon name="ellipse-outline" size={20} />

        <Text style={styles.customText}>
            List item
        </Text>
      </View>

      <View style={styles.box}>
               <Icon name="ellipse-outline" size={20} />

        <Text style={styles.customText}>
            Forms
        </Text>
      </View>

      <View style={styles.box}>
               <Icon name="people-outline" size={20} />

        <Text style={styles.customText}>
            Team
        </Text>
      </View>

      <View style={styles.box}>
               <Icon name="help-circle-outline" size={20} />

        <Text style={styles.customText}>
            Support
        </Text>
      </View>

      <View style={styles.box}>
               <Icon name="log-out-outline" size={20} />

        <Text style={styles.customText}>
            Log out
        </Text>
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
    paddingLeft : 8
    // fontWeight: "bold",
    // color: "#333",
  },
  profileImage: {
    height: 60,
    width: 60,
  },
  box : {
    flexDirection : 'row',
    paddingTop : 15,
    
  }
});
