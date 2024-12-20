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
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import { useSelector } from "react-redux";
import DatePicker from "react-native-ui-datepicker";
import { addworkdetails } from "../../../services/ApiFile";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import { villageItems } from "../data/Constant";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProjectCoordinationWork = ({ navigation }) => {
  const userDetails = useSelector((state) => state.auth.user.user);
  const { FOlist } = useSelector((state) => state.officer);
  const { APClist } = useSelector((state) => state.officer);

  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState({
    FO: false,
    APC: false,
  });

  const formatDate = (selectedDate) => {
    if (!selectedDate) return "";
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // State for each section
  const [trainingProgrammes, setTrainingProgrammes] = useState([
    { date: formatDate(date), name: "", participants: "", villageName: "" },
  ]);

  const [reviewMeetings, setReviewMeetings] = useState([
    {
      date: formatDate(date),
      participants: "",
      fieldOfficer: [],
      asstProjectCoordinator: [],
    },
  ]);

  const [monitoringVisits, setMonitoringVisits] = useState([
    { date: formatDate(date), cluster: "", observations: "" },
  ]);

  const [reports, setReports] = useState([
    { submittedDate: formatDate(date), details: "" },
  ]);

  // State for the DatePicker modal
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSection, setCurrentSection] = useState("");

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
              ? { ...item, submittedDate: formattedDate } // removed item.report syntax
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

    console.log("Form Submitted: ", JSON.stringify(formData, null, 2));
    // console.log(
    //   "Form Submitted-reviewMeetings: ",
    //   JSON.stringify(formData.reviewMeetings, null, 2)
    // );

    try {

      setLoading(true);

      // const response = await addworkdetails(userDetails.id, formData);

      console.log("addWork-resp", response);
      setLoading(false);

      Alert.alert("Success Message", "Data submitted successfully.", [
        {
          text: "Ok",
          onPress: () => navigation.navigate("Home"),
          style: "default",
        },
      ]);
    } catch (error) {
      console.log("addWork-err", error.response.data);
      Alert("Failed Message", error.response.data.message);
    } finally {

      setLoading(false);

    }
  };

  // const FOItems = FOlist?.data?.data?.map((item) => ({
  //   label: item.fullname.trim(),
  //   value: item.fullname.trim(),
  // }));

  const FOItems = useMemo(() => {
    return FOlist?.data?.data?.map((item) => ({
      label: item.fullname,
      value: item.fullname,
    }));
  }, [FOlist]);

  const APCItems = useMemo(() => {
    return APClist?.data?.data?.map((item) => ({
      label: item.fullname,
      value: item.fullname,
    }));
  }, [APClist]);

  // const APCItems = APClist?.data?.data?.map((item) => ({
  //   label: item.fullname.trim(),
  //   value: item.fullname.trim(),
  // }));

  console.log("FOItems", FOItems);
  console.log("APCItems", APCItems);

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

              {/* field name of place is villageName */}
              <Text style={styles.label}>Place</Text>
              <Dropdown
                mode="modal"
                searchField={"String"}
                search
                searchPlaceholder="search..."
                // searchQuery
                data={villageItems}
                labelField={"label"}
                valueField={"value"}
                style={styles.input}
                fontFamily="Poppins-Regular"
                onChange={(item) =>
                  setTrainingProgrammes((prev) =>
                    prev.map((row, idx) =>
                      idx === index ? { ...row, villageName: item.value } : row
                    )
                  )
                }
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    name="Safety"
                    size={20}
                    color={"#000"}
                    style={styles.icon}
                  />
                )}
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
                { date: formatDate(date), name: "", participants: "" },
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

              <Text style={styles.label}>Field Officer</Text>
              <MultiSelect
                mode="modal"
                data={FOItems}
                labelField={"label"}
                valueField={"value"}
                value={meeting.fieldOfficer}
                style={styles.input}
                visible={dropdownVisible.FO}
                // confirmSelectItem={"true"}
                onFocus={() =>
                  setDropdownVisible({ ...dropdownVisible, FO: true })
                }
                onBlur={() =>
                  setDropdownVisible({ ...dropdownVisible, FO: false })
                }
                onChange={(selectedItem) => {
                  setReviewMeetings((prev) =>
                    prev.map((row, idx) =>
                      idx === index
                        ? {
                            ...row,
                            fieldOfficer: selectedItem.map((item) => item),
                          }
                        : row
                    )
                  );
                  setDropdownVisible({ ...dropdownVisible, FO: false });
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                activeColor="#e4f0ed"
                fontFamily="Poppins-Regular"
                renderLeftIcon={() => (
                  <AntDesign
                    name="Safety"
                    size={20}
                    color={"#000"}
                    style={styles.icon}
                  />
                )}
                // renderFooter={() => (
                //   <View style={styles.footer}>
                //     <TouchableOpacity
                //       style={styles.confirmButton}
                //       onPress={() => setDropdownVisible({...dropdownVisible, FO : false})} // Close modal on confirm
                //     >
                //       <Text style={styles.confirmButtonText}>Confirm</Text>
                //     </TouchableOpacity>
                //   </View>
                // )}
              />

              <Text style={styles.label}>Assistant Project Coordinator</Text>
              <MultiSelect
                mode="modal"
                data={APCItems}
                labelField={"label"}
                valueField={"value"}
                style={styles.input}
                value={meeting.asstProjectCoordinator}
                visible={dropdownVisible.APC}
                fontFamily="Poppins-Regular"
                onFocus={() =>
                  setDropdownVisible({ ...dropdownVisible, APC: true })
                }
                onBlur={() =>
                  setDropdownVisible({ ...dropdownVisible, APC: false })
                }
                onChange={(selectedItem) => {
                  setReviewMeetings((prev) =>
                    prev.map((row, idx) =>
                      idx === index
                        ? {
                            ...row,
                            asstProjectCoordinator: selectedItem.map(
                              (item) => item
                            ),
                          }
                        : row
                    )
                  );
                  setDropdownVisible({ ...dropdownVisible, APC: false });
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    name="Safety"
                    color={"#000"}
                    size={20}
                    style={styles.icon}
                  />
                )}
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
                { date: formatDate(date), participants: "" },
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
                mode="modal"
                data={villageItems}
                labelField={"label"}
                valueField={"value"}
                style={styles.input}
                value={visit.cluster}
                onChange={(item) =>
                  setMonitoringVisits((prev) =>
                    prev.map((row, idx) =>
                      idx === index ? { ...row, cluster: item.value } : row
                    )
                  )
                }
                renderLeftIcon={() => (
                  <AntDesign
                    name="Safety"
                    size={20}
                    style={styles.icon}
                    color={"black"}
                  />
                )}
              />
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
                { date: formatDate(date), cluster: "", observations: "" },
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
                <Text>{report.submittedDate || "Select Date"}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Report Details</Text>
              <TextInput
                style={styles.input}
                value={report.details}
                onChangeText={(text) =>
                  setReports(
                    reports.map((item, idx) =>
                      idx === index ? { ...item.report, details: text } : item
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
                { submittedDate: formatDate(date), details: "" },
              ])
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add More</Text>
          </TouchableOpacity>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={submitBtn}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
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
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={50} color={"#ffffff"} />
          <Text style={[styles.title, { fontSize: 14, color:"#fff" }]}>processing...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 10,
    // padding: 8,
    // marginBottom: 10,
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
    marginTop: 7,
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
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  footer: {
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
});

export default ProjectCoordinationWork;
