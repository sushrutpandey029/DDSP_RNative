import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFarmerDetails } from "../../../services/ApiFile";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const FarmerList = () => {
  const [farmerDetails, setFarmerDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [farmerId, setFarmerId] = useState("");

  const navigation = useNavigation();

  const getFarmerList = async () => {
    try {
      const response = await getFarmerDetails();
      //   console.warn("frmlst-resp", response);
      setFarmerDetails(response.farmers);
    } catch (error) {
      console.warn("frmlst-err", error);
    }
  };

  const openModal = (id) => {
    setModalVisible(true);
    setFarmerId(id);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFarmerId(null);
  };

  const handlePress = (name) => {
    setModalVisible(false);
    navigation.navigate(name, {farmerId:farmerId });
  }

  useEffect(() => {
    getFarmerList();
  }, []);

  return (
    <View>
      {farmerDetails.map((item) => (
        <View style={styles.container} key={item.id}>
          <TouchableOpacity onPress={() => openModal(item.id)}>
            <Text>{item.farmerID}</Text>
            <Text>{item.name}</Text>
            <Text>{item.emailID}</Text>
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

          <TouchableOpacity onPress={() => handlePress('DetailOfCultivation')}>
              <Text style={styles.txt}> Detail of Farmer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('DetailOfCultivation')}>
              <Text style={styles.txt}> Detail of Cultivation</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('DetailOfProduction')}>
              <Text style={styles.txt}>Detail of Production</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text style={[styles.txt,{color : 'red'}]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FarmerList;

const styles = StyleSheet.create({
  container: {
    padding: 9,
    // borderBottomWidth: 1,
    // borderBottomColor: "#5B8A39",
    // borderWidth : 1.5,
    // borderColor : "#5B8A39",
    margin : 4,
    borderRadius : 7,
    backgroundColor : '#e8efed'
  },
  centerdView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txt : {
    fontFamily : 'Poppins-Medium',
    fontSize : 16,
    padding:8
  }
});
