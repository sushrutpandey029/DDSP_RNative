import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import DatePicker from "react-native-ui-datepicker";
import { globalContainer } from "../../../../globals/style";
import { useDispatch, useSelector } from "react-redux";
import { addFieldOfficerWorkDetail } from "../../../services/ApiFile";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { villageItems } from "../data/Constant";

const FieldsWorkerDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const { farmerList } = useSelector((state) => state.farmer);

  console.log("FWorkDetls-user", user);

  console.log("farmerList", farmerList);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [villagesVisited, setVillagesVisited] = useState("");
  const [ownLandCultivated, setOwnLandCultivated] = useState(user.cultivatedland);
  const [clusterID, setClusterID] = useState(user.clusterid);
  const [travelInKms, setTravelInKms] = useState("");
  const [farmersContacted, setFarmersContacted] = useState("");
  const [groupMeetings, setGroupMeetings] = useState("");
  const [farmersInGroup, setFarmersInGroup] = useState("");
  const [trainingPlace, setTrainingPlace] = useState("");
  const [farmersInTraining, setFarmersInTraining] = useState("");
  const [consultancyTelephone, setConsultancyTelephone] = useState("");
  const [consultancyWhatsApp, setConsultancyWhatsApp] = useState("");
  const [observationinbrif, setobservationinbrif] = useState("");
  const [totalcostinputsuplied, setTotalCostInputSupplied] = useState(0);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 4);

  const filterFarmerName = farmerList?.data.map((farmer) => ({
    label: farmer.name.trim(),
    value: farmer.name.trim(),
  }));

  const [inputSupplied, setInputSupplied] = useState([
    { farmerName: "", name: "", quantity: "" },
  ]);

  const [ownLandCultivatedItems] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);

  // Format the date as dd-mm-yyyy
  const formatDate = (selectedDate) => {
    if (!selectedDate) return ""; // If the selectedDate is null or undefined
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = async (selectedDate) => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Ensure it's a Date object
      if (!isNaN(dateObj)) {
        setDate(dateObj); // Set the valid date
      }
      setOpen(false); // Close the modal after selection
    }
  };

  const handleAddInputSupplied = () => {
    setInputSupplied([
      ...inputSupplied,
      { farmerName: "", name: "", quantity: "" },
    ]);
  };

  const handleRemoveInputSupplied = (index) => {
    const updatedInputs = inputSupplied.filter((_, i) => i !== index);
    setInputSupplied(updatedInputs);

    // recalculating the total cost
    const total = updatedInputs.reduce((acc,item) => {
      const price = parseFloat(item.quantity) || 0;
      return acc + price;
    }, 0);

    setTotalCostInputSupplied(total);

  };

  const handleInputSuppliedChange = (index, field, value) => {
    const updatedInputs = [...inputSupplied];
    updatedInputs[index][field] = value;
    setInputSupplied(updatedInputs);

    // calculating the total cost
    if(field === "quantity") {
      const total = updatedInputs.reduce((acc, item) => {
        const price = parseFloat(item.quantity) || 0;
        return acc + price
      },0);
      setTotalCostInputSupplied(total);
    }

  };

  const validateFields = () => {
    let validateErrors = {};

    if (!date) validateErrors.date = "required";

    // if (!villagesVisited)
    //   validateErrors.villagesVisited = "Village is required";
    // if (!ownLandCultivated)
    //   validateErrors.ownLandCultivated = "Own Land Cultivated is required";
    // if (!clusterID) validateErrors.clusterID = "Cluster is required";
    // if (!travelInKms) validateErrors.travelInKms = "Distance is required";
    // if (!farmersContacted)
    //   validateErrors.farmersContacted = "No. of farmers is required";
    // if (!groupMeetings)
    //   validateErrors.groupMeetings = "Group meeting is required";
    // if (!farmersInGroup)
    //   validateErrors.farmersInGroup = "Farmers in group is required";
    // if (!trainingPlace)
    //   validateErrors.trainingPlace = "Training place is required";
    // if (!farmersInTraining)
    //   validateErrors.farmersInTraining = "Farmers in training is required";
    // if (!consultancyTelephone)
    //   validateErrors.consultancyTelephone = "Telephone is required";
    // if (!consultancyWhatsApp)
    //   validateErrors.consultancyWhatsApp = "Whatsapp is required";

    setErrors(validateErrors);

    return Object.keys(validateErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("validateErrors", validateFields());
    console.log("errors-resp", errors);

    if (validateFields()) {
      const requestData = {
        userid: user.id,
        name: user.fullname,
        address: user.village,
        qualifications: user.qualification,
        mobileNumber: user.phonenumber,
        emailID: user.emailid,
        ownLandCultivatedUnderNaturalFarming: ownLandCultivated,
        clusterID : user.clusterid,
        workDate: formatDate(date),
        villagesVisited,
        travelInKms: parseInt(travelInKms),
        farmersContactedIndividually: parseInt(farmersContacted),
        groupMeetingsConducted: parseInt(groupMeetings),
        farmersContactedInGroupMeetings: parseInt(farmersInGroup),
        clusterTrainingPlace: trainingPlace,
        farmersAttendedTraining: parseInt(farmersInTraining),
        inputSupplied,
        totalcostinputsuplied,
        consultancyTelephone: parseInt(consultancyTelephone),
        consultancyWhatsApp: parseInt(consultancyWhatsApp),
        observationinbrif: observationinbrif,
      };

      console.log("requested-data", JSON.stringify(requestData, null, 2));
      // console.log(
      //   "requested-data-addform-inputsupplied",
      //   JSON.stringify(requestData.inputSupplied, null, 2)
      // );

      try {
        setLoading(true);

        const response = await addFieldOfficerWorkDetail(user.id, requestData);
        console.log(
          "fldWrkDetls-Submitted response:",
          JSON.stringify(response, null, 2)
        );
        Alert.alert("Success Message", "Data submitted successfully.", [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Home"),
            style: "default",
          },
        ]);
      } catch (error) {
        console.log("fldWrkDetls-Error submitting form:", error.response.data);
        Alert.alert("Error Message",error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"FIELDS WORKER DETAILS"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* <View > */}
            <View >
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={user.fullname}
                editable={false}
              />
            </View>
            <View style={styles.field}>
              {/* village is associated with address in database or keyname */}
              <Text style={styles.label}>Village Name</Text>
              <TextInput
                style={styles.input}
                value={user.village}
                editable={false}
              />
            </View>
          {/* </View> */}

          <View style={styles.field}>
            <Text style={styles.label}>Email id</Text>
            <TextInput
              style={styles.input2}
              value={user.emailid}
              editable={false}
            />
          </View>
          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.label}>Qualifications</Text>
              <TextInput
                style={styles.input}
                value={user.qualification}
                editable={false}
              />
            </View>
            <View style={styles.inField}>
              <Text style={styles.label}>Mobile No</Text>
              <TextInput
                style={styles.input}
                value={user.phonenumber}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Land cultivated under Natural Farming ?
            </Text>
            <TextInput 
            style={styles.input}
            value={ownLandCultivated}
            // onChangeText={setClusterID}
            editable={false}
            />
    
            {errors.ownLandCultivated && (
              <Text style={{ color: "red" }}>{errors.ownLandCultivated}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Cluster ID</Text>
            <TextInput
              style={styles.input}
              value={clusterID}
              // onChangeText={setClusterID}
              editable={false}
            />
            {errors.clusterID && (
              <Text style={{ color: "red" }}>{errors.clusterID}</Text>
            )}
          </View>

          <Text
            style={[
              styles.label,
              { marginTop: 20, fontFamily: "Poppins-SemiBold", fontSize: 18 },
            ]}
          >
            Work Details
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Visited village name</Text>
            <Dropdown
              mode="modal"
              data={villageItems}
              labelField={"label"}
              valueField={"value"}
              value={villagesVisited}
              onChange={(item) => setVillagesVisited(item.value)}
              style={styles.input}
              search
              searchField="label"
              searchPlaceholder="search village"
              inputSearchStyle={styles.inputSearch}
              containerStyle={styles.modalContainer}
              itemTextStyle={{fontFamily:"Poppins-Regular"}}
              renderLeftIcon={() => (
                <AntDesign
                  name="Safety"
                  style={styles.icon}
                  size={20}
                  color={"black"}
                />
              )}
            />
            {/* <TextInput
              style={styles.input}
              value={villagesVisited}
              onChangeText={setVillagesVisited}
            /> */}
            {errors.villagesVisited && (
              <Text style={{ color: "red" }}>{errors.villagesVisited}</Text>
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Work Date</Text>
            <TouchableOpacity
              style={[styles.input, { justifyContent: "center" }]}
              onPress={() => setOpen(true)}
            >
              <Text>{date ? formatDate(date) : "Select a date"}</Text>
            </TouchableOpacity>
            {errors.date && <Text style={{ color: "red" }}>{errors.date}</Text>}
          </View>

          {/* // calendra modal */}
          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView]}>
                <DatePicker
                  modal
                  mode="single"
                  open={open}
                  // selectedItemColor="#637e76"
                  date={date} // Ensure this is a valid Date object
                  minDate={threeDaysAgo}
                  maxDate={today}
                  onChange={(event) => handleDateChange(event.date)} // Handle date change
                  placeholder="Select a date"
                  // monthContainerStyle={styles.monthStyle}
                  // yearContainerStyle={styles.monthStyle}
                  // dayContainerStyle={styles.monthStyle}
                />

                {/* Close Button */}
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={styles.closeButton}
                >
                  <Text
                    style={{ fontSize: 19, fontWeight: "bold", color: "red" }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.field}>
            <Text style={styles.label}>
              Travel <Text style={{ fontSize: 12 }}>(approx. in kms)</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={travelInKms}
              onChangeText={setTravelInKms}
              keyboardType="numeric"
            />
            {errors.travelInKms && (
              <Text style={{ color: "red" }}>{errors.travelInKms}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              {" "}
              Farmers Contacted <Text style={{ fontSize: 12 }}>(new)</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={farmersContacted}
              onChangeText={setFarmersContacted}
              keyboardType="numeric"
            />
            {errors.farmersContacted && (
              <Text style={{ color: "red" }}>{errors.farmersContacted}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Number of Group Meetings Conducted</Text>
            <TextInput
              style={styles.input}
              value={groupMeetings}
              onChangeText={setGroupMeetings}
              keyboardType="numeric"
            />
            {errors.groupMeetings && (
              <Text style={{ color: "red" }}>{errors.groupMeetings}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              No. of farmers<Text style={{ fontSize: 12 }}>(new)</Text> in Group
              Meeting
            </Text>
            <TextInput
              style={styles.input}
              value={farmersInGroup}
              onChangeText={setFarmersInGroup}
              keyboardType="numeric"
            />
            {errors.farmersInGroup && (
              <Text style={{ color: "red" }}>{errors.farmersInGroup}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Cluster Training place</Text>
            <TextInput
              style={styles.input}
              value={trainingPlace}
              onChangeText={setTrainingPlace}
            />
            {errors.trainingPlace && (
              <Text style={{ color: "red" }}>{errors.trainingPlace}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>No. of farmers attended training</Text>
            <TextInput
              style={styles.input}
              value={farmersInTraining}
              onChangeText={setFarmersInTraining}
              keyboardType="numeric"
            />
            {errors.farmersInTraining && (
              <Text style={{ color: "red" }}>{errors.farmersInTraining}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Consultancy over Telephone</Text>
            <TextInput
              style={styles.input}
              value={consultancyTelephone}
              onChangeText={setConsultancyTelephone}
              keyboardType="numeric"
            />
            {errors.consultancyTelephone && (
              <Text style={{ color: "red" }}>
                {errors.consultancyTelephone}
              </Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Consultancy over Whatsapp</Text>
            <TextInput
              style={styles.input}
              value={consultancyWhatsApp}
              onChangeText={setConsultancyWhatsApp}
              keyboardType="numeric"
            />
            {errors.consultancyWhatsApp && (
              <Text style={{ color: "red" }}>{errors.consultancyWhatsApp}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Observations in brief</Text>
            <TextInput
              style={styles.textarea}
              value={observationinbrif}
              onChangeText={setobservationinbrif}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { fontFamily: "Poppins-SemiBold" }]}>
              Input supplied to farmers
            </Text>
            {inputSupplied.map((item, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <View style={{ alignSelf: "flex-end" }}>
                  <Text>Entry {index + 1}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Farmer Name</Text>
                  <Dropdown
                    mode="modal"
                    data={filterFarmerName}
                    labelField={"label"}
                    value={item.farmerName}
                    valueField={"value"}
                    onChange={(item) =>
                      handleInputSuppliedChange(index, "farmerName", item.value)
                    }
                    search
                    searchField="label"
                    searchPlaceholder="search farmer"
                    inputSearchStyle={styles.inputSearch}
                    containerStyle={styles.modalContainer}
                    itemTextStyle={{fontFamily:"Poppins-Regular"}}
                    style={styles.input}
                    placeholderStyle={styles.placeholderStyle}
                    iconStyle={styles.iconStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    renderLeftIcon={() => (
                      <AntDesign
                        name="Safety"
                        size={20}
                        color={"#000"}
                        style={styles.icon}
                      />
                    )}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Input Supplied Name</Text>
                  <TextInput
                    style={[styles.input]}
                    // placeholder="Input Name"
                    value={item.name}
                    onChangeText={(value) =>
                      handleInputSuppliedChange(index, "name", value)
                    }
                  />
                </View>
                <View>
                  {/* quantity is changed into price*/}
                  <Text style={styles.label}>
                    Price <Text style={{ fontSize: 12 }}>(Rs.)</Text>
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    value={item.quantity}
                    onChangeText={(value) =>
                      handleInputSuppliedChange(index, "quantity", value)
                    }
                  />
                </View>
                {inputSupplied.length > 1 && (
                  <View style={styles.removeButton}>
                    <TouchableOpacity
                      onPress={() => handleRemoveInputSupplied(index)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
            <Text style={[styles.label, {color: "#428d60"}]}>Total Cost : {totalcostinputsuplied}</Text>
            {/* {inputSupplied.length < 5 && ( */}
              <TouchableOpacity
                onPress={handleAddInputSupplied}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add Input</Text>
              </TouchableOpacity>
            {/* )} */}
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={submitBtn}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.inpText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={70} color={"#ffffff"} />
          <Text style={[styles.inpText, { fontSize: 14 }]}>processing...</Text>
        </View>
      )}
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
    marginBottom: "25%",
  },
  img: {
    height: 130,
    width: 130,
  },
  label: {
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
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
  field: {
    marginTop: 20,
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
    marginTop: 20,
  },
  inField: {
    flex: 1,
    marginHorizontal: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor:"rgba(0,0,0,0.5)"
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
  },
  monthStyle: {
    backgroundColor: "#cde1e3",
    borderColor: "#fff",
  },
  removeButton: {
    backgroundColor: "#FF5C5C",
    padding: 6,
    borderRadius: 10,
    width: "25%",
    marginTop: 10,
  },
  removeButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  addButton: {
    backgroundColor: "#70ccb2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "30%",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  icon: {
    marginRight: 5,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 150,
    textAlignVertical: "top",
    fontSize: 14,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  inputSearch: {
    borderRadius: 8,
    borderColor: "#007AFF",
    paddingHorizontal: 10,
    backgroundColor: "#F0F0F0",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16, 
    padding: 10,
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
