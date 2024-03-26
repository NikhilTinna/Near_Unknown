import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon from the library
import { firebaseApp } from './firebase';
// import { withNavigation } from '@react-navigation/native';


const Navbar = ({ navigation }) => {
  const menuOptions = ['About us', 'Contact us']; // Add your menu items here

  const handleMenuItemSelect = (index) => {
    // console.log(navigate)
    switch (index) {
      case 0:
        navigation.navigate('Aboutus');
        break;
      case 1:
        navigation.navigate('Contactus');
        break;
      // Handle more cases as needed
    }
  };
  const handleLogout = async () => {
    try {
      //await firebase.auth().signOut();
      // You can also add any additional actions after successful logout here.
      // For example, you may want to navigate the user to the login screen.
      navigation.navigate('login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Menu button with dropdown */}
      <ModalDropdown
        options={menuOptions}
        dropdownStyle={styles.menuDropdown}
        dropdownTextStyle={styles.menuItemText}
        onSelect={(index) => handleMenuItemSelect(index)}
      >
        <Text style={styles.menuButtonText}>⋮</Text>
      </ModalDropdown>
      <Text style={styles.title}>NearUnknown</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
          <Text>
            <Icon name="sign-out" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#262626', // Dark Gray
    color: '#FFFFFF', // White
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White
},
buttonsContainer: {
    flexDirection: 'row',
},
logoutButton: {
    backgroundColor: '#262626', // Dark Gray
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
},
menuButtonText: {
    fontSize: 32,
    color: '#FFFFFF', // White
},
menuDropdown: {
    width: 150,
    marginTop: 60, // Adjust the position as needed
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
},
menuItemText: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
},
});

// export default withNavigation(Navbar);
export default Navbar;
