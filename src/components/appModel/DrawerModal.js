import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin, logout} from '../../redux/Actions/UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Label} from '../Label';
import ContactModal from './ContactModal';
import {useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import OrderModal from './OrderModal';

const DrawerModal = props => {
  const {isVisible, close, handlePayment, handleContact, handleMyOrder} = props;
  const navigation = useNavigation();
  const isLoginUser = useSelector(state => state.UserReducer?.login);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  console.log('Modal Visible ======', modalVisible);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    AsyncStorage.clear();
    dispatch(isLogin(false));
    close();
    navigation.navigate('home');
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      backdropOpacity={0.4}
      visible={isVisible}
      onRequestClose
      animationIn="slideOutLeft"
      animationOut="slideInLeft"
      animationInTiming={0.5}
      style={{width: '60%', margin: 0}}>
      <View style={styles.container}>
        <Icon
          name="x"
          size={scale(22)}
          color={theme.colors.black}
          onPress={() => close()}
          style={{marginTop: 55, alignSelf: 'flex-end'}}
        />
        <View
          style={{
            marginLeft: scale(25),
            marginTop: scale(130),
          }}>
          {isLoginUser ? (
            <>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => {
                  close();
                  navigation.navigate('ACCOUNT');
                }}>
                <Icon name="user" size={25} color={theme.colors.purpal} />
                <Text style={styles.btnText}>PROFILE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => {
                  close();
                  navigation.navigate('ACCOUNT');
                }}>
                <Icon name="map-pin" size={25} color={theme.colors.purpal} />
                <Text style={styles.btnText}>MY ADDRESSES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={handlePayment}>
                <Icon
                  name="credit-card"
                  size={25}
                  color={theme.colors.purpal}
                />
                <Text style={styles.btnText}>PAYMENT METHODS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  close();
                  handleMyOrder();
                }}
                style={styles.textButton}>
                <Icon name="clipboard" size={25} color={theme.colors.purpal} />
                <Text style={styles.btnText}>MY ORDERS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={handleContact}>
                <Icon
                  name="message-square"
                  size={25}
                  color={theme.colors.purpal}
                />
                <Text style={styles.btnText}>CONTACT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => {
                  handleLogout();
                }}>
                <MaterialIcons
                  name="logout"
                  size={25}
                  color={theme.colors.purpal}
                />
                <Text style={styles.btnText}>LOGOUT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  close();
                  Linking.openURL('https://www.fuddapp.com/privacy');
                }}>
                <Label title="Privacy Policy" style={styles.link} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  close();
                  Linking.openURL('https://www.fuddapp.com/faq');
                }}>
                <Label title="Support & FAQs" style={styles.link} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => {
                close();
                navigation.navigate('ACCOUNT');
              }}>
              <Icon name="user" size={25} color={theme.colors.purpal} />
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        <ContactModal isVisible={modalVisible} close={handleModal} />
      </View>
    </Modal>
  );
};

export default DrawerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(5),
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: scale(25),
    borderBottomRightRadius: scale(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textButton: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  btnText: {
    marginLeft: scale(10),
    fontWeight: '600',
    fontFamily: theme.fonts.josefinSans,
  },
  link: {
    marginVertical: scale(5),
    color: theme.colors.linkColor,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
