import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import FormCard from "./FormCard";
import FormHeader from "./FormHeader";
import { globalContainer } from "../../../globals/style";

const FormPage = ({ navigation }) => {
  return (
    <View style={globalContainer}>
      <FormHeader title={"FORM PAGE"} />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FarmerInformation")}
        >
          <FormCard
            title={"Farmer Information"}
            content={
              "Details of individual farmer participating in the project and the crops cultivated by him under Natural Farming and also under chemical farming, if any."
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FieldWork")}>
          <FormCard
            title={"Fields Worker Details"}
            content={
              "Details of individual  Field worker and the tasks planned and/or performed by him."
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProjectWork")}>
          <FormCard title={"Project Corodination Work"} content="Details of programmes and review of meeting conducted by Project Coordinator." />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FormPage;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 50,
    // backgroundColor:"red"
  },
});
