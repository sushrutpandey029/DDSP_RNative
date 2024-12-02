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

const FarmerInformation = ({navigation}) => {
  const [errors, setErrors] = useState({});

  // const [selectedSeason, setSelectedSeason] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedCrop, setSelectedCrop] = useState("");
  // const [cropLand, setCropLand] = useState("");

  const [loginValue, setLoginValue] = useState({
    name: "",
    mobileNumber: "",
    emailID: "",
    villageName: "",
    taluka: "",
    district: "",
    cultivatedLand: "", //value of total land
    typeOfLand: "",
    cropsSown: {
      kharif: {
        chemical_irrigated: [],
        chemical_unirrigated: [],
        natural_irrigated: [],
        natural_unirrigated: [],
      },
      rabi: {
        chemical_irrigated: [],
        chemical_unirrigated: [],
        natural_irrigated: [],
        natural_unirrigated: [],
      },
    },
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
    { label: "Drip ", value: "Drip" },
    { label: "Sprinklers", value: "Sprinklers" },
  ]);

  const [sourceIrrigationItems, setSourceIrrigationItems] = useState([
    { label: "Well", value: "Well" },
    { label: "Canal", value: "Canal" },
  ]);

  const [villageItems, setVillageItems] = useState([
    { label: "Village 1", value: "Village 1" },
    { label: "Village 2", value: "Village 2" },
    { label: "Village 3", value: "Village 3" },
  ]);

  const [talukaItems, setTalukaItems] = useState([
    { label: "Taluka1", value: "Taluka1" },
    { label: "Taluka2", value: "Taluka2" },
    { label: "Taluka3", value: "Taluka3" },
  ]);

  const [districtItems, setDistrictItems] = useState([
    { label: "Yavatmal", value: "Yavatmal" },
    { label: "Washim", value: "Washim" },
  ]);

  const [seasonItems] = useState([
    { label: "Kharif", value: "kharif" },
    { label: "Rabi", value: "rabi" },
  ]);

  const [categoryItems] = useState([
    { label: "Chemical Irrigated", value: "chemical_irrigated" },
    { label: "Chemical Unirrigated", value: "chemical_unirrigated" },
    { label: "Natural Irrigated", value: "natural_irrigated" },
    { label: "Natural Unirrigated", value: "natural_unirrigated" },
  ]);

  const [cropItems] = useState([
    { label: "Crop 1", value: "crop1" },
    { label: "Crop 2", value: "crop2" },
    { label: "Crop 3", value: "crop3" },
  ]);

  const [cropSown, setCropSown] = useState([
    { season: "", category: "", crop: "", land: "" },
  ]);

  //previous full funcitonalbe function
  // const handleCropSelection = () => {
  //   if (selectedSeason && selectedCategory && selectedCrop) {
  //     setLoginValue((prevState) => {
  //       const updatedCropsSown = { ...prevState.cropsSown };
  //       updatedCropsSown[selectedSeason][selectedCategory].push(selectedCrop);

  //       return {
  //         ...prevState,
  //         cropsSown: updatedCropsSown,
  //       };
  //     });
  //   } else {
  //     Alert.alert("Please select all fields before adding a crop.");
  //   }
  // };

  // to add more functionality

 
  // const handleCropSelection = () => {
  //   cropSown.forEach((entry) => {
  //     const { season, category, crop, land } = entry;
  //     if (season && category && crop && land) {
  //       setLoginValue((prevState) => {
  //         const updatedCropsSown = { ...prevState.cropsSown };
  //         updatedCropsSown[season][category].push({ crop, cropLand: land });

  //         console.log('updatedCropsown-handle',JSON.stringify(updatedCropsSown,null,2))
  //         return {
  //           ...prevState,
  //           cropsSown: updatedCropsSown,
  //         };
  //       });
  //     }
  //   });
  // };


  const handleCropSelection = () => {
    let updatedCropsSown = { ...loginValue.cropsSown };
  
    cropSown.forEach((entry) => {
      const { season, category, crop, land } = entry;
  
      // Check if the required fields are available
      if (season && category && crop && land) {
        // Initialize season and category if they don't exist
        if (!updatedCropsSown[season]) {
          updatedCropsSown[season] = {
            chemical_irrigated: [],
            chemical_unirrigated: [],
            natural_irrigated: [],
            natural_unirrigated: [],
          };
        }
  
        if (!updatedCropsSown[season][category]) {
          updatedCropsSown[season][category] = [];
        }
  
        // Push the new crop and land data to the appropriate category
        updatedCropsSown[season][category].push({ crop, cropLand: land });
      }
    });
  
    // Now update the loginValue state with the updated cropsSown in one go
    setLoginValue((prevState) => ({
      ...prevState,
      cropsSown: updatedCropsSown,
    }));
  
    console.log('Updated loginValue after handleCropSelection:', JSON.stringify(updatedCropsSown, null, 2));
  };
  
  

  const handleAddCropRow = () => {
    setCropSown([
      ...cropSown,
      { season: "", category: "", crop: "", land: "" },
    ]);
  };

  const handleRemoveCropRow = (index) => {
    setCropSown(cropSown.filter((_, idx) => idx !== index));
  };

  // validating errors
  const validateFields = () => {
    let validateErrors = {};

    if (!loginValue.name) validateErrors.name = "Name is required";
    if (!loginValue.mobileNumber)
      validateErrors.mobileNumber = "Mobile is required";
    if (!loginValue.emailID) validateErrors.emailID = "Email ID is required";
    else if (!/\S+@\S+\.\S+/.test(loginValue.emailID))
      validateErrors.emailID = "Email ID is invalid";
    if (!loginValue.villageName)
      validateErrors.villageName = "Village Name is required";
    if (!loginValue.taluka) validateErrors.taluka = "Taluka is required";
    if (!loginValue.district) validateErrors.district = "District is requierd";
    if (!loginValue.cultivatedLand)
      validateErrors.cultivatedLand = "Cultivated Land is required";
    if (!loginValue.typeOfLand)
      validateErrors.typeOfLand = "Type of Land is required";
    if (!loginValue.desiBreeds)
      validateErrors.desiBreeds = "Desi breeds is requierd";
    if (!loginValue.irrigationSource)
      validateErrors.irrigationSource = "Irrigation source is required";
    if (!loginValue.soilConservationMeasures)
      validateErrors.soilConservationMeasures =
        "Soil Conservation measures is required";
    if (!loginValue.microIrrigation)
      validateErrors.microIrrigation = "MicroIrrigation is required";


    setErrors(validateErrors);

    return Object.keys(validateErrors).length === 0;
  };

  const handleSumbit = async () => {
    // console.log("Before handleCropSelection:", JSON.stringify(cropSown, null, 2));
    handleCropSelection();
    // console.log("Final loginValue after update:", JSON.stringify(loginValue, null, 2));
    if (validateFields()) {
      try {
        const response = await addFarmerInfo(loginValue);
        console.warn("addfarm-resp", response);
        Alert.alert(response.message);
        navigation.navigate('Home');
      } catch (error) {
        console.warn("addfarm-err", error.response.data);
        Alert.alert('Error adding farmer information');
      }
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
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, name: text })
                  }
                />
                {errors.name && (
                  <Text style={{ color: "red" }}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inField}>
                <Text style={styles.label}>Mobile No</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({ ...loginValue, mobileNumber: text })
                  }
                />
                {errors.mobileNumber && (
                  <Text style={{ color: "red" }}>{errors.mobileNumber}</Text>
                )}
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
              {errors.emailID && (
                <Text style={{ color: "red" }}>{errors.emailID}</Text>
              )}
            </View>
            <View style={styles.twoField}>
              <View style={styles.inField}>
                <Text style={styles.label}>Name of Village</Text>
                <Dropdown
                  data={villageItems}
                  labelField={"label"}
                  valueField={"value"}
                  value={loginValue.villageName}
                  onChange={(item) =>
                    setLoginValue({ ...loginValue, villageName: item.value })
                  }
                  maxHeight={200}
                  style={styles.input}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={"black"}
                      name="Safety"
                      size={20}
                    />
                  )}
                />
                {errors.villageName && (
                  <Text style={{ color: "red" }}>{errors.villageName}</Text>
                )}
              </View>
              <View style={styles.inField}>
                <Text style={styles.label}>
                  Total Land <Text style={{ fontSize: 12 }}>(in ac.)</Text>{" "}
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    setLoginValue({
                      ...loginValue,
                      cultivatedLand: `${text} Acre`,
                    })
                  }
                  keyboardType="numeric"
                />
                {errors.cultivatedLand && (
                  <Text style={{ color: "red" }}>{errors.cultivatedLand}</Text>
                )}
              </View>
            </View>

            <View>
              <Text style={styles.label}>Taluka</Text>
              <Dropdown
                data={talukaItems}
                labelField="label"
                valueField="value"
                value={loginValue.taluka}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, taluka: item.value })
                }
                maxHeight={200}
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                // containerStyle={{backgroundColor: '#b2dcec'}}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
              {errors.taluka && (
                <Text style={{ color: "red" }}>{errors.taluka}</Text>
              )}
            </View>
            <View>
              <Text style={styles.label}>District</Text>
              <Dropdown
                data={districtItems}
                labelField="label"
                valueField="value"
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
              {errors.district && (
                <Text style={{ color: "red" }}>{errors.district}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Type of land</Text>
              <Dropdown
                data={landItems}
                labelField="label"
                valueField="value"
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
              {errors.typeOfLand && (
                <Text style={{ color: "red" }}>{errors.typeOfLand}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>
                Soil and Water Conservation Measures
              </Text>
              <Dropdown
                data={conservationMeasureItems}
                labelField="label"
                valueField="value"
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
              {errors.soilConservationMeasures && (
                <Text style={{ color: "red" }}>
                  {errors.soilConservationMeasures}
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Source of Irrigation</Text>
              <Dropdown
                data={sourceIrrigationItems}
                labelField="label"
                valueField="value"
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
              {errors.irrigationSource && (
                <Text style={{ color: "red" }}>{errors.irrigationSource}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>No. of Desi Breed <Text style={{fontSize: 12}}>(cow/bullock)</Text></Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, desiBreeds: text })
                }
                keyboardType="numeric"
              />
              {errors.desiBreeds && (
                <Text style={{ color: "red" }}>{errors.desiBreeds}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Micro Irrigation</Text>
              <Dropdown
                data={microIrrigationItems}
                labelField="label"
                valueField="value"
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
              {errors.microIrrigation && (
                <Text style={{ color: "red" }}>{errors.microIrrigation}</Text>
              )}
            </View>

            {/* // adding crops sown fields */}
            <Text style={styles.cropsSown}>Crops Sown</Text>

            {cropSown.map((entry, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <View  style={styles.cropEntry}>
                <Text>Crop entry {index + 1}</Text>
                </View>
                

                {/* season dropdown */}
                <View>
                  <Text style={styles.label}>Season</Text>
                  <Dropdown
                    data={seasonItems}
                    labelField={"label"}
                    valueField={"value"}
                    value={entry.season}
                    onChange={(item) =>
                      setCropSown((prev) =>
                        prev.map((row, idx) =>
                          idx === index ? { ...row, season: item.value } : row
                        )
                      )
                    }
                    style={styles.input}
                    maxHeight={200}
                  />
                </View>

                {/* category dropdown */}
                <View>
                  <Text style={styles.label}>Category</Text>
                  <Dropdown
                    data={categoryItems}
                    labelField={"label"}
                    valueField={"value"}
                    value={entry.category}
                    onChange={(item) =>
                      setCropSown((prev) =>
                        prev.map((row, idx) =>
                          idx === index ? { ...row, category: item.value } : row
                        )
                      )
                    }
                    style={styles.input}
                    maxHeight={200}
                  />
                </View>

                {/* crop drowdown */}
                <View>
                  <Text style={styles.label}>Crop</Text>
                  <Dropdown
                    data={cropItems}
                    labelField={"label"}
                    valueField={"value"}
                    value={entry.crop}
                    onChange={(item) =>
                      setCropSown((prev) =>
                        prev.map((row, idx) =>
                          idx === index ? { ...row, crop: item.value } : row
                        )
                      )
                    }
                    style={styles.input}
                    maxHeight={200}
                  />
                </View>

                {/* cultivated land for the crop */}
                <View>
                  <Text style={styles.label}>
                    Land <Text style={{ fontSize: 12 }}>(in ac.)</Text>
                  </Text>
                  <TextInput
                    value={entry.land}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setCropSown((prev) =>
                        prev.map((row, idx) =>
                          idx === index ? { ...row, land: text } : row
                        )
                      )
                    }
                    style={styles.input}
                  />
                </View>

                {/* remove button */}
                {cropSown.length > 1 && (
                  <View style={styles.removeButton}>
                    <TouchableOpacity
                      onPress={() => handleRemoveCropRow(index)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

            {/* Add row button */}

            <View style={styles.addButton}>
              <TouchableOpacity onPress={handleAddCropRow}>
                <Text style={styles.addButtonText}>Add more</Text>
              </TouchableOpacity>
            </View>

            {/* <View>
              <Text style={styles.label}>Season</Text>
              <Dropdown
                data={seasonItems}
                labelField="label"
                valueField="value"
                value={selectedSeason}
                onChange={(item) => setSelectedSeason(item.value)}
                maxHeight={200}
                style={styles.input}
              />
              {errors.season && (
                <Text style={{ color: "red" }}>{errors.season}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Category</Text>
              <Dropdown
                data={categoryItems}
                labelField="label"
                valueField="value"
                value={selectedCategory}
                onChange={(item) => setSelectedCategory(item.value)}
                maxHeight={200}
                style={styles.input}
              />
              {errors.irrigationType && (
                <Text style={{ color: "red" }}>{errors.irrigationType}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Crop</Text>
              <Dropdown
                data={cropItems}
                labelField="label"
                valueField="value"
                value={selectedCrop}
                onChange={(item) => setSelectedCrop(item.value)}
                maxHeight={200}
                style={styles.input}
              />
              {errors.crop && (
                <Text style={{ color: "red" }}>{errors.crop}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>
                Cultivated Land <Text style={{ fontSize: 12 }}>(acre)</Text>
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setCropLand(text)}
              />
            </View> */}


            {/* //ending crops sown fields */}

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
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 15,
  },
  input2: {
    height: 49,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
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
  cropsSown: {
    marginTop: 15,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  fieldSet: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  removeButton: {
    backgroundColor: "#ea8c8c",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    marginTop: 20
  },
  removeButtonText: {
    color: "white",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#70ccb2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "30%",
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  cropEntry: {
    alignSelf: 'flex-end',
    borderBottomWidth: 1,
    padding: 6
   }
});
