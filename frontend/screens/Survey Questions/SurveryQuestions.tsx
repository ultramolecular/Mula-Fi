import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function SurveyQuestions() {
  const [selectedGoal, setSelectedGoal] = useState("null");
  const [selectedSize, setSelectedSize] = useState("null");
  const [selectedContribution, setSelectedContribution] = useState("null");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();


  const goals = [
    "Build a Retirement fund (long-term)",
    "General Wealth Growth (mid-term)",
    "Short term, aggressive growth (short-term)",
  ];
  const portfolioSizes = ["<5k", "5k-10k", "10k-20k", "20k-40k", "40k+"];
  const contributions = [
    "<$50",
    "$50-$100",
    "$100-$500",
    "$500+",
    "I'm not interested in making monthly contributions",
  ];

  const handleSelectGoal = (goal: string) => setSelectedGoal(goal);
  const handleSelectSize = (size: string) => setSelectedSize(size);
  const handleSelectContribution = (contribution: string) =>
    setSelectedContribution(contribution);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDE59" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.questionTitle}>
          1. What is your primary goal with investing?
        </Text>
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedGoal === goal && styles.selectedOption,
            ]}
            onPress={() => handleSelectGoal(goal)}
          >
            <Text style={styles.optionText}>{goal}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.questionTitle}>
          2. What would your initial portfolio size be?
        </Text>
        {portfolioSizes.map((size, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedSize === size && styles.selectedOption,
            ]}
            onPress={() => handleSelectSize(size)}
          >
            <Text style={styles.optionText}>{size}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.questionTitle}>
          3. What sort of monthly contribution could you make to your account?
        </Text>
        {contributions.map((contribution, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedContribution === contribution && styles.selectedOption,
            ]}
            onPress={() => handleSelectContribution(contribution)}
          >
            <Text style={styles.optionText}>{contribution}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{ backgroundColor: "#0077cc", padding: 10, borderRadius: 5, }}
          onPress={() =>
            navigation.navigate("InvestmentPlanScreen", { level: "Novice" })
          }
        >
          <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      <View style={{ padding: insets.bottom }} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  questionTitle: {
    fontSize: 18,
    marginVertical: 12,
  },
  option: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "#b4ffb8",
    borderColor: "#0077cc",
  },
  optionText: {
    fontSize: 16,
  },
});
