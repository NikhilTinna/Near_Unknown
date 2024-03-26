import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import welcomelogo from '../assets/logo.png'
import { button1 } from '../common/button'
import bg from '../assets/bg.jpg'
const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.patternbg} source={bg} />

            <View style={styles.container1}>

               
            <Image style={styles.logo} source={welcomelogo} />               
                <Text style={button1}
                    onPress={() => navigation.navigate('login')}
                >Login</Text>
                <Text style={button1}
                    onPress={() => navigation.navigate('signup')}
                >Signup</Text>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    head: {
        fontSize: 30,
        color: '#fff',
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    logo: {
        height: '20%',
        resizeMode: 'contain',
        marginBottom: 50,
    }
})