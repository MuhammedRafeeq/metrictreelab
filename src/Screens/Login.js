import React, { useState } from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {setUserData} from '../redux/actions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { login } from '../api-mock';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await login(values.email, values.password);
        dispatch(
          setUserData({
            isLoggedIn: true,
            userData: values,
          }),
        );
      } catch (e) {
        // saving error
        Alert.alert(e);
      }
      setLoading(false);

    },
  });

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Login
      </Text>
      <Input
        placeholder="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        maxLength={50}
        errorMessage={formik.touched.email && formik.errors.email}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        maxLength={50}
        errorMessage={formik.touched.password && formik.errors.password}
      />
      <Button loading={loading} onPress={formik.handleSubmit} title="Login" />
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate('signup')}>
          <Text style={styles.content2}>Signup</Text>
        </TouchableOpacity>
        <Text style={styles.content1}>no account yet?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row-reverse',
    marginTop: 10,
  },
  content1: {
    fontSize: 16,
  },
  content2: {
    fontSize: 16,
    color: '#0973c7',
    marginLeft: 10,
  },
});

export default Login;
