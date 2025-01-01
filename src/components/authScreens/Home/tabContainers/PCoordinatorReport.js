import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import { getCoordinatorDetailsByID } from "../../../services/ApiFile";
import { globalContainer } from "../../../../globals/style";

const PCoordinatorReport = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCoordinatoreDetailsById = async () => {
    try {
      setLoading(true);
      const response = await getCoordinatorDetailsByID(user.id);
      if (response?.success) {
        setApiData(response.data);
      }
    } catch (err) {
      console.error("Error fetching coordinator details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await fetchCoordinatoreDetailsById();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCoordinatoreDetailsById();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderEmptyState = (message) => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>{message}</Text>
    </View>
  );

  const renderSubItem = ({ title, data, renderItem, keyExtractor }) => (
    <>
      <Text style={styles.subHeader}>{title}</Text>
      {data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          nestedScrollEnabled
        />
      ) : (
        renderEmptyState(`No ${title} available.`)
      )}
    </>
  );

  const renderCoordinator = ({ item }) => (
    <View style={styles.itemContainer}>
      {renderSubItem({
        title: "Training Programmes",
        data: item.trainingProgrammes,
        renderItem: ({ item }) => (
          <View style={styles.subItemContainer}>
            <Text style={styles.label}>Date: {item.date}</Text>
            <Text style={styles.label}>Name: {item.name}</Text>
            <Text style={styles.label}>Village: {item.villageName}</Text>
            <Text style={styles.label}>Participants: {item.participants}</Text>
          </View>
        ),
        keyExtractor: (training, index) => `${item.id}-training-${index}`,
      })}

      {renderSubItem({
        title: "Review Meetings",
        data: item.reviewMeetings,
        renderItem: ({ item }) => (
          <View style={styles.subItemContainer}>
            <Text style={styles.label}>Date: {item.date}</Text>
            <Text style={styles.label}>
              Field Officers: {item.fieldOfficer.join(", ")}
            </Text>
            <Text style={styles.label}>
              Assistant Coordinators: {item.asstProjectCoordinator.join(", ")}
            </Text>
            <Text style={styles.label}>Participants: {item.participants}</Text>
          </View>
        ),
        keyExtractor: (review, index) => `${item.id}-review-${index}`,
      })}

      {renderSubItem({
        title: "Monitoring Visits",
        data: item.monitoringVisits,
        renderItem: ({ item }) => (
          <View style={styles.subItemContainer}>
            <Text style={styles.label}>Date: {item.date}</Text>
            <Text style={styles.label}>Cluster: {item.cluster}</Text>
            <Text style={styles.label}>Observations: {item.observations}</Text>
          </View>
        ),
        keyExtractor: (monitoring, index) => `${item.id}-monitoring-${index}`,
      })}

      {renderSubItem({
        title: "Reports",
        data: item.reports,
        renderItem: ({ item }) => (
          <View style={styles.subItemContainer}>
            <Text style={styles.label}>Details: {item.details}</Text>
            <Text style={styles.label}>
              Submitted Date: {item.submittedDate || "N/A"}
            </Text>
          </View>
        ),
        keyExtractor: (report, index) => `${item.id}-report-${index}`,
      })}
    </View>
  );

  

  return (
    <View >
      {/* <TabButton/> */}
      {apiData?.length  ? (
        <FlatList
          data={apiData}
          renderItem={renderCoordinator}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState("No data available.")
      )}
    </View>
  );
};

const styles = StyleSheet.create({

   loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    marginVertical: 10,
    // marginHorizontal: 15,
    padding: 15,
    backgroundColor: "#e1e8e7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  subItemContainer: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#ecf4f3",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    color: "#555555",
  },
  label: {
    fontSize: 14,
    marginVertical: 4,
    color: "#666666",
    lineHeight: 20,
  },
  globalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },


  // loaderContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // itemContainer: {
  //   marginVertical: 10,
  //   padding: 10,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   borderColor: "#ccc",
  //   backgroundColor: "#f9f9f9",
  // },
  // subItemContainer: {
  //   marginVertical: 5,
  //   padding: 8,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   borderColor: "#eee",
  // },
  // label: {
  //   fontSize: 14,
  //   color: "#333",
  // },
  // subHeader: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   marginTop: 10,
  // },
  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
  },
});

export default PCoordinatorReport;

// const TabButton = () => {
//   return (
//     <View>
//       <View>
//         <Text>TP</Text>
//       </View>
//       <View>
//         <Text>RM</Text>
//       </View>
//       <View>
//         <Text>MV</Text>
//       </View>
//       <View>
//         <Text>RP</Text>
//       </View>
//     </View>
//   )
// }



