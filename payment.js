import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Payment = ({ totalPrice, cartItems }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleCardNumberChange = (value) => {
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (value) => {
    if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
      if (value.length === 2 && !value.endsWith("/")) {
        value += "/";
      }
      setExpiry(value);
    }
  };

  const handleCvcChange = (value) => {
    if (/^\d{0,3}$/.test(value)) {
      setCvc(value);
    }
  };

  const handleSubmit = async () => {
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
        "http://192.168.1.4:3000/api/checkouts",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token in the headers
          },
        }
      );

      console.log("Payment successful:", response.data);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
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
