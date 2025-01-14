import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getUserDetails = async () => {
    try {
      setLoading(true)
      const response = await getWorkDetail();

      if (response.success === true) {
        setApiWorkData(response.data);
        console.log("workdetailResponse", response);
      }
    } catch (error) {
      console.error("workdetail-err", error.response);
    }finally{
      setLoading(false);
    }
  };

  const filteredData =
    user.role === "Project Coordinator"
      ? apiWorkData
      : apiWorkData.filter((item) => item.userid == user.id);

  useEffect(() => {
    getUserDetails();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getUserDetails();
    setRefreshing(false);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size={50} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="REPORT DETAIL" />

      <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
      >
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
