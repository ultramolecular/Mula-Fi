import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedbackScreen({ route }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { advice } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Good Work! Here's where you can improve:
        </Text>

        {/* Display advice received from OpenAI in our backend */}
        <Text style={styles.text}>
          {advice}
        </Text>
      </View>

      <TouchableOpacity style={styles.editPlanButton} onPress={() => navigation.navigate("InvestmentPlanScreen", { level: "Novice" })}>
        <Text style={styles.editPlanText}>Edit my Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFDE59'
  },
  content: {
    alignItems: "center",
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginBottom: 15
  },
  editPlanButton: {
    backgroundColor: "transparent",
  },
  editPlanText: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
  }
});
