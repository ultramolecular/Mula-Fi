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
import { InvestmentScreenParams } from "../../constants";

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
        {/* <View style={styles.backgroundEllipse} />
        <View style={styles.secondBackgroundEllipse} />
        <View style={styles.thirdBackgroundEllipse} />
        <View style={styles.fourthBackgroundEllipse} /> */}
          <View style={styles.content}>
            <Text style={styles.title}>
              Good Work! Here's what we've got for you:
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
    color: "#feb248",
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 5,
    fontFamily: "Poppins-SemiBold",
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
    color: "#feb248",
    textDecorationLine: "underline",
  },

  backgroundEllipse: {
    position: 'absolute',
    width: 400, // Width of the ellipse
    height: 200, // Height of the ellipse
    borderRadius: 100, // Half the height to make it an ellipse
    backgroundColor: '#4894FE', // Background color for the ellipse
    top: -60, // Adjust bottom position
    left: -300, // Adjust right position
     // Ensure it's behind all other content
  },
  secondBackgroundEllipse: {
    position: 'absolute',
    width: 300, // Width of the ellipse
    height: 200, // Height of the ellipse
    borderRadius: 100, // Half the height to make it an ellipse
    backgroundColor: '#4894FE', // Background color for the ellipse
    bottom: -125, // Adjust bottom position
    left: -200, // Adjust right position
     // Ensure it's behind all other content
  },
  thirdBackgroundEllipse: {
    position: 'absolute',
    width: 400, // Width of the ellipse
    height: 200, // Height of the ellipse
    borderRadius: 100, // Half the height to make it an ellipse
    backgroundColor: '#4894FE', // Background color for the ellipse
    bottom: -125, // Adjust bottom position
    right: -200, // Adjust right position
     // Ensure it's behind all other content
  },
  fourthBackgroundEllipse: {
    position: 'absolute',
    width: 300, // Width of the ellipse
    height: 200, // Height of the ellipse
    borderRadius: 100, // Half the height to make it an ellipse
    backgroundColor: '#4894FE', // Background color for the ellipse
    top: -60, // Adjust bottom position
    right: -250, // Adjust right position
     // Ensure it's behind all other content
  },



});
