import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import axios from "axios";
import Cart from "./cart.js";
import { CartContext } from "./CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AudiDinner = ({ navigation }) => {
  const [page, setPage] = useState("audiDinner");
  const [foodItems, setFoodItems] = useState([]);
  const { addToCart, clearCart } = useContext(CartContext);
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        "http://20.2.80.190:1214/api/food-items/list?canteenId=643bf47b34379c74054a99f1&mealType=dinner"
      );
      setFoodItems(response.data.foodItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const canteenId = "643bf47b34379c74054a99f1";
    storeCanteenId(canteenId);
    fetchFoodItems();
  }, []);

  const storeCanteenId = async (canteenId) => {
    try {
      await AsyncStorage.setItem("canteenId", canteenId);
    } catch (error) {
      console.error("Error saving canteen ID:", error);
    }
  };
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleButtonPress = (buttonName) => {
    setPage(buttonName);
  };

  useEffect(() => {
    const backAction = () => {
      if (page !== "audiDinner") {
        setPage("audiDinner");
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

  const renderFoodItem = (foodItem) => {
    const outOfStock = foodItem.quantity <= 0;

    const handleAddToCart = () => {
      if (!outOfStock) {
        addToCart(foodItem);
      }
    };

    return (
      <View style={styles.menuItem} key={foodItem._id}>
        <View style={styles.foodImageContainer}>
          <Image
            style={styles.foodImage}
            source={{
              uri: foodItem.imageUrl,
            }}
          />
        </View>
        <View style={styles.foodInfoContainer}>
          <Text style={styles.foodName}>{foodItem.name}</Text>
          <Text style={styles.foodPrice}>Rs. {foodItem.price.toFixed(2)}</Text>
          {outOfStock ? (
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          ) : (
            <Text style={styles.availableQuantityText}>
              Available Quantity: {foodItem.quantity}
            </Text>
          )}
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              outOfStock ? styles.addToCartButtonDisabled : {},
            ]}
            onPress={handleAddToCart}
            disabled={outOfStock}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {page === "audiDinner" ? (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
            </View>
            <View style={styles.helaBojunContainer}>
              <Text style={styles.hostelText}>Auditorium Canteen</Text>
            </View>

            <View style={styles.menuContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuHeaderText}>Dinner Food Menu</Text>
                </View>

                <TouchableOpacity onPress={() => handleButtonPress("cart")}>
                  <Image
                    style={styles.cartIcon}
                    source={{
                      uri: "https://drive.google.com/uc?export=view&id=1wsIvFn-dgqzLn2Dj65_piCFMbHQLkBKK",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.orderText}>
                Please order the items you want at least half hour before.
              </Text>
              <View style={styles.menuItemsContainer}>
                {foodItems.map((foodItem) => renderFoodItem(foodItem))}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <Cart />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#6EC130",
    backgroundColor: "#fff",
    marginBottom: 20,
    marginLeft: 48,
    marginRight: 48,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6EC130",
    padding: 10,
  },
  menuContainer: {
    margin: 15,
    paddingTop: 10,
  },
  menuHeader: {
    borderWidth: 2,
    borderColor: "#6EC130",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    width: "50%",
    marginLeft: 30,
  },
  menuHeaderText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#6EC130",
  },
  orderText: {
    marginVertical: 15,
    color: "#4EE476",
    textAlign: "center",
  },
  menuItemsContainer: {
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6EC130",
    marginBottom: 10,
  },
  foodImageContainer: {
    padding: 5,
  },
  foodImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  foodInfoContainer: {
    padding: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "center",
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6EC130",
    marginBottom: 5,
    alignSelf: "center",
  },
  addToCartButton: {
    backgroundColor: "#6EC130",
    borderRadius: 20,
    padding: 5,
    width: "60%",
    alignSelf: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  helaBojunContainer: {
    backgroundColor: "#6EC130",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginLeft: 48,
    marginRight: 48,
  },
  hostelText: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  /*cart*/
  cartIcon: {
    marginRight: 40,
    width: 25,
    height: 25,
  },

  /*cart*/
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  outOfStockText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    marginBottom: 5,
    alignSelf: "center",
  },

  availableQuantityText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6EC130",
    marginBottom: 5,
    alignSelf: "center",
  },
  addToCartButtonDisabled: {
    backgroundColor: "#ccc",
  },
});

export default AudiDinner;
