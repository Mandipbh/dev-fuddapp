import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import InputBox from './InputBox';
import {Label} from './Label';
import Button from './Button';

const Signup = props => {
  const {onPress} = props;
  return (
    <View style={styles.container}>
      <Label title={'Registrati'} style={styles.title} />
      <View style={styles.devider} />
      <InputBox placeholder="Nome" style={styles.input} />
      <InputBox placeholder="Cognome" style={styles.input} />
      <InputBox placeholder="Email" style={styles.input} />
      <InputBox placeholder="Telefono" style={styles.input} />
      <InputBox placeholder="Password" style={styles.input} />
      <InputBox placeholder="Conferma password" style={styles.input} />
      <Button
        title="Registrati"
        style={styles.loginButton}
        titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
        onPress={onPress}
      />

      <View style={styles.appTextView}>
        <Text style={styles.text}>
          Fudd<Text style={styles.text1}>app</Text>
        </Text>
      </View>
    </View>
  );
};
export default Signup;
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
    height: scale(40),
    marginTop: scale(10),
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
