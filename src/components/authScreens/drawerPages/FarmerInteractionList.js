import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormHeader from "../Forms/FormHeader";
import { globalContainer } from "../../../globals/style";
import { getFarmerInteraction } from "../../services/ApiFile";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const FarmerInteractionList = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth.user);
  console.log("user", user);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFarmerInteraction = async () => {
    try {
      setLoading(true);
      const response = await getFarmerInteraction();
      console.log("interacFarm-resp", response);
      if (response.success) {
        console.log("interacFarm-resp", response);
        setApiData(response.CountData);
      }
    } catch (err) {
      console.log("interacFarm-err", err.response);
    } finally {
      setLoading(false);
    }
  };

  const filteredData =
    user.role === "Project Coordinator"
      ? apiData
      : apiData?.filter((item) => item.user_id == user.id);

  console.log("flterdata", filteredData);

  const handleViewClick = (item) => {
    navigation.navigate("InteractionDetails", {
      village: item.village,
      farmer: item.farmer,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={{flex:11}}>
        <Text style={styles.text}>Name : {item.fullname}</Text>
        <Text style={styles.text}>Role : {item.userrole}</Text>
        <Text style={styles.text}>Village : {item.village}</Text>
        <Text style={styles.text}>Farmer : {item.farmer}</Text>
        <Text style={styles.text}>Count : {item.count}</Text>
      </View>
      <View style={{flex:1}}>
        <TouchableOpacity onPress={() => handleViewClick(item)}>
          <Ionicons name="eye" size={28} color={"#6774d5"}/>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await fetchFarmerInteraction();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchFarmerInteraction();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderConatiner}>
        <ActivityIndicator size={50} />
      </View>
    );
  }

  return (
    <View style={globalContainer}>
      <FormHeader title="INTERACTION WITH FARMERS" />
      {filteredData?.length ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(data, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
          }
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

export default FarmerInteractionList;

const styles = StyleSheet.create({
  loaderConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    margin: 6,
    backgroundColor: "#d7e6f4",
    borderRadius: 10,
    // borderWidth: 1,
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
  view: {
    color: "blue",
  },
  noData: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
