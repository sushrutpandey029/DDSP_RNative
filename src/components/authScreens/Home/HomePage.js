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
import FormTab from "./tabContainers/FormTab";
import {getAsstPCList, getFieldOfficerList} from "../../redux/slices/OfficerSlice"

const HomePage = ({ navigation }) => {
  const [tabValue, setTabValue] = useState("home");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
 
  useEffect(() => {
    dispatch(getFarmerById(user.id));
    dispatch(getFieldOfficerList());
    dispatch(getAsstPCList());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeFarmerImage />
      <ButtonTabSlider setTabValue={setTabValue} />
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* if home button is clicked */}
          {tabValue === "home" && <HomeTab />}

          {/* if form button is clicked */}
          {/* <Text>hello</Text> */}
          {tabValue === "form" && <FormTab />}

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
        </ScrollView>
     </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: Dimensions.get("window").width * 0.03,
  },
  nullData: {
    alignItems: "center",
    marginTop: "50%",
  },
});
