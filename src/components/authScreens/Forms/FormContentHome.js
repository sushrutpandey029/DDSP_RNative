import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
 
const FormContentHome = (props) => {
  return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.title}>{props.title}</Text>
     <Text style={styles.content}>{props.content}</Text>
    </SafeAreaView>
  )
}

export default FormContentHome

const styles = StyleSheet.create({
    container : {
        marginVertical : 11
    },
    title : {
        fontFamily : "Poppins-Medium",
        fontSize : 14
    },
    content : {
        fontFamily : "Poppins-Regular",
        fontSize : 11
    }
})