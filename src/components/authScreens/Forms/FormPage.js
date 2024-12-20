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
          <FormCard title={"Farmer Information"} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("DetailOfCultivation")}
        >
          <FormCard title={"Detail Of Cultivation"} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("DetailOfProduction")}
        >
          <FormCard title={"Detail Of Production"} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("FieldWork")}>
          <FormCard title={"Fields Worker Details"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProjectWork")}>
          <FormCard title={"Project Corodination Work"} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default FormPage;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 50,
  },
});
