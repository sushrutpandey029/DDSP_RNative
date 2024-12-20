import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import {
  addCultivationCostDetails,
  addProductionDetails,
} from "../../../services/ApiFile";

const DetailOfProduction = ({ route, navigation }) => {
  const farmerId = route.params.farmerId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const costFields = ["totalYield", "totalSaleValue", "surplus"];

  const getCostDetails = async () => {
    try {
      const response = await addCultivationCostDetails(farmerId);
      console.log("prod-getcostDetails", response);

      // Parse the crops data which is in stringified JSON format
      // const cropsData = JSON.parse(response.crops);
      const cropsData = response.crops;

      const updatedData = { ...response, crops: cropsData };

      // Initialize costs for each crop
      Object.entries(updatedData.crops).forEach(([season, categories]) => {
        Object.entries(categories).forEach(([category, crops]) => {
          updatedData.crops[season][category] = crops.map((crop) => ({
            cropName: crop.crop, // Use the crop name from the response
            cropLand: crop.cropLand, // Include the cropLand if needed
            costs: costFields.reduce((acc, field) => {
              acc[field] = "0"; // Initialize each cost field with "0"
              return acc;
            }, {}),
            totalCost: 0, // Initialize total cost
          }));
        });
      });

      setData(updatedData);
      console.log("addcostcul-resp-updtd", updatedData);
    } catch (error) {
      console.warn("addcostcul-err", error);
    }
  };

  const handleCostChange = (season, category, cropIndex, costType, value) => {
    const updatedData = { ...data };
    const crop = updatedData.crops[season][category][cropIndex];
    crop.costs[costType.trim()] = parseFloat(value) || 0;

    // Recalculate total cost for the crop
    crop.totalCost = Object.values(crop.costs).reduce(
      (total, cost) => total + (parseFloat(cost) || 0),
      0
    );

    setData(updatedData);
  };

  const handleSubmit = async () => {
    const submissionData = {
      farmerID: data.farmerID,
      cropName: Object.entries(data.crops).flatMap(([season, categories]) =>
        Object.entries(categories).map(([irrigationType, crops]) => ({
          season,
          irrigationType,
          crops: crops.map((crop) => ({
            name: crop.cropName,
            totalYield: crop.costs["totalYield"] || 0, // Access totalYield or default to 0
            totalSaleValue: crop.costs["totalSaleValue"] || 0, // Access totalSaleValue or default to 0
            surplus: crop.costs["surplus"] || 0, // Access surplus or default to 0
            totalCost: crop.totalCost, // Total cost remains unchanged
          })),
        }))
      ),
    };

    try {
      setLoading(true);

      // Log submission data to check correctness
      console.log("Submission Data:", JSON.stringify(submissionData, null, 2));

      // Uncomment this to make the actual API request
      const response = await addProductionDetails(farmerId, submissionData);
      console.log("addProCostPost-resp", response);
      console.log("addProCostPost-resp", response.message);
      setLoading(false);
      Alert.alert("Success Message", `${response.message}.`, [
        {
          text: "Ok",
          onPress: navigation.navigate("Home"),
          style: "default",
        },
      ]);
    } catch (error) {
      console.Log("addProCostPost-err", error.response);
      Alert.alert("error adding production ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCostDetails();
  }, []);

  if (!data) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size={50} style={styles.activity} />
      </SafeAreaView>
    ); // Loading state
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"DETAIL OF PRODUCTION"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>Farmer id </Text>
            <TextInput
              style={styles.input}
              value={data.farmerID}
              editable={false}
            />
          </View>

          {/* {Object.entries(data.crops).map(([season, categories]) => (
            <View key={season} style={styles.seasonContainer}>
              <Text style={styles.seasonTitle}>{season.toUpperCase()}</Text>

              {Object.entries(categories).map(([category, crops]) => (
                <View key={category} style={styles.categoryContainer}>
                  <Text style={styles.categoryTitle}>
                    {category.replace("_", " ").toUpperCase()}
                  </Text>

                  {crops.map((crop, cropIndex) => (
                    <View key={cropIndex} style={styles.cropContainer}>
                      <Text style={styles.cropTitle}>{crop.cropName}</Text>

                      {costFields.map((costField, index) => (
                        <View key={index}>
                          <Text style={styles.label}>
                            {costField.toUpperCase()}
                          </Text>
                          <TextInput
                            style={styles.input}
                            value={crop.costs[costField]?.toString()}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                              handleCostChange(
                                season,
                                category,
                                cropIndex,
                                costField,
                                value
                              )
                            }
                          />
                        </View>
                      ))}

                      <Text style={styles.totalCost}>
                        Total Cost: {crop.totalCost}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))} */}

          {Object.entries(data.crops).map(([season, categories]) => (
            <View key={season} style={styles.seasonContainer}>
              <Text style={styles.seasonTitle}>{season.toUpperCase()}</Text>
              {/* Loop through crop categories */}
              {Object.entries(categories).map(([category, crops]) => (
                <View key={category} style={styles.categoryContainer}>
                  <Text style={styles.categoryTitle}>
                    {category.replace("_", " ").toUpperCase()}
                  </Text>
                  {/* Loop through crops */}
                  {crops.map((crop, cropIndex) => (
                    <View key={cropIndex} style={styles.cropContainer}>
                      <Text style={styles.cropTitle}>{crop.cropName}</Text>
                      {/* Render cost fields */}
                      {costFields.map((costField, index) => (
                        <View key={index}>
                          <Text style={styles.label}>
                            {costField
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .toUpperCase()}{" "}
                            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                              (Rs.)
                            </Text>
                          </Text>
                          <TextInput
                            style={styles.input}
                            value={crop.costs[costField]?.toString() || "0"} // Ensure value is a string, default to "0"
                            keyboardType="numeric"
                            onChangeText={(value) =>
                              handleCostChange(
                                season,
                                category,
                                cropIndex,
                                costField,
                                value
                              )
                            }
                          />
                        </View>
                      ))}
                      {/* Display total cost */}
                      <Text style={styles.totalCost}>
                        Total Cost: Rs. {crop.totalCost || 0}{" "}
                        {/* Display Rs. for total cost */}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}

          {/* Submit Button */}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={submitBtn}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.inpText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size={50} color={"#ffffff"} />
            <Text style={[styles.inpText, { fontSize: 14 }]}>processing...</Text>
          </View>
        )}
    </SafeAreaView>
  );
};

export default DetailOfProduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
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
  btnContainer: {
    alignItems: "center",
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
  seasonContainer: {
    marginVertical: 20,
  },
  seasonTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cropContainer: {
    marginBottom: 16,
  },
  cropTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    marginBottom: 8,
  },
  totalCost: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
  },
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
});
