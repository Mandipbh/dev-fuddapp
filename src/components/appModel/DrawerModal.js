import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';

const DrawerModal = props => {
  const {isVisible, close} = props;
  const navigation = useNavigation();
  return (
    <Modal
      backdropOpacity={0.4}
      visible={isVisible}
      style={{marginRight: scale(80), margin: 0}}>
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
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('ACCOUNT');
            }}>
            <MaterialIcons
              name="account-circle"
              size={25}
              color={theme.colors.purpal}
            />
            <Text style={styles.btnText}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('ACCOUNT');
            }}>
            <MaterialIcons
              name="location-on"
              size={25}
              color={theme.colors.purpal}
            />
            <Text style={styles.btnText}>MY ADDRESSES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <MaterialIcons
              name="payment"
              size={25}
              color={theme.colors.purpal}
            />
            <Text style={styles.btnText}>PAYMENT METHODS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <MaterialIcons
              name="event-note"
              size={25}
              color={theme.colors.purpal}
            />
            <Text style={styles.btnText}>MY ORDERS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <MaterialIcons
              name="mode-comment"
              size={25}
              color={theme.colors.purpal}
            />
            <Text style={styles.btnText}>CONTACT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <MaterialIcons
              name="logout"
              size={25}
              color={theme.colors.purpal}
            />
            <Text style={styles.btnText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DrawerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(5),
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textButton: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  btnText: {marginLeft: scale(10), fontWeight: '600'},
});
