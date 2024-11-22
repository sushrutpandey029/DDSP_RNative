import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const FormHeader = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.txt}>{props.title}</Text>
      </View>
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  txt: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginLeft: 10,
  },
});
