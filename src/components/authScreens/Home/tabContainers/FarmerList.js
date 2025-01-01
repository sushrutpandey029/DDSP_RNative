import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFarmerDetails } from "../../../services/ApiFile";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const FarmerList = () => {
  const [farmerDetails, setFarmerDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [farmerId, setFarmerId] = useState("");
  const [fId, setFId] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const getFarmerList = async () => {
    try {
      const response = await getFarmerDetails();
      // console.log("frmlst-resp-farmer", response.farmers);
      setFarmerDetails(response.farmers);
    } catch (error) {
      console.warn("frmlst-err", error);
    }
  };

  const openModal = (id, fid) => {
    setModalVisible(true);
    setFarmerId(id);
    setFId(fid);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFarmerId(null);
  };

  const handlePress = (name) => {
    setModalVisible(false);
    if (name === "CropDetail") {
      navigation.navigate(name, { fId: fId });
    } else {
      navigation.navigate(name, { farmerId: farmerId });
    }
  };

  const handleOnRefresh  = async() => {
    setRefreshing(true);
    await getFarmerList();
    setRefreshing(false);
  }

  useEffect(() => {
    getFarmerList();
  }, []);

  if (farmerDetails.length < 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} style={{ marginTop: "50%" }} />
      </View>
    );
  }

  return (
    <View >
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh}/>}
      >
        {farmerDetails.map((item) => (
          <View style={styles.container} key={item.id}>
            <TouchableOpacity onPress={() => openModal(item.id, item.farmerID)}>
              <Text style={styles.txtName}>{item.name}</Text>
              <Text style={styles.txtEmail}>{item.emailID}</Text>
              <Text style={styles.txtId}>{item.farmerID}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.centerdView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => handlePress("CropDetail")}>
                <Text style={styles.txt}> Crop Detail</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePress("FarmerDetail")}>
                <Text style={styles.txt}>Farmer Detail</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handlePress("DetailOfCultivation")}
              >
                <Text style={styles.txt}> Add Cultivation</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handlePress("DetailOfProduction")}
              >
                <Text style={styles.txt}>Add Production</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={[styles.txt, { color: "red" }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default FarmerList;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "#f5f7fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    // borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  centerdView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  activity: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  txtName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#2c3e50",
    // marginBottom: 2,
  },
  txtEmail: {
    fontFamily: "Poppins-Regular",
    color: "#7f8c8d",
    // marginBottom: 2,
  },
  txtId: {
    fontSize: 14,
    color: "#95a5a6",
  },
});
