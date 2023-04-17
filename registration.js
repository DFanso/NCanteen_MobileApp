import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

const RegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleRegistration = () => {
    if (!fullName) {
      setErrorMessage("Full Name is required.");
    } else if (!email || !validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (!studentId) {
      setErrorMessage("Student ID is required.");
    } else if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMessage("Please enter a valid mobile number.");
    } else if (!password || password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
      const userData = {
        fullName,
        email,
        studentId,
        mobileNumber,
        password,
      };

      axios
        .post("http://192.168.1.7:3000/api/client/register", userData)
        .then((response) => {
          console.log(response.data);
          // Navigate to the next screen or show a success message.
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
          alert("Login failed. Please try again.");
        });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://drive.google.com/uc?id=1g-rTXtW8LFsSdYin3WQmLRgUALgDEun3",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.heading}>N - Canteen App</Text>
      <Text style={styles.loginText}>Registration</Text>

      <View style={styles.inputContainer}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?id=1YCeollrOUsBHN8S1TK8QdJI3VyMBeMX8",
          }}
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
          source={{
            uri: "https://drive.google.com/uc?id=1l3BXVAu2cIYfvUboCD40n6rxcpBMJdK2",
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
            uri: "https://drive.google.com/uc?id=1QSn-3bsGc3aXVJUweIWyyNhOKej4vWas",
          }}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          placeholderTextColor="white"
          onChangeText={(text) => setStudentId(text)}
          value={studentId}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?id=1wuBoXb6XKy73Fw85vwy1xOqtaQLLq5t5",
          }}
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

      <View style={styles.inputContainer}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?id=1Hr_wcqMpXgZMItKIUSoa_Ow3uyiI6gNh",
          }}
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
      {errorMessage !== "" && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.loginButton} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
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
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
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

export default RegistrationScreen;
