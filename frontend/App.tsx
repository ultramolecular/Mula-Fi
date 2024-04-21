import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen/StartScreen";
import InvestmentPlanScreen from "./screens/InvestmentScreen/InvestmentScreen";
import FeedbackScreen from "./screens/Feedback/FeedbackScreen";
import OnboardingPages from "./screens/Onboarding/OnboardingPages";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SurveyQuestions from "./screens/Survey Questions/SurveryQuestions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnboardingPages">
          <Stack.Screen
            name="OnboardingPages"
            component={OnboardingPages}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SurveyQuestions"
            component={SurveyQuestions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InvestmentPlanScreen"
            component={InvestmentPlanScreen}
            options={{ headerTransparent: true, title: "Investment Plan"}}
          />
          <Stack.Screen
            name="FeedbackScreen"
            component={FeedbackScreen}
            options={{ title: "Feedback" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </QueryClientProvider>
  );
}
