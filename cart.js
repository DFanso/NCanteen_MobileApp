import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from "react-native";
import { CartContext } from "./CartContext";
import { ScrollView } from "react-native";
import Payment from "./payment.js";

const Cart = ({ navigation }) => {
  const [page, setPage] = useState("Cart");
  const { cartItems, removeFromCart } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleButtonPress = (buttonName) => {
    setPage(buttonName);
  };

  useEffect(() => {
    const backAction = () => {
      if (page !== "Cart") {
        setPage("Cart");
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
    <ScrollView>
      {page === "Cart" ? (
        <View style={styles.container}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartHeaderText}>
              My Cart ({cartItems.length})
            </Text>
          </View>

          {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View> */}

          <View style={styles.cartItemsContainer}>
            {cartItems.map((item, index) => (
              <View style={styles.cartItemContainer} key={`${item._id}-${index}`}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: item.imageUrl,
                  }}
                />
                <Text style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(item._id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.checkbuttonsContainer}>
            <Text style={styles.checkbuttonText}>
              Rs. {totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Payment")}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Payment />
      )}
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  cartHeader: {
    backgroundColor: "#6EC130",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  cartHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6EC130",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  itemInfo: {
    flexDirection: "column",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cartItemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginRight: 15,
  },
  itemPrice: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  redCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2.5,
    borderColor: "#6EC130",
    position: "absolute",
    top: 25,
    right: -10,
  },
  redCircleActive: {
    backgroundColor: "#de1738",
  },
  checkbuttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  checkbuttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
