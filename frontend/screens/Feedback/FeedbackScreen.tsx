import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: insets.bottom,
          backgroundColor:'#FFDE59'
        }}
      >
        <View style={{ alignItems: "center", padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>
            Good Work! Here's where you can improve:
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "blue" }}>More info</Text>
          </TouchableOpacity>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "blue" }}>More info</Text>
          </TouchableOpacity>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "blue" }}>More info</Text>
          </TouchableOpacity>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "blue" }}>More info</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Text
              style={{ fontSize: 30, color: "blue" }}
              onPress={() =>
                //@ts-ignore
                navigation.navigate("InvestmentPlanScreen", { level: "Novice" })
              }
            >
              Edit my Plan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
