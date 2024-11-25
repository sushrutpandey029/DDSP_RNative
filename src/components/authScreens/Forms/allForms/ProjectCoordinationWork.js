import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import { useSelector } from "react-redux";
import DatePicker from "react-native-ui-datepicker";
import { addworkdetails } from "../../../services/ApiFile";

const ProjectCoordinationWork = () => {
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

  const handleSubmit = () => {
    const formData = {
      trainingProgrammes,
      reviewMeetings,
      monitoringVisits,
      reports,
    };

    console.log("Form Submitted: ", formData);

    try {
      const response = addworkdetails(userDetails.id, formData);
      console.log("addWork-resp", response);
    } catch (error) {
      console.log("addWork-err", error);
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
              <Text style={styles.label}>Participants</Text>
              <TextInput
                style={styles.input}
                value={meeting.participants}
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
              <Text style={styles.label}>Cluster</Text>
              <TextInput
                style={styles.input}
                value={visit.cluster}
                onChangeText={(text) =>
                  setMonitoringVisits(
                    monitoringVisits.map((item, idx) =>
                      idx === index ? { ...item, cluster: text } : item
                    )
                  )
                }
              />
              <Text style={styles.label}>Observations</Text>
              <TextInput
                style={styles.input}
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
              <Text style={styles.label}>Submission Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => openDatePicker("reports", index)}
              >
                <Text>{report.report.submittedDate || "Select Date"}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Details</Text>
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
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
});

export default ProjectCoordinationWork;

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";
// import { submitBtn } from "../../../../globals/style";
// import FormHeader from "../FormHeader";
// import { globalContainer } from "../../../../globals/style";
// import { addWorkDetailsApi } from "../../../api/Api";
// import { addworkdetails } from "../../../services/ApiFile";
// import { useSelector } from "react-redux";
// import DatePicker from "react-native-ui-datepicker";

// const ProjectCoordinationWork = () => {

//   const userDetails = useSelector((state) => state.auth.user.user);
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState(new Date());

//   // State for each section
//   const [trainingProgrammes, setTrainingProgrammes] = useState([
//     { date: "", name: "", participants: "" },
//   ]);

//   const [reviewMeetings, setReviewMeetings] = useState([
//     { date: "", participants: [] },
//   ]);

//   const [monitoringVisits, setMonitoringVisits] = useState([
//     { date: "", cluster: "", observations: "" },
//   ]);

//   const [reports, setReports] = useState([
//     { report: { submittedDate: "", details: "" } },
//   ]);

//   // Add functions
//   const addTrainingProgramme = () =>
//     setTrainingProgrammes([
//       ...trainingProgrammes,
//       { date: "", name: "", participants: "" },
//     ]);

//   const addReviewMeeting = () =>
//     setReviewMeetings([...reviewMeetings, { date: "", participants: [] }]);

//   const addMonitoringVisit = () =>
//     setMonitoringVisits([
//       ...monitoringVisits,
//       { date: "", cluster: "", observations: "" },
//     ]);

//   const addReport = () =>
//     setReports([...reports, { report: { submittedDate: "", details: "" } }]);

//   // Remove functions
//   const removeTrainingProgramme = (index) =>
//     setTrainingProgrammes(trainingProgrammes.filter((_, idx) => idx !== index));

//   const removeReviewMeeting = (index) =>
//     setReviewMeetings(reviewMeetings.filter((_, idx) => idx !== index));

//   const removeMonitoringVisit = (index) =>
//     setMonitoringVisits(monitoringVisits.filter((_, idx) => idx !== index));

//   const removeReport = (index) =>
//     setReports(reports.filter((_, idx) => idx !== index));

