import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { getCoordinatorDetailsByID } from "../../../services/ApiFile";
import { globalContainer, semibold, regular } from "../../../../globals/style";

const PCoordinatorReport = () => {
  const { user } = useSelector((state) => state.auth.user);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tabValue, setTabValue] = useState("TP");

  const fetchCoordinatoreDetailsById = async () => {
    try {
      setLoading(true);
      const response = await getCoordinatorDetailsByID(user.id);
      if (response?.success) {
        console.log("CD-resp", JSON.stringify(response.data, null, 2));
        setApiData(response.data);
      }
    } catch (err) {
      console.error("Error fetching coordinator details:", err.response.data);
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
    if (user?.id) {
      fetchCoordinatoreDetailsById();
    }
  }, [user?.id]);

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
      {tabValue === "TP" &&
        renderSubItem({
          title: <Text style={[semibold]}>Training Programmes</Text>,
          data: item.trainingProgrammes,
          renderItem: ({ item }) => (
            <View style={styles.subItemContainer}>
              <Text style={styles.label}>Date: {item.date}</Text>
              <Text style={styles.label}>Name: {item.name}</Text>
              <Text style={styles.label}>Village: {item.villageName}</Text>
              <Text style={styles.label}>
                Participants: {item.participants}
              </Text>
            </View>
          ),
          keyExtractor: (training, index) => `${item.id}-training-${index}`,
        })}

      {tabValue === "RM" &&
        renderSubItem({
          title: <Text style={semibold}>Review Meetings</Text>,
          data: item.reviewMeetings,
          renderItem: ({ item }) => (
            <View style={styles.subItemContainer}>
              <Text style={styles.label}>Date: {item.date}</Text>
              <Text style={styles.label}>
                Field Officers: {item.fieldOfficer?.join(", ")}
              </Text>
              <Text style={styles.label}>
                Assistant Coordinators:{" "}
                {item.asstProjectCoordinator?.join(", ")}
              </Text>
              <Text style={styles.label}>
                Participants: {item.participants}
              </Text>
            </View>
          ),
          keyExtractor: (review, index) => `${item.id}-review-${index}`,
        })}

      {tabValue === "MV" &&
        renderSubItem({
          title: <Text style={semibold}>Monitoring Visits</Text>,
          data: item.monitoringVisits,
          renderItem: ({ item }) => (
            <View style={styles.subItemContainer}>
              <Text style={styles.label}>Date: {item.date}</Text>
              <Text style={styles.label}>Cluster: {item.cluster}</Text>
              <Text style={styles.label}>
                Observations: {item.observations}
              </Text>
            </View>
          ),
          keyExtractor: (monitoring, index) => `${item.id}-monitoring-${index}`,
        })}

      {tabValue === "RP" &&
        renderSubItem({
          title: <Text style={semibold}>Reports</Text>,
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
    <View style={{ marginBottom: "20%" }}>
      <TabButton setTabValue={setTabValue} tabValue={tabValue} />
      {apiData?.length ? (
        <FlatList
          data={apiData}
          renderItem={renderCoordinator}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
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
    marginBottom: 10,

    padding: 12,
    backgroundColor: "#d7e6f4",
    borderRadius: 10,
  },
  subItemContainer: {
    // backgroundColor:"red",
    //  marginBottom
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 10,
    color: "#333333",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    // marginVertical: 10,
    color: "#555555",
  },
  label: {
    fontSize: 14,

    color: "#666666",

    fontFamily: "Poppins-Regular",
  },
  globalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
  },
  tabContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 14,
    paddingBottom:14
    // backgroundColor:"#000"
  },
  tab: {
    backgroundColor: "#f4f7fa",
    width: 70,
    borderWidth: 1,
    borderColor: "black",
    borderColor: "#f4f7fa",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabText: {
    padding: 10,
    fontFamily: "Poppins-Regular",
  },
  activeButton: {
    // backgroundColor: "#cdc9fa",
    backgroundColor: "rgb(107, 186, 229)",
  },
  acBtnText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    // fontWeight : '600',
    // fontSize : 14
  },
});

export default PCoordinatorReport;

const TabButton = ({ setTabValue, tabValue }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        onPress={() => setTabValue("TP")}
        style={[styles.tab, tabValue === "TP" && styles.activeButton]}
      >
        <Text style={[styles.tabText, tabValue === "TP" && styles.acBtnText]}>
          TP
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabValue("RM")}
        style={[styles.tab, tabValue === "RM" && styles.activeButton]}
      >
        <Text style={[styles.tabText, tabValue === "RM" && styles.acBtnText]}>
          RM
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabValue("MV")}
        style={[styles.tab, tabValue === "MV" && styles.activeButton]}
      >
        <Text style={[styles.tabText, tabValue === "MV" && styles.acBtnText]}>
          MV
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabValue("RP")}
        style={[styles.tab, tabValue === "RP" && styles.activeButton]}
      >
        <Text style={[styles.tabText, tabValue === "RP" && styles.acBtnText]}>
          RP
        </Text>
      </TouchableOpacity>
    </View>
  );
};
