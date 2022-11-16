import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images, scale, theme} from '../utils';
import Icon from 'react-native-vector-icons/Feather';
import {Label} from './Label';
import {dummyAddress} from '../utils/MockData';
import InputBox from './InputBox';
import Button from './Button';

const SaveAddress = () => {
  return (
    <View>
      <ScrollView
        style={{height: theme.SCREENHEIGHT * 0.35}}
        contentContainerStyle={{alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}>
        <InputBox
          placeholder="Davide Barba"
          style={{marginBottom: scale(3), width: '95%'}}
        />
        <InputBox placeholder="3804499872" style={{marginBottom: scale(3)}} />
        <InputBox
          placeholder="Viale dalle palle, Palermo PA, Italia"
          style={{marginBottom: scale(3)}}
        />
        <InputBox placeholder="88" style={{marginBottom: scale(3)}} />
        <InputBox
          placeholder="Citofonare a, scala, piano"
          style={{marginBottom: scale(3)}}
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
    opacity: 0.4,
  },
  btn: {
    // padding: scale(5),
    // paddingHorizontal: scale(10),
    backgroundColor: theme.colors.primary,
    borderRadius: scale(20),
    // marginHorizontal: scale(20),
    width: '100%',
  },
});