//   const formatDate = (selectedDate) => {
//     if (!selectedDate) return ""; // If the selectedDate is null or undefined
//     const day = selectedDate.getDate().toString().padStart(2, "0");
//     const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
//     const year = selectedDate.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleDateChange = (selectedDate) => {
//     if (selectedDate) {
//       const dateObj = new Date(selectedDate); // Ensure it's a Date object
//       if (!isNaN(dateObj)) {
//         setDate(dateObj); // Set the valid date
//       }
//       setOpen(false); // Close the modal after selection
//     }
//   };

//   // Submit function
//   const handleSubmit = () => {
//     const formData = {
//       trainingProgrammes,
//       reviewMeetings,
//       monitoringVisits,
//       reports,
//     };

//     console.log("Form Submitted: ", formData);
//     // Process formData or send to the backend
//     try{
//       const response  = addworkdetails(userDetails.id,formData);
//      console.log('addWork-resp',response);
//    }catch(error){
//      console.log('addWork-err',error)
//    }
//   };

//   return (
//     <SafeAreaView style={globalContainer}>
//       <FormHeader title={"PROJECT COORDINATION WORK"} />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.formContainer}>
//           {/* Training Programmes */}
//           <Text style={styles.title}>Training Programmes Conducted</Text>
//           {trainingProgrammes.map((programme, index) => (
//             <View key={index} style={styles.fieldSet}>
//               <Text style={styles.label}>Date</Text>
//               <TextInput
//                 style={styles.input}
//                 value={programme.date}
//                 onChangeText={(text) =>
//                   setTrainingProgrammes(
//                     trainingProgrammes.map((item, idx) =>
//                       idx === index ? { ...item, date: text } : item
//                     )
//                   )
//                 }
//               />
//               <Text style={styles.label}>Program Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={programme.name}
//                 onChangeText={(text) =>
//                   setTrainingProgrammes(
//                     trainingProgrammes.map((item, idx) =>
//                       idx === index ? { ...item, name: text } : item
//                     )
//                   )
//                 }
//               />
//               <Text style={styles.label}>No. of Participants</Text>
//               <TextInput
//                 style={styles.input}
//                 value={programme.participants}
//                 keyboardType="numeric"
//                 onChangeText={(text) =>
//                   setTrainingProgrammes(
//                     trainingProgrammes.map((item, idx) =>
//                       idx === index ? { ...item, participants: text } : item
//                     )
//                   )
//                 }
//               />
//               <TouchableOpacity
//                 onPress={() => removeTrainingProgramme(index)}
//                 style={styles.removeButton}
//               >
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//           <TouchableOpacity
//             onPress={addTrainingProgramme}
//             style={styles.addButton}
//           >
//             <Text style={styles.addButtonText}>Add More</Text>
//           </TouchableOpacity>

//           {/* Review Meetings */}
//           <Text style={[styles.title, { marginTop: 20 }]}>Review Meetings</Text>
//           {reviewMeetings.map((meeting, index) => (
//             <View key={index} style={styles.fieldSet}>
//               <Text style={styles.label}>Date</Text>
//               <TextInput
//                 style={styles.input}
//                 value={meeting.date}
//                 onChangeText={(text) =>
//                   setReviewMeetings(
//                     reviewMeetings.map((item, idx) =>
//                       idx === index ? { ...item, date: text } : item
//                     )
//                   )
//                 }
//               />
//               <Text style={styles.label}>Participants</Text>
//               <TextInput
//                 style={styles.input}
//                 value={meeting.participants.join(", ")}
//                 onChangeText={(text) =>
//                   setReviewMeetings(
//                     reviewMeetings.map((item, idx) =>
//                       idx === index
//                         ? { ...item, participants: text.split(",") }
//                         : item
//                     )
//                   )
//                 }
//               />
//               <TouchableOpacity
//                 onPress={() => removeReviewMeeting(index)}
//                 style={styles.removeButton}
//               >
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//           <TouchableOpacity onPress={addReviewMeeting} style={styles.addButton}>
//             <Text style={styles.addButtonText}>Add More</Text>
//           </TouchableOpacity>

