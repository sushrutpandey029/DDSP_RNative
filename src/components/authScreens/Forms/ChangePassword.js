import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import FormHeader from "./FormHeader";
import { globalContainer, submitBtn } from "../../../globals/style";
import { changePassword } from "../../services/ApiFile";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.user);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    cpassword: "",
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const validateFields = () => {
    let validateErrors = {};

    if (!formData.oldpassword)
      validateErrors.oldpassword = "Old password is required";
    if (!formData.newpassword)
      validateErrors.newpassword = "New password is required";
    if (!formData.cpassword)
      validateErrors.cpassword = "Confirm password is required";

    setErrors(validateErrors);
    return Object.keys(validateErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("formData", formData);

    if (validateFields()) {
      try {
        setLoading(true);

        const response = await changePassword(user.id, formData);
        console.log("changPswd-resp", response);
        setLoading(false);
        Alert.alert("Success Message", `${response.message}.`, [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Home"),
            style: "default",
          },
        ]);
      } catch (error) {
        console.log("changPswd-err", error.response.data.errormessage);
        Alert.alert("Error Message", error.response.data.errormessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"CHANGE PASSWORD"} />
      <View style={styles.formContainer}>
        <View style={styles.field}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            value={formData.oldpassword}
            onChangeText={(value) => handleChange("oldpassword", value)}
            secureTextEntry={true}
          />
          {errors.oldpassword && (
            <Text style={{ color: "red" }}>{errors.oldpassword}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={formData.newpassword}
            onChangeText={(value) => handleChange("newpassword", value)}
            secureTextEntry={true}
          />
          {errors.newpassword && (
            <Text style={{ color: "red" }}>{errors.newpassword}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={formData.cpassword}
            onChangeText={(value) => handleChange("cpassword", value)}
            secureTextEntry={true}
          />
          {errors.cpassword && (
            <Text style={{ color: "red" }}>{errors.cpassword}</Text>
          )}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={submitBtn}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.inpText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={50} color={"#ffffff"} />
          <Text style={[styles.inpText, { fontSize: 14 }]}>processing...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  field: {
    marginTop: 20,
  },
  label: {
    fontFamily: "Poppins-Medium",
    fontWeight: "600",
    fontSize: 16,
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
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
  btnContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
});
