import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import HelaBojunBreakfast from './helaBojunBreakfast.js';
import HelaBojunLunch from './helaBojunLunch.js';
import HelaBojunDinner from './helaBojunDinner.js';

const HelaBojunWelcome = ({ navigation }) => {
    const [page, setPage] = useState('helaBojunWelcome');

    const handleButtonPress = (buttonName) => {
        setPage(buttonName);
    };

    useEffect(() => {
        const backAction = () => {
            if (page !== 'helaBojunWelcome') {
                setPage('helaBojunWelcome');
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [page]);

    return (
        <>
            {page === 'helaBojunWelcome' ? (
                <View style={styles.container}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome</Text>
                    </View>
                    <View style={styles.helaBojunContainer}>
                        <Text style={styles.hostelText}>Hela Bojun</Text>
                    </View>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => handleButtonPress('breakfast')}>
                            <Text style={styles.menuButtonText}>Breakfast</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => handleButtonPress('lunch')}>
                            <Text style={styles.menuButtonText}>Lunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => handleButtonPress('dinner')}>
                            <Text style={styles.menuButtonText}>Dinner</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : page === 'breakfast' ? (
                <HelaBojunBreakfast />
            ) : page === 'lunch' ? (
                <HelaBojunLunch />
            ) : (
                <HelaBojunDinner />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 30,
        borderWidth: 2,
        borderColor: '#6EC130',
        backgroundColor: '#fff',
        marginBottom: 20,
        marginLeft: 48,
        marginRight: 48,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6EC130',
        padding: 10,
    },
    helaBojunContainer: {
        backgroundColor: '#6EC130',
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginLeft: 48,
        marginRight: 48,
    },
    hostelText: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    menuContainer: {
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 30,
    },
    menuButton: {
        marginTop: 50,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#6EC130',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '60%',
    },
    menuButtonText: {
        color: '#6EC130',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default HelaBojunWelcome;

