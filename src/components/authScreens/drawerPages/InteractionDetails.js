import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormHeader from "../Forms/FormHeader";
import { globalContainer } from "../../../globals/style";
import { getInteractionDetails } from "../../services/ApiFile";

const InteractionDetails = ({ route }) => {
  const { village, farmer } = route.params;
  console.log("data", village, farmer);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInteractionDetails = async () => {
    try {
      setLoading(true);
      const response = await getInteractionDetails(village, farmer);
      if (response.success) {
        setApiData(response.data);
        console.log("interactiondetails-response", response);
      }
    } catch (err) {
      console.log("interactionDetails-err", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.text}>Name : {item.fullname}</Text>
      <Text style={styles.text}>Role : {item.userrole}</Text>
      <Text style={styles.text}>Village : {item.village}</Text>
      <Text style={styles.text}>Farmer : {item.farmer}</Text>
      <Text style={styles.text}>Date : {item.date}</Text>
      <Text style={styles.text}>Observation in Brief : {item.observationInBrief}</Text>
    </View>
  );

  const handleOnRefresh =async () => {
    setRefreshing(true);
    await fetchInteractionDetails();
    setRefreshing(false)
  }

  useEffect(() => {
    fetchInteractionDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderConatiner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={globalContainer}>
      <FormHeader title="INTERACTION DETAILS" />
      {apiData?.length ? (
        <FlatList
          data={apiData}
          renderItem={renderItem}
          keyExtractor={(data, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noData}>
          <Text>no data found.</Text>
        </View>
      )}
    </View>
  );
};

export default InteractionDetails;

const styles = StyleSheet.create({
  loaderConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "space-between",
    padding: 6,
    margin: 6,
    backgroundColor: "#d7e6f4",
    borderRadius: 10,
     shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#d3d3d3",
  },
  text: {
    fontFamily: "Poppins-Medium",
  },
  noData: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
