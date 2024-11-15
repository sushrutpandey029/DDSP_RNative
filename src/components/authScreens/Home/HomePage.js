import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import Header from "../Header/Header";
import HomeFarmerImage from "../commons/HomeFarmerImage";
import ButtonTabSlider from "../commons/ButtonTabSlider";
import FormContentHome from "../Forms/FormContentHome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

const HomePage = ({ navigation }) => {
  const [tabValue, setTabValue] = useState("home");
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth);
  // console.log('h-user',user);
  
 
  return (
    <ScrollView>
      <HomeFarmerImage />
      <ButtonTabSlider setTabValue={setTabValue} />
      <View style={styles.container}>
        
        {tabValue === "form" && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("FarmerInformation")}
            >
              <FormContentHome
                title="Farmer Information"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailOfCultivation")}
            >
              <FormContentHome
                title="Detail Of Cultivation Cost"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailOfProduction")}
            >
              <FormContentHome
                title="Detail Of Production"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FieldWork")}>
              <FormContentHome
                title="Field Worker Details"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProjectWork")}
            >
              <FormContentHome
                title="Project Coordination Work"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Dimensions.get("window").width * 0.03,
  },
});
