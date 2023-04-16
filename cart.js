import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Cart = () => {
    const [isRedCircle, setIsRedCircle] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.cartHeader}>
                <Text style={styles.cartHeaderText}>My Cart   (1)</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cartItemWrapper}>
                <View style={styles.cartItemContainer}>
                    <Text style={styles.itemName}>Rice & Curry</Text>
                    <Image style={styles.itemImage} source={{ uri: 'https://drive.google.com/uc?export=view&id=1BGzxd1NRmNSxWMJK0CenMYzvStlWWlZQ' }} />
                    <Text style={styles.itemPrice}>Rs. 350</Text>
                    <Image style={styles.icon} source={{ uri: 'https://drive.google.com/uc?export=view&id=1h4AVYRNcmOKlX-ou10w-g6DzDsdmpdg0' }} />
                    <Text style={styles.itemQuantity}>1</Text>
                    <Image style={styles.icon} source={{ uri: 'https://drive.google.com/uc?export=view&id=1ijQC4wv_SKXma3NFhNIwoSmBNtqYsMJI' }} />
                </View>
                <TouchableOpacity
                    style={[styles.redCircle, isRedCircle ? styles.redCircleActive : null]}
                    onPress={() => setIsRedCircle(!isRedCircle)}
                />

                <View style={styles.checkbuttonsContainer}>
                    <Text style={styles.checkbuttonText}>Rs. 650</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    cartHeader: {
        backgroundColor: '#6EC130',
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    cartHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    buttonsContainer: {
        marginTop: 40,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,

    },
    button: {
        backgroundColor: '#6EC130',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6EC130',
        borderRadius: 5,
        marginRight: 20,
        padding: 10,
    },
    cartItemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartItemWrapper: {
        position: 'relative',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    itemName: {
        flex: 1,
    },
    itemImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginHorizontal: 45,
    },
    itemPrice: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    redCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 2.5,
        borderColor: '#6EC130',
        position: 'absolute',
        top: 25,
        marginRight: 5,
        right: -10,
    },
    redCircleActive: {
        backgroundColor: '#de1738',
    },

    checkbuttonsContainer: {
        marginTop: 415,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    checkbuttonText: {
        marginTop: 10,
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },


});

export default Cart;