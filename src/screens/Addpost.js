  import React, { useState, useRef } from 'react';
  import { View, Text, StyleSheet, TextInput,ScrollView } from 'react-native';
  import { Button, Image } from 'react-native-elements';
  import { Picker } from '@react-native-picker/picker';

  import * as ImagePicker from 'expo-image-picker';
  import * as Location from 'expo-location';
  import { Ionicons } from '@expo/vector-icons'; 
  import { getDatabase, ref, push, set } from 'firebase/database';
  import MapView, { Marker } from 'react-native-maps';

  const AddPostScreen = ({ route,navigation }) => {
    const DEFAULT_LATITUDE = 37.7749;
    const DEFAULT_LONGITUDE = -122.4194;
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState('');
    const [postType, setPostType] = useState('Type 1');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);
    const [manualLocationSelection, setManualLocationSelection] = useState(false);
    const [selectedManualLocation, setSelectedManualLocation] = useState(null);

    const userEmail = route.params?.userEmail;

    const mapRef = useRef(null);

    const handleImageUpload = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    };

    const handleLocationSelect = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied.');
          return;
        }

        const locationData = await Location.getCurrentPositionAsync({});
        const selectedLocation = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        };

        setLocation(selectedLocation);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    const handleMapPress = (event) => {
      if (manualLocationSelection) {
        setSelectedManualLocation(event.nativeEvent.coordinate);
      }
    };

    const handleSubmit = async () => {
      try {
        
        if (!title || !description || !imageUri || (!location && !selectedManualLocation)) {
          alert('Please fill in all mandatory fields.');
          return;
        }

        const database = getDatabase();
        const postRef = ref(database, 'posts');
        const newPostRef = push(postRef);

        const postData = {
          postId: newPostRef.key,
          title,
          postType,
          description,
          imageUri,
          location: location || selectedManualLocation || null,
          userEmail,
        };

        await set(newPostRef, postData);

        console.log('Post added successfully');
        navigation.navigate('homepage',{ userEmail });
        // Navigate to the homepage or perform any other action
      } catch (error) {
        console.error('Error adding post:', error);
      }
    };

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add a Post</Text>
          <Text style={styles.userEmail}>Email: {userEmail}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Button
            icon={
              <Ionicons name="image" size={24} color="white" /> // Image icon
            }
            onPress={() => handleImageUpload()}
            buttonStyle={styles.iconButton} // Style for the icon button
          />
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <Picker
          selectedValue={postType}
          onValueChange={(itemValue) => setPostType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Places" value="Type 1" />
          <Picker.Item label="Food" value="Type 2" />
          <Picker.Item label="Others" value="Type 3" />
        </Picker>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
          multiline
        />
        {!manualLocationSelection && (
          <Button
            icon={
              <Ionicons name="location" size={24} color="white" /> // Location icon
            }
            title="Select Location"
            onPress={handleLocationSelect}
            buttonStyle={styles.iconButton} // Style for the icon button
          />
        )}
        {manualLocationSelection && selectedManualLocation && (
          <Button
            icon={
              <Ionicons name="checkmark" size={24} color="white" /> // Checkmark icon
            }
            title="Use Selected Location"
            onPress={() => {
              setLocation(selectedManualLocation);
              setManualLocationSelection(false);
            }}
            buttonStyle={styles.iconButton} // Style for the icon button
          />
        )}
        {!manualLocationSelection && (
          <Button
            icon={
              <Ionicons name="pin" size={24} color="white" /> // Pin icon
            }
            title="Select Location Manually"
            onPress={() => setManualLocationSelection(true)}
            buttonStyle={styles.iconButton} // Style for the icon button
          />
        )}
        {(location || selectedManualLocation) && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: (location || selectedManualLocation)?.latitude || DEFAULT_LATITUDE,
              longitude: (location || selectedManualLocation)?.longitude || DEFAULT_LONGITUDE,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handleMapPress}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            )}
            {manualLocationSelection && selectedManualLocation && (
              <Marker coordinate={selectedManualLocation} pinColor="blue" />
            )}
          </MapView>
        )}
        <Button
          icon={
            <Ionicons name="add" size={24} color="white" /> // Add icon
          }
          title="Add Post"
          onPress={handleSubmit}
          buttonStyle={styles.iconButton} // Style for the icon button
        />
        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black', // Black background
      padding: 20,
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      color: 'white', // White header text
      fontSize: 24,
      fontWeight: 'bold',
    },
    userEmail: {
      color: 'white', // White user email text
    },
    imageContainer: {
      marginBottom: 20,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 10,
      padding: 10,
      backgroundColor: 'white', // White input background
    },
    map: {
      width: '100%',
      height: 200,
      marginTop: 10,
    },
    iconButton: {
      backgroundColor: 'transparent', // Make the button transparent
    },
  });

  export default AddPostScreen;
