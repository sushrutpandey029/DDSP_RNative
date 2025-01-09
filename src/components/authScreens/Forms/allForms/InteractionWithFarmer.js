import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import FormHeader from "../FormHeader";
import { globalContainer, submitBtn } from "../../../../globals/style";
import { villageItems } from "../data/Constant";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { addInteraction } from "../../../services/ApiFile";
import AntDesign from "@expo/vector-icons/AntDesign";
import DatePicker from "react-native-ui-datepicker";

const InteractionWithFarmer = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth.user);
  const { farmerList } = useSelector((state) => state.farmer);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // date for calendar
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 4);

  console.log("farmer-inter-form", farmerList);

  const formatDate = (selectedDate) => {
    if (!selectedDate) return "";
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [payload, setPayload] = useState({
    user_id: user.id,
    userrole: user.role,
    village: "",
    date: formatDate(date),
    farmer: "",
    observationInBrief: "",
  });

  const filterFarmerName = farmerList?.data.map((farmer) => ({
    label: farmer.name.trim(),
    value: farmer.name.trim(),
  }));

  const handleChange = async (name, value) => {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = async (selectedDate) => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      if (!isNaN(dateObj)) {
        setDate(dateObj);
      }
      setOpen(false);
    }
  };

  const handleSubmit = async () => {
    console.log("payload", payload);
    try {
      setLoading(true);

      const response = await addInteraction(payload);
      console.log("addinteraction-resp", response);
      if (response.success) {
        setLoading(false);
        Alert.alert("Success Message", `${response.message}.`, [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Home"),
            style: "default",
          },
        ]);
        // navigation.navigate("Home");
      }
    } catch (err) {
      console.log("addinteraction-err", err.response.data);
      Alert.alert("Error Message", err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="INTERACTION WITH FARMERS" />
      <ScrollView>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>User Id </Text>
            <TextInput
              value={payload.user_id.toString()}
              style={styles.input}
              editable={false}
            />
          </View>

          <View>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[styles.input, { justifyContent: "center" }]}
            >
              <Text>{date ? formatDate(date) : "Select a date"}</Text>
            </TouchableOpacity>
          </View>

          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView]}>
                <DatePicker
                  modal
                  mode="single"
                  open={open}
                  date={date}
                  minDate={threeDaysAgo}
                  maxDate={today}
                  onChange={(event) => handleDateChange(event.date)} // Handle date change
                  placeholder="Select a date"
                />
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={styles.closeButton}
                >
                  <Text
                    style={{ fontSize: 19, color: "red", fontWeight: "bold" }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View>
            <Text style={styles.label}>Village</Text>
            <Dropdown
              mode="modal"
              data={villageItems}
              labelField={"label"}
              valueField={"value"}
              value={payload.village}
              search
              searchField="label"
              searchPlaceholder="search village"
              inputSearchStyle={styles.inputSearch}
              onChange={(item) => handleChange("village", item.value)}
              maxHeight={300}
              style={styles.input}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              renderLeftIcon={() => (
                <AntDesign
                  name="Safety"
                  style={styles.icon}
                  size={20}
                  color={"black"}
                />
              )}
            />
          </View>

          <View>
            <Text style={styles.label}>Farmer</Text>
            {/* <TextInput style={styles.input} /> */}
            <Dropdown
              mode="modal"
              style={styles.input}
              data={filterFarmerName}
              labelField={"label"}
              valueField={"value"}
              value={payload.farmer}
              search
              searchField="label"
              searchPlaceholder="search farmer"
              inputSearchStyle={styles.inputSearch}
              containerStyle={styles.modalContainer}
              itemTextStyle={{ fontFamily: "Poppins-Regular" }}
              maxHeight={300}
              onChange={(item) => handleChange("farmer", item.value)}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              renderLeftIcon={() => (
                <AntDesign
                  name="Safety"
                  size={20}
                  style={styles.iconStyle}
                  color={"black"}
                />
              )}
            />
          </View>

          <View>
            <Text style={styles.label}>Observation in meeting</Text>
            <TextInput
              value={payload.observationInBrief}
              onChangeText={(text) => handleChange("observationInBrief", text)}
              style={[
                styles.input,
                { height: 150, textAlignVertical: "top", padding: 10 },
              ]}
            />
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={submitBtn}
              disabled={loading}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={50} color={"#ffffff"} />
          <Text style={[styles.label, { fontSize: 14, color: "#fff" }]}>
            processing...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default InteractionWithFarmer;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginTop: 20,
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
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 150,
    textAlignVertical: "top",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  monthStyle: {
    backgroundColor: "#cde1e3",
    borderColor: "#fff",
  },
  closeButton: {
    marginTop: 6,
    padding: 10,
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
    fontFamily: "Poppins-Regular",
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
