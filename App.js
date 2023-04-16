import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import RegistrationForm from './registration.js';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>N Canteen</Text>
      <View style={styles.subHeadingContainer}>
        <View style={styles.subHeadingBorderTop} />
        <Text style={styles.subHeading}>HEALTHY FOODS MAKE HEALTHY LIFE</Text>
        <View style={styles.subHeadingBorderBottom} />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationForm} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1fea00',
    textAlign: 'center',
    marginBottom: 12,
  },
  subHeadingContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  subHeadingBorderTop: {
    borderTopWidth: 2,
    borderTopColor: '#228b22',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  subHeadingBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#228b22',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  subHeading: {
    fontSize: 21,
    fontWeight: 'normal',
    color: '#1fea00',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CBB17',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  loginButton: {
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
