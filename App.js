import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigations/RootNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./src/components/redux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "./src/components/redux/slices/AuthSlice";

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  // const dispatch = useDispatch();
  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    // Show a loading screen while fonts are loading
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <Text style={{ fontSize: 18 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={myTheme}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
          <RootNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: "3%",
    // paddingRight: "3%",
    // paddingHorizontal: Platform.OS === "ios" ? "4%" : "3%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
