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
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FormHeader from "../../Forms/FormHeader";
import { globalContainer } from "../../.../../../../globals/style";
import { detailOfProductionandCultivation } from "../../../services/ApiFile";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";

const CropTab = ({ data, type }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCrop, setSelectedCrop] = useState(null);
  // const slideAnim = useRef(new Animated.Value(500)).current;

  const openModal = (item) => {
    setSelectedCrop(item);
    setModalVisible(true);

    // Animated.timing(slideAnim, {
    //   toValue: 0,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start();
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCrop(null);
    // Animated.timing(slideAnim, {
    //   toValue: 500,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start(() => {

    // });
  };

  const renderItem = ({ item }) => {
    const crop = type === "cultivationCosts" ? item.crops : item.cropName;

    return (
      <TouchableOpacity style={styles.listItem} onPress={() => openModal(crop)}>
        <Text style={styles.listText}>Season : {crop.season}</Text>
        <Text style={styles.listText}>
          Category :{" "}
          {type === "cultivationCosts" ? crop.category : crop.irrigationType}
        </Text>
        <Text style={styles.listText}>
          Crop : {type === "cultivationCosts" ? crop.crop : crop.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.tabContainer}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
          {/* <Animated.View 
          style={[styles.modalContainer,{transform:[{translateX: slideAnim}]}]}> */}
          <ScrollView style={styles.modalContent}>
            {selectCrop && (
              <>
                {type === "cultivationCosts" && (
                  <>
                    <Text style={styles.modalTitle}>
                      Seed Cost: {selectCrop.costs.seedCost}
                    </Text>
                    <Text style={styles.modalTitle}>
                    {/* //land cost is changed into landPreparaitoncost */}
                      Land Cost: {selectCrop.costs.landCost} 
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
                      Total Yield: {selectCrop.totalYield}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Total Sale Value: {selectCrop.totalSaleValue}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Surplus: {selectCrop.surplus}
                    </Text>
                    <Text style={styles.modalTitle}>
                      Sale Value Per Quintal: {selectCrop.saleValuePerQuintal}
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
          {/* </Animated.View> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const CropDetail = ({ route }) => {
  const fId = route.params.fId;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "cultivationCosts", title: "Cultivation Costs" },
    { key: "productionDetails", title: "Production Details" },
  ]);

  const [data, setData] = useState({
    cultivationCosts: [],
    productionDetails: [],
  });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getDetails();
  }, []);

  const renderScene = SceneMap({
    cultivationCosts: () => (
      <CropTab data={data.cultivationCosts} type="cultivationCosts" />
    ),
    productionDetails: () => (
      <CropTab data={data.productionDetails} type="productionDetails" />
    ),
  });

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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
          />
        )}
      />
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
  // container: { flex: 1 },
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
  // modalContainer: {
  //   width: '70%', // Adjust the modal width
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderTopLeftRadius: 10,
  //   borderBottomLeftRadius: 10,
  //   elevation: 5,
  // },
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
  tabBar: {
    backgroundColor: "#5B8A39",
  },
  indicator: {
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
