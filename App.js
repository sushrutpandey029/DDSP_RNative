import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigations/RootNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Font from 'expo-font' 
import { useEffect, useState } from "react";


const myTheme = {
  ...DefaultTheme,
  colors : {
    ...DefaultTheme.colors,
    background: '#fff'
  }
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
   const loadFonts = async() => {
    await Font.loadAsync({
     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
     'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    setFontLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  },[])

  return (
    <NavigationContainer theme={myTheme}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <RootNavigation />
        {/* <Text>welcome to ddsp</Text> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft : '3%',
    paddingRight : '3%'
  },
});
