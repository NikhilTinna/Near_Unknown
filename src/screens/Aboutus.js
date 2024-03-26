import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Welcomelogo from '../assets/logo.png'

const AboutUsPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ Welcomelogo }} // Replace with your logo image URL
        style={styles.logo}
      />
      <Text style={styles.title}>About Near Unknown</Text>
      <Text style={styles.description}>
        Welcome to Near Unknown, your gu
        
        ide to exploring nearby places and uncovering hidden gems
        around you. Whether you're new to a city or simply looking for exciting experiences in your
        vicinity, our app is here to help you discover the unexplored.
      </Text>
      <Text style={styles.description}>
        From quaint cafes to bustling markets, scenic parks to historic landmarks, Near Unknown
        connects you with local treasures that you may not have known existed. Get ready to embark
        on a journey of exploration and create memorable adventures right in your own neighborhood.
      </Text>
      <Text style={styles.description}>
        Join us in discovering the beauty and diversity of your surroundings. Embrace the joy of
        venturing into the unknown and make every day an opportunity to explore new horizons with
        Near Unknown.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AboutUsPage;
