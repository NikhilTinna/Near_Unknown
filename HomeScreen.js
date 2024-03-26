import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const BlogsScreen = () => {
  const blogs = [
    // Replace with your blog data
    {
      id: 1,
      title: 'Blog Title 1',
      image: 'https://example.com/image1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-07-13T10:30:00Z',
    },
    {
      id: 2,
      title: 'Blog Title 2',
      image: 'https://example.com/image2.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-07-14T14:45:00Z',
    },
  ];

  const handleViewBlog = (id) => {
    // Handle view blog functionality
  };

  const handleEditBlog = (id) => {
    // Handle edit blog functionality
  };

  const handleDeleteBlog = (id) => {
    // Handle delete blog functionality
  };

  return (
    <View>
      {blogs.map((blog) => (
        <View key={blog.id}>
          <Image source={{ uri: blog.image }} style={{ height: 200, width: '100%' }} />

          <Text>{blog.title}</Text>

          <Text numberOfLines={2}>{blog.content}</Text>

          <View>
            <TouchableOpacity onPress={() => handleViewBlog(blog.id)}>
              <Text>View</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleEditBlog(blog.id)}>
              <Text>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteBlog(blog.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>

          <Text>{new Date(blog.date).toLocaleString()}</Text>
        </View>
      ))}
    </View>
  );
};

export default BlogsScreen;
