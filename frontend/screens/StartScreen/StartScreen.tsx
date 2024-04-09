import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from "react-native";
// @ts-ignore
import mulaLogo from "../../assets/mula-logo-2.png";
import React from "react";

//@ts-ignore
export default function StartScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'#FFDE59' }}>
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
                    {/* Novice button */}
                    <TouchableOpacity
                        style={styles.difficultyTouchable}
                        onPress={() => navigation.navigate('SurveyQuestions')}
                    >
                        <View style={styles.difficultyView}>
                            <Text style={styles.difficultyText}>Novice</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Intermediate button */}
                    <TouchableOpacity
                        style={styles.difficultyTouchable}
                        onPress={() => navigation.navigate('SurveyQuestions')}
                    >
                        <View style={styles.difficultyView}>
                            <Text style={styles.difficultyText}>Intermediate</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Advanced button */}
                    <TouchableOpacity
                        style={styles.difficultyTouchable}
                        // onPress={() => navigation.navigate('InvestmentPlanScreen', { level: 'Advanced' })}
                        onPress={() => navigation.navigate('SurveyQuestions')}
                    >
                        <View style={styles.difficultyView}>
                            <Text style={styles.difficultyText}>Advanced</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: "5%" }} />
                </View>
            </View>
        </SafeAreaView>
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
