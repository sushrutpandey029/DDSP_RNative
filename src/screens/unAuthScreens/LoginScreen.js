import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,ScrollView
} from "react-native";
import React from "react";
import loginImage from "../../../assets/images/loginImage.png";

const LoginScreen = () => {
  return (
    <ScrollView style={styles.container}  >
      <View style={styles.imageContainer}>
        <View>
          <Image source={loginImage} style={styles.logImage} />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <View>
          <Text style={styles.label}>User Id</Text>
          <TextInput  style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput  style={styles.input} secureTextEntry={true}/>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.lBtn}>
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
    flex:1,
    justifyContent : 'flex-end',
    alignItems:'center'
  },
  fieldContainer: {
    flex:1,
    marginTop : '10%'
  },
  btnContainer:{
    alignItems:'center',
    marginTop : '10%'
  },
  logImage:{
    // resizeMode:'contain'
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    // marginBottom : 4,
    marginTop: 9
    // fontWeight: '500'
  },
  lText : {
    fontFamily: "Poppins-Bold",
    fontSize:16,
    color:'#fff'
  },
  lBtn : {
    height  :49,
    width : 110,
    backgroundColor : '#5B8A39',
    borderRadius  :10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input :{
    height: 49,
    borderWidth :1,
    borderColor : '#CBD5E1',
    borderRadius : 12,
    paddingHorizontal : 15,
    fontSize : 18,
    fontFamily : 'Poppins-Regular',
    backgroundColor :'#F8FAFC',
    // color : '#000'
    

  }
});
