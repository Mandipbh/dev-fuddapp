import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {images, scale, theme} from '../utils';
import InputBox from './InputBox';
import Button from './Button';
import {useState} from 'react';
import ApiService from '../utils/ApiService';
import {useSelector} from 'react-redux';

const SaveAddress = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState(null);
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const userData = useSelector(state => state?.UserReducer?.userDetails);
  console.log('user details > ', userData);
  const handleSave = () => {
    try {
      const frmData = {
        Latitute: '',
        Longitude: '',
        UserId: '18341',
        AddressId: 0,
        StreetNo: '15',
        Address: address,
        City: 'test',
        Postcode: '380059',
        FullAddress: address,
        Firstname: firstName,
        Lastname: lastName,
        Description: 'test',
        Phone: mobile,
      };
      const options = {payloads: frmData};
      ApiService.post('Users/SaveUserAddress', options)
        .then(res => {
          console.log('res address', res.data);
        })
        .catch(error => {
          console.log('error catch ', error.response.data);
        });
    } catch (error) {
      console.log('eror save address ', error);
    }
  };
  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}>
        <InputBox
          value={firstName}
          onChangeText={txt => {
            setFirstName(txt);
          }}
          placeholder="first name"
          style={{marginBottom: scale(3), width: '95%'}}
        />
        <InputBox
          value={lastName}
          onChangeText={txt => {
            setLastname(txt);
          }}
          placeholder="last name"
          keyboardType="numeric"
          style={{marginBottom: scale(3)}}
        />
        <InputBox
          value={address}
          onChangeText={txt => {
            setAddress(txt);
          }}
          placeholder="Intercom at, staircase, floor"
          style={{marginBottom: scale(3)}}
        />
        <InputBox
          value={mobile}
          onChangeText={txt => {
            setMobile(txt);
          }}
          placeholder="Telephone"
          style={{marginBottom: scale(3)}}
        />
      </ScrollView>
      <Image source={images.appIcon} style={styles.appIcon} />
      <Button
        title="Salva indirinzo"
        titleStyle={styles.btntxt}
        style={styles.btn}
        onPress={() => {
          handleSave();
        }}
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
