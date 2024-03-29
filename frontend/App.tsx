import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen/StartScreen";
import InvestmentPlanScreen from "./screens/InvestmentScreen/InvestmentScreen";
import FeedbackScreen from "./screens/Feedback/FeedbackScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InvestmentPlanScreen"
            component={InvestmentPlanScreen}
            options={{ title: "Investment Plan" }}
          />
          <Stack.Screen
            name="FeedbackScreen"
            component={FeedbackScreen}
            options={{ title: "Feedback" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
