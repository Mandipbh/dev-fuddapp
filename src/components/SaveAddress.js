import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {images, scale, theme} from '../utils';
import InputBox from './InputBox';
import Button from './Button';
import {useState} from 'react';

const SaveAddress = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');

  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}>
        <InputBox
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
          placeholder="Davide Barba"
          style={{marginBottom: scale(3), width: '95%'}}
        />
        <InputBox
          value={mobile}
          onChangeText={txt => {
            setMobile(txt);
          }}
          placeholder="3804499872"
          keyboardType="numeric"
          style={{marginBottom: scale(3)}}
        />
        <InputBox
          value={address}
          onChangeText={txt => {
            setAddress(txt);
          }}
          placeholder="Viale dalle palle, Palermo PA, Italia"
          style={{marginBottom: scale(3)}}
        />
        <InputBox
          value={number}
          onChangeText={txt => {
            setMobile(txt);
          }}
          placeholder="88"
          style={{marginBottom: scale(3)}}
        />
        <InputBox
          placeholder="Citofonare a, scala, piano"
          style={{marginBottom: scale(3)}}
          value={location}
          onChangeText={txt => {
            setLocation(txt);
          }}
        />
      </ScrollView>
      <Image source={images.appIcon} style={styles.appIcon} />
      <Button
        title="Salva indirinzo"
        titleStyle={styles.btntxt}
        style={styles.btn}
      />
    </View>
  );
};

export default SaveAddress;

const styles = StyleSheet.create({
  btntxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  appIcon: {
    height: scale(77),
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    top: scale(40),
    opacity: 0.35,
  },
  btn: {
    // padding: scale(5),
    // paddingHorizontal: scale(10),
    backgroundColor: theme.colors.primary,
    borderRadius: scale(20),
    // marginHorizontal: scale(20),
    width: '100%',
  },
  container: {height: theme.SCREENHEIGHT * 0.38, width: '100%'},
});
