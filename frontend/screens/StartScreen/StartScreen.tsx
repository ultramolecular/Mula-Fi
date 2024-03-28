import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
//@ts-ignore
import mulaLogo from "../../assets/mula-logo-2.png";
import React from "react";

export default function StartScreen() {
  return (
    <>
      <View style={{ justifyContent: "space-between", height:'100%' }}>
        <View style={{ alignSelf: "center" }}>
          <Image source={mulaLogo} />
        </View>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "flex-end",
            width: "80%",
          }}
        >
            <Text style={{ fontSize: 20, textAlign: "center", color:'red', padding: 10 }}>
                Please choose your experience level:
            </Text>
          <TouchableOpacity style={styles.difficultyTouchable}>
            <View style={styles.difficultyView}>
              <Text style={styles.difficultyText}>Novice</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.difficultyTouchable}>
            <View style={styles.difficultyView}>
              <Text style={styles.difficultyText}>Intermediate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.difficultyTouchable}>
            <View style={styles.difficultyView}>
              <Text style={styles.difficultyText}>Advanced</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: "5%" }} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  difficultyTouchable: {
    paddingVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  difficultyView: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 20,
  },
  difficultyText: {
    color: "white",
    fontSize: 40,
    fontFamily: "",
    alignSelf: "center",
  },
});
