import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import mainImage from "../../../../assets/images/mainImage.png"

const FormCard = (props) => {
  return (
    <View style={styles.container}>
     <View>
        <Image source={mainImage} style={{height : 180, width : 160}}/>
     </View>
     <View style={styles.txtContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text>{props.content}</Text>
     </View>
    </View>
  )
}

export default FormCard

const styles = StyleSheet.create({
    container: {
         flexDirection: 'row',
        borderWidth  :1,
        borderRadius : 8,
        marginVertical : 6,
        // padding: 8,
        
    },
    title: {
      fontFamily : 'Poppins-Medium',
      fontSize : 18
    },
    txtContainer: {
      flex: 1,
      padding: 12
    }
})