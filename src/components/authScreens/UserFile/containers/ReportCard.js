import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const ReportCard = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.txt}>Name : {props.name}</Text>
        <Text style={styles.txt}>Visited Village : {props.village}</Text>
        <Text style={styles.txt}>Date : {props.workdate}</Text>
      </View>

      <View>
        <Icon
          name="chevron-forward-outline"
          size={25}
          style={styles.iconStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    margin: 6,
    backgroundColor: "#d7e6f4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  txt: {
    fontFamily: "Poppins-Medium",
  },
  iconStyle: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 1,
    height: 35,
    width: 35,
    lineHeight: 35,
    textAlign: "center",
  },
});
