import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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

  const getAttendanceList = async () => {
    try {
      const response = await getLocationByUserId(user.id);
      console.log("getLocationById-res", JSON.stringify(response, null, 2));
      if (response.success === true) {
        setApiAttendanceList(response.data);
      }
    } catch (err) {
      console.log("addLocationById-err", err);
    }
  };

  const handleDeleteList = async (index) => {
    try{
        const response = await deleteLocationById(index);
        console.log('delte-list-resp',response);
    }catch(err){
        console.log('delete-list-err',err);
    }
  }

  useEffect(() => {
    getAttendanceList();
  }, []);

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="ATTENDANCE LIST" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listConatiner}>
          {apiAttendanceList ? (
            apiAttendanceList.map((item, index) => (
              <View style={styles.list} key={index}>
                <View>
                  <Text style={styles.txtName}>Name : {item.fullname}</Text>
                  <Text style={styles.txtLat}>Latitude : {item.latitude}</Text>
                  <Text style={styles.txtLong}>
                    Longitude : {item.longitude}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity>
                    <Icon name="close" color={"red"} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>Attendance list not available</Text>
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
  txtLat: {},
  txtLong: {},
});
