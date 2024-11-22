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

const ButtonTabSlider = ({setTabValue}) => {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonPress = (index,value) => {
    setActiveButton(index);
    setTabValue(value);
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 0 && styles.activeButton]}
            onPress={() => handleButtonPress(0,'home')}
          >
            <Text style={[activeButton === 0 && styles.btnText]}>Home</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 1 && styles.activeButton]}
            onPress={() => handleButtonPress(1, 'form')}
          >
            <Text style={[activeButton === 1 && styles.btnText]}>Form</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 2 && styles.activeButton]}
            onPress={() => handleButtonPress(2,'latesTask')}
          >
            <Text style={[activeButton === 2 && styles.btnText]}>Latest Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 3 && styles.activeButton]}
            onPress={() => handleButtonPress(3, 'submit')}
          >
            <Text style={[activeButton === 3 && styles.btnText]}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 4 && styles.activeButton]}
            onPress={() => handleButtonPress(4, 'farmer')}
          >
            <Text style={[activeButton === 4 && styles.btnText]}>Farmers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ButtonTabSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: "4%",
    marginBottom : '2%',
    marginHorizontal: 10,
  },
  btnContainer: {
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#5B8A39",
  },
  btnText: {
    color : '#fff',
    fontWeight : '600'
  }
});
