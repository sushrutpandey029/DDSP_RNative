import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FormHeader from "../../Forms/FormHeader";
import { globalContainer, semibold } from "../../../../globals/style";
import {
  updateProductionDetails,
  updateCultivationDetails,
} from "../../../services/ApiFile";
import { useNavigation } from "@react-navigation/native";

const CultivationForm = ({ crop, id, farmerID }) => {
  const navigation = useNavigation();
  console.log("farmerID-crpdtlupd", farmerID);
  const [totalCost, setTotalCost] = useState(crop.totalCost);
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState({
    farmerID: farmerID,
    crops: {
      crop: crop.crop,
      cropLand: crop.cropLand,
      costs: {
        seedCost: crop.costs.seedCost,
        landCost: crop.costs.landCost,
        fertilizerCost: crop.costs.fertilizerCost,
        pesticideCost: crop.costs.pesticideCost,
        harvestCost: crop.costs.harvestCost,
        laborCost: crop.costs.laborCost,
        miscCost: crop.costs.miscCost,
      },
      totalCost: totalCost,
      season: crop.season,
      category: crop.category,
    },
    totalCost: totalCost,
  });

  const updatePayload = (key, value) => {
    const numericValue = parseFloat(value) || 0;
    let newTotalCost;

    setPayload((prevPayload) => {
      const updatedCosts = {
        ...prevPayload.crops.costs,
        [key]: numericValue,
      };

      newTotalCost = Object.values(updatedCosts).reduce(
        (sum, cost) => sum + cost,
        0
      );
      console.log("newTotalCost", newTotalCost);

      return {
        ...prevPayload,
        crops: {
          ...prevPayload.crops,
          costs: updatedCosts,
          totalCost: newTotalCost,
        },
        totalCost: newTotalCost,
      };
    });
    console.log("newTotalCost", newTotalCost);

    setTotalCost(newTotalCost);
  };

  console.log("payload", JSON.stringify(payload, null, 2));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await updateCultivationDetails(id, payload);
      console.log("cultivation-resp", JSON.stringify(response, null, 2));
      if (response.success === true) {
        setLoading(false);
        Alert.alert("Success Message", response.message, [
          {
            text: "Ok",
            // onPress: () => {navigation.navigate("HomeStack")}
            onPress: () => {
              navigation.navigate("CropDetail", { fId: farmerID });
            },
          },
        ]);
      }
    } catch (err) {
      console.log("cultivation-err", err.response.data.message);
      Alert.alert(
        "Failed Message",
        `${err.response.data.message}.` || "failed to update information."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: "60%" }}>
          <View>
            <Text style={semibold}>Season : {payload.crops.season}</Text>
            <Text style={semibold}>category : {payload.crops.category}</Text>
            <Text style={semibold}>crop : {payload.crops.crop}</Text>
            <Text style={semibold}>
              Cultivated Land : {payload.crops.cropLand}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Seed Cost</Text>
            <TextInput
              // value={crop.costs.seedCost.toString()}
              value={payload.crops.costs.seedCost?.toString()}
              onChangeText={(value) => updatePayload("seedCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Land Preparation Cost</Text>
            <TextInput
              value={payload.crops.costs.landCost?.toString()}
              onChangeText={(value) => updatePayload("landCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Fertilizer Cost</Text>
            <TextInput
              value={payload.crops.costs.fertilizerCost?.toString()}
              onChangeText={(value) => updatePayload("fertilizerCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Pesticide Cost</Text>
            <TextInput
              value={payload.crops.costs.pesticideCost?.toString()}
              onChangeText={(value) => updatePayload("pesticideCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Harvest Cost</Text>
            <TextInput
              value={payload.crops.costs.harvestCost?.toString()}
              onChangeText={(value) => updatePayload("harvestCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Labor Cost</Text>
            <TextInput
              value={payload.crops.costs.laborCost?.toString()}
              onChangeText={(value) => updatePayload("laborCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Misc Cost</Text>
            <TextInput
              value={payload.crops.costs.miscCost?.toString()}
              onChangeText={(value) => updatePayload("miscCost", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={[styles.label,{color:"green"}]}>Total Cost : {totalCost}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={handleSubmit} style={styles.updateBtn}>
              <Text style={styles.updateBtnText}>Update</Text>
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
    </View>
  );
};

const ProductionForm = ({ crop, id, farmerID }) => {
  console.log("id", id);
  console.log("farmerid", farmerID);
  console.log("crop", crop);

  const navigation = useNavigation();

  const [totalCost, setTotalCost] = useState(crop.totalCost);
  const [saleValuePerQuintal, setSaleValuePerQuintal] = useState(
    crop.saleValuePerQuintal
  );

  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState({
    farmerID: farmerID,
    cropName: {
      season: crop.season,
      irrigationType: crop.irrigationType,
      name: crop.name,
      totalYield: crop.totalYield || 0,
      surplus: crop.surplus || 0,
      totalSaleValue: crop.totalSaleValue || 0,
      totalCost: totalCost || 0,
      saleValuePerQuintal: saleValuePerQuintal,
    },
  });

  const updatePayload = (key, value) => {
    const numericValue = parseFloat(value) || 0;

    setPayload((prevPayload) => {
      const updatedCropName = {
        ...prevPayload.cropName,
        [key]: numericValue,
      };

      const newTotalCost = [
        updatedCropName.totalYield || 0,
        updatedCropName.surplus || 0,
        updatedCropName.totalSaleValue || 0,
      ].reduce((sum, val) => sum + val, 0);

      const newSaleValuePerQuintal = (
        (updatedCropName.totalSaleValue || 0) /
        (updatedCropName.totalYield || 1)
      ).toFixed(2);

      setTotalCost(newTotalCost);
      setSaleValuePerQuintal(newSaleValuePerQuintal);

      // Update payload with new calculations
      return {
        ...prevPayload,
        cropName: {
          ...updatedCropName,
          totalCost: newTotalCost,
          saleValuePerQuintal: newSaleValuePerQuintal,
        },
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("updateProduction-payload", payload);
      const response = await updateProductionDetails(id, payload);
      if (response.success === true) {
        console.log("updateProduction-resp", response);
        setLoading(false);
        Alert.alert(
          "Success Message",
          response.message || "data updated successfully.",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("CropDetail", { fId: farmerID });
              },
              style: "default",
            },
          ]
        );
      }
    } catch (err) {
      console.log("updateProduction-err", err.response.data.message);

      Alert.alert(
        "Failed Message",
        err.response?.data?.message || "failed to update information."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={{ marginBottom: "60%" }}>
          <View>
            <Text style={semibold}>Season : {crop.season}</Text>
            <Text style={semibold}>Category : {crop.irrigationType}</Text>
            <Text style={semibold}>Crop : {crop.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Surplus</Text>
            <TextInput
              value={payload.cropName.surplus?.toString()}
              onChangeText={(value) => updatePayload("surplus", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Total Yield</Text>
            <TextInput
              value={payload.cropName.totalYield?.toString()}
              onChangeText={(value) => updatePayload("totalYield", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Total Sale Value</Text>
            <TextInput
              value={payload.cropName.totalSaleValue?.toString()}
              onChangeText={(value) => updatePayload("totalSaleValue", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={[styles.label,{color:"green"}]}>
              Total Sale Value Per Quintal :{saleValuePerQuintal}
            </Text>
          </View>

          <View>
            <Text style={[styles.label,{color:"green"}]}>Total Cost : {totalCost}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={handleSubmit} style={styles.updateBtn}>
              <Text style={styles.updateBtnText}>Update</Text>
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
    </View>
  );
};

const CropDetailUpdate = (props) => {
  const crop = props.route.params.crop;
  const type = props.route.params.type;
  const id = props.route.params.id;
  const farmerID = props.route.params.farmerID;
  console.log("type-up", type);
  console.log("crop-up", crop);
  console.log("id-up", id);
  console.log("farmerID", farmerID);

  return (
    <View style={globalContainer}>
      <FormHeader title="Crop Detail Update" />
      {type === "cultivationCosts" && (
        <CultivationForm crop={crop} id={id} farmerID={farmerID} />
      )}
      {type === "productionDetails" && (
        <ProductionForm crop={crop} id={id} farmerID={farmerID} />
      )}
    </View>
  );
};

export default CropDetailUpdate;

const styles = StyleSheet.create({
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
  updateBtn: {
    height: 49,
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  updateBtnText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#fff",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  inpText: {
    color: "#fff",
    fontSize: 18,
  },
});
