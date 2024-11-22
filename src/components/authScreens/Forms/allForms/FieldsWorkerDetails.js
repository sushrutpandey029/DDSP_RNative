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
} from "react-native";
import React, { useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
// import DatePicker from "react-native-modern-datepicker";
import DatePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
// import DatePicker from "react-native-date-picker";
import { globalContainer } from "../../../../globals/style";

const FieldsWorkerDetails = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  // Format the date as dd-mm-yyyy
  const formatDate = (selectedDate) => {
    if (!selectedDate) return ""; // If the selectedDate is null or undefined
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // const handleOpen = async () => {
  //   setOpen(!open);
  // };

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Ensure it's a Date object
      if (!isNaN(dateObj)) {
        setDate(dateObj); // Set the valid date
      }
      setOpen(false); // Close the modal after selection
    }
  };

   

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"FIELDS WORKER DETAILS"} />
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.label}>Name</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.label}>Address</Text>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Email id</Text>
            <TextInput style={styles.input2} />
          </View>
          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.label}>Qualifications</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.label}>Mobile No</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <View>
            <Text style={styles.label}>
              Own land cultivated under Natural Farming
            </Text>
            <TextInput style={styles.input} />
          </View>
          <View>
            <Text style={styles.label}>Cluster ID</Text>
            <TextInput style={styles.input} />
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>Work Details</Text>

          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Name of villages visited</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Date</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpen(true)}
              >
                <Text>{date ? formatDate(date) : "Select a date"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* // calendra modal */}
          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, { backgroundColor: "#9ac6ca" }]}>
                <DatePicker
                  modal
                  mode="single"
                  open={open}
                  selectedItemColor="#637e76"
                  date={date} // Ensure this is a valid Date object
                  onChange={(event) => handleDateChange(event.date)} // Handle date change
                  placeholder="Select a date"
                  monthContainerStyle={styles.monthStyle}
                  yearContainerStyle={styles.monthStyle}
                  dayContainerStyle={styles.monthStyle}
                />

                {/* Close Button */}
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={styles.closeButton}
                >
                  <Text style={{ fontSize: 19, fontWeight: "bold", color: 'red' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Travel in kms</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inField}>
              <Text style={styles.smLabel}>No. of farmers</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={submitBtn}>
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
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 9,
  },
  smLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginTop: 9,
  },
  input: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 15,
  },
  input2: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
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
