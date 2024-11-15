import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React,{useState} from "react";
import loginImage from "../../../assets/images/loginImage.png";
import axios from "axios";

const LoginScreen = ({ navigation }) => {

  const [loginValue, setLoginValue] = useState({
    emailid: '',
    password : ''
  })

  const handleLogin = async () => {

    try {
      const formData = new FormData();
      formData.append("emailid",loginValue.emailid);
      formData.append("password", loginValue.password);
      console.log("formdata",formData);
      // console.log('email',loginValue.emailid);
      // console.log('pass', loginValue.password);
      const response = await axios.post(
        "https://ef08-2401-4900-8846-e92-b928-d9b4-d776-3d17.ngrok-free.app/api/user/userlogin", loginValue
      );
      console.log('printing value');
      console.log("login-resp", response.user);
      console.warn('resp',response)
      // navigation.navigate("Drawer");
    } catch (err) {
      console.log('login-err', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View>
          <Image source={loginImage} style={styles.logImage} />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <View>
          <Text style={styles.label}>User Id</Text>
          <TextInput style={styles.input} onChangeText={(text) => setLoginValue({...loginValue,emailid : text})} />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} onChangeText={(text) => setLoginValue({...loginValue, password : text})} secureTextEntry={true} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.lBtn} onPress={handleLogin}>
            <Text style={styles.lText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  fieldContainer: {
    flex: 1,
    marginTop: "10%",
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
