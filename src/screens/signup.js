import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { button1 } from '../common/button'
import { errormessage, formgroup, head1, head2, input, input1, label, link, link2 } from '../common/formcss'
import logo from '../assets/bg.jpg'
import bg from '../assets/bg.jpg'
const Signup = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [errormsg, setErrormsg] = useState(null);

  const isWhitespace = (text) => {
    return /\s/.test(text);
  };

  const SendToFirebase = async () => {
    if (
      fdata.username === '' ||
      fdata.name === '' ||
      fdata.email === '' ||
      fdata.password === ''
    ) {
      setErrormsg('All fields are required');
      return;
    } else if (isWhitespace(fdata.username)) {
      setErrormsg('Username cannot contain whitespace');
      return;
    } else if (fdata.password !== fdata.cpassword) {
      setErrormsg('Password and Confirm Password must be the same');
      return;
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          fdata.email,
          fdata.password
        );

        // User creation successful
        console.log('User registered:', userCredential.user);
        // You can navigate to the next screen or perform other actions here
        navigation.navigate('login');
      } catch (error) {
        console.error('Error registering user:', error.message);
        setErrormsg(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={bg} />

      <View style={styles.container1}>
        <View style={styles.s1}></View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Create a New Account</Text>
          <Text style={link2}>
            Already Registered?&nbsp;
            <Text style={link} onPress={() => navigation.navigate('login')}>
              Login here
            </Text>
          </Text>
          {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={label}>Username</Text>
            <TextInput
              style={input}
              placeholder="Enter your Username"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, username: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Name</Text>
            <TextInput
              style={input}
              placeholder="Enter your Name"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, name: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput
              style={input}
              placeholder="Enter your Email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput
              style={input}
              placeholder="Enter your Password"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Confirm Password</Text>
            <TextInput
              style={input}
              placeholder="Confirm your Password"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              SendToFirebase();
            }}
          >
            <Text style={button1}>Signup</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: '#1a1a1a',
  },
  patternbg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  small1: {
    color: '#E5E5E5',
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: '#E5E5E5',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#262626',
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formgroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: '#FFFFFF',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 10,
    color: '#FFFFFF',
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
