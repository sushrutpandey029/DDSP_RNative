import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import FormContentHome from '../../Forms/FormContentHome';
import { useSelector } from 'react-redux';

const FormTab = () => {
    
    const navigation = useNavigation();
    const {user} = useSelector((state) => state.auth.user);

    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.navigate("FarmerInformation")}
            >
              <FormContentHome
                title="Farmer Information"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("FieldWork")}>
              <FormContentHome
                title="Field Worker Details"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>

            {user.role === "Project Coordinator" && (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProjectWork")}
              >
                <FormContentHome
                  title="Project Coordination Work"
                  content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate("InteractionWithFarmer")}
            >
              <FormContentHome
                title="Interaction With Farmers"
                content="Lorem ipsum dolor sit amet consectetur. Massa vestibulum neque integer nunc massa vitae duis."
              />
            </TouchableOpacity>
          </ScrollView>
    )
}

export default FormTab;

const styles = StyleSheet.create({
    container : {
        flex:1,
        // backgroundColor:'red',
        // marginTop:0
    }
})