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

const HelaBojunLunch = ({ navigation }) => {
  const [page, setPage] = useState("helaBojunLunch");
  const [foodItems, setFoodItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.7:3000/api/food-items/list?canteenId=643bf46d34379c74054a99ee&mealType=lunch"
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
      if (page !== "helaBojunLunch") {
        setPage("helaBojunLunch");
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
      {page === "helaBojunLunch" ? (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
            </View>
            <View style={styles.helaBojunContainer}>
              <Text style={styles.hostelText}>Hela Bojun</Text>
            </View>

            <View style={styles.menuContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuHeaderText}>Lunch Menu</Text>
                </View>
              </View>
              {foodItems.map(renderFoodItem)}
            </View>
          </ScrollView>
        </View>
      ) : (
        <Cart navigation={navigation} />
      )}
      <View style={styles.cartButtonContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleButtonPress("cart")}
        >
          <Text style={styles.cartButtonText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  helaBojunContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  hostelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  menuContainer: {
    marginTop: 15,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuHeader: {
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    padding: 5,
  },
  menuHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  foodImageContainer: {
    width: "30%",
  },
  foodImage: {
    width: "100%",
    height: 70,
  },
  foodInfoContainer: {
    width: "70%",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  availableQuantityText: {
    fontSize: 14,
    color: "green",
  },
  outOfStockText: {
    fontSize: 14,
    color: "red",
  },
  addToCartButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 5,
  },
  addToCartButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  cartButton: {
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    padding: 10,
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HelaBojunLunch;
