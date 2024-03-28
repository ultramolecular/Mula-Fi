import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import StartScreen from "./screens/StartScreen/StartScreen";

export default function App() {
  return (
    <View style={{backgroundColor:'#FFDE59', height:'100%'}}>
      <SafeAreaView>
        <StartScreen />
      </SafeAreaView>
    </View>
  );
}
