import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type SurveyQuestionsProps = {
  route: {
    params: {
      level: string;
    };
  };
};



export default function SurveyQuestions({ route }: SurveyQuestionsProps) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.backgroundCircle} />
        <View style={styles.backgroundEllipse} />
        {/* <View style={styles.secondBackgroundCircle} /> */}
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
          style={{
            backgroundColor: "#5748fe",
            padding: 20,
            marginTop: 20,
            borderRadius: 5,
          }}
          onPress={() => {
            if (
              selectedGoal === "null" ||
              selectedSize === "null" ||
              selectedContribution === "null"
            ) {
              Alert.alert(
                "Incomplete Selection",
                "Please make sure you've selected a goal, portfolio size, and monthly contribution.",
              );
              return;
            }

            if (route.params.level === "novice") {
              //@ts-ignore
              navigation.navigate("NoviceInvestmentScreen", {
                level: route.params.level,
                goals: selectedGoal,
                portfolioSize: selectedSize,
                monthlyContribution: selectedContribution,
              });
            } else if (route.params.level === "intermediate") {
              //@ts-ignore
              navigation.navigate("IntermediateInvestmentScreen", {
                level: route.params.level,
                goals: selectedGoal,
                portfolioSize: selectedSize,
                monthlyContribution: selectedContribution,
              });
            } else if (route.params.level === "advanced") {
              //@ts-ignore
              navigation.navigate("AdvancedInvestmentScreen", {
                level: route.params.level,
                goals: selectedGoal,
                portfolioSize: selectedSize,
                monthlyContribution: selectedContribution,
              });
            }
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Poppins-Bold",
              fontSize: 20,
            }}
          >
            Continue
          </Text>
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
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    marginVertical: 12,
  },
  option: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#feb248",
  },
  selectedOption: {
    backgroundColor: "#da7f00",
    borderColor: "#da7f00",
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  backgroundCircle: {
    position: "absolute",
    width: 500, // Diameter of the circle
    height: 300, // Diameter of the circle
    borderRadius: 100, // Half the diameter to make it a perfect circle
    backgroundColor: "#4894FE", // White color for the circle
    top: -200, // Adjust top position
    right: -300, // Adjust left position
    zIndex: -1, // Ensure it's behind all other content
  },
  backgroundEllipse: {
    position: "absolute",
    width: 400, // Width of the ellipse
    height: 350, // Height of the ellipse
    borderRadius: 500, // Half the height to make it an ellipse
    backgroundColor: "#4894FE", // Background color for the ellipse
    bottom: 75, // Adjust bottom position
    left: -300, // Adjust right position
    zIndex: -1, // Ensure it's behind all other content
  },

  // secondBackgroundCircle: {
  //   position: 'absolute',
  //   width: 500, // Diameter of the circle
  //   height: 700, // Diameter of the circle
  //   borderRadius: 500, // Half the diameter to make it a perfect circle
  //   backgroundColor: '#4894FE', // White color for the circle
  //   top: 200, // Adjust top position
  //   left: -300, // Adjust left position
  //   zIndex: -1, // Ensure it's behind all other content
  // }
});
