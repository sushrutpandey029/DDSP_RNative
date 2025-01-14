import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import loginImage from "../../../../assets/images/login3.jpg";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/AuthSlice";

const LoginScreen = ({ navigation }) => {
  const [loginValue, setLoginValue] = useState({
    emailid: "",
    password: "",
  });

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const error = authState.error;

  const handleLogin = async () => {
    dispatch(loginUser(loginValue));
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigation.navigate("Drawer");
    }
  }, [authState.isLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={loginImage}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
                <Text style={styles.text}>
                  Welcome to RNFP Regenerative Natural Farming Project
                </Text>
              </View>
              <View style={styles.formContainer}>
                {error && (
                  <Text style={[styles.label, { color: "red" }]}>{error}</Text>
                )}
                <Text style={styles.label}>User ID</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, emailid: text })
                  }
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, password: text })
                  }
                />
                <TouchableOpacity style={styles.lBtn} onPress={handleLogin}>
                  <Text style={styles.lText}>Login</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  input: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    marginTop: 5,
  },
  lBtn: {
    height: 49,
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  lText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#fff",
  },
});




// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ImageBackground,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   ScrollView,
//   Keyboard,
//   Platform,
// } from "react-native";
// import loginImage from "../../../../assets/images/login3.jpg";
// import { useSelector, useDispatch } from "react-redux";
// import { loginUser } from "../../redux/slices/AuthSlice";

// const LoginScreen = ({ navigation }) => {
//   const [loginValue, setLoginValue] = useState({
//     emailid: "",
//     password: "",
//   });

//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);
//   const error = authState.error;

//   const handleLogin = async () => {
//     dispatch(loginUser(loginValue));
//   };

//   useEffect(() => {
//     if (authState.isLoggedIn) {
//       navigation.navigate("Drawer");
//     }
//   }, [authState.isLoggedIn]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         barStyle="light-content"
//       />
//       <ImageBackground
//         source={loginImage}
//         style={styles.background}
//         resizeMode="cover"
        
//       >
       
//           {/* <KeyboardAvoidingView
//             style={styles.overlay}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//           > */}
//             <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop:'80%' }}>
              
//               <View style={styles.header}>
//                 <Text style={styles.text}>
//                   Welcome to RNFP Regenerative Natural Farming Project
//                 </Text>
//               </View>
//               <View style={styles.formContainer}>
//                 {error && (
//                   <Text style={[styles.label, { color: "red" }]}>{error}</Text>
//                 )}
//                 <Text style={styles.label}>User ID</Text>
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={(text) =>
//                     setLoginValue({ ...loginValue, emailid: text })
//                   }
//                 />
//                 <Text style={styles.label}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   secureTextEntry={true}
//                   onChangeText={(text) =>
//                     setLoginValue({ ...loginValue, password: text })
//                   }
//                 />
//                 <TouchableOpacity style={styles.lBtn} onPress={handleLogin}>
//                   <Text style={styles.lText}>Login</Text>
//                 </TouchableOpacity>
//               </View>

//             </ScrollView>
//           {/* </KeyboardAvoidingView> */}
        
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };
// {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// </TouchableWithoutFeedback> */}
// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
    
//   },
//   background: {
//     flex: 1,
    
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
//     // marginpTop:30
//   },
//   header: {
//     marginBottom: 30,
//     alignItems: "center",
//   },
//   text: {
//     fontFamily: "Poppins-SemiBold",
//     fontSize: 25,
//     color: "#fff",
//     textAlign: "center",
//   },
//   formContainer: {
//     // backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 12,
//     padding: 20,
//    },
//   label: {
//     fontFamily: "Poppins-SemiBold",
//     fontSize: 16,
//     color: "#fff",
//     marginTop: 10,
//   },
//   input: {
//     height: 49,
//     borderWidth: 1,
//     borderColor: "#CBD5E1",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     fontFamily: "Poppins-Regular",
//     backgroundColor: "#F8FAFC",
//     marginTop: 5,
//   },
//   lBtn: {
//     height: 49,
//     backgroundColor: "#5B8A39",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   lText: {
//     fontFamily: "Poppins-Bold",
//     fontSize: 16,
//     color: "#fff",
//   },
// });
