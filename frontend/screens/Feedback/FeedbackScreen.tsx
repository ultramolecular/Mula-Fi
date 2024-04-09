import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Good Work! Here's where you can improve:
        </Text>

        <Text style={styles.text}>
          Diversification is key: Ensure your portfolio includes a mix of stocks from various industries to mitigate risk.
        </Text>
        <TouchableOpacity onPress={() => console.log("More info on Diversification")}>
          <Text style={styles.link}>More info</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Consider long-term growth stocks over short-term fluctuations. Focus on companies with strong potential for growth.
        </Text>
        <TouchableOpacity onPress={() => console.log("More info on Growth Stocks")}>
          <Text style={styles.link}>More info</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Review your asset allocation periodically: Your mix of stocks, bonds, and other investments should change as you get closer to your financial goals.
        </Text>
        <TouchableOpacity onPress={() => console.log("More info on Asset Allocation")}>
          <Text style={styles.link}>More info</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Be mindful of fees: High investment fees can cut into your earnings significantly over time, so choose low-cost index funds when possible.
        </Text>
        <TouchableOpacity onPress={() => console.log("More info on Investment Fees")}>
          <Text style={styles.link}>More info</Text>
        </TouchableOpacity>
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
