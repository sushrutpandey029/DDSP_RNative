import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import HomeFarmerImage from "../commons/HomeFarmerImage";
import ButtonTabSlider from "../commons/ButtonTabSlider";
import FormContentHome from "../Forms/FormContentHome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import FarmerList from "./tabContainers/FarmerList";
import HomeTab from "./tabContainers/HomeTab";
import { getFarmerById } from "../../redux/slices/FarmerSlice";

const HomePage = ({ navigation }) => {
  const [tabValue, setTabValue] = useState("home");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
 
 
  useEffect(() => {
     dispatch(getFarmerById(user.id))
  },[])

  return (
    <ScrollView>
      <HomeFarmerImage />
      <ButtonTabSlider setTabValue={setTabValue} />
      <View style={styles.container}>
        {/* if home button is clicked */}
        {tabValue === "home" && <HomeTab />}

        {/* if form button is clicked */}
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

            <TouchableOpacity onPress={() => navigation.navigate("FieldWork")}>
              <FormContentHome
                title="Field Worker Details"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>

            {user.role === "Project Coordinator" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProjectWork")}
              >
                <FormContentHome
                  title="Project Coordination Work"
                  content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("InteractionWithFarmer")}
            >
              <FormContentHome
                title="Interaction With Farmers"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
          </View>
        )}

        {/* if Latest Task button is clicked */}
        {tabValue === "latesTask" && (
          <View style={styles.nullData}>
            <Text>Contents unavailable</Text>
          </View>
        )}

        {/* if Submit is clicked */}
        {tabValue === "submit" && (
          <View style={styles.nullData}>
            <Text>Contents unavailable</Text>
          </View>
        )}

        {/* if farmer button is clicked */}
        {tabValue === "farmer" && <FarmerList />}
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Dimensions.get("window").width * 0.03,
  },
  nullData: {
    alignItems: "center",
    marginTop: "50%",
  },
});
