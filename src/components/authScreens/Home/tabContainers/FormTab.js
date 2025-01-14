import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormContentHome from "../../Forms/FormContentHome";
import { useSelector } from "react-redux";

const FormTab = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth.user);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{marginBottom:50}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FarmerInformation")}
        >
          <FormContentHome
            title="Farmer Information"
            content="Details of individual farmer participating in the project and the crops cultivated by him under Natural Farming and also under chemical farming, if any.
"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("FieldWork")}>
          <FormContentHome
            title="Field Worker Details"
            content="Details of individual  Field worker and the tasks planned and/or performed by him."
          />
        </TouchableOpacity>

        {user.role === "Project Coordinator" && (
          <TouchableOpacity onPress={() => navigation.navigate("ProjectWork")}>
            <FormContentHome
              title="Project Coordination Work"
              content="Details of programmes and review of meeting conducted by Project Coordinator."
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("InteractionWithFarmer")}
        >
          <FormContentHome
            title="Interaction With Farmers"
            content="Detials of individuals interacted with farmers."
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
    // marginTop:0
  },
});
