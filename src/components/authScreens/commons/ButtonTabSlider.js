import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { btn1, btn2 } from "../../../globals/style";
import { useSelector } from "react-redux";

const ButtonTabSlider = ({ setTabValue }) => {
  const [activeButton, setActiveButton] = useState(0);
  const { user } = useSelector((state) => state.auth.user);

  const handleButtonPress = (index, value) => {
    setActiveButton(index);
    setTabValue(value);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 0 && styles.activeButton]}
            onPress={() => handleButtonPress(0, "home")}
          >
            <Text
              style={[styles.btnText, activeButton === 0 && styles.acBtnText]}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 1 && styles.activeButton]}
            onPress={() => handleButtonPress(1, "form")}
          >
            <Text
              style={[styles.btnText, activeButton === 1 && styles.acBtnText]}
            >
              Form
            </Text>
          </TouchableOpacity>
        </View>

        {user.role === "Project Coordinator" && (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[btn2, activeButton === 2 && styles.activeButton]}
              onPress={() => handleButtonPress(2, "report")}
            >
              <Text
                style={[styles.btnText, activeButton === 2 && styles.acBtnText]}
              >
                Reports
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 3 && styles.activeButton]}
            onPress={() => handleButtonPress(3, "farmer")}
          >
            <Text
              style={[styles.btnText, activeButton === 3 && styles.acBtnText]}
            >
              Farmers
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ButtonTabSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: "2%",
    marginHorizontal: 10,
    backgroundColor: "#e7eae1",
    marginLeft: 0,
    width: "100%",
  },
  btnContainer: {
    padding: 10,
  },
  activeButton: {
     backgroundColor: "#81a989",
  },
  acBtnText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  btnText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
