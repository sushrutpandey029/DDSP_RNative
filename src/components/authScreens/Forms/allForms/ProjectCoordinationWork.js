import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import { useSelector } from "react-redux";
import DatePicker from "react-native-ui-datepicker";
import { addworkdetails } from "../../../services/ApiFile";
import { Dropdown } from "react-native-element-dropdown";
import { villageItems } from "../data/Constant";
import AntDesign from "@expo/vector-icons/AntDesign"

const ProjectCoordinationWork = ({ navigation }) => {
  const userDetails = useSelector((state) => state.auth.user.user);

  // State for each section
  const [trainingProgrammes, setTrainingProgrammes] = useState([
    { date: "", name: "", participants: "" },
  ]);

  const [reviewMeetings, setReviewMeetings] = useState([
    { date: "", participants: "" },
  ]);

  const [monitoringVisits, setMonitoringVisits] = useState([
    { date: "", cluster: "", observations: "" },
  ]);

  const [reports, setReports] = useState([
    { report: { submittedDate: "", details: "" } },
  ]);

  // State for the DatePicker modal
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSection, setCurrentSection] = useState("");

  const formatDate = (selectedDate) => {
    if (!selectedDate) return "";
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const openDatePicker = (section, index) => {
    setCurrentSection(section);
    setCurrentIndex(index);
    setDatePickerVisible(true);
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = formatDate(new Date(selectedDate));
      if (currentSection === "trainingProgrammes") {
        setTrainingProgrammes(
          trainingProgrammes.map((item, idx) =>
            idx === currentIndex ? { ...item, date: formattedDate } : item
          )
        );
      } else if (currentSection === "reviewMeetings") {
        setReviewMeetings(
          reviewMeetings.map((item, idx) =>
            idx === currentIndex ? { ...item, date: formattedDate } : item
          )
        );
      } else if (currentSection === "monitoringVisits") {
        setMonitoringVisits(
          monitoringVisits.map((item, idx) =>
            idx === currentIndex ? { ...item, date: formattedDate } : item
          )
        );
      } else if (currentSection === "reports") {
        setReports(
          reports.map((item, idx) =>
            idx === currentIndex
              ? {
                  report: { ...item.report, submittedDate: formattedDate },
                }
              : item
          )
        );
      }
      setDatePickerVisible(false);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      trainingProgrammes,
      reviewMeetings,
      monitoringVisits,
      reports,
    };

    console.log("Form Submitted: ", formData);

    try {
      const response = await addworkdetails(userDetails.id, formData);
      console.log("addWork-resp", response);
      Alert.alert("Data submitted successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.log("addWork-err", error.response.data);
      Alert(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"PROJECT COORDINATION WORK"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Training Programmes */}
          <Text style={styles.title}>Training Programmes Conducted</Text>
          {trainingProgrammes.map((programme, index) => (
            <View key={index} style={styles.fieldSet}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => openDatePicker("trainingProgrammes", index)}
              >
                <Text>{programme.date || "Select Date"}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Program Name</Text>
              <TextInput
                style={styles.input}
                value={programme.name}
                onChangeText={(text) =>
                  setTrainingProgrammes(
                    trainingProgrammes.map((item, idx) =>
                      idx === index ? { ...item, name: text } : item
                    )
                  )
                }
              />
              <Text style={styles.label}>No. of Participants</Text>
              <TextInput
                style={styles.input}
                value={programme.participants}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setTrainingProgrammes(
                    trainingProgrammes.map((item, idx) =>
                      idx === index ? { ...item, participants: text } : item
                    )
                  )
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setTrainingProgrammes(
                    trainingProgrammes.filter((_, idx) => idx !== index)
                  )
                }
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() =>
              setTrainingProgrammes([
                ...trainingProgrammes,
                { date: "", name: "", participants: "" },
              ])
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add More</Text>
          </TouchableOpacity>

          {/* Review Meetings */}
          <Text style={styles.title}>Review Meetings Conducted</Text>
          {reviewMeetings.map((meeting, index) => (
            <View key={index} style={styles.fieldSet}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => openDatePicker("reviewMeetings", index)}
              >
                <Text>{meeting.date || "Select Date"}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>No. of Participants</Text>
              <TextInput
                style={styles.input}
                value={meeting.participants}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setReviewMeetings(
                    reviewMeetings.map((item, idx) =>
                      idx === index ? { ...item, participants: text } : item
                    )
                  )
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setReviewMeetings(
                    reviewMeetings.filter((_, idx) => idx !== index)
                  )
                }
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() =>
              setReviewMeetings([
                ...reviewMeetings,
                { date: "", participants: "" },
              ])
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add More</Text>
          </TouchableOpacity>

          {/* Monitoring Visits */}
          <Text style={styles.title}>Monitoring Visits Conducted</Text>
          {monitoringVisits.map((visit, index) => (
            <View key={index} style={styles.fieldSet}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => openDatePicker("monitoringVisits", index)}
              >
                <Text>{visit.date || "Select Date"}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Cluster / Village</Text>
              <Dropdown 
                data={villageItems}
                labelField={'label'}
                valueField={'value'}
                style={styles.input}
                value={visit.cluster}
                onChange={(item) => 
                  setMonitoringVisits((prev) => 
                  prev.map((row, idx) => 
                    idx === index ? {...row, cluster : item.value} : row
                  ))
                }
                renderLeftIcon={() => (
                  <AntDesign 
                  name="Safety"
                  size={20}
                  style={styles.icon}
                  color={'black'}
                  />
                )}

              />
              {/* <TextInput
                style={styles.input}
                value={visit.cluster}
                onChangeText={(text) =>
                  setMonitoringVisits(
                    monitoringVisits.map((item, idx) =>
                      idx === index ? { ...item, cluster: text } : item
                    )
                  )
                }
              /> */}
              <Text style={styles.label}>Observations in brief</Text>
              <TextInput
                style={styles.textarea}
                multiline={true}
                numberOfLines={4}
                placeholder=""
                value={visit.observations}
                onChangeText={(text) =>
                  setMonitoringVisits(
                    monitoringVisits.map((item, idx) =>
                      idx === index ? { ...item, observations: text } : item
                    )
                  )
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setMonitoringVisits(
                    monitoringVisits.filter((_, idx) => idx !== index)
                  )
                }
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() =>
              setMonitoringVisits([
                ...monitoringVisits,
                { date: "", cluster: "", observations: "" },
              ])
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add More</Text>
          </TouchableOpacity>

          {/* Reports */}
          <Text style={styles.title}>Reports Submitted</Text>
          {reports.map((report, index) => (
            <View key={index} style={styles.fieldSet}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => openDatePicker("reports", index)}
              >
                <Text>{report.report.submittedDate || "Select Date"}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Report Details</Text>
              <TextInput
                style={styles.input}
                value={report.report.details}
                onChangeText={(text) =>
                  setReports(
                    reports.map((item, idx) =>
                      idx === index
                        ? { report: { ...item.report, details: text } }
                        : item
                    )
                  )
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setReports(reports.filter((_, idx) => idx !== index))
                }
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={() =>
              setReports([
                ...reports,
                { report: { submittedDate: "", details: "" } },
              ])
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add More</Text>
          </TouchableOpacity>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            onPress={handleSubmit}
            style={[submitBtn.button, styles.submit]}
          >
            <Text style={submitBtn.text}>Submit</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={datePickerVisible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: "#9ac6ca" }]}>
            <DatePicker
              // modal
              mode="single"
              // open={open}
              open={datePickerVisible}
              selectedItemColor="#637e76"
              // date={date} // Ensure this is a valid Date object
              onChange={(event) => handleDateChange(event.date)} // Handle date change
              onConfirm={handleDateChange}
              // onCancel={() => setDatePickerVisible(false)}
              // placeholder="Select a date"
              monthContainerStyle={styles.monthStyle}
              yearContainerStyle={styles.monthStyle}
              dayContainerStyle={styles.monthStyle}
            />

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setDatePickerVisible(false)}
              style={styles.closeButton}
            >
              <Text style={{ fontSize: 19, fontWeight: "bold", color: "red" }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    // padding: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 10,
  },
  fieldSet: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    // fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
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
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  removeButton: {
    backgroundColor: "#ea8c8c",
    padding: 10,
    borderRadius: 10,
    width: "30%",
  },
  removeButtonText: {
    color: "white",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#70ccb2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "30%",
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  submit: {
    marginVertical: 20,
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
  btnContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  icon : {
    marginRight:5
  }
});

export default ProjectCoordinationWork;
