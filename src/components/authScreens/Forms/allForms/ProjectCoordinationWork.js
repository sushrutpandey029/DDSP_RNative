import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import {globalContainer} from "../../../../globals/style"


const ProjectCoordinationWork = () => {
  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"PROJECT COORDINATION WORK"} />
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Training programmes conducted</Text>

          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Program name</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>No. of participants</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Date:</Text>
              <TextInput style={styles.input2} />
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>Review Meetings</Text>
          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Participants</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inField}>
              <Text style={styles.smLabel}>Date:</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>
            Monitoring Visits
          </Text>
          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Cluster / Village</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Observation brief</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Date:</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>
            Report Submitted
          </Text>
          <View style={styles.twoField}>
            <View style={styles.inField}>
              <Text style={styles.smLabel}>Report Details</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inField}>
              <Text style={styles.smLabel}>Date:</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 20 }]}>
            Reports to be Generated
          </Text>
          <View style={styles.twoField}>
          <View style={styles.inFieldFirst}>
            <Text style={styles.smLabel}>
              Clusterwise farmers covered details
            </Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inFieldLast}>
          <Text style={styles.smLabel}>
              Date
            </Text>
            <TextInput style={styles.input} />
          </View>
          </View>
        

          <View style={styles.btnContainer}>
            <TouchableOpacity style={submitBtn}>
              <Text style={styles.inpText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectCoordinationWork;

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
  imgContainer: {
    position: "absolute",
    top: "9%",
    alignItems: "center",
    width: "100%",
  },
  formContainer: {
    marginBottom: 20,
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
  smLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
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
  training: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
  btnContainer: {
    alignItems: "center",
  },
  twoField: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inField: {
    flex: 1,
    marginHorizontal: 4,
  },
  inFieldFirst: {
    flex: 2,
    marginHorizontal: 4,
  },
  inFieldLast: {
    flex: 1,
    marginHorizontal: 4,
  }
});
