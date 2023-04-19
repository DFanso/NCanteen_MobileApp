import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomePage from "./welcome";
import RegistrationScreen from "./registration.js";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "Password should be at least 8 characters long and contain at least one letter and one number"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.7:3000/api/client/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        await AsyncStorage.setItem("jwt", response.data.token);
        setShowWelcome(true);
      } else {
        Alert.alert("Error", "Invalid Login Credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Invalid request");
    }
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
      source={{
        uri: "https://drive.google.com/uc?id=1g-rTXtW8LFsSdYin3WQmLRgUALgDEun3",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.heading}>N - Canteen App</Text>
      <Text style={styles.loginText}>Login</Text>

      <View style={styles.inputContainer}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?id=1YCeollrOUsBHN8S1TK8QdJI3VyMBeMX8",
          }}
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
          source={{
            uri: "https://drive.google.com/uc?id=1Hr_wcqMpXgZMItKIUSoa_Ow3uyiI6gNh",
          }}
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don't have an account?{" "}
        <Text style={styles.registerLink} onPress={handleRegistration}>
          Register
        </Text>
      </Text>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  loginText: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 250,
    color: "#fff"
  },
  loginButton: {
    backgroundColor: "#4CBB17",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  registerLink: {
    color: "#4CBB17",
    fontWeight: "bold",
  },
});

export default LoginScreen;
