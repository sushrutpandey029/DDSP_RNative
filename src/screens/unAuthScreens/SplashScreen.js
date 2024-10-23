import {
    View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import splash_img from "../../../assets/images/splash_screen.png";

const SplashScreen = ({navigation}) => {

    const handleGetStart = async () => {
        navigation.navigate('Login');
    }
   
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.textContainerIn}>
            <View>
                <Text style={styles.welcomeText}>Welcome to DD</Text>
            </View>
            <View>
                <Text style={styles.farmingText}>Farming App</Text>
            </View>
        </View>
        <View>
            <Text> Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been</Text>
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.startButton} onPress={handleGetStart}>
                <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer} >
        <View style={styles.imageContainerIn}>
           <Image source={splash_img} style={styles.image1} />
        </View>
       
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    textContainer : {
        flex : 1,
    },
    textContainerIn :{
        marginTop: '30%',
    },
    imageContainer : {
        flex : 1,
         alignItems :'center',
        // backgroundColor: 'grey',
        justifyContent : 'flex-end',
     },
    imageContainerIn:{
     },
    image1 : {
        height : '100%',
        width : Dimensions.get('window').width,
         resizeMode : 'contain',
        

    },
    welcomeText : {
        fontSize : 25,
        fontWeight : '600',
        fontFamily:"Poppins-Bold"
    },
    farmingText : {
        color: "#5B8A39",
        fontSize : 25,
        fontWeight : '600',
        fontFamily: "Poppins-Bold",
    },
    startButton: {
        height  :34,
        width : 131,
        backgroundColor : '#5B8A39',
        borderRadius  :10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontFamily: "Poppins-Regular",
        fontSize : 15,
        fontWeight : '400',
        color: '#fff'
    },
    btnContainer : {
        marginVertical: '4%'
    }
})
