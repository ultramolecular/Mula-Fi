import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import axios from 'axios';

export default function InvestmentPlanScreen({ route }) {
  const navigation = useNavigation();
  const { level, goals, portfolioSize, monthlyContribution } = route.params;

  // State for input values
  const [stocks, setStocks] = useState(40);
  const [bonds, setBonds] = useState(30);
  const [savings, setSavings] = useState(30);

  // Calculate the total percentage
  const totalPercentage = useMemo(() => stocks + bonds + savings, [stocks, bonds, savings]);

  const handleSubmit = async () => {
    try {
      // TODO: Figure out how to make API calls without localhost, prob set up an actual backend hosted server?
      const response = await axios.post('http://192.168.1.129:5000/get-investment-feedback', {
        experience: level,
        goals: goals,
        portfolio_size: portfolioSize,
        monthly_contribution: monthlyContribution,
        stocks,
        bonds,
        savings
      });
      // Navigate to the Feedback screen with the received advice
      navigation.navigate('FeedbackScreen', { advice: response.data.advice });
    } catch (error) {
      console.error('Failed to fetch investment advice:', error);
    }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFDE59' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Investment Plan for {level}</Text>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Stocks (%): {stocks}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={stocks}
            onValueChange={setStocks}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Bonds (%): {bonds}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={bonds}
            onValueChange={setBonds}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Savings (%): {savings}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={savings}
            onValueChange={setSavings}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
        </View>

        <Text style={styles.totalLabel}>Total: {totalPercentage}%</Text>
        <TouchableOpacity 
          style={[styles.submitButton, totalPercentage === 100 ? styles.activeButton : styles.disabledButton]}
          onPress={handleSubmit}
          disabled={totalPercentage !== 100}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  totalLabel: {
    fontSize: 18,
    marginTop: 20,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});
