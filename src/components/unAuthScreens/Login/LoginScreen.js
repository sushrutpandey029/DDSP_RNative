import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import loginImage from "../../../../assets/images/loginImage.png";
import axios from "axios";
import { authLogin } from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/AuthSlice";
import { globalContainer } from "../../../globals/style";

const LoginScreen = ({ navigation }) => {
  const [loginValue, setLoginValue] = useState({
    emailid: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const error = authState.error;
  const [customError, setCustomError] = useState('');
 
  const handleLogin = async () => {

      dispatch(loginUser(loginValue));

    

   };

  useEffect(() => {
    if (authState.isLoggedIn) {
       navigation.navigate("Drawer");
    }  
  }, [authState.isLoggedIn]);

  return (
    <ScrollView style={globalContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View>
            <Image source={loginImage} style={styles.logImage} />
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <View>
            {error && (
              <Text style={[styles.label, { color: "red" }]}>{error}</Text>
            )}
            <Text style={styles.label}>User Id</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setLoginValue({ ...loginValue, emailid: text })
              }
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setLoginValue({ ...loginValue, password: text })
              }
              secureTextEntry={true}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.lBtn} onPress={handleLogin}>
              <Text style={styles.lText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
   },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fieldContainer: {
    flex: 1,
    paddingTop: "10%",
  },
  btnContainer: {
    alignItems: "center",
    marginTop: "10%",
  },
  logImage: {
    // resizeMode:'contain'
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    // marginBottom : 4,
    marginTop: 9,
    // fontWeight: '500'
  },
  lText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#fff",
  },
  lBtn: {
    height: 49,
    width: 110,
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    // color : '#000'
  },
});
