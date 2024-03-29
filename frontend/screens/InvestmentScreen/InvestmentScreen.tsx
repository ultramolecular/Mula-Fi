import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';

export default function InvestmentPlanScreen({ route }) {
    // Can access the experience level through route.params.level
    return (
	<SafeAreaView style={{ flex: 1, backgroundColor: '#FFDE59' }}>
	    <View style={styles.container}>
		<Text>Investment Plan for {route.params.level}</Text>
		<TextInput placeholder="Stocks" keyboardType="numeric" />
		<TextInput placeholder="Bonds" keyboardType="numeric" />
		<TextInput placeholder="Savings" keyboardType="numeric" />
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
