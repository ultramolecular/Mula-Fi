import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from "./screens/StartScreen/StartScreen";
import InvestmentPlanScreen from './screens/InvestmentScreen/InvestmentScreen.tsx';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StartScreen">
                <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'Welcome' }} />
                <Stack.Screen name="InvestmentPlanScreen" component={InvestmentPlanScreen}
                    options={{ title: 'Investment Plan' }} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}
