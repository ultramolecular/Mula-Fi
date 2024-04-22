import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from "react-native";
// @ts-ignore
import React from "react";

//@ts-ignore
export default function StartScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'#4894FE' }}>

            <View style={styles.backgroundCircle} />
            <View style={styles.backgroundEllipse} />
            <View style={{ justifyContent: "space-between", height:'100%' }}>
                <View style={{ alignSelf: "center" }}>
                    <Text style={{ fontSize: 50, textAlign: "center", fontFamily: 'Poppins-Bold' , color:'white', padding: 10 }}>
                        Welcome to MulaFi!
                    </Text>
                </View>
                <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "flex-end",
                      width: "80%",
                    }}
                >
                    <Text style={{ fontSize: 20, textAlign: "center", color:'white', padding: 10 }}>
                        Please choose your experience level:
                    </Text>
                    {/* Novice button */}
                    <TouchableOpacity
                        style={styles.difficultyTouchable}
                        onPress={() => navigation.navigate('SurveyQuestions', {level: 'novice'})}
                    >
                        <View style={styles.difficultyView}>
                            <Text style={styles.difficultyText}>Novice</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Intermediate button */}
                    <TouchableOpacity
                        style={styles.difficultyTouchable}
                        onPress={() => navigation.navigate('SurveyQuestions', {level: 'intermediate'})}
                    >
                        <View style={styles.difficultyView}>
                            <Text style={styles.difficultyText}>Intermediate</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Advanced button */}
                    <TouchableOpacity
                        style={styles.difficultyTouchable}
                        // onPress={() => navigation.navigate('InvestmentPlanScreen', { level: 'Advanced' })}
                        onPress={() => navigation.navigate('SurveyQuestions', {level: 'advanced'})}
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
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    difficultyText: {
        color: "#4894FE",
        fontSize: 40,
        fontFamily: "Poppins-Regular",
        alignSelf: "center",
    },
    backgroundCircle: {
        position: 'absolute',
        width: 500, // Diameter of the circle
        height: 300, // Diameter of the circle
        borderRadius: 100, // Half the diameter to make it a perfect circle
        backgroundColor: '#feb248', // White color for the circle
        top: -10, // Adjust top position
        left: -300, // Adjust left position
        zIndex: -1, // Ensure it's behind all other content
    },
    backgroundEllipse: {
        position: 'absolute',
        width: 400, // Width of the ellipse
        height: 200, // Height of the ellipse
        borderRadius: 100, // Half the height to make it an ellipse
        backgroundColor: '#feb248', // Background color for the ellipse
        bottom: -50, // Adjust bottom position
        right: -200, // Adjust right position
        zIndex: -1, // Ensure it's behind all other content
      },
});
