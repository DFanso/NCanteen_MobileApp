import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import WelcomePage from "./welcome.js";
import { CartContext } from "./CartContext";

const Payment = ({ navigation, totalPrice, cartItems }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [page, setPage] = useState("payment");
  const { addToCart, clearCart } = useContext(CartContext);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleCardNumberChange = (value) => {
    setCardNumber(value);
  };

  const handleExpiryChange = (value) => {
    if (/^((0[1-9]|1[0-2])\/)?\d{0,2}$/.test(value)) {
      if (value.length === 2 && !value.endsWith("/")) {
        value += "/";
      }
      setExpiry(value);
    }
  };

  const handleCvcChange = (value) => {
    setCvc(value);
  };

  const handleSubmit = async () => {
    const isNameValid = name.trim().length > 0;
    const isCardNumberValid = /^\d{16}$/.test(cardNumber);
    const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
    const isCvcValid = /^\d{3}$/.test(cvc);

    if (!isNameValid || !isCardNumberValid || !isExpiryValid || !isCvcValid) {
      Alert.alert("Validation Error", "Please enter valid payment details.");
      return;
    }
    // Add your payment submission logic here
    console.log("Payment submitted");
    // Retrieve the JWT token from AsyncStorage
    const token = await AsyncStorage.getItem("jwt");
    const canteenId = await AsyncStorage.getItem("canteenId");

    // Prepare the data to be sent to the API
    const data = {
      canteenId,
      amount: totalPrice, // use the passed prop as the amount
      items: cartItems.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
      })),
    };

    // Send the data to your API using Axios
    try {
      const response = await axios.post(
        "http://159.89.203.249:2001/api/checkouts",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token in the headers
          },
        }
      );

      console.log("Payment successful:", response.data);
      Alert.alert("Thank you for your payment", "", [
        {
          text: "OK",
          onPress: () => {
            handleButtonPress("welcome");
            clearCart();
          },
        },
      ]);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleButtonPress = (buttonName) => {
    setPage(buttonName);
  };

  useEffect(() => {
    const backAction = () => {
      if (page !== "payment") {
        setPage("payment");
        clearCart();
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
    <>
      {page === "payment" ? (
        <View style={styles.container}>
          <Text style={styles.title}>Payment</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            placeholder="Name on Card"
          />
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            placeholder="Card Number"
            keyboardType="numeric"
            maxLength={16}
          />
          <TextInput
            style={styles.input}
            value={expiry}
            onChangeText={handleExpiryChange}
            placeholder="Expiry (MM/YY)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={cvc}
            onChangeText={handleCvcChange}
            placeholder="CVC"
            keyboardType="numeric"
            maxLength={3}
          />

          <TextInput
            style={[styles.input, { opacity: 0.9 }]} // set opacity to 0.5 and editable to false
            value={`Rs. ${totalPrice.toFixed(2)}`} // Update this line
            editable={false}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={[styles.button, styles.buttonEnabled]} // remove the ternary operator
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WelcomePage />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6EC130",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6EC130",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6EC130",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: "40%",
    alignSelf: "center",
  },
  buttonEnabled: {
    opacity: 1,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
  },
});
export default Payment;
