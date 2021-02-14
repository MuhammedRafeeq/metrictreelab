import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {setUserData} from '../redux/actions';

const Home = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(
      setUserData({
        isLoggedIn: false,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text h3>Welcome</Text>
      <Text h4>{userData.email}</Text>
      <Button
        title="Logout"
        buttonStyle={styles.button}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 30,
  },
});

export default Home;
