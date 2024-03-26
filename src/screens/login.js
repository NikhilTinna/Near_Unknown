import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { button1 } from '../common/button'
import { errormessage, formgroup, head1, head2, input, label, link, link2 } from '../common/formcss'
import bg from '../assets/bg.jpg'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState(null);
  const [userName, setUserName] = useState('');
  const handleLogin = () => {
    if (email === '' || password === '') {
        setError('All fields are required');
        return;
      } else {
        const loginData = {
          email,
          password,
          returnSecureToken: true,
        };
  
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPBqXsQd_2UvuovxQ14etMjLzwtYvXJXo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              setErrormsg
              
              (data.error.message);
            } else {
              //               console.log("user data", user_data[0].name + " " + user_data[0].lastname );
              //             localStorage.setItem('token', token);
              setUserName(data.email);
          navigation.navigate('homepage', { userEmail: data.email });
            }
          })
          .catch((error) => {
            setErrormsg(error.message);
          });
      }
    };
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={bg} />

            <View style={styles.container1} >
                <View style={styles.s1}>
                    <Image style={styles.logo} source={logo} onPress={() => navigation.navigate('welcome')}/>
                    <Text style={styles.h1} onPress={() => navigation.navigate('welcome')}>Near unknown</Text>
                    <Text style={styles.small1}>explore the places</Text>
                </View>
                <View style={styles.s2}>

                    <Text style={head1}>Login</Text>
                    <Text style={head2}>Sign in to continue</Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                    }
                    <View style={formgroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input}
                            placeholder="Enter your email"

                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input}
                            placeholder="Enter your password"

                            secureTextEntry={true}

                            onChangeText= {(text) => setPassword(text)}
                            onPressIn={() => setErrormsg(null)}

                        />
                    </View>
                    <View style={styles.fp}>
                        <Text style={link}
                        onPress={()=>navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
                    </View>
                    <Text style={button1}
                         onPress={() => {
                            handleLogin();
                        }}
                    >Login</Text>
                    <Text style={link2}>Don't have an account?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('signup')}
                        >
                            Create a new account
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    patternbg: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    s1: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    small1: {
        color: '#bbb',
        fontSize: 17,
    },
    h1: {
        fontSize: 30,
        color: 'white',
    },
    s2: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    head1: {
        fontSize: 24,
        color: 'white',
    },
    head2: {
        fontSize: 14,
        color: '#bbb',
        marginBottom: 20,
    },
    errormessage: {
        color: '#ff6b6b',
        marginBottom: 10,
    },
    logo: {
        height: 120,
        resizeMode: 'contain',
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFB0CC",
        borderRadius: 20,
        padding: 10,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    // ... Other styles
});
