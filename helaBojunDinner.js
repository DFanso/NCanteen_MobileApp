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

const HelaBojunDinner = ({ navigation }) => {
  const [page, setPage] = useState("helaBojunDinner");
  const [foodItems, setFoodItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.4:3000/api/food-items/list?canteenId=643bf46d34379c74054a99ee&mealType=dinner"
      );
      setFoodItems(response.data.foodItems);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      if (page !== "helaBojunDinner") {
        setPage("helaBojunDinner");
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
    const outOfStock = foodItem.quantity === 0;

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
      {page === "helaBojunDinner" ? (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
            </View>
            <View style={styles.helaBojunDinnerMenu}>
              {foodItems.map((foodItem) => renderFoodItem(foodItem))}
            </View>
          </ScrollView>
          <View style={styles.cartButtonContainer}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => handleButtonPress("cart")}
            >
              <Text style={styles.cartButtonText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Cart goBack={() => handleButtonPress("helaBojunDinner")} />
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
    justifyContent: "center",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  helaBojunDinnerMenu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  foodImageContainer: {
    marginRight: 15,
  },
  foodImage: {
    width: 90,
    height: 90,
  },
  foodInfoContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  foodPrice: {
    fontSize: 16,
    color: "#888",
  },
  outOfStockText: {
    color: "red",
    marginTop: 5,
  },
  availableQuantityText: {
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  addToCartButtonDisabled: {
    backgroundColor: "#ddd",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cartButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 3,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default HelaBojunDinner;
