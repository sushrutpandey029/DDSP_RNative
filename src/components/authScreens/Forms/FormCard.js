import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import mainImage from "../../../../assets/images/profile.png";
import Icon from "react-native-vector-icons/Ionicons";

const FormCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#d7e6f4", borderRadius: 10 }}>
        <Image
          source={mainImage}
          style={{ height: 70, width: 70, margin: "auto", marginLeft: 7 }}
        />
      </View>
      <View style={styles.txtContainer}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="caret-forward-outline" size={23} />
          <Text style={styles.title}>{props.title}</Text>
        </View>

        <Text style={{ marginLeft: 4 }}>{props.content}</Text>
      </View>
    </View>
  );
};

export default FormCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#d7e6f4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // elevation: 3,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginLeft: 2,
  },
  txtContainer: {
    flex: 1,
    padding: 12,
    fontFamily: "Poppins-Regular",
  },
});
