import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

const sampleOrderHistory = [
    {
        id: '001',
        date: '2023-04-15',
        time: '13:45',
        total: 25.5,
    },
    {
        id: '002',
        date: '2023-04-10',
        time: '11:20',
        total: 19.99,
    },
    {
        id: '003',
        date: '2023-04-05',
        time: '15:30',
        total: 34.0,
    },
];

const OrderHistory = () => {
    const handleCancel = (orderId) => {
        console.log(`Cancel order with ID: ${orderId}`);
        // Add your cancellation logic here
    };

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text style={styles.orderDateTime}>Order Date & Time: {item.date} {item.time}</Text>
            <Text style={styles.orderTotal}>Total: Rs. {item.total.toFixed(2)}</Text>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(item.id)}
            >
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order History</Text>
            <Text style={styles.orderWarning}>Please keep in mind that orders cannot be canceled after one hour of being placed</Text>
            <FlatList
                data={sampleOrderHistory}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6EC130',
        marginBottom: 20,
    },
    orderWarning: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#d43f3a',
        marginBottom: 20,
    },
    orderItem: {
        backgroundColor: '#f5f5f5',
        borderWidth: 2,
        borderColor: '#6EC130',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6EC130',
    },
    orderDateTime: {
        fontSize: 14,
        color: '#6EC130',
    },
    orderTotal: {
        fontSize: 14,
        color: '#6EC130',
    },
    cancelButton: {
        backgroundColor: '#d43f3a',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default OrderHistory;
