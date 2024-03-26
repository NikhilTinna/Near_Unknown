import React, { useState , useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button ,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import { getDatabase, ref, push, update,onValue, off  } from 'firebase/database';

const BlogPost = ({ title, description, image, location, postType,userEmail,postId}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(['']);
  const [likes, setLikes] = useState(0);
  const [isDeletePressed, setIsDeletePressed] = useState(false);
  const [expandMap, setExpandMap] = useState(false);
  useEffect(() => {
    // Load comments from the database when the component mounts
    const database = getDatabase();
    const commentsRef = ref(database, `comments/${postId}`);
  
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        setComments(Object.values(snapshot.val()));
      } else {
        setComments([]);
      }
    });
  
    // Cleanup the subscription when the component unmounts
    return () => {
      off(commentsRef, 'value', unsubscribe);
    };
  }, [postId]);

  const addComment = async () => {
    if (newComment.trim() !== '') {
      try {
        if (!postId) {
          console.error('postId is undefined or null');
          return;
        }
        const database = getDatabase();
        const commentsRef = ref(database, `comments/${postId}`);
        const newCommentRef = push(commentsRef);
  
        const commentData = {
          postId: postId,
          text: newComment,
          userEmail,
        };
  
        await update(ref(database), {
          [`comments/${postId}/${newCommentRef.key}`]: commentData,
        });
  
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };
  
  useEffect(() => {
    const database = getDatabase();
    const likesRef = ref(database, `likes/${postId}`);
  
    const unsubscribe = onValue(likesRef, (snapshot) => {
      if (snapshot.exists()) {
        setLikes(snapshot.val());
      } else {
        setLikes(0);
      }
    });
  
    // Cleanup the subscription when the component unmounts
    return () => {
      off(likesRef, 'value', unsubscribe);
    };
  }, [postId]);
  
  const toggleLike = async () => {
    try {
      if (!postId) {
        console.error('postId is undefined or null');
        return;
      }
      const database = getDatabase();
      const likesRef = ref(database, `likes/${postId}`);
  
      // Increment the likes count by 1
      await update(ref(database), {
        [`likes/${postId}`]: likes + 1,
      });
  
      // Update the local state
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const toggleExpandMap = () => {
    setExpandMap(!expandMap);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowComments(!showComments)}
      onLongPress={() => setIsDeletePressed(true)}
      onPressOut={() => setIsDeletePressed(false)}
    >
      {isDeletePressed && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // Implement the logic to delete the post from the database here
            // You can call an API or perform any other action as needed
            // After deletion, you can update the UI accordingly (e.g., remove the post from the list)
          }}
        >
          <Icon name="trash" size={20} color="#FF0000" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{description}</Text>
      {location && location.latitude && location.longitude && (
        <View style={styles.mapContainer}>
          <TouchableOpacity
            style={styles.mapHeader}
            onPress={toggleExpandMap}
          >
            <Text style={styles.mapHeaderText}>
              {expandMap ? 'Hide Location' : 'See Location'}
            </Text>
          </TouchableOpacity>
          {expandMap && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            </MapView>
          )}
        </View>
      )}
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.likeCommentSection}>
      <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
  <Icon name="heart" size={20} color="#FFFFFF" />
</TouchableOpacity>
<Text style={styles.likesText}>{likes} </Text>

<TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.commentButton}>
  <Icon name="comment" size={20} color="#FFFFFF" />
</TouchableOpacity>

      </View>
      {showComments && (
  <View style={styles.commentSection}>
    <Text style={styles.commentTitle}>Comments:</Text>
    {comments.map((comment, index) => (
      <View key={index} style={styles.comment}>
        <Text style={styles.commentText}>
          {comment.text} - {comment.userEmail}
        </Text>
      </View>
    ))}
    <View style={styles.addCommentSection}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Post" onPress={addComment} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    backgroundColor: '#1a1a1a',
    color: '#E5E5E5',
    marginBottom: 20,
  },
  mapLabel: {
    fontSize: 14,
    color: 'blue',
    textAlign: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  likesText: {
    color: 'green', 
    fontSize: 16,   
  },
  
  mapContainer: {
    width: '100%',
    marginBottom: 10,
  },
  mapHeader: {
    backgroundColor: '#262626',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  mapHeaderText: {
    color: '#FFFFFF',
  },
  map: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  commentSection: {
    marginTop: 10,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  comment: {
    fontSize: 14,
    color: '#E5E5E5',
    marginBottom: 5,
  },
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#262626',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  commentText: {
    color: 'white', 
    fontSize: 16,   
  },
  
  likeCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    flex: 1,
    backgroundColor: '#262626',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  likeButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  commentButton: {
    flex: 1,
    backgroundColor: '#262626',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  commentButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default BlogPost;