//           {/* Monitoring Visits */}
//           <Text style={[styles.title, { marginTop: 20 }]}>
//             Monitoring Visits
//           </Text>
//           {monitoringVisits.map((visit, index) => (
//             <View key={index} style={styles.fieldSet}>
//               <Text style={styles.label}>Date</Text>
//               <TextInput
//                 style={styles.input}
//                 value={visit.date}
//                 onChangeText={(text) =>
//                   setMonitoringVisits(
//                     monitoringVisits.map((item, idx) =>
//                       idx === index ? { ...item, date: text } : item
//                     )
//                   )
//                 }
//               />
//               <Text style={styles.label}>Cluster / Village</Text>
//               <TextInput
//                 style={styles.input}
//                 value={visit.cluster}
//                 onChangeText={(text) =>
//                   setMonitoringVisits(
//                     monitoringVisits.map((item, idx) =>
//                       idx === index ? { ...item, cluster: text } : item
//                     )
//                   )
//                 }
//               />
//               <Text style={styles.label}>Observation Brief</Text>
//               <TextInput
//                 style={styles.input}
//                 value={visit.observations}
//                 onChangeText={(text) =>
//                   setMonitoringVisits(
//                     monitoringVisits.map((item, idx) =>
//                       idx === index ? { ...item, observations: text } : item
//                     )
//                   )
//                 }
//               />
//               <TouchableOpacity
//                 onPress={() => removeMonitoringVisit(index)}
//                 style={styles.removeButton}
//               >
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//           <TouchableOpacity
//             onPress={addMonitoringVisit}
//             style={styles.addButton}
//           >
//             <Text style={styles.addButtonText}>Add More</Text>
//           </TouchableOpacity>

//           {/* Reports */}
//           <Text style={[styles.title, { marginTop: 20 }]}>
//             Reports Submitted
//           </Text>
//           {reports.map((report, index) => (
//             <View key={index} style={styles.fieldSet}>
//               <Text style={styles.label}>Date</Text>
//               <TextInput
//                 style={styles.input}
//                 value={report.report.submittedDate}
//                 onChangeText={(text) =>
//                   setReports(
//                     reports.map((item, idx) =>
//                       idx === index
//                         ? {
//                             report: { ...item.report, submittedDate: text },
//                           }
//                         : item
//                     )
//                   )
//                 }
//               />
//               <Text style={styles.label}>Report Details</Text>
//               <TextInput
//                 style={styles.input}
//                 value={report.report.details}
//                 onChangeText={(text) =>
//                   setReports(
//                     reports.map((item, idx) =>
//                       idx === index
//                         ? { report: { ...item.report, details: text } }
//                         : item
//                     )
//                   )
//                 }
//               />
//               <TouchableOpacity
//                 onPress={() => removeReport(index)}
//                 style={styles.removeButton}
//               >
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//           <TouchableOpacity onPress={addReport} style={styles.addButton}>
//             <Text style={styles.addButtonText}>Add More</Text>
//           </TouchableOpacity>

//           {/* Submit Button */}
//           <View style={styles.btnContainer}>
//             <TouchableOpacity style={submitBtn} onPress={handleSubmit}>
//               <Text style={styles.submitText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   formContainer: {
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 16,
//     fontFamily : 'Poppins-SemiBold',
//     // fontWeight: "bold",
//     marginBottom: 10,
//   },
//   fieldSet: {
//     marginBottom: 15,
//   },
//   label: {
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   removeButton: {
//     alignSelf: "flex-end",
//     alignItems : 'center',
//     backgroundColor: "#ff4d4d",
//     padding: 5,
//     borderRadius: 5,
//     width : '25%'
//   },
//   removeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   addButton: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//     width : '30%'
//   },
//   addButtonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   btnContainer: {
//     marginTop: 30,
//     alignItems : 'center'
//   },
//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

// export default ProjectCoordinationWork;
