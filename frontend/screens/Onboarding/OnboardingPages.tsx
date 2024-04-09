import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

export default function OnboardingPages() {
    const navigation = useNavigation();
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#FFDE59",
          image: <Image source={require("../../assets/mula-logo-2.png")} />,
          title: "Welcome to Mula!",
          subtitle: "We are here to help you with your financial journey.",
        },
        {
          backgroundColor: "#FFDE59",
          image: <></>,
          title: "What is Mula-Fi?",
          subtitle:
            "Mula-Fi is an app to help you build and receive feedback on investment plans.",
        },
        {
          backgroundColor: "#FFDE59",
          image: <></>,
          title: "How does it work?",
          subtitle:
            "We will ask you a few questions to help create a personalized template for you. You can then adjust the template to your liking, and we will provide feedback on your plan.",
        },
        {
          backgroundColor: "#FFDE59",
          image: <></>,
          title: "Choose your experience level to get started!",
          subtitle: "",
        },
      ]}
      onDone={() => navigation.navigate("StartScreen")}
      onSkip={() => navigation.navigate("StartScreen")}
    />
  );
}
