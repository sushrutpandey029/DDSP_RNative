import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const FormContentHome = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconTitle}>
        <Icon name="chevron-forward-outline" size={23} />

        <Text style={styles.title}>{props.title}</Text>
      </View>
      <Text style={styles.content}>{props.content}</Text>
    </SafeAreaView>
  );
};

export default FormContentHome;

const styles = StyleSheet.create({
  container: {
    padding: 9,
    // borderBottomWidth: 1,
    // borderBottomColor: "#5B8A39",
    // borderWidth : 1.5,
    // borderColor : "#5B8A39",
    margin: 4,
    borderRadius: 7,
    backgroundColor: "#e8efed",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  content: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    marginLeft : 22
  },
  iconTitle: {
    flexDirection: "row",
  },
});
