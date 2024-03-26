import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = () => {
    // Handle your form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    axios.post("https://formspree.io/f/mbjvgdba", {name, email, message})
      .then((res) => {
        console.log("Success", res);
        setSuccessMessage("Thanks for contacting us!");
      })
      .catch((err) => {
        console.log("Error", err);
        setSuccessMessage("Sorry, something went wrong. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Page</Text>
      <WebView
        originWhitelist={['*']}
        source={{html: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.929584385451!2d72.82521050000001!3d18.9345107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e71c2b104b%3A0x2b32a4be81621938!2sJai%20Hind%20College!5e0!3m2!1sen!2sin!4v1689427495941!5m2!1sen!2sin' />" }}
        style={styles.map}
      />
      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : (
        <View style={styles.contactForm}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textarea}
            placeholder="Enter your message"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Button title="Send" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5', // Light gray background
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333', // Dark gray text color
    },
    map: {
      width: '100%',
      height: 200,
      marginBottom: 20, // Added margin to separate map from form
    },
    contactForm: {
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: '#ccc', // Light gray border
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5, // Rounded corners
      backgroundColor: '#fff', // White background
    },
    textarea: {
      height: 100,
      borderColor: '#ccc', // Light gray border
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      textAlignVertical: 'top',
      borderRadius: 5, // Rounded corners
      backgroundColor: '#fff', // White background
    },
    sendButton: {
      backgroundColor: '#007bff', // Blue button color
      paddingVertical: 12,
      borderRadius: 5,
    },
    sendButtonText: {
      color: '#fff', // White text color
      fontSize: 16,
      textAlign: 'center',
    },
    successMessage: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      marginBottom: 20,
    },
  });
  
export default ContactPage;
