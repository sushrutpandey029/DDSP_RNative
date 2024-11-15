import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import { addFarmerInfo } from "../../../services/ApiFile";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const FarmerInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTypeLand, setCurrentTypeLand] = useState("");
  const [currentConservationMeasure, setCurrentConservationMeasure] =
    useState("");
  const [currentMicroIrrigation, setCurrentMicroIrrigation] = useState("");
  const [currentSourceIrrigation, setCurrentSourceIrrigation] = useState("");

  const [loginValue, setLoginValue] = useState({
    name: "",
    mobileNumber: "",
    emailID: "",
    villageName: "",
    taluka: "",
    district: "",
    cultivatedLand: "",
    typeOfLand: "",
    cropsSown: "",
    desiBreeds: "",
    irrigationSource: "",
    soilConservationMeasures: "",
    microIrrigation: "",
  });

  const [landItems, setLandItems] = useState([
    { label: "clayey", value: "clayey" },
    { label: "sandy loam", value: "sandyLoam" },
    { label: "sandy", value: "sandy" },
  ]);

  const [conservationMeasureItems, setConservationMeasureItems] = useState([
    { label: "Trenching", value: "trenching" },
    { label: "Farm Pond", value: "farmPond" },
    { label: "Bunding", value: "bunding" },
  ]);

  const [microIrrigationItems, setMicroIrrigationItems] = useState([
    { label: "Drip ", value: "drip" },
    { label: "Sprinklers", value: "sprinklers" },
  ]);

  const [sourceIrrigationItems, setSourceIrrigationItems] = useState([
    { label: "Well", value: "well" },
    { label: "Canal", value: "canal" },
  ]);

  const [talukaItems, setTalukaItems] = useState([
    { label: "Taluka1", value: "taluka1" },
    { label: "Taluka2", value: "taluka2" },
    { label: "Taluka3", value: "taluka3" },
  ]);

  const [districtItems, setDistrictItems] = useState([
    { label: "Yavatmal", value: "yavatmal" },
    { label: "Washim", value: "washim" },
  ]);

  const [cropSownItems, setCropSownItems] = useState([
    {
      label: "Kharif Chemical irrigated crop 1",
      value: "Kharif Chemical irrigated crop 1",
    },
    {
      label: "Kharif Chemical irrigated crop 2",
      value: "Kharif Chemical irrigated crop 2",
    },
    {
      label: "Kharif Chemical irrigated crop 3",
      value: "Kharif Chemical irrigated crop 3",
    },
    {
      label: "Kharif Chemical unirrigated crop 1",
      value: "Kharif Chemical unirrigated crop 1",
    },
    {
      label: "Kharif Chemical unirrigated crop 2",
      value: "Kharif Chemical unirrigated crop 2",
    },
    {
      label: "Kharif Chemical unirrigated crop 3",
      value: "Kharif Chemical unirrigated crop 3",
    },
    {
      label: "Kharif Natural irrigated crop 1",
      value: "Kharif Natural irrigated crop 1",
    },
    {
      label: "Kharif Natural irrigated crop 2",
      value: "Kharif Natural irrigated crop 2",
    },
    {
      label: "Kharif Natural irrigated crop 3",
      value: "Kharif Natural irrigated crop 3",
    },
    {
      label: "Kharif Natural unirrigated crop 1",
      value: "Kharif Natural unirrigated crop 1",
    },
    {
      label: "Kharif Natural unirrigated crop 2",
      value: "Kharif Natural unirrigated crop 2",
    },
    {
      label: "Kharif Natural unirrigated crop 3",
      value: "Kharif Natural unirrigated crop 3",
    },
    {
      label: "Rabi Chemical irrigated crop 1",
      value: "Rabi Chemical irrigated crop 1",
    },
    {
      label: "Rabi Chemical irrigated crop 2",
      value: "Rabi Chemical irrigated crop 2",
    },
    {
      label: "Rabi Chemical irrigated crop 3",
      value: "Rabi Chemical irrigated crop 3",
    },
    {
      label: "Rabi Chemical unirrigated crop 1",
      value: "Rabi Chemical unirrigated crop 1",
    },
    {
      label: "Rabi Chemical unirrigated crop 2",
      value: "Rabi Chemical unirrigated crop 2",
    },
    {
      label: "Rabi Chemical unirrigated crop 3",
      value: "Rabi Chemical unirrigated crop 3",
    },
    {
      label: "Rabi Natural irrigated crop 1",
      value: "Rabi Natural irrigated crop 1",
    },
    {
      label: "Rabi Natural irrigated crop 2",
      value: "Rabi Natural irrigated crop 2",
    },
    {
      label: "Rabi Natural unirrigated crop 3",
      value: "Rabi Natural unirrigated crop 3",
    },
    {
      label: "Rabi Natural unirrigated crop 1",
      value: "Rabi Natural unirrigated crop 1",
    },
    {
      label: "Rabi Natural unirrigated crop 2",
      value: "Rabi Natural unirrigated crop 2",
    },
    {
      label: "⁸Rabi Natural unirrigated crop 3",
      value: "⁸Rabi Natural unirrigated crop 3",
    },
  ]);

  const handleSumbit = async () => {
    console.warn("log-val", loginValue);
    try {
      const response = await addFarmerInfo(loginValue);
      console.warn("addfarm-resp", response);
      console.warn("addfarm-resp-msg", response.message);
      Alert.alert(response.message);
    } catch (error) {
      console.warn("addfarm-err", error);
    }
  };

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="FARMER INFORMATION" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.formContainer}>
            <View style={styles.twoField}>
              <View style={styles.inField}>
                <Text style={styles.label}>Name of the farmer</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, name: text })
                  }
                />
              </View>
              <View style={styles.inField}>
                <Text style={styles.label}>Mobile No</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, mobileNumber: text })
                  }
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Email id</Text>
              <TextInput
                style={styles.input2}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, emailID: text })
                }
              />
            </View>
            <View style={styles.twoField}>
              <View style={styles.inField}>
                <Text style={styles.label}>Name of Village</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, villageName: text })
                  }
                />
              </View>
              <View style={styles.inField}>
                <Text style={styles.label}>Name of Cluster</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={(text) =>
                  //   setLoginValue({ ...loginValue, name: text })
                  // }
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Taluka</Text>
              <Dropdown
                data={talukaItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.taluka}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, taluka: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>
            <View>
              <Text style={styles.label}>District</Text>
              <Dropdown
                data={districtItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.district}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, district: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>
            {/* <View style={styles.twoField}> */}
            {/* <View style={styles.inField}>
                <Text style={styles.label}>Date of Registration</Text>
                <TextInput style={styles.input} />
              </View> */}
            <View>
              <Text style={styles.label}>Cultivated Land</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, cultivatedLand: text })
                }
              />
            </View>
            {/* </View> */}

            <View>
              <Text style={styles.label}>Type of land</Text>
              <Dropdown
                data={landItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.typeOfLand}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, typeOfLand: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Crops sown</Text>
              <Dropdown
                data={cropSownItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.cropsSown}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, cropsSown: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>
                Soil and Water Conservation Measures
              </Text>
              <Dropdown
                data={conservationMeasureItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.soilConservationMeasures}
                onChange={(item) =>
                  setLoginValue({
                    ...loginValue,
                    soilConservationMeasures: item.value,
                  })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Source of Irrigation</Text>
              <Dropdown
                data={sourceIrrigationItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.irrigationSource}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, irrigationSource: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={24}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Number of Desi Breed</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, desiBreeds: text })
                }
              />
            </View>

            <View>
              <Text style={styles.label}>Micro Irrigation</Text>
              <Dropdown
                data={microIrrigationItems}
                labelField="label"
                valueField="value"
                placeholder="select an item"
                value={loginValue.microIrrigation}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, microIrrigation: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            <View>
              <Text style={styles.label}>Total Cultivated Natural Farming</Text>
              <TextInput
                style={styles.input}
                // onChangeText={(text) =>
                //   setLoginValue({ ...loginValue, desiBreeds: text })
                // }
              />
            </View>

            <View>
              <Text style={styles.label}>
                Total Cultivated Chemical Farming
              </Text>
              <TextInput
                style={styles.input}
                // onChangeText={(text) =>
                //   setLoginValue({ ...loginValue, desiBreeds: text })
                // }
              />
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={submitBtn} onPress={handleSumbit}>
                <Text style={styles.inpText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FarmerInformation;

const styles = StyleSheet.create({
  // scrollContainer: {
  //   paddingBottom: 30,
  // },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginVertical: 9,
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
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  btnContainer: {
    alignItems: "center",
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
  submitBtn: {
    width: "70%",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  // label: {
  //   fontSize: 16,
  //   marginVertical: 10,
  // },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
});
