import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormHeader from "../Forms/FormHeader";
import { TextInput } from "react-native-gesture-handler";
import { submitBtn, customMargin } from "../../../globals/style";
import { useSelector, useDispatch } from "react-redux";
import { BaseUrl } from "../../api/Api";
import { adminUserUpdate } from "../../services/ApiFile";
import { updateUser } from "../../redux/slices/AuthSlice";

const ProfilePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user.user);
  const userId = userData.id;

  const [inputValue, setInputValue] = useState({
    fullname: userData.fullname,
    emailid: userData.emailid,
    phonenumber: userData.phonenumber,
    address: userData.address,
    dob: userData.dob,
    qualification: userData.qualification,
  });

  const handleSumbit = async () => {
    console.warn("inp-val", inputValue);
    try {
      const response = await adminUserUpdate(userId, inputValue);
      console.warn("profile-resp", response.user);

      // Check if the response contains user data
      if (response?.user) {
        dispatch(updateUser(response.user)); // Update Redux state
        console.log("User updated:", response.user);
        Alert.alert(response.message);
      } else {
        console.log("User data is missing in the response:", response);
        Alert.alert("Error", "Failed to update user data.");
      }
    } catch (error) {
      console.log("pr-err", error);
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
              uri: `${BaseUrl}/profile-images/1731496967029-996013307.png`,
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
            />
          </View>
          <View style={styles.twoBtn}>
            <View style={styles.inBtn}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input2}
                value={inputValue.phonenumber}
                onChangeText={(text) =>
                  setInputValue({ ...inputValue, phonenumber: text })
                }
              />
            </View>
            <View style={styles.inBtn}>
              <Text style={styles.label}>Role</Text>
              <TextInput
                style={styles.input}
                value={userData.role}
                editable={false}
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={inputValue.address}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, address: text })
              }
            />
          </View>
          <View>
            <Text style={styles.label}>DOB</Text>
            <TextInput
              style={styles.input}
              value={inputValue.dob}
              onChangeText={(text) =>
                setInputValue({ ...inputValue, dob: text })
              }
            />
          </View>
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
          {/* <View>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} />
          </View> */}
          <View style={styles.btnContainer}>
            <TouchableOpacity style={submitBtn} onPress={handleSumbit}>
              <Text style={styles.inpText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
});
