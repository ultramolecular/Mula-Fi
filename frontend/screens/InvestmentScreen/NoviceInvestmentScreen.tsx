import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialIcons";
import { InvestmentScreenParams } from "../../constants";
import { apiURl } from "../../constants";

export default function NoviceInvestmentScreen({
  route,
}: {
  route: { params: InvestmentScreenParams };
}) {
  const navigation = useNavigation();
  const { level, goals, portfolioSize, monthlyContribution } = route.params;

  // State for input values
  const [stocks, setStocks] = useState(40);
  const [bonds, setBonds] = useState(30);
  const [savings, setSavings] = useState(30);
  const [submitting, setSubmitting] = useState(false); // State to track submission status


  //state for modals

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  type InfoType = "stocks" | "bonds" | "savings";
  const showInfo = (type: InfoType) => {
    const messages = {
      stocks:
        "Stocks are equity investments that represent legal ownership in a company. As a novice, this stock percentage assumes that the majority of your portfolio is in ETFs or other mutual funds. To enable a more granular selection, please choose the intermediate section.",
      bonds:
        "Bonds are fixed income instruments that represent a loan from an investor to a borrower. They are typically less risky than stocks but offer lower returns. As a novice, this bond percentage assumes an average rate of return. To enable a more granular selection, such as T-Bills/T-Bonds/Notes please choose the intermediate or advanced section.",
      savings:
        "Savings accounts are interest-bearing deposits held at a bank or other financial institution. This assumes an average rate of return. To enable a more granular selection, such as CDs or high-yield savings accounts, please choose the intermediate or advanced section.",
    };
    setModalContent(messages[type]);
    setModalVisible(true);
  };

  const advice = useQuery({
    queryKey: ["apiCall"],
    queryFn: callApi,
    enabled: false,
  });

  // Calculate the total percentage
  const totalPercentage = useMemo(
    () => stocks + bonds + savings,
    [stocks, bonds, savings]
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    advice.refetch();
    
  };


  useEffect(() => {
    if (submitting && advice.isSuccess && advice.data && !advice.isFetching && !advice.isRefetching) {
      //@ts-ignore
      navigation.navigate("FeedbackScreen", {
        ...route.params,
        advice: advice.data,
      });
      setSubmitting(false); // Reset submitting state after navigation
    }
  }, [submitting, advice.isSuccess, advice.data, navigation]);


  async function callApi() {
    try {
      // TODO: Figure out how to make API calls without localhost, prob set up an actual backend hosted server?
      console.log("calling api");

      const input = {
        experience: level,
        goals: goals,
        portfolio_size: portfolioSize,
        monthly_contribution: monthlyContribution,
        stocks,
        bonds,
        savings,
      };

      // log input in json format
      console.log(JSON.stringify(input));

      const response = await axios.post(
        `${apiURl}/get-investment-feedback-novice`,
        {
          ...input,
        }
      );
      return response.data.advice;
    } catch (error) {
      console.error("Failed to fetch investment advice:", error);
    }

  }

  if (advice.isLoading || advice.isFetching || advice.isRefetching) {
    return (
      <View style={styles.centeredLoading}>
        <Text style={styles.loadingText}>Hold Tight! We're generating your plan!</Text>
        <ActivityIndicator size="large" color="#307ecc" style={{padding:10}} />
      </View>
    );
  }
  if (advice.isError) {
    return <Text>Error: {advice.error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#feb248" }}>
      <View style={styles.backgroundCircle} />
      <View style={styles.backgroundEllipse} />
      <View style={styles.container}>
        <Text style={styles.header}>Investment template for novices</Text>
        
        {/* Stocks Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Stocks (%): {stocks}</Text>
            <TouchableOpacity onPress={() => showInfo("stocks")}>
              <Icon name="info" size={24} color="#307ecc" />
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={stocks}
            onValueChange={setStocks}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
        </View>
  
        {/* Bonds Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Bonds (%): {bonds}</Text>
            <TouchableOpacity onPress={() => showInfo("bonds")}>
              <Icon name="info" size={24} color="#307ecc" />
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={bonds}
            onValueChange={setBonds}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
        </View>
  
        {/* Savings Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Savings (%): {savings}</Text>
            <TouchableOpacity onPress={() => showInfo("savings")}>
              <Icon name="info" size={24} color="#307ecc" />
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={savings}
            onValueChange={setSavings}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
        </View>
  
        {/* Total Percentage Display */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.totalLabel}>Total: </Text>
          <Text
            style={[
              styles.totalLabel,
              { color: totalPercentage === 100 ? "white" : "#cc0000" },
            ]}
          >
            {totalPercentage}%
          </Text>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            totalPercentage === 100
              ? styles.activeButton
              : styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={totalPercentage !== 100}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
  
        {/* Modal for Information */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalContent}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  centeredLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    padding:10,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  sliderContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 10,
    color: "white",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  totalLabel: {
    fontSize: 30,
    marginTop: 20,
    fontFamily: "Poppins-ExtraBold",
    color: "white",
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
  },
  activeButton: {
    backgroundColor: "#007BFF",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  loadingText :{
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    color: "#4894FE",
  },
  backgroundCircle: {
    position: "absolute",
    width: 500, // Diameter of the circle
    height: 300, // Diameter of the circle
    borderRadius: 100, // Half the diameter to make it a perfect circle
    backgroundColor: "#4894FE", // White color for the circle
    top: -160, // Adjust top position
    left: -300, // Adjust left position
    zIndex: -1, // Ensure it's behind all other content
  },
  backgroundEllipse: {
    position: "absolute",
    width: 400, // Width of the ellipse
    height: 200, // Height of the ellipse
    borderRadius: 100, // Half the height to make it an ellipse
    backgroundColor: "#4894FE", // Background color for the ellipse
    bottom: -50, // Adjust bottom position
    right: -200, // Adjust right position
    zIndex: -1, // Ensure it's behind all other content
  },
});
