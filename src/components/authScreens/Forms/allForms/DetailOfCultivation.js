import React, { useEffect, useState } from "react";
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
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import {
  addCultivationCostDetails,
  addCultivationCostDetailsPost,
} from "../../../services/ApiFile";

const DetailOfCultivation = ({ route, navigation }) => {
  const farmerId = route.params.farmerId || null;
  const [data, setData] = useState(null);

  const costFields = [
    "seedCost",
    "landCost",
    "fertilizerCost",
    "pesticideCost",
    "harvestCost",
    "laborCost",
    "miscCost",
  ];

  // const getCostDetails = async () => {
  //   try {
  //     const response = await addCultivationCostDetails(farmerId);
  //     const updatedData = { ...response };

  //     // Initialize costs for each crop
  //     Object.entries(updatedData.crops).forEach(([season, categories]) => {
  //       Object.entries(categories).forEach(([category, crops]) => {
  //         updatedData.crops[season][category] = crops.map((crop) => ({
  //           cropName: crop,
  //           costs: costFields.reduce((acc, field) => {
  //             acc[field] = ""; // Initialize each cost field with an empty string
  //             return acc;
  //           }, {}),
  //         }));
  //       });
  //     });

  //     setData(updatedData);
  //     console.log("addcostcul-resp", updatedData);
  //   } catch (error) {
  //     console.warn("addcostcul-err", error);
  //   }
  // };

  const getCostDetails = async () => {
    try {
      const response = await addCultivationCostDetails(farmerId);

      // Parse the crops JSON string into an object
      // const parsedCrops = JSON.parse(response.crops);
      const parsedCrops = response.crops;

      // Initialize costs for each crop
      const updatedCrops = {};
      Object.entries(parsedCrops).forEach(([season, categories]) => {
        updatedCrops[season] = {};
        Object.entries(categories).forEach(([category, crops]) => {
          updatedCrops[season][category] = crops.map((crop) => ({
            ...crop, // Keep the existing crop properties
            costs: costFields.reduce((acc, field) => {
              acc[field] = ""; // Initialize each cost field with an empty string
              return acc;
            }, {}),
          }));
        });
      });

      // Update the state with the modified data
      const updatedData = {
        ...response,
        crops: updatedCrops,
      };

      setData(updatedData);
      console.log("addcostcul-resp", updatedData);
    } catch (error) {
      console.warn("addcostcul-err", error);
    }
  };

  // const handleCostChange = (season, category, cropIndex, costType, value) => {
  //   const updatedData = { ...data };
  //   const crop = updatedData.crops[season][category][cropIndex];
  //   crop.costs[costType] = parseFloat(value) || 0 ;

  //   // Recalculate total cost
  //   crop.totalCost = Object.values(crop.costs).reduce(
  //     (total, cost) => total + (parseFloat(cost) || 0),
  //     0
  //   );

  //   setData(updatedData);
  // };

  const handleCostChange = (season, category, cropIndex, costType, value) => {
    // Deep clone the data to avoid mutating the state directly
    const updatedData = JSON.parse(JSON.stringify(data));

    // Update the cost for the specified crop
    const crop = updatedData.crops[season][category][cropIndex];
    crop.costs[costType] = parseFloat(value) || 0;

    // Recalculate total cost
    crop.totalCost = Object.values(crop.costs).reduce(
      (total, cost) => total + (parseFloat(cost) || 0),
      0
    );

    // Update the state
    setData(updatedData);
  };

  // const handleSubmit =async () => {
  //   // Construct data in the required format for submission
  //   const submissionData = {
  //     farmerID: data.farmerID,
  //     crops: Object.entries(data.crops).reduce((acc, [season, categories]) => {
  //       acc[season] = Object.entries(categories).reduce((categoryAcc, [category, crops]) => {
  //         categoryAcc[category] = crops.map((crop) => ({
  //           cropName: crop.cropName,
  //           costs: crop.costs, // Pass the costs object directly
  //           season,
  //           category
  //         }));
  //         return categoryAcc;
  //       }, {});
  //       return acc;
  //     }, {}),
  //   };

  //   try{
  //     const response = await addCultivationCostDetailsPost(farmerId, submissionData);
  //     console.warn('addCulCostPost-resp',response)
  //     if(response.success == true){
  //       Alert.alert(response.message);
  //     }
  //   }catch(error){
  //     console.warn('addCulCostPost-err',error)
  //   }

  //   console.log("Submission Data:", JSON.stringify(submissionData, null, 2));
  //   // Call the API to send the data to the server
  //   // addCultivationCostDetails(submissionData);
  // };

  const handleSubmit = async () => {
    // Construct data in the required format for submission
    const submissionData = {
      farmerID: data.farmerID,
      crops: Object.entries(data.crops).reduce((acc, [season, categories]) => {
        acc[season] = Object.entries(categories).reduce(
          (categoryAcc, [category, crops]) => {
            categoryAcc[category] = crops.map((crop) => ({
              crop: crop.crop, // Crop name
              cropLand: crop.cropLand, // Keep the land details if required
              costs: crop.costs, // Pass the costs object
              totalCost: crop.totalCost || 0, // Include total cost
              season, // Season name
              category, // Category name
            }));
            return categoryAcc;
          },
          {}
        );
        return acc;
      }, {}),
    };

    try {
      // Make API call with the constructed submission data
      const response = await addCultivationCostDetailsPost(
        farmerId,
        submissionData
      );

      console.log("addCulCostPost-resp", response);
      if (response.success === true) {
        Alert.alert(response.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.warn("addCulCostPost-err", error);
    }

    console.log("Submission Data:", JSON.stringify(submissionData, null, 2));
  };

  useEffect(() => {
    getCostDetails();
  }, []);

  if (!data) {
    return <ActivityIndicator size={70} style={styles.activity} />; // Loading state
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"DETAIL OF CULTIVATION"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Display Farmer ID */}
          <View>
            <Text style={styles.label}>Farmer ID</Text>
            <TextInput
              style={styles.input}
              value={data.farmerID}
              editable={false} // Read-only
            />
          </View>

          {/* Loop through seasons (rabi, kharif) */}
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
                      <Text style={styles.cropTitle}>{crop.crop}</Text>
                      {/* Render cost fields */}
                      {costFields.map((costField, index) => (
                        <View key={index}>
                          <Text style={styles.label}>
                            {" "}
                            {costField
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .replace(/^./, (str) => str.toUpperCase())} <Text style={{fontSize: 12, fontWeight:'bold'}}>(Rs.)</Text>
                          </Text>
                          <TextInput
                            style={styles.input}
                            // placeholder={`Enter ${costField}`}
                            // placeholder="Rs."
                            value={String(crop.costs[costField])} // Ensure value is a string
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
                        Total Cost: {crop.totalCost || 0}
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

export default DetailOfCultivation;

const styles = StyleSheet.create({
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
    marginBottom: 8,
  },
  seasonContainer: {
    marginVertical: 20,
  },
  seasonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cropContainer: {
    marginBottom: 16,
  },
  cropTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  totalCost: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
  activity: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

// {Object.entries(data.crops).map(([season, categories]) => (
//   <View key={season} style={styles.seasonContainer}>
//     <Text style={styles.seasonTitle}>{season.toUpperCase()}</Text>
//     {/* Loop through crop categories */}
//     {Object.entries(categories).map(([category, crops]) => (
//       <View key={category} style={styles.categoryContainer}>
//         <Text style={styles.categoryTitle}>
//           {category.replace("_", " ").toUpperCase()}
//         </Text>
//         {/* Loop through crops */}
//         {crops.map((crop, cropIndex) => (
//           <View key={cropIndex} style={styles.cropContainer}>
//             <Text style={styles.cropTitle}>{crop.cropName}</Text>
//             {/* Render cost fields */}
//             {costFields.map((costField, index) => (
//               <View key={index}>
//                 <Text style={styles.label}>{costField}</Text>
//                 <TextInput
//                   style={styles.input}
//                   // placeholder={`Enter ${costField}`}
//                   value={crop.costs[costField]}
//                   keyboardType="numeric"
//                   onChangeText={(value) =>
//                     handleCostChange(
//                       season,
//                       category,
//                       cropIndex,
//                       costField,
//                       value
//                     )
//                   }
//                 />
//               </View>
//             ))}
//             {/* Display total cost */}
//             <Text style={styles.totalCost}>
//               Total Cost: {crop.totalCost}
//             </Text>
//           </View>
//         ))}
//       </View>
//     ))}
//   </View>
// ))}
