import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import WelcomePage from './welcome';
import RegistrationScreen from './registration.js';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    const handleLogin = () => {
        // Perform login validation here
        setShowWelcome(true);
    };
    const handleRegistration = () => {
        setShowRegistration(true);
    };
    if (showWelcome) {
        return <WelcomePage />;
    }

    if (showRegistration) {
        return <RegistrationScreen />;
    }


    return (
        <ImageBackground
            source={{ uri: 'https://drive.google.com/uc?id=1g-rTXtW8LFsSdYin3WQmLRgUALgDEun3' }}
            style={styles.container}
            resizeMode="cover">
            <Text style={styles.heading}>N - Canteen App</Text>
            <Text style={styles.loginText}>Login</Text>

            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1YCeollrOUsBHN8S1TK8QdJI3VyMBeMX8' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="white"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1Hr_wcqMpXgZMItKIUSoa_Ow3uyiI6gNh' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
                Don't have an account?{' '}
                <Text
                    style={styles.registerLink}
                    onPress={handleRegistration}>
                    Register
                </Text>
            </Text>
        </ImageBackground>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    loginText: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,

    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,

    },
    input: {
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 250,

    },
    loginButton: {
        backgroundColor: '#4CBB17',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 20,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    registerLink: {
        color: '#4CBB17',
        fontWeight: 'bold',
    },
});


export default LoginScreen;
