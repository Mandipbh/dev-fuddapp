import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import InputBox from './InputBox';
import {Error, Label} from './Label';
import Button from './Button';
import {useState} from 'react';
import ApiService, {API} from '../utils/ApiService';
// import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../redux/Actions/UserActions';
import ForgotPassword from './appModel/ForgotPassword';
import {useEffect} from 'react';
const Login = props => {
  const {onPress, onPressRegister, isFocus} = props;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [recovery, setRecovery] = useState(false);
  const [load, setLoad] = useState(false);
  var regex = '^\\s+$';
  const disptch = useDispatch();
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
  useEffect(() => {
    setName('');
    setPassword('');
  }, [isFocus]);
  const handleLogin = () => {
    if (!handleValidation()) {
      try {
        setLoad(true);
        const folderFrm = {
          email: name,
          password: password,
        };
        const options = {payloads: folderFrm};
        ApiService.post(API.login, options)
          .then(res => {
            if (res.Status === 'Success') {
              console.log('res of login >> ', res);
              setLoad(false);

              // Toast.show('accesso riuscito', Toast.show);
              disptch(userData(res));
              disptch(isLogin(true));
              onPress();
            }
          })
          .catch(e => {
            setLoad(false);
            console.log('error in login> ', e.response?.data);
            Alert.alert(e.response?.data?.Errors[0]);
          });
      } catch (e) {
        console.log('e in login ', e);
        setLoad(false);
      }
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
      {!load ? (
        <Button
          title="Login"
          style={[styles.loginButton, {marginTop: scale(15)}]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={() => {
            handleLogin();
          }}
        />
      ) : (
        <ActivityIndicator size={scale(40)} color={theme.colors.primary} />
      )}
      <Button
        title="Password dimenticata"
        style={[styles.loginButton, {backgroundColor: theme.colors.purpal}]}
        titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
        onPress={() => setRecovery(!recovery)}
      />
      <Label title="Oppure" style={[styles.title, {marginTop: scale(20)}]} />
      <View style={[styles.devider, {marginBottom: scale(10)}]} />
      <View>
        {/* <Button
          ButtonIcon="facebook-with-circle"
          title="Login con Facebook"
          style={[styles.loginButton, {backgroundColor: theme.colors.blue}]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={() => {
            // Toast.show('Prossimamente', Toast.SHORT);
          }}
        />
        <Button
          Icon="md-logo-apple"
          title="Accedi con Apple"
          style={[styles.loginButton, {backgroundColor: theme.colors.black}]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={() => {
            // Toast.show('Prossimamente', Toast.SHORT);
          }}
        /> */}
        <Button
          title="Registri con indrizzon email"
          style={[
            styles.loginButton,
            {backgroundColor: theme.colors.primary, zIndex: 1},
          ]}
          titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
          onPress={onPressRegister}
        />
      </View>
      <View style={styles.appTextView}>
        <Text style={styles.text}>
          Fudd<Text style={styles.text1}>app</Text>
        </Text>
      </View>
      <ForgotPassword
        isVisible={recovery}
        title="Recupera Password"
        close={() => {
          setRecovery(false);
        }}
      />
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
    fontFamily: theme.fonts.josefinSans,
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
