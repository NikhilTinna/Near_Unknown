import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from './navbar';
import Blogpost from './Blogpost';
import * as Location from 'expo-location';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import * as Sharing from 'expo-sharing'; // Import the Expo Sharing module
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';

const BlogPage = ({ navigation, route }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userName, setUserName] = useState('');
  const [selectedPostType, setSelectedPostType] = useState('All');
  const [userLocation, setUserLocation] = useState(null);
  const userEmail = route.params?.userEmail;

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setUserLocation({ latitude, longitude });
        } else {
          console.error('Permission to access location denied.');
        }
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    fetchUserLocation();

    const database = getDatabase();
    const postsRef = ref(database, 'posts');

    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.values(postsData);
        let sortedPosts;
        if (selectedPostType === 'Nearest') {
          sortedPosts = postsArray
            .filter((post) => userLocation && post.location)
            .sort((a, b) => {
              const distanceA = calculateDistance(userLocation, a.location);
              const distanceB = calculateDistance(userLocation, b.location);
              return distanceA - distanceB;
            });
        } else if (selectedPostType === 'All') {
          sortedPosts = postsArray;
        } else {
          sortedPosts = postsArray.filter((post) => post.postType === selectedPostType);
        }
        setBlogPosts(sortedPosts);
      }
    });

    return () => {
      off(postsRef);
    };
  }, [userLocation, selectedPostType]);

  const calculateDistance = (coord1, coord2) => {
    const R = 6371;
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sharePost = async (post) => {
    try {
      if (post.imageUri) {
        let localUri;
  
        // Check if the image URI is a local file URI (e.g., 'file://...')
        if (post.imageUri.startsWith('file://')) {
          localUri = post.imageUri;
        } else {
          // Download the image from a remote URL and get a local file URI
          const response = await fetch(post.imageUri);
          const blob = await response.blob();
          const fileName = 'image.jpg'; // Provide a suitable file name
          localUri = `${FileSystem.cacheDirectory}${fileName}`;
  
          // Write the blob data to the local file
          await FileSystem.writeAsStringAsync(localUri, blob, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
  
        // Share the local file URI
        const result = await Sharing.shareAsync(localUri);
  
        if (result.action === Sharing.sharedAction) {
          console.log('Shared successfully');
        } else if (result.action === Sharing.dismissedAction) {
          console.log('Sharing dismissed');
        }
      } else {
        console.error('Image URI is missing.'); // Handle missing image URI
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <ScrollView>
        <Text style={styles.welcomeText}>Welcome, {userEmail}</Text>
        <Picker
          selectedValue={selectedPostType}
          onValueChange={(itemValue) => setSelectedPostType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Posts" value="All" />
          <Picker.Item label="Adventure Places" value="Type 1" />
          <Picker.Item label="Food" value="Type 2" />
          <Picker.Item label="Other" value="Type 3" />
          <Picker.Item label="Nearest First" value="Nearest" />
        </Picker>
        <View>
          {blogPosts.map((post, index) => (
            <View key={index}>
              <Blogpost
                title={post.title}
                description={post.description}
                image={post.imageUri}
                location={post.location}
                postId={post.postId}
                userEmail={post.userEmail}
              />
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => sharePost(post)}
              >
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() =>
            navigation.navigate('Addpost', { userEmail: userEmail })
          }
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  roundButton: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
    color: 'white',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BlogPage;
