import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import MainImage from "../../../../assets/images/mainImage.png"

const HomeFarmerImage = () => {
  return (
    <View>
     <Image source={MainImage} style={styles.img}/>
    </View>
  )
}

export default HomeFarmerImage

const styles = StyleSheet.create({
   img:{
    width : '100%',
     }
})