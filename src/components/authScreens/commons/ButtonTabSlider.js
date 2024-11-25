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
            <Text style={[styles.btnText ,activeButton === 0 && styles.acBtnText]}>Home</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 1 && styles.activeButton]}
            onPress={() => handleButtonPress(1, 'form')}
          >
            <Text style={[styles.btnText ,activeButton === 1 && styles.acBtnText]}>Form</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 2 && styles.activeButton]}
            onPress={() => handleButtonPress(2,'latesTask')}
          >
            <Text style={[styles.btnText ,activeButton === 2 && styles.acBtnText]}>Latest Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 3 && styles.activeButton]}
            onPress={() => handleButtonPress(3, 'submit')}
          >
            <Text style={[styles.btnText ,activeButton === 3 && styles.acBtnText]}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[btn2, activeButton === 4 && styles.activeButton]}
            onPress={() => handleButtonPress(4, 'farmer')}
          >
            <Text style={[styles.btnText , activeButton === 4 && styles.acBtnText]}>Farmers</Text>
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
    marginHorizontal: 3,
  },
  activeButton: {
    backgroundColor: "#5B8A39",
  },
  acBtnText: {
    color : '#fff',
    fontFamily : 'Poppins-SemiBold',
    // fontWeight : '600',
    // fontSize : 14
  },
  btnText : {
    fontSize : 14,
    fontFamily : 'Poppins-Regular',
  }
});
