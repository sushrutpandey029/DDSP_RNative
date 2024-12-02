import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import FormHeader from "../../Forms/FormHeader";
import { globalContainer } from "../../.../../../../globals/style";
import { detailOfProductionandCultivation } from "../../../services/ApiFile";

const CropDetail = () => {


  const getDetails =async () => {
    const response = await detailOfProductionandCultivation()
  }

 useEffect(() => {
  getDetails();
 },[])

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="CROP DETAIL" />
      <View style={styles.headContainer}>
        <TouchableOpacity style={styles.headInContainer}>
          <Text style={styles.headText}>Cultivation Cost</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headInContainer}>
          <Text style={styles.headText}>Production Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CropDetail;

const styles = StyleSheet.create({
  headContainer: {
     flexDirection: "row",
    justifyContent: "space-around",
  },
  headInContainer: {},
  headText: {
    fontFamily: "Poppins-Medium",
  },
});
