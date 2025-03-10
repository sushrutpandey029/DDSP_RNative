import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import headerLogo from "../../../../assets/logos/logoHeader.png";
import { useNavigation } from "@react-navigation/native";

const Header = ({}) => {
  const navigation = useNavigation();
  const handleMenuButton =   () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={headerLogo} style={styles.img} />
      </View>
      <View>
        <TouchableOpacity onPress={handleMenuButton}>
          <Icon name="menu" size={45} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    marginTop: "3%",
    // backgroundColor:"#e7eae1",
    alignItems:"center"
  },
  img: {
    width: 246,
    height: 64,
  },
});
