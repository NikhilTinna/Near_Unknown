import React from 'react';
import { View ,LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import welcome from './src/screens/welcome';
import login from './src/screens/login';
import signup  from './src/screens/signup';
import homepage from './src/screens/homepage';
import Navbar from './src/screens/navbar';
import Addpost from './src/screens/Addpost'
import AboutUsPage from './src/screens/Aboutus';
import Contactus from './src/screens/Contactus';
import ForgotPassword from './src/screens/ForgotPassword';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={welcome}
        options={
          {
            headerShown: false
          }
        } />
        <Stack.Screen name="login" component={login}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="homepage" component={homepage}
          options={
            {
              headerShown: false,
            
              header: () => <Navbar />,
            }
          }

        />
        <Stack.Screen name="signup" component={signup}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
          options={
            {
              headerShown: false
            }
          }

        />
       
        <Stack.Screen name="navbar" component={Navbar}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="Addpost" component={Addpost}
          options={
            {
              headerShown: false
            }
          }

        />
         <Stack.Screen name="Aboutus" component={AboutUsPage}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="Contactus" component={Contactus}
          options={
            {
              headerShown: false
            }
          }

        />
      </Stack.Navigator>
      
      
    </NavigationContainer>

  );
};

export default App;
LogBox.ignoreAllLogs();