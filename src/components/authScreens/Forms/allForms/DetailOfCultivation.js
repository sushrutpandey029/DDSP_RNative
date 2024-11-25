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
} from "react-native";
import { submitBtn } from "../../../../globals/style";
import FormHeader from "../FormHeader";
import { globalContainer } from "../../../../globals/style";
import { addCultivationCostDetails, addCultivationCostDetailsPost } from "../../../services/ApiFile";

const DetailOfCultivation = ({ route }) => {
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
              acc[field] = ""; // Initialize each cost field with an empty string
              return acc;
            }, {}),
          }));
        });
      });

      setData(updatedData);
      console.log("addcostcul-resp", updatedData);
    } catch (error) {
      console.warn("addcostcul-err", error);
    }
  };

  const handleCostChange = (season, category, cropIndex, costType, value) => {
    const updatedData = { ...data };
    const crop = updatedData.crops[season][category][cropIndex];
    crop.costs[costType] = parseFloat(value) || 0 ;

    // Recalculate total cost
    crop.totalCost = Object.values(crop.costs).reduce(
      (total, cost) => total + (parseFloat(cost) || 0),
      0
    );

    setData(updatedData);
  };

  const handleSubmit =async () => {
    // Construct data in the required format for submission
    const submissionData = {
      farmerID: data.farmerID,
      crops: Object.entries(data.crops).reduce((acc, [season, categories]) => {
        acc[season] = Object.entries(categories).reduce((categoryAcc, [category, crops]) => {
          categoryAcc[category] = crops.map((crop) => ({
            cropName: crop.cropName,
            costs: crop.costs, // Pass the costs object directly
          }));
          return categoryAcc;
        }, {});
        return acc;
      }, {}),
    };

    try{
      const response = await addCultivationCostDetailsPost(farmerId, submissionData);
      console.warn('addCulCostPost-resp',response)
      if(response.success == true){
        Alert.alert(response.message);
      }
    }catch(error){
      console.warn('addCulCostPost-err',error)
    }

    console.log("Submission Data:", JSON.stringify(submissionData, null, 2));
    // Call the API to send the data to the server
    // addCultivationCostDetails(submissionData); 
  };

  useEffect(() => {
    getCostDetails();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>; // Loading state
  }

  return (
    <SafeAreaView style={globalContainer}>
      <FormHeader title={"DETAIL OF CULTIVATION"} />
      <ScrollView>
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
                          <Text style={styles.label}>{costField}</Text>
                          <TextInput
                            style={styles.input}
                            // placeholder={`Enter ${costField}`}
                            value={crop.costs[costField]}
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
});





// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { submitBtn } from "../../../../globals/style";
// import FormHeader from "../FormHeader";
// import { globalContainer } from "../../../../globals/style";
// import { addCultivationCostDetails } from "../../../services/ApiFile";

// const DetailOfCultivation = ({ route }) => {
//   const farmerId = route.params.farmerId;
//   const [data, setData] = useState(null);

//   const costFields = [
//     "Seeds And Seed Processing",
//     "Land Preparation",
//     "Fertilizers",
//     "Pesticides",
//     "Harvesting",
//     "Other Labour Cost and Misc. Costs",
//   ];

//   const getCostDetails = async () => {
//     try {
//       const response = await addCultivationCostDetails(farmerId);
//       const updatedData = { ...response };

//       // Initialize costs for each crop
//       Object.entries(updatedData.crops).forEach(([season, categories]) => {
//         Object.entries(categories).forEach(([category, crops]) => {
//           updatedData.crops[season][category] = crops.map((crop) => ({
//             cropName: crop,
//             costs: costFields.reduce((acc, field) => {
//               acc[field] = "";
//               return acc;
//             }, {}),
//             totalCost: 0,
//           }));
//         });
//       });

//       setData(updatedData);
//       console.log("addcostcul-resp", updatedData);
//     } catch (error) {
//       console.warn("addcostcul-err", error);
//     }
//   };

//   const handleCostChange = (season, category, cropIndex, costType, value) => {
//     const updatedData = { ...data };
//     const crop = updatedData.crops[season][category][cropIndex];
//     crop.costs[costType] = value;

//     // Recalculate total cost
//     crop.totalCost = Object.values(crop.costs).reduce(
//       (total, cost) => total + (parseFloat(cost) || 0),
//       0
//     );

//     setData(updatedData);
//   };

//   useEffect(() => {
//     getCostDetails();
//   }, []);

//   if (!data) {
//     return <Text>Loading...</Text>; // Loading state
//   }

//   return (
//     <SafeAreaView style={globalContainer}>
//       <FormHeader title={"DETAIL OF CULTIVATION"} />
//       <ScrollView>
//         <View style={styles.formContainer}>
//           {/* Display Farmer ID */}
//           <View>
//             <Text style={styles.label}>Farmer ID</Text>
//             <TextInput
//               style={styles.input}
//               value={data.farmerID}
//               editable={false} // Read-only
//             />
//           </View>

//           {/* Loop through seasons (rabi, kharif) */}
//           {Object.entries(data.crops).map(([season, categories]) => (
//             <View key={season} style={styles.seasonContainer}>
//               <Text style={styles.seasonTitle}>{season.toUpperCase()}</Text>
//               {/* Loop through crop categories */}
//               {Object.entries(categories).map(([category, crops]) => (
//                 <View key={category} style={styles.categoryContainer}>
//                   <Text style={styles.categoryTitle}>
//                     {category.replace("_", " ").toUpperCase()}
//                   </Text>
//                   {/* Loop through crops */}
//                   {crops.map((crop, cropIndex) => (
//                     <View key={cropIndex} style={styles.cropContainer}>
//                       <Text style={styles.cropTitle}>{crop.cropName}</Text>
//                       {/* Render cost fields */}
//                       {costFields.map((costField, index) => (
//                         <View key={index}>
//                           <Text style={styles.label}>{costField}</Text>
//                           <TextInput
//                             style={styles.input}
//                             placeholder={`Enter ${costField}`}
//                             value={crop.costs[costField]}
//                             keyboardType="numeric"
//                             onChangeText={(value) =>
//                               handleCostChange(
//                                 season,
//                                 category,
//                                 cropIndex,
//                                 costField,
//                                 value
//                               )
//                             }
//                           />
//                         </View>
//                       ))}
//                       {/* Display total cost */}
//                       <Text style={styles.totalCost}>
//                         Total Cost: {crop.totalCost}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           ))}

//           {/* Submit Button */}
//           <View style={styles.btnContainer}>
//             <TouchableOpacity
//               style={submitBtn}
//               onPress={() => console.log("Final Data:", data)}
//             >
//               <Text style={styles.inpText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DetailOfCultivation;

// const styles = StyleSheet.create({
//   formContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 16,
//     marginTop: 9,
//   },
//   input: {
//     height: 49,
//     borderWidth: 1,
//     borderColor: "#CBD5E1",
//     borderRadius: 15,
//     fontSize: 18,
//     fontFamily: "Poppins-Regular",
//     backgroundColor: "#F8FAFC",
//     paddingHorizontal: 15,
//     marginBottom: 8,
//   },
//   seasonContainer: {
//     marginVertical: 20,
//   },
//   seasonTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   categoryContainer: {
//     marginBottom: 16,
//   },
//   categoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   cropContainer: {
//     marginBottom: 16,
//   },
//   cropTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   totalCost: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     marginTop: 10,
//   },
//   btnContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   inpText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });


