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
    padding: 10,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "#e9f0e6",
    borderWidth: 1,
    borderColor: "#f5f5e2",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  content: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    marginLeft: 22,
  },
  iconTitle: {
    flexDirection: "row",
  },
});
