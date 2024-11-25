import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
  } from "react-native";
  import React, { useState } from "react";
  import DatePicker from "react-native-ui-datepicker";
  // import dayjs from "dayjs";
  import { globalContainer, submitBtn } from "../../../../globals/style";
  import { useDispatch, useSelector } from "react-redux";
  import { addFieldOfficerWorkDetail } from "../../../services/ApiFile";
  
  const FieldsWorkerDetails = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth.user);
  
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [villagesVisited, setVillagesVisited] = useState("");
    const [ownLandCultivated, setOwnLandCultivated] = useState("");
    const [clusterID, setClusterID] = useState("");
    const [travelInKms, setTravelInKms] = useState("");
    const [farmersContacted, setFarmersContacted] = useState("");
    const [groupMeetings, setGroupMeetings] = useState("");
    const [farmersInGroup, setFarmersInGroup] = useState("");
    const [trainingPlace, setTrainingPlace] = useState("");
    const [farmersInTraining, setFarmersInTraining] = useState("");
    const [consultancyTelephone, setConsultancyTelephone] = useState("");
    const [consultancyWhatsApp, setConsultancyWhatsApp] = useState("");
  
    const [inputSupplied, setInputSupplied] = useState([
      { name: "", quantity: "" },
    ]);
  
    const formatDate = (selectedDate) => {
      if (!selectedDate) return "";
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      return `${day}-${month}-${year}`;
    };
  
    const handleDateChange = (selectedDate) => {
      if (selectedDate) {
        const dateObj = new Date(selectedDate);
        if (!isNaN(dateObj)) {
          setDate(dateObj);
        }
        setOpen(false);
      }
    };
  
    const handleAddInputSupplied = () => {
      setInputSupplied([...inputSupplied, { name: "", quantity: "" }]);
    };
  
    const handleInputChange = (index, field, value) => {
      const updatedInputs = [...inputSupplied];
      updatedInputs[index][field] = value;
      setInputSupplied(updatedInputs);
    };
  
    const handleSubmit = async () => {
      const requestData = {
        userid: user.id,
        name: user.fullname,
        address: user.address,
        qualifications: user.qualification,
        mobileNumber: user.phonenumber,
        emailID: user.emailid,
        ownLandCultivatedUnderNaturalFarming: ownLandCultivated,
        clusterID,
        workDate: formatDate(date),
        villagesVisited,
        travelInKms: parseInt(travelInKms),
        farmersContactedIndividually: parseInt(farmersContacted),
        groupMeetingsConducted: parseInt(groupMeetings),
        farmersContactedInGroupMeetings: parseInt(farmersInGroup),
        clusterTrainingPlace: trainingPlace,
        farmersAttendedTraining: parseInt(farmersInTraining),
        inputSupplied,
        consultancyTelephone: parseInt(consultancyTelephone),
        consultancyWhatsApp: parseInt(consultancyWhatsApp),
      };
  
      try {
        const response = await addFieldOfficerWorkDetail(requestData);
        console.log("Submitted response:", response);
      } catch (error) {
        console.log("Error submitting form:", error);
      }
    };
  
    return (
      <SafeAreaView style={globalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            {/* Static User Details */}
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={user.fullname} editable={false} />
  
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={user.address} editable={false} />
  
            <Text style={styles.label}>Qualifications</Text>
            <TextInput style={styles.input} value={user.qualification} editable={false} />
  
            <Text style={styles.label}>Mobile No</Text>
            <TextInput style={styles.input} value={user.phonenumber} editable={false} />
  
            <Text style={styles.label}>Email ID</Text>
            <TextInput style={styles.input} value={user.emailid} editable={false} />
  
            {/* Dynamic Input Fields */}
            <Text style={styles.label}>Own Land Cultivated</Text>
            <TextInput
              style={styles.input}
              value={ownLandCultivated}
              onChangeText={setOwnLandCultivated}
            />
  
            <Text style={styles.label}>Cluster ID</Text>
            <TextInput style={styles.input} value={clusterID} onChangeText={setClusterID} />
  
            <Text style={styles.label}>Villages Visited</Text>
            <TextInput style={styles.input} value={villagesVisited} onChangeText={setVillagesVisited} />
  
            <Text style={styles.label}>Work Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpen(true)}
            >
              <Text>{date ? formatDate(date) : "Select a date"}</Text>
            </TouchableOpacity>
  
            <Modal animationType="slide" transparent={true} visible={open}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    modal
                    mode="single"
                    open={open}
                    selectedItemColor="#637e76"
                    date={date}
                    onChange={(event) => handleDateChange(event.date)}
                  />
                  <TouchableOpacity
                    onPress={() => setOpen(false)}
                    style={styles.closeButton}
                  >
                    <Text style={{ fontSize: 19, fontWeight: "bold", color: "red" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
  
            <Text style={styles.label}>Travel in Kms</Text>
            <TextInput
              style={styles.input}
              value={travelInKms}
              onChangeText={setTravelInKms}
              keyboardType="numeric"
            />
  
            <Text style={styles.label}>Number of Farmers Contacted</Text>
            <TextInput
              style={styles.input}
              value={farmersContacted}
              onChangeText={setFarmersContacted}
              keyboardType="numeric"
            />
  
            <Text style={styles.label}>Number of Group Meetings Conducted</Text>
            <TextInput
              style={styles.input}
              value={groupMeetings}
              onChangeText={setGroupMeetings}
              keyboardType="numeric"
            />
  
            {/* Repeater for Input Supplied */}
            <Text style={styles.label}>Input Supplied</Text>
            <FlatList
              data={inputSupplied}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.twoField}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Input Name"
                    value={item.name}
                    onChangeText={(value) => handleInputChange(index, "name", value)}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Quantity"
                    value={item.quantity}
                    onChangeText={(value) => handleInputChange(index, "quantity", value)}
                  />
                </View>
              )}
            />
            <TouchableOpacity onPress={handleAddInputSupplied} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Input</Text>
            </TouchableOpacity>
  
            <View style={styles.btnContainer}>
              <TouchableOpacity style={submitBtn} onPress={handleSubmit}>
                <Text style={styles.inpText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default FieldsWorkerDetails;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal : '3%'
    },
    bgContianer: {
      width: "100%",
      height: "18%",
      backgroundColor: "#5B8A39",
      // borderRadius : '100%'
      borderBottomEndRadius: 800,
      borderBottomStartRadius: 800,
      top: 0,
      position: "absolute",
    },
    imgContainer: {
      position: "absolute",
      top: "9%",
      alignItems: "center",
      width: "100%",
    },
    formContainer: {
      marginBottom: 20,
    },
    img: {
      height: 130,
      width: 130,
    },
    label: {
      fontFamily: "Poppins-Medium",
      fontWeight : '600',
      fontSize: 16,
      marginTop: 9,
    },
    smLabel: {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      marginTop: 9,
    },
    input: {
      height: 49,
      borderWidth: 1,
      borderColor: "#CBD5E1",
      borderRadius: 15,
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      backgroundColor: "#F8FAFC",
      paddingHorizontal: 15,
      // color: '#000'
    },
    input2: {
      height: 49,
      borderWidth: 1,
      borderColor: "#CBD5E1",
      borderRadius: 15,
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      backgroundColor: "#F8FAFC",
      paddingHorizontal: 10,
      // color: '#000'
    },
    field:{
      marginTop : 20
    },
    fieldContainer: {
      marginTop: "60%",
      marginBottom: "6%",
      marginHorizontal: "3%",
    },
    subBtn: {
      width: "70%",
    },
    inpText: {
      color: "#fff",
      fontSize: 18,
    },
    btnContainer: {
      alignItems: "center",
    },
    twoField: {
      flexDirection: "row",
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop : 20
    },
    inField: {
      flex: 1,
      marginHorizontal: 4,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      width: "90%",
      padding: 35,
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
    closeButton: {
      marginTop: 6,
      padding: 10,
      // backgroundColor: "#ddd",
      // borderRadius: 10,
    },
    monthStyle: {
      backgroundColor: "#cde1e3",
      borderColor: "#fff",
    },
  });
  