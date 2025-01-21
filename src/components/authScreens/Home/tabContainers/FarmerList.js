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
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFarmerDetails } from "../../../services/ApiFile";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { closeButton, closeButtonText } from "../../../../globals/style";

const FarmerList = () => {
  const [farmerDetails, setFarmerDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [farmerId, setFarmerId] = useState("");
  const [fId, setFId] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getFarmerList = async () => {
    try {
      setLoading(true);
      const response = await getFarmerDetails();
      // console.log("frmlst-resp-farmer", response.farmers);
      setFarmerDetails(response.farmers);
    } catch (error) {
      setLoading(false);
      console.warn("frmlst-err", error);
    } finally {
      setLoading(false);
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

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await getFarmerList();
    setRefreshing(false);
  };

  useEffect(() => {
    getFarmerList();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
      >
        <View style={{ marginBottom: 40 }}>
          {farmerDetails.length ? (
            farmerDetails.map((item) => (
              <TouchableOpacity
                onPress={() => openModal(item.id, item.farmerID)}
                style={styles.container}
                key={item.id}
              >
                <View style={{ marginLeft: 4, flex: 11 }}>
                  <Text style={styles.txtName}>{item.name}</Text>
                  <Text style={styles.txtEmail}>{item.emailID}</Text>
                  <Text style={styles.txtId}>{item.farmerID}</Text>
                </View>
                <View style={{ alignSelf: "center", flex: 1 }}>
                  <MaterialCommunityIcons name="dots-vertical" size={26} />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={[styles.txtName, { alignSelf: "center" }]}>
              no list available.
            </Text>
          )}
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

                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default FarmerList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    // marginLeft:5,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "#d7e6f4",
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
    width: "65%",
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
    fontFamily: "Poppins-Medium",
    color: "#34495e",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    color: "red",
    fontSize: 14,
    // backgroundColor:'#fad7d4',
    borderRadius: 8,
  },
  closeBtnText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#fc3121",
    paddingHorizontal: 12,
    paddingVertical: 4,
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
  },
  txtEmail: {
    fontFamily: "Poppins-Regular",
    color: "#2c3e50",
    fontSize: 12,
  },
  txtId: {
    fontSize: 12,
    color: "#2c3e50",
  },
});
