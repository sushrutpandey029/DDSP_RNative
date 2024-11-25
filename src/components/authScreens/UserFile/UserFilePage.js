import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React,{useEffect} from 'react'
import HomeFarmerImage from '../commons/HomeFarmerImage'
import ButtonTabSlider from '../commons/ButtonTabSlider'
import { useDispatch, useSelector } from 'react-redux'
import {globalContainer} from "../../../globals/style"

const UserFilePage = () => {

  // const userDetails = useSelector((state) => state.user.user);

  //   useEffect(() => {
  //     console.warn('file-userdetails',userDetails);
  // },[])
  return (
    <SafeAreaView style={styles.container}>
      <Text>Contents unavailable</Text>
    </SafeAreaView>
  )
}

export default UserFilePage

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems: 'center',
    justifyContent : 'center'
    
  }
})


 