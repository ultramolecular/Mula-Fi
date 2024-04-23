import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen/StartScreen";
import IntermediateInvestmentScreen from "./screens/InvestmentScreen/IntermediateInvestmentScreen";
import NoviceInvestmentScreen from "./screens/InvestmentScreen/NoviceInvestmentScreen";
import AdvancedInvestmentScreen from "./screens/InvestmentScreen/AdvancedInvestmentScreen";
import FeedbackScreen from "./screens/Feedback/FeedbackScreen";
import OnboardingPages from "./screens/Onboarding/OnboardingPages";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SurveyQuestions from "./screens/Survey Questions/SurveryQuestions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

const Stack = createStackNavigator();
const queryClient = new QueryClient();




export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          {fontsLoaded ? (
            <Stack.Navigator initialRouteName="StartScreen">
              {/* <Stack.Screen
              name="OnboardingPages"
              component={OnboardingPages}
              options={{ headerShown: false }}
            /> */}
              <Stack.Screen
                name="StartScreen"
                component={StartScreen}
                options={{ headerShown: false, title: "Start Screen" }}
              />
              <Stack.Screen
                name="SurveyQuestions"
                component={SurveyQuestions}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: "",
                }}
              />
              <Stack.Screen
                name="FeedbackScreen"
                component={FeedbackScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="IntermediateInvestmentScreen"
                component={IntermediateInvestmentScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: "",
                }}
              />
              <Stack.Screen
                name="NoviceInvestmentScreen"
                component={NoviceInvestmentScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: "",
                }}
              />
              <Stack.Screen
                name="AdvancedInvestmentScreen"
                component={AdvancedInvestmentScreen}
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  title: "",
                }}
              />
            </Stack.Navigator>
          ) : (
            <View style={styles.centeredLoading}>
              <ActivityIndicator size="large" color="#307ecc" />
            </View>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  centeredLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
