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
import {globalContainer} from "../../../../globals/style"


const FieldsWorkerDetails = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleOpen = async () => {
    setOpen(!open);
  };

  // const handleDateChange = async (propDate) => {
  //   if (propDate) {
  //     setDate(dayjs(propDate) );
  //     setOpen(false);
  //
  //   }
  // };

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
              <TouchableOpacity style={styles.input} onPress={handleOpen}>
                <Text>{"date"}</Text>
              </TouchableOpacity>
              {/* <TextInput
                style={styles.input}
                onPress={handleOpen}
                placeholder="DD/MM/YYYY"
              /> */}
            </View>
          </View>

          {/* // calendra modal */}
          <Modal animationType="slide"   transparent={true} visible={open} >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onChange={(params) => setDate(params.date)}
                />

                <TouchableOpacity onPress={handleOpen}>
                  <Text>Close</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleOpen}>
                  <Text>Set</Text>
                </TouchableOpacity> */}
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
});
