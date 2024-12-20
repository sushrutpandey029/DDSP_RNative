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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getFarmerById,
  updateFarmerDetailsById,
} from "../../../services/ApiFile";
import { submitBtn, globalContainer } from "../../../../globals/style";
import FormHeader from "../../Forms/FormHeader";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  villageItems,
  talukaItems,
  clusterItems,
} from "../../Forms/data/Constant";
 
const FarmerDetail = ({ route, navigation }) => {

  const id = route.params.farmerId;
  const [farmerData, setFarmerData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("farmer-name", farmerData.name);
  console.log("farmer-id", id);

  const [errors, setErrors] = useState({});
  const [isCropsSownUpdated, setIsCropsSownUpdated] = useState(false);

  const [loginValue, setLoginValue] = useState({
    name: "",
    mobileNumber: "",
    emailID: "",
    villageName: "",
    cluster: "",
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
    { label: "Clayey", value: "Clayey" },
    { label: "Sandy Loam", value: "Sandy Loam" },
    { label: "Sandy", value: "Sandy" },
  ]);

  const [conservationMeasureItems, setConservationMeasureItems] = useState([
    { label: "Trenching", value: "Trenching" },
    { label: "Farm Pond", value: "Farm Pond" },
    { label: "Bunding", value: "Bunding" },
  ]);

  const [microIrrigationItems, setMicroIrrigationItems] = useState([
    { label: "Drip", value: "Drip" },
    { label: "Sprinklers", value: "Sprinklers" },
  ]);

  const [sourceIrrigationItems, setSourceIrrigationItems] = useState([
    { label: "Well", value: "Well" },
    { label: "Canal", value: "Canal" },
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
    { label: "Rice", value: "Rice" },
    { label: "Wheat", value: "Wheat" },
    { label: "Maize", value: "Maize" },
    { label: "Cotton", value: "Cotton" },
  ]);

  const [cropSown, setCropSown] = useState([
    { season: "", category: "", crop: "", land: "" },
  ]);

  // const handleCropSelection = () => {
  //   let updatedCropsSown = { ...loginValue.cropsSown };

  //   cropSown.forEach((entry) => {
  //     const { season, category, crop, land } = entry;

  //     if (season && category && crop && land) {
  //       if (!updatedCropsSown[season]) {
  //         updatedCropsSown[season] = {
  //           chemical_irrigated: [],
  //           chemical_unirrigated: [],
  //           natural_irrigated: [],
  //           natural_unirrigated: [],
  //         };
  //       }

  //       if (!updatedCropsSown[season][category]) {
  //         updatedCropsSown[season][category] = [];
  //       }

  //       updatedCropsSown[season][category].push({ crop, cropLand: land });
  //     }
  //   });

  //   setLoginValue((prevState) => ({
  //     ...prevState,
  //     cropsSown: updatedCropsSown,
  //   }));

  //   setIsCropsSownUpdated(true); // Flag to indicate update
  // };

  const handleCropSelection = () => {
    let updatedCropsSown = {};

    cropSown.forEach((entry) => {
      const { season, category, crop, land } = entry;

      if (season && category && crop && land) {
        // Ensure the structure for the given season exists
        if (!updatedCropsSown[season]) {
          updatedCropsSown[season] = {
            natural_irrigated: [],
            natural_unirrigated: [],
            chemical_irrigated: [],
            chemical_unirrigated: [],
          };
        }

        // Push the crop data to the appropriate category
        updatedCropsSown[season][category].push({
          crop,
          cropLand: parseFloat(land),
        });
      }
    });

    // Update the state for cropsSown
    setLoginValue((prevState) => ({
      ...prevState,
      cropsSown: updatedCropsSown,
    }));

    setIsCropsSownUpdated(true); // Flag to indicate update
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

  const prepareApiPayload = () => {
    const payload = {
      farmerID: farmerData?.farmerID,
      newname: loginValue.name,
      mobileNumber: loginValue.mobileNumber,
      emailID: loginValue.emailID,
      villageName: loginValue.villageName,
      taluka: loginValue.taluka,
      cluster: loginValue.cluster,
      district: loginValue.district,
      cultivatedLand: parseFloat(loginValue.cultivatedLand),
      desiBreeds: loginValue.desiBreeds,
      typeOfLand: loginValue.typeOfLand,
      sourceIrrigationItems: loginValue.irrigationSource.split(", "),
      conservationMeasureItems: loginValue.soilConservationMeasures.split(", "),
      microIrrigation: loginValue.microIrrigation,
    };

    // Ensure cropsSown is an object, not a string
    if (loginValue.cropsSown) {
      const transformedCropsSown = {};

      Object.keys(loginValue.cropsSown).forEach((season) => {
        const seasonData = loginValue.cropsSown[season];

        Object.keys(seasonData).forEach((category) => {
          const categoryData = seasonData[category];

          // Only add non-empty categories
          if (Array.isArray(categoryData) && categoryData.length > 0) {
            if (!transformedCropsSown[season]) {
              transformedCropsSown[season] = {};
            }

            // Add crops to the season and category
            transformedCropsSown[season][category] = categoryData.map(
              ({ crop, cropLand }) => ({
                crop,
                cropLand: String(cropLand), // Ensure cropLand is sent as string
              })
            );
          }
        });
      });

      // Add the transformed cropsSown to the payload
      if (Object.keys(transformedCropsSown).length > 0) {
        payload.cropsSown = transformedCropsSown;
      }
    }

    return payload;
  };

  

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        setLoading(true)
        const payload = prepareApiPayload();

        console.log(
          "after-handleCropSelection:",
          JSON.stringify(payload, null, 2)
        );

        const response = await updateFarmerDetailsById(id, payload);
        console.log("udateFarmer-resp", JSON.stringify(response, null, 2));
        setLoading(false)
        Alert.alert("Success Message",`${response.message}.`,
          [
            {
              text : "Ok",
              onPress : () => navigation.navigate("Home"),
              style:"default"
            }
          ]
        );
        // navigation.navigate("Home");
      } catch (error) {
        console.log("udateFarmer-resp-err", error.response.data);
        Alert.alert("Error adding farmer information");
      }finally {
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    if (isCropsSownUpdated) {
      handleSubmit();
      setIsCropsSownUpdated(false); // Reset the flag
    }
  }, [isCropsSownUpdated]);

  const getFarmerDetails = async () => {
    try {
      const response = await getFarmerById(id);
      console.log("farmer-details", JSON.stringify(response, null, 2));
      setFarmerData(response.data);
      // setFarmerData({ ...farmerData, cropsSown: payload.cropsSown }); // last added

    } catch (error) {
      console.log("farmer-detail-err", error);
    }
  };

  useEffect(() => {
    getFarmerDetails();
  }, []);

  useEffect(() => {
    if (farmerData) {
      let parsedCropsSown;

      if (typeof farmerData.cropsSown === "string") {
        try {
          parsedCropsSown = JSON.parse(farmerData.cropsSown);
        } catch (error) {
          console.error("error parsing cropsown", error);
          parsedCropsSown = {};
        }
      } else {
        parsedCropsSown = farmerData.cropsSown || {};
      }

      const transformedCropSown = [];

      ["kharif", "rabi"].forEach((season) => {
        Object.keys(parsedCropsSown[season] || {}).forEach((category) => {
          (parsedCropsSown[season][category] || {}).forEach((crop) => {
            transformedCropSown.push({
              season,
              category,
              crop: crop.crop || "",
              land: crop.cropLand || "",
            });
          });
        });
      });

      const defaultCropSown =
        transformedCropSown.length > 0
          ? transformedCropSown
          : [{ season: "", category: "", crop: "", land: "" }];

      setCropSown(defaultCropSown);

      setLoginValue({
        name: farmerData.name,
        mobileNumber: farmerData.mobileNumber,
        emailID: farmerData.emailID,
        villageName: farmerData.villageName,
        cluster: farmerData.clusterName,
        taluka: farmerData.taluka,
        district: farmerData.district,
        cultivatedLand: farmerData.cultivatedLand, //value of total land
        typeOfLand: farmerData.typeOfLand,
        cropsSown: parsedCropsSown,
        desiBreeds: farmerData.desiBreeds?.toString(),
        irrigationSource: farmerData.irrigationSource,
        soilConservationMeasures: farmerData.soilConservationMeasures,
        microIrrigation: farmerData.microIrrigation,
      });
    }
  }, [farmerData]);

  if (farmerData.length < 1) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size={50} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title="FARMER DETAIL" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.formContainer}>
            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={loginValue.name}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, name: text })
                }
              />
              {errors.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}
            </View>
            <View>
              <Text style={styles.label}>Mobile No.</Text>
              <TextInput
                style={styles.input}
                value={loginValue.mobileNumber}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, mobileNumber: text })
                }
              />
              {errors.mobileNumber && (
                <Text style={{ color: "red" }}>{errors.mobileNumber}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>Email id</Text>
              <TextInput
                style={styles.input2}
                value={loginValue.emailID}
                onChangeText={(text) =>
                  setLoginValue({ ...loginValue, emailID: text })
                }
              />
              {errors.emailID && (
                <Text style={{ color: "red" }}>{errors.emailID}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>
                Total Land <Text style={{ fontSize: 12 }}>(in ac.)</Text>{" "}
              </Text>
              <TextInput
                style={styles.input}
                value={loginValue.cultivatedLand}
                onChangeText={(text) =>
                  setLoginValue({
                    ...loginValue,
                    cultivatedLand: text,
                  })
                }
                keyboardType="numeric"
              />
              {errors.cultivatedLand && (
                <Text style={{ color: "red" }}>{errors.cultivatedLand}</Text>
              )}
            </View>

            <View>
              <Text style={styles.label}>
                No. of Desi Breed{" "}
                <Text style={{ fontSize: 12 }}>(cow/bullock)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={loginValue.desiBreeds}
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
              <Text style={styles.label}> Village</Text>
              <Dropdown
                data={villageItems}
                labelField={"label"}
                valueField={"value"}
                value={loginValue.villageName}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, villageName: item.value })
                }
                maxHeight={300}
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
                maxHeight={300}
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
              <Text style={styles.label}>Cluster</Text>
              <Dropdown
                data={clusterItems}
                labelField="label"
                valueField="value"
                value={loginValue.cluster}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, cluster: item.value })
                }
                maxHeight={300}
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
              {/* {errors.taluka && (
                <Text style={{ color: "red" }}>{errors.taluka}</Text>
              )} */}
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
                maxHeight={300}
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
              <Text style={styles.label}>Land type</Text>
              <Dropdown
                data={landItems}
                labelField="label"
                valueField="value"
                value={loginValue.typeOfLand}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, typeOfLand: item.value })
                }
                maxHeight={300}
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
                maxHeight={300}
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
              <Text style={styles.label}> Irrigation Source</Text>
              <Dropdown
                data={sourceIrrigationItems}
                labelField="label"
                valueField="value"
                value={loginValue.irrigationSource}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, irrigationSource: item.value })
                }
                maxHeight={300}
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
              <Text style={styles.label}>Micro Irrigation</Text>
              <Dropdown
                data={microIrrigationItems}
                labelField="label"
                valueField="value"
                value={loginValue.microIrrigation}
                onChange={(item) =>
                  setLoginValue({ ...loginValue, microIrrigation: item.value })
                }
                maxHeight={300}
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
                <View style={styles.cropEntry}>
                  <Text>Crop {index + 1}</Text>
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
                    maxHeight={300}
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
                    maxHeight={300}
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
                    maxHeight={300}
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

            {/* //ending crops sown fields */}

            <View style={styles.btnContainer}>
              <TouchableOpacity style={submitBtn} onPress={handleCropSelection} disabled={loading}>
                <Text style={styles.inpText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
       {loading && (
              <View style={styles.loaderOverlay}>
                <ActivityIndicator size={50} color={"#ffffff"} />
                <Text style={[styles.label, { fontSize: 14, color:"#fff" }]}>processing...</Text>
              </View>
            )}
    </SafeAreaView>
  );
};

export default FarmerDetail;

const styles = StyleSheet.create({
  // scrollContainer: {
  //   paddingBottom: 30,
  // },
  formContainer: {
    marginBottom: 30,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 20,
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
    alignSelf: "flex-end",
    // borderBottomWidth: 1,
    margin: 2,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
});