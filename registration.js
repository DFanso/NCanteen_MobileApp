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

const RegistrationScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [studentID, setStudentID] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <ImageBackground
            source={{ uri: 'https://drive.google.com/uc?id=1g-rTXtW8LFsSdYin3WQmLRgUALgDEun3' }}
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={styles.heading}>N - Canteen App</Text>
            <Text style={styles.loginText}>Registration</Text>

            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1YCeollrOUsBHN8S1TK8QdJI3VyMBeMX8' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="white"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1l3BXVAu2cIYfvUboCD40n6rxcpBMJdK2' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="white"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1QSn-3bsGc3aXVJUweIWyyNhOKej4vWas' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student ID"
                    placeholderTextColor="white"
                    onChangeText={(text) => setStudentID(text)}
                    value={studentID}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1wuBoXb6XKy73Fw85vwy1xOqtaQLLq5t5' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    placeholderTextColor="white"
                    onChangeText={(text) => setMobileNumber(text)}
                    value={mobileNumber}
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

            <View style={
                styles.inputContainer}>
                <Image
                    source={{ uri: 'https://drive.google.com/uc?id=1Hr_wcqMpXgZMItKIUSoa_Ow3uyiI6gNh' }}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Retype Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                />
            </View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.registerText}>
                Already have an account?{' '}
                <Text
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Login')}>
                    Login
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

export default RegistrationScreen;