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
} from "react-native";
import React, { useState } from "react";
import FormHeader from "../Forms/FormHeader";
import { TextInput } from "react-native-gesture-handler";
import { submitBtn, customMargin } from "../../../globals/style";
import { useSelector, useDispatch } from "react-redux";
import { BaseUrl } from "../../api/Api";
import { adminUserUpdate } from "../../services/ApiFile";
import { updateUser } from "../../redux/slices/AuthSlice";
import DatePicker from "react-native-ui-datepicker";

const ProfilePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user.user);
  const userId = userData.id;
  console.log("userDatas", userData);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState({
    fullname: userData.fullname,
    emailid: userData.emailid,
    phonenumber: userData.phonenumber,
    // address: userData.address,
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

  const handleSumbit = async () => {
    try {
      setLoading(true);
      const response = await adminUserUpdate(userId, inputValue);
      console.warn("profile-resp", response.user);

      if (response?.user) {
        dispatch(updateUser(response.user)); // Update Redux state
        console.log("User updated:", response.user);
        Alert.alert("Success Message", `${response.message}.`);
      } else {
        console.log("User data is missing in the response:", response);
        Alert.alert("Failed Message", "Failed to update user data.");
      }
    } catch (error) {
      console.log("pr-err", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <FormHeader title="Profile"/> */}
      <ScrollView>
        <View style={styles.bgContianer}></View>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: `${BaseUrl}/profile-images/${userData.profileimage}`,
            }}
            style={styles.img}
          />
          <Text style={styles.dText}>{userData.fullname}</Text>
          <Text>{userData.emailid}</Text>
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
            <Text style={styles.label}>Email Address</Text>
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
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input2}
              value={inputValue.phonenumber}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, phonenumber: text })
              }
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
            <TouchableOpacity
              style={[styles.input, { justifyContent: "center" }]}
              onPress={() => setOpen(true)}
            >
              <Text>{inputValue.dob ? inputValue.dob : "Select a date"}</Text>
            </TouchableOpacity>
          </View>

          {/* // calendra modal */}
          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView]}>
                <DatePicker
                  modal
                  mode="single"
                  open={open}
                  date={inputValue.dob}
                  onChange={(event) => handleDateChange(event.date)}
                  placeholder="Select a date"
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
              <Text style={styles.inpText}>Update</Text>
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
  img: {
    height: 130,
    width: 130,
    borderRadius: 100,
  },
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
    marginTop: "70%",
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
  twoBtn: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inBtn: {
    flex: 1,
    marginHorizontal: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
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
  monthStyle: {
    backgroundColor: "#cde1e3",
    borderColor: "#fff",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
