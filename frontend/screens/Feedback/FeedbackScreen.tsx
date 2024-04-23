import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { InvestmentScreenParams } from "../../App";

export default function FeedbackScreen({
  route,
}: {
  route: { params: InvestmentScreenParams };
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { advice } = route.params;
  console.log("feedback screen advice : ", advice);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Good Work! Here's where you can improve:
            </Text>

            {/* Display advice received from OpenAI in our backend */}
            <Text style={styles.text}>{advice}</Text>
          </View>

          <TouchableOpacity
            style={styles.editPlanButton}
            onPress={() =>
              //@ts-ignore
              navigation.goBack()
            }
          >
            <Text style={styles.editPlanText}>Edit my Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginBottom: 15,
  },
  editPlanButton: {
    backgroundColor: "transparent",
  },
  editPlanText: {
    fontSize: 20,
    padding: 10,
    fontFamily: "Poppins-Bold", 
    color: "blue",
    textDecorationLine: "underline",
  },
});
