import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FormHeader from "../../Forms/FormHeader";
import { globalContainer } from "../../.../../../../globals/style";
import { detailOfProductionandCultivation } from "../../../services/ApiFile";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const CropTab = ({ data, type, refreshing, handleOnRefresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCrop, setSelectedCrop] = useState(null);
  const navigation = useNavigation();
  console.log("refreshing", refreshing);

  const openModal = (item) => {
    setSelectedCrop(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCrop(null);
  };

  const renderItem = ({ item }) => {
    console.log("item", JSON.stringify(item, null, 2));
    const crop = type === "cultivationCosts" ? item.crops : item.cropName;

    console.log("type", type);
    console.log("crop", crop);

    return (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.listText}>Season: {crop.season}</Text>
          <Text style={styles.listText}>
            Category:{" "}
            {type === "cultivationCosts" ? crop.category : crop.irrigationType}
          </Text>
          <Text style={styles.listText}>
            Crop: {type === "cultivationCosts" ? crop.crop : crop.name}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CropDetailUpdate", {
                type,
                crop,
                id: item.id,
                farmerID: item.farmerID,
              })
            }
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal(crop)}>
            <Text style={styles.btnText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.tabContainer}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
          }
        />
      ) : (
        <Text style={styles.noDataText}>No data available.</Text>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {selectCrop && (
              <>
                {type === "cultivationCosts" && (
                  <>
                    <Text style={styles.modalTitle}>
                      Seed Cost: {selectCrop.costs.seedCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Land Preparation Cost: {selectCrop.costs.landCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Fertilizer Cost: {selectCrop.costs.fertilizerCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Pesticide Cost: {selectCrop.costs.pesticideCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Harvest Cost: {selectCrop.costs.harvestCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Labor Cost: {selectCrop.costs.laborCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Misc Cost: {selectCrop.costs.miscCost}
                    </Text>
                  </>
                )}
                {type === "productionDetails" && (
                  <>
                    <Text style={styles.modalTitle}>
                      Surplus: {selectCrop.surplus}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Total Yield: {selectCrop.totalYield}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Total Sale Value: {selectCrop.totalSaleValue}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Sale Value Per Quintal : {selectCrop.saleValuePerQuintal}
                    </Text>
                  </>
                )}
                <Text style={styles.modalTitle}>
                  Total Cost: {selectCrop.totalCost}
                </Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const CropDetail = ({ route, navigation }) => {
  const fId = route.params.fId;

  const [selectedTab, setSelectedTab] = useState("cultivationCosts");
  const [data, setData] = useState({
    cultivationCosts: [],
    productionDetails: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getDetails = async () => {
    try {
      const response = await detailOfProductionandCultivation(fId);
      console.log("cropdtl-resp", JSON.stringify(response, null, 2));
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await getDetails();
    setRefreshing(false);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     getDetails();
  //   }, [])
  // );
  
  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="CROP DETAIL" />
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "cultivationCosts" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("cultivationCosts")}
        >
          <Text style={styles.tabText}>Cultivation Costs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "productionDetails" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("productionDetails")}
        >
          <Text style={styles.tabText}>Production Details</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === "cultivationCosts" && (
        <CropTab
          data={data.cultivationCosts}
          type="cultivationCosts"
          refreshing={refreshing}
          handleOnRefresh={handleOnRefresh}
        />
      )}
      {selectedTab === "productionDetails" && (
        <CropTab
          data={data.productionDetails}
          type="productionDetails"
          refreshing={refreshing}
          handleOnRefresh={handleOnRefresh}
        />
      )}
    </SafeAreaView>
  );
};

export default CropDetail;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#5B8A39",
    padding: 10,
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, marginVertical: 5 },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#f00",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  btnText: {
    color: "blue",
    fontSize: 16,
  },
});
