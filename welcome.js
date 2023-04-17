import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import HelaBojunWelcome from "./helaBojunWelcome";
import AudiWelcome from "./audiWelcome";
import HostelWelcome from "./hostelWelcome";
import OrderHistory from "./orderHistory";

const WelcomePage = ({ navigation }) => {
  const [page, setPage] = useState("Welcome");

  const handleButtonPress = (buttonName) => {
    setPage(buttonName);
  };

  useEffect(() => {
    const backAction = () => {
      if (page !== "Welcome") {
        setPage("Welcome");
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [page]);

  return (
    <View style={styles.container}>
      {page === "Welcome" ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <View style={styles.buttonsContainer}>

            <TouchableOpacity
              style={styles.orderbutton}
              onPress={() => handleButtonPress("order History")}
            >
              <Text style={styles.orderbuttonText}>Order  History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("Hela Bojun")}
            >
              <Text style={styles.buttonText}>Hela Bojun</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("Auditorium")}
            >
              <Text style={styles.buttonText}>Auditorium Canteen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress("Hostel")}
            >
              <Text style={styles.buttonText}>Hostel Canteen</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : page === "order History" ? (
        <OrderHistory />
      ) : page === "Hela Bojun" ? (
        <HelaBojunWelcome />
      ) : page === "Auditorium" ? (
        <AudiWelcome />
      ) : (
        <HostelWelcome />
      )}
      {/* <View style={styles.footer}>
                <Text style={styles.footerText}>ENJOY YOUR MEAL!</Text>
            </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#6EC130",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    width: "90%",
    color: "#6EC130",

  },

  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6EC130",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: "#6EC130",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    marginTop: 220,
    fontSize: 18,
    fontWeight: "bold",
    color: "#6EC130",
  },
  orderbuttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  orderbutton: {
    backgroundColor: "#6EC130",
    borderWidth: 2,
    borderColor: "#6EC130",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 120,

  }
});

export default WelcomePage;
