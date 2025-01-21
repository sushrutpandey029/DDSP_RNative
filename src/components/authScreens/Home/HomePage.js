import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HomeFarmerImage from "../commons/HomeFarmerImage";
import ButtonTabSlider from "../commons/ButtonTabSlider";
import FarmerList from "./tabContainers/FarmerList";
import HomeTab from "./tabContainers/HomeTab";
import FormTab from "./tabContainers/FormTab";
import { getFarmerById } from "../../redux/slices/FarmerSlice";
import { getAsstPCList, getFieldOfficerList } from "../../redux/slices/OfficerSlice";
import PCoordinatorReport from "./tabContainers/PCoordinatorReport";

const HomePage = ({ navigation }) => {
  const [tabValue, setTabValue] = useState("home");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  console.log("user-details", user);

  useEffect(() => {
    dispatch(getFarmerById(user.id));
    dispatch(getFieldOfficerList());
    dispatch(getAsstPCList());
  }, []);

  const renderTabContent = () => {
    switch (tabValue) {
      case "home":
        return <HomeTab />;
      case "form":
        return <FormTab />;
      case "report":
        return <PCoordinatorReport />;
      case "farmer":
        return <FarmerList />;
      default:
        return (
          <View style={styles.nullData}>
            <Text>Contents unavailable</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeFarmerImage />
      <ButtonTabSlider setTabValue={setTabValue} />
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width:'100%'
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: Dimensions.get("window").width * 0.04,
  },
  nullData: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

