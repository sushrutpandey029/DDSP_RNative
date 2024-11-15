import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity
  } from "react-native";import React from 'react'
  import {submitBtn} from "../../../../globals/style"
  import FormHeader from "../FormHeader";
  import {globalContainer} from "../../../../globals/style"


const DetailOfCultivation = () => {
  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={'DETAIL OF CULTIVATION '}/>
      <ScrollView>
         <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>Farmer id</Text>
            <TextInput style={styles.input} />
          </View>
          <View>
            <Text style={styles.label}>Cultivated crops</Text>
            <TextInput style={styles.input} />
            <TextInput style={[styles.input,{marginTop : 18}]} />
          </View>
             <View >
              <Text style={styles.label}>Total Cost</Text>
              <TextInput style={styles.input2} />
            </View>          
          
          <View style={styles.btnContainer}>
            <TouchableOpacity style={submitBtn}>
              <Text style={styles.inpText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailOfCultivation

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
    // imgContainer: {
    //   position: "absolute",
    //   top: "9%",
    //   alignItems: "center",
    //   width: "100%",
    // },
    formContainer: {
      marginBottom : 20
    },
    img: {
      height: 130,
      width: 130,
    },
    label: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      marginTop: 9,
    },
    input: {
      height: 49,
      borderWidth: 1,
      borderColor: "#CBD5E1",
      borderRadius: 15,
      fontSize: 18,
      fontFamily: "Poppins-Regular",
      backgroundColor: "#F8FAFC",
      paddingHorizontal: 15,
    },
    input2: {
      height: 49,
      borderWidth: 1,
      borderColor: "#CBD5E1",
      borderRadius: 15,
      fontSize: 18,
      fontFamily: "Poppins-Regular",
      backgroundColor: "#F8FAFC",
      paddingHorizontal: 10,
    },
    fieldContainer: {
      marginTop: "60%",
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