import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import { addCultivationCostDetails, addProductionDetails } from "../../../services/ApiFile";

const DetailOfProduction = ({ route }) => {
  const farmerId = route.params.farmerId;
  const [data, setData] = useState(null);

  const costFields = ["totalYield", "totalSaleValue", "surplus"];

  const getCostDetails = async () => {
    try {
      const response = await addCultivationCostDetails(farmerId);
      const updatedData = { ...response };

      // Initialize costs for each crop
      Object.entries(updatedData.crops).forEach(([season, categories]) => {
        Object.entries(categories).forEach(([category, crops]) => {
          updatedData.crops[season][category] = crops.map((crop) => ({
            cropName: crop,
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
            totalYield: crop.costs["totalYield"] || 0,
            totalSaleValue: crop.costs["totalSaleValue"] || 0,
            surplus: crop.costs["surplus"] || 0,
            totalCost : crop.totalCost  
          })),
        }))
      ),
    };

    try {
      // Log submission data to check correctness
      console.log("Submission Data:", JSON.stringify(submissionData, null, 2));

      // Uncomment this to make the actual API request
      const response = await addProductionDetails(farmerId, submissionData);
      console.log("addProCostPost-resp", response);
      console.log("addProCostPost-resp", response.message);
      Alert.alert(response.message);

    } catch (error) {
      console.warn("addProCostPost-err", error.response);
    }
  };

  useEffect(() => {
    getCostDetails();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>; // Loading state
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

          {/* Loop through seasons (rabi, kharif) */}
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
                          <Text style={styles.label}>{costField.toUpperCase()}</Text>
                          <TextInput
                            style={styles.input}
                            value={crop.costs[costField]?.toString()} // Ensure value is a string
                            keyboardType="numeric"
                            // placeholder="rs"
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
                        Total Cost: {crop.totalCost}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}

          {/* Submit Button */}
          <View style={styles.btnContainer}>
            <TouchableOpacity style={submitBtn} onPress={handleSubmit}>
              <Text style={styles.inpText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
});
