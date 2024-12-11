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
    padding: 12,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "#f5f7fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  content: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    marginLeft: 22,
  },
  iconTitle: {
    flexDirection: "row",
  },
});
