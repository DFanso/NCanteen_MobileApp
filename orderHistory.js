import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        const response = await axios.get(
          "http://20.2.80.190:1214/api/order-history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const orders = response.data.orderHistory.map((order) => ({
          ...order,
          total: parseFloat(order.price) || 0,
        }));
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, [reload]);
  const handleCancel = async (orderId) => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      console.log(token);
      await axios.put(
        `http://20.2.80.190:1214/api/checkouts/cancel/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order canceled successfully");
      setReload(!reload);
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Error canceling order");
    }
  };

  const renderItem = ({ item }) => {
    // Check if the order is older than 1 hour
    const orderDate = new Date(item.createdAt);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const canCancelOrder = item.status === "Pending" && orderDate > oneHourAgo;

    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderId}>Order ID: {item._id}</Text>
        <Text style={styles.orderDateTime}>
          Order Date & Time: {orderDate.toLocaleDateString()}{" "}
          {orderDate.toLocaleTimeString()}
        </Text>
        <Text style={styles.orderTotal}>
          Total: Rs. {item.price.toFixed(2)}
        </Text>

        <Text style={styles.orderStatus}>Status: {item.status}</Text>

        {canCancelOrder && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item._id)}
          >
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <Text style={styles.orderWarning}>
        Please keep in mind that orders cannot be canceled after one hour of
        being placed
      </Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  orderWarning: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#d43f3a",
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#6EC130",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6EC130",
  },
  orderDateTime: {
    fontSize: 14,
    color: "#6EC130",
  },
  orderTotal: {
    fontSize: 14,
    color: "#6EC130",
  },
  cancelButton: {
    backgroundColor: "#d43f3a",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  orderStatus: {
    fontSize: 14,
    color: "#6EC130",
    marginTop: 5,
  },
});

export default OrderHistory;
