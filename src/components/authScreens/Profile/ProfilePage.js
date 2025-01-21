import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import FormHeader from "../Forms/FormHeader";
import { TextInput } from "react-native-gesture-handler";
import {
  submitBtn,
  customMargin,
  centeredView,
  modalView,
  closeButton,
  semibold,
  globalContainer,
  regular
} from "../../../globals/style";
import { useSelector, useDispatch } from "react-redux";
import { BaseUrl } from "../../api/Api";
import { adminUserUpdate } from "../../services/ApiFile";
import { updateUser } from "../../redux/slices/AuthSlice";
import DatePicker from "react-native-ui-datepicker";
import profilepic from "../../../../assets/images/profile.png"

const ProfilePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user.user);
  const userId = userData.id;
  console.log("userDatas", userData);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [inputValue, setInputValue] = useState({
    fullname: userData.fullname,
    emailid: userData.emailid,
    phonenumber: userData.phonenumber,
    dob: userData.dob,
    qualification: userData.qualification,
  });

  const [initialValue, setInitialValue] = useState({
    fullname: userData.fullname,
    emailid: userData.emailid,
    phonenumber: userData.phonenumber,
    dob: userData.dob,
    qualification: userData.qualification,
  });

  const formatDate = (selectedDate) => {
    if (!selectedDate) return ""; // If the selectedDate is null or undefined
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate); // Ensure it's a Date object
      if (!isNaN(dateObj)) {
        setDate(dateObj); // Set the valid date
        setInputValue((prev) => ({ ...prev, dob: formatDate(dateObj) }));
      }
      setOpen(false); // Close the modal after selection
    }
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    setInputValue(initialValue);
    setRefreshing(false);
  };

  const handleSumbit = async () => {
    try {
      setLoading(true);
      console.log("input-value",inputValue)
      const response = await adminUserUpdate(userId, inputValue);
      console.warn("profile-resp", response.user);

      if (response?.user) {
        dispatch(updateUser(response.user)); // Update Redux state
        console.log("User updated:", response.user);
        setInitialValue({
          fullname: response.user.fullname,
          emailid: response.user.emailid,
          phonenumber: response.user.phonenumber,
          dob: response.user.dob,
          qualification: response.user.qualification,
        });
        Alert.alert("Success Message", `${response.message}.`);
      } else {
        console.log("User data is missing in the response:", response);
        Alert.alert("Failed Message", "Failed to update user data.");
      }
    } catch (error) {
      console.log("pr-err", error.response);
      Alert.alert(
        "Failed Message",
        error.response.data.message || "failed to update information."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
      >
        {/* <View style={styles.bgContianer}></View> */}
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: `${BaseUrl}/profile-images/${userData.profileimage}`,
            }}
            style={styles.img}
            defaultSource={profilepic}
          />
          <Text style={styles.dText}>{userData.fullname}</Text>
          <Text style={regular} >{userData.emailid}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={inputValue.fullname}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, fullname: text })
              }
              editable={false}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={inputValue.emailid}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, emailid: text })
              }
              editable={false}
            />
          </View>
          <View>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input2}
              value={inputValue.phonenumber}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, phonenumber: text })
              }
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={styles.input}
              value={userData.role}
              editable={false}
            />
          </View>

          <View>
            <Text style={styles.label}>DOB</Text>
            {/* <TouchableOpacity
              style={[styles.input, { justifyContent: "center" }]}
              onPress={() => setOpen(true)}
            > */}
            <TextInput
              value={inputValue.dob}
              editable={false}
              style={styles.input}
            />
            {/* <Text>{inputValue.dob ? inputValue.dob : "Select a date"}</Text> */}
            {/* </TouchableOpacity> */}
          </View>

          {/* // calendra modal */}
          {/* <Modal animationType="slide" transparent={true} visible={open}>
            <View style={centeredView}>
              <View style={[modalView]}>
                <DatePicker
                  modal
                  mode="single"
                  open={open}
                  date={inputValue.dob}
                  onChange={(event) => handleDateChange(event.date)}
                  placeholder="Select a date"
                  headerButtonsPosition="right"
                  editable={false}
                />

                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={closeButton}
                >
                  <Text style={semibold}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

          <View>
            <Text style={styles.label}>Qualification</Text>
            <TextInput
              style={styles.input}
              value={inputValue.qualification}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, qualification: text })
              }
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={submitBtn}
              onPress={handleSumbit}
              disabled={loading}
            >
              <Text style={[styles.inpText,semibold]}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={50} color={"#ffffff"} />
          <Text style={[styles.inpText, { fontSize: 14 }]}>processing...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    alignItems: "center",
    marginBottom: 20,
    //  backgroundColor:"#d8f5f4",
     padding:10
},

img: {
    width: 130,
    height: 130,
    borderRadius: 65, // Half of width/height for a perfect circle
    // alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#fff", // Neutral background for better contrast
    borderWidth: 2,
    borderColor: "#bfb1b1", // Subtle border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // Softer shadow
    shadowRadius: 8, // Slightly softer shadow effect
    elevation: 5, // Slightly reduced for balance,
   
},

  // imgContainer: {
  //   alignItems: "center",
  //   marginBottom: 20,
  // },
  // img: {
  //   width: 130,
  //   height: 130,
  //   borderRadius: 100,
  //   alignSelf: "center",
  //   marginBottom: 10,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 10,
  //   elevation: 6,
  //   backgroundColor: "#000",
  //   borderWidth:2,
  //   borderColor:"#bfb1b1",
    
  // },
  label: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginTop: 9,
  },
  dText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    // marginTop: 9,
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
  input2: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
  },
  fieldContainer: {
    // marginTop: 20,
    marginBottom: "40%",
    // marginHorizontal: "3%",
  },
  subBtn: {
    // width: "70%",
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
  btnContainer: {
    alignItems: "center",
    marginTop:25
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
