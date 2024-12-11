import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalContainer } from "../../../globals/style";
import FormHeader from "../Forms/FormHeader";
import { getWorkDetail } from "../../services/ApiFile";
import ReportCard from "./containers/ReportCard";
import { useFocusEffect } from "@react-navigation/native";

const UserReport = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth.user);
  const [apiWorkData, setApiWorkData] = useState([]);

  const getUserDetails = async () => {
    try {
      const response = await getWorkDetail();

      if (response.success === true) {
        setApiWorkData(response.data);
        // console.log("workdetailResponse", JSON.stringify(response, null, 2));
      }
    } catch (error) {
      console.error("workdetail-err", error);
    }
  };

  const filteredData =
    user.role === "Project Coordinator"
      ? apiWorkData
      : apiWorkData.filter((item) => item.userid == user.id);

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails(); // Call API when component is focused
    }, [])
  );

  if (apiWorkData.length < 1) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size={50} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="REPORT DETAIL" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <TouchableOpacity
            key={index}
              onPress={() => navigation.navigate("FieldWorkUpdate",{id: item.id})}
            >
              <ReportCard
                name={item.name}
                village={item.villagesVisited}
                workdate={item.workDate}
              />
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <Text>No data available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserReport;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
