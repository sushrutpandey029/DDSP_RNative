import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

const ReportCard = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtName}>Name : {props.name}</Text>
      <Text style={styles.txtVillage}>Visited Village : {props.village}</Text>
      <Text style={styles.txtDate}>Date : {props.workdate}</Text>
    </SafeAreaView>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    margin: 6,
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    // borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#d3d3d3",
  },
  txtName: {
    fontFamily: "Poppins-Regular",
  },
  txtVillage: {
    fontFamily: "Poppins-Regular",
  },
  txtDate: {
    fontFamily: "Poppins-Regular",
  },
});
