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
import { InvestmentScreenParams } from "../../App";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AdvancedInvestmentScreen({
  route,
}: {
  route: { params: InvestmentScreenParams };
}) {
  const navigation = useNavigation();
  const { level, goals, portfolioSize, monthlyContribution } = route.params;

  const insets = useSafeAreaInsets();


  // State for input values

  // Additional state for the new sliders
  const [mutualFunds, setMutualFunds] = useState(20);
  const [individualStocks, setIndividualStocks] = useState(20);
  const [interestRate, setInterestRate] = useState<number>(1.0);
  const [shortTermBonds, setShortTermBonds] = useState<number>(15);
  const [longTermBonds, setLongTermBonds] = useState<number>(15);
  const [longTermCD, setLongTermCD] = useState<number>(10);
  const [shortTermCD, setShortTermCD] = useState<number>(10);
  const [savings, setSavings] = useState(5);


  //state for modals

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  type InfoType =
    | "stocks"
    | "bonds"
    | "savings"
    | "mutualFunds"
    | "individualStocks"
    | "interestRate"
    | "shortTermBonds"
    | "longTermBonds"
    | "longTermCD"
    | "shortTermCD";

  const showInfo = (type: InfoType) => {
    const messages = {
      stocks:
        "Stocks are equity investments that represent legal ownership in a company. As a novice, this stock percentage assumes that the majority of your portfolio is in ETFs or other mutual funds. To enable a more granular selection, please choose the intermediate section.",
      bonds:
        "Bonds are fixed income instruments that represent a loan from an investor to a borrower. They are typically less risky than stocks but offer lower returns. As a novice, this bond percentage assumes an average rate of return. To enable a more granular selection, such as T-Bills/T-Bonds/Notes please choose the intermediate or advanced section.",
      savings:
        "Savings accounts are interest-bearing deposits held at a bank or other financial institution. This assumes an average rate of return. To enable a more granular selection, such as CDs or high-yield savings accounts, please choose the intermediate or advanced section.",
      mutualFunds:
        "Mutual funds are a type of investment vehicle consisting of a portfolio of stocks, bonds, or other securities, which is managed by a professional money manager. This percentage represents the portion of your stock investments that are in mutual funds.",
      individualStocks:
        "Individual stocks are equity investments that represent legal ownership in a company. This percentage represents the portion of your stock investments that are in individual stocks. For an intermediate investor, we will assume that your individual stocks are going to be selected from the most commonly held stocks. ",
      interestRate:
        "Interest rates are the amount charged, expressed as a percentage of principal, by a lender to a borrower for the use of assets. This percentage represents the average interest rate for your savings accounts.",
      shortTermBonds:
        "Short-term bonds are bonds that mature in less than five years. They are less sensitive to interest rate changes than long-term bonds. This percentage represents the portion of your bond investments that are in short-term bonds.",
      longTermBonds:
        "Long-term bonds are bonds that mature in more than five years. They are more sensitive to interest rate changes than short-term bonds. This percentage represents the portion of your bond investments that are in long-term bonds.",
        longTermCD:
        "CDs are time deposits that pay a fixed interest rate for a shorter period (6-12 months). This percentage represents the portion of your bond investments that are in long-term CDs.",
        shortTermCD:
        "CDs are time deposits that pay a fixed interest rate for a longer period (<12 months). This percentage represents the portion of your bond investments that are in short-term CDs.",
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
  const totalPercentage = useMemo(() => {
    const totalInvestments =
      shortTermBonds + longTermBonds + savings + mutualFunds + individualStocks +shortTermCD + longTermCD;
    return totalInvestments;
  }, [ longTermBonds, shortTermBonds, savings, mutualFunds, individualStocks, shortTermCD, longTermCD]);

  const handleSubmit = async () => {
    advice.refetch();
  };

  useEffect(() => {
    if (advice.isSuccess && advice.data) {
      console.log("advice that is being passed: ", advice.data);
      //@ts-ignore
      navigation.navigate("FeedbackScreen", {
        ...route.params,
        advice: advice.data,
      });
    }
  }, [advice.isSuccess, advice.data, navigation]);

  async function callApi() {
    try {
      // TODO: Figure out how to make API calls without localhost, prob set up an actual backend hosted server?
      console.log("calling api");

      const input = {
        experience: level,
        goals: goals,
        portfolio_size: portfolioSize,
        monthly_contribution: monthlyContribution,
        savings,
        mutualFunds,
        individualStocks,
        interestRate,
        shortTermBonds,
        longTermBonds,
        longTermCD,
        shortTermCD,
      };

      // log input in json format
      console.log(JSON.stringify(input));

      const response = await axios.post(
        "http://127.0.0.1:5000/get-investment-feedback-advanced",
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
        <ActivityIndicator size="large" color="#307ecc" />
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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>
            Investment Template for Advanced Investors
          </Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>
              Stocks (%): {mutualFunds + individualStocks}
            </Text>

            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Mutual Funds (%): {mutualFunds}
                </Text>
                <TouchableOpacity onPress={() => showInfo("mutualFunds")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100} // Each can go up to 100 independently
                step={1}
                value={mutualFunds}
                onValueChange={setMutualFunds}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>

            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Individual Stocks (%): {individualStocks}
                </Text>
                <TouchableOpacity onPress={() => showInfo("individualStocks")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={individualStocks}
                onValueChange={setIndividualStocks}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>
              Bonds (%): {shortTermBonds + longTermBonds}
            </Text>

            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Short-Term Bonds (%): {shortTermBonds}
                </Text>
                <TouchableOpacity onPress={() => showInfo("shortTermBonds")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100} // Each can go up to 100 independently
                step={1}
                value={shortTermBonds}
                onValueChange={setShortTermBonds}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>

            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Long-Term Bonds (%): {longTermBonds}
                </Text>
                <TouchableOpacity onPress={() => showInfo("longTermBonds")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={longTermBonds}
                onValueChange={setLongTermBonds}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Savings (%): {savings + shortTermCD + longTermCD}</Text>

            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Savings (%): {savings}
                </Text>
                <TouchableOpacity onPress={() => showInfo("savings")}>
                  <Icon name="info" size={20} color="#307ecc" />
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

            <View style={[styles.subCategoryContainer, {width: '80%', marginLeft:'20%'}]}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Interest Rate (%): {interestRate.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => showInfo("interestRate")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={0.01}
                value={interestRate}
                onValueChange={setInterestRate}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>


            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  CD (long term) (%): {longTermCD}
                </Text>
                <TouchableOpacity onPress={() => showInfo("longTermCD")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={longTermCD}
                onValueChange={setLongTermCD}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>
            <View style={styles.subCategoryContainer}>
              <View style={styles.subCategoryLabelContainer}>
                <Text style={styles.subCategoryLabel}>
                  Cd (Short Term) (%): {shortTermCD}
                </Text>
                <TouchableOpacity onPress={() => showInfo("shortTermCD")}>
                  <Icon name="info" size={20} color="#307ecc" />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={shortTermCD}
                onValueChange={setShortTermCD}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.totalLabel}> Total: </Text>

            <Text
              style={[
                styles.totalLabel,
                { color: totalPercentage === 100 ? "white" : "#cc0000" },
              ]}
            >
              {totalPercentage}%
            </Text>
          </View>
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
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
      </ScrollView>
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
    backgroundColor: "#FFDE59",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "white",
    marginBottom: 20,
  },
  sliderContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: "Poppins-Semibold",
    marginBottom: 10,
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
    fontFamily: "Poppins-Bold",
  },
  activeButton: {
    backgroundColor: "#5748fe",
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
  categoryContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "white",
    marginBottom: 5,
  },
  subCategoryContainer: {
    width: "90%",
    marginLeft: "10%", // Indent subcategory for visual hierarchy
  },
  subCategoryLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subCategoryLabel: {
    fontSize: 18,
    fontFamily: "Poppins-Semibold",
    marginBottom: 10,
    color: "white",
  },
  backgroundCircle: {
    position: "absolute",
    width: 500, // Diameter of the circle
    height: 300, // Diameter of the circle
    borderRadius: 100, // Half the diameter to make it a perfect circle
    backgroundColor: "#4894FE", // White color for the circle
    top: -190, // Adjust top position
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
