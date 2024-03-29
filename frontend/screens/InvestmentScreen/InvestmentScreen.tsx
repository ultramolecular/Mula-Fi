import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type InvestmentPlanScreenRouteParams = {
	level: string;
  };

export default function InvestmentPlanScreen({route}) {
	const navigation = useNavigation();
    // Can access the experience level through route.params.level
    return (
	<SafeAreaView style={{ flex: 1, backgroundColor: '#FFDE59' }}>
	    <View style={styles.container}>
		<Text>Investment Plan for {route.params.level}</Text>
		<TextInput placeholder="Stocks" keyboardType="numeric" />
		<TextInput placeholder="Bonds" keyboardType="numeric" />
		<TextInput placeholder="Savings" keyboardType="numeric" />
		{/* @ts-ignore */}
		<TouchableOpacity onPress={() => navigation.navigate('FeedbackScreen')}>
		    <Text>Submit</Text>
		</TouchableOpacity>
	    </View>
	</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
    }
});
