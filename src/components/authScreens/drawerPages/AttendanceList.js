import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
 } from "react-native";
import React, { useState, useEffect } from "react";
import { getLocationByUserId } from "../../services/ApiFile";
import { useSelector } from "react-redux";
import FormHeader from "../Forms/FormHeader";
import { globalContainer } from "../../../globals/style";
import Icon from "react-native-vector-icons/Ionicons";
import { deleteLocationById } from "../../services/ApiFile";

const AttendanceList = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [apiAttendanceList, setApiAttendanceList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAttendanceList = async () => {
    setLoading(true);
    try {
      const response = await getLocationByUserId(user.id);
      console.log("getLocationById-res", JSON.stringify(response, null, 2));
      if (response.success === true) {
        setApiAttendanceList(response.data);
      }
    } catch (err) {
      console.log("addLocationById-err", err);
    } finally {
      setLoading(false);
    }
  };

  const showConfirmation = (id) => {
      Alert.alert("Delete Confirmation",
        "Are you sure you want to delete this attendance ?",
        [
          {
            text:"Cancel",
            style:"cancel"
          },{
            text:"Confirm",
            onPress:() => handleDeleteList(id),
            style:"default"
          }
        ]
      )
  }


  const handleDeleteList = async (id) => {
    try{
        const response = await deleteLocationById(id);
        console.log('delte-list-resp',response);
        if(response.success) {
          handleOnRefresh();
          Alert.alert("Success Message","Attendance deleted successfully.")
        }
    }catch(err){
        console.log('delete-list-err',err);
        Alert.alert("Error","An error occured while deleting farmer.")
    }
  };

  const handleOnRefresh =async () => {
    setRefreshing(true);
    await getAttendanceList();
    setRefreshing(false);
  }

  useEffect(() => {
    getAttendanceList();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderConatiner}>
        <ActivityIndicator size={50} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="ATTENDANCE LIST" />
      <ScrollView 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />}
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.listConatiner}>
          {apiAttendanceList.length ? (
            apiAttendanceList.map((item, index) => (
              <View style={styles.list} key={index}>
                <View>
                  <Text style={styles.txtName}>Name : {item.fullname}</Text>
                  <Text style={styles.txtLat}>Latitude : {item.latitude}</Text>
                  <Text style={styles.txtLong}>
                    Longitude : {item.longitude}
                  </Text>
                  <Text style={styles.txtAdress}>Address : {item.address}</Text>
                </View>

                <View>
                  <TouchableOpacity onPress={() => showConfirmation(item.id)}>
                    <Icon name="close" color={"red"} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noData}>
              <Text>Attendance list not available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendanceList;

const styles = StyleSheet.create({
  listConatiner: {
    marginBottom: 40,
  },
  loaderConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
    padding: 6,
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
    shadowRadius: 4,
  },
  outView: {},
  txtName: {
    fontFamily: "Poppins-Regular",
  },
  txtLat: {
    fontFamily: "Poppins-Regular",
  },
  txtLong: {
    fontFamily: "Poppins-Regular",
  },
  txtAdress: {
    fontFamily: "Poppins-Regular",
    paddingRight: 11,
  },
  noData:{
    // justifyContent: 'center',
    marginTop:'50%',
    alignItems:'center'
  }
});
