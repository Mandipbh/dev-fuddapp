import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import InputBox from './InputBox';
import {Error, Label} from './Label';
import Button from './Button';
import {useState} from 'react';

const Login = props => {
  const {onPress, onPressLogin} = props;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  var regex = '^\\s+$';

  let error = false;
  const handleValidation = () => {
    if (name.trim() === '') {
      error = true;
      setNameErr('Please enter username');
    } else {
      setNameErr('');
    }
    if (password.trim() === '') {
      error = true;
      setpasswordErr('Please enter password');
    } else {
      error = false;
      setNameErr(null);
      setpasswordErr(null);
    }
    return error;
  };
  const handleLogin = () => {
    if (!handleValidation()) {
      onPress();
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <Label title={'Accedi al tuo account'} style={styles.title} />
      <View style={styles.devider} />
      <InputBox
        placeholder="Username"
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
        style={[styles.input, {marginTop: theme.SCREENHEIGHT * 0.03}]}
        keyboardType="email-address"
      />
      {nameErr && <Error error={nameErr} />}
      <InputBox
        secureTextEntry
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
        placeholder="Password"
        style={styles.input}
      />
      {passwordErr && <Error error={passwordErr} />}
      <Button
        title="Login"
        style={[styles.loginButton, {marginTop: scale(15)}]}
        titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
        onPress={() => {
          handleLogin();
        }}
      />
      <Button
        title="Password dimenticata"
        style={[styles.loginButton, {backgroundColor: theme.colors.purpal}]}
        titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
        onPress={onPressLogin}
      />
      <Label title="Oppure" style={[styles.title, {marginTop: scale(20)}]} />
      <View style={[styles.devider, {marginBottom: scale(10)}]} />
      <View>
        <Button
          ButtonIcon="facebook-with-circle"
          title="Login con Facebook"
          style={[styles.loginButton, {backgroundColor: theme.colors.blue}]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={onPressLogin}
        />
        <Button
          Icon="md-logo-apple"
          title="Accedi con Apple"
          style={[styles.loginButton, {backgroundColor: theme.colors.black}]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={onPressLogin}
        />
        <Button
          title="Registri con indrizzon email"
          style={[
            styles.loginButton,
            {backgroundColor: theme.colors.primary, zIndex: 1},
          ]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={onPress}
        />
      </View>
      <View style={styles.appTextView}>
        <Text style={styles.text}>
          Fudd<Text style={styles.text1}>app</Text>
        </Text>
      </View>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    // marginHorizontal: scale(8),
    // padding: scale(15),
    // paddingHorizontal: scale(22),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0.2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 0.5,
    // paddingVertical: theme.SCREENHEIGHT * 0.03,

    // elevation: scale(2),
    // borderRadius: scale(12),
  },
  title: {
    fontWeight: '500',
    fontSize: scale(15),
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
  devider: {
    height: scale(1),
    backgroundColor: theme.colors.gray1,
    width: '100%',
    marginVertical: scale(5),
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: scale(35),
  },
  buttonLabel: {
    fontWeight: '700',
    fontSize: scale(12),
  },
  text: {
    fontSize: scale(44),
    color: theme.colors.purpal,
    fontWeight: '700',
    opacity: 0.3,
  },
  text1: {
    fontSize: scale(44),
    color: theme.colors.primary,
    fontWeight: '700',
    opacity: 0.3,
  },
  appTextView: {
    position: 'absolute',
    bottom: scale(5),
    zIndex: -1,
  },
});
