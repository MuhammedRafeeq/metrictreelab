import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Screens/Home';
import Login from './Screens/Login';
import {setUserData} from './redux/actions';
import Signup from './Screens/Signup';

const Stack = createStackNavigator();

const Router = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrapAsync = async () => {
      //   let userToken;

      try {
        isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      } catch (e) {
        // Restoring token failed
      }

      if (isLoggedIn == 'true')
        dispatch(
          setUserData({
            isLoggedIn: true,
          }),
        );
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen name="home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
