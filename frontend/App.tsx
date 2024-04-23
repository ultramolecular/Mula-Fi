import React from "react";
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

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export interface InvestmentScreenParams {
  level: string;
  goals: string;
  portfolioSize: string;
  monthlyContribution: string;
  advice: string | undefined;
  mutualFunds: number | undefined;
  individualStocks: number | undefined;
  interestRate: number | undefined;
}

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
              options={{ headerShown: false, title:"Start Screen" }}
            />
            <Stack.Screen
              name="SurveyQuestions"
              component={SurveyQuestions}
              options={{
                headerShown: false,
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
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
