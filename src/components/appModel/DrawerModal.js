import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLogin,
  logout,
  selectedAddress,
} from '../../redux/Actions/UserActions';
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

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    AsyncStorage.clear();
    dispatch(isLogin(false));
    dispatch(selectedAddress(null));
    close();
    navigation.navigate('ACCOUNT');
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const showAlert = () =>
    Alert.alert('Sei sicuro di voler andare?', null, [
      {
        text: 'ANNULLA',
        cancelable: true,
      },
      {
        text: 'Yes',
        onPress: () => {
          handleLogout();
        },
      },
    ]);

  return (
    <TouchableWithoutFeedback onPress={() => close()}>
      <Modal
        backdropOpacity={0.4}
        visible={isVisible}
        animationIn="slideOutLeft"
        animationOut="slideInLeft"
        animationInTiming={0.5}
        style={{width: '60%', margin: 0}}
        onRequestClose={() => {
          close();
        }}>
        <BlurView
          style={styles.blurView}
          blurType="xlight" // Values = dark, light, xlight .
          blurAmount={6}
          // viewRef={this.state.viewRef}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.container}>
          <Icon
            name="x"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => close()}
            style={{
              marginTop: Platform.OS === 'ios' ? scale(35) : scale(20),
              marginRight: scale(10),
              alignSelf: 'flex-end',
            }}
          />
          <View
            style={{
              marginLeft: scale(25),
              marginTop: scale(30),
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
                  <Text style={styles.btnText}>PROFILO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.textButton}
                  onPress={() => {
                    close();
                    navigation.navigate('ACCOUNT', {data: 1});
                  }}>
                  <Icon name="map-pin" size={25} color={theme.colors.purpal} />
                  <Text style={styles.btnText}>I MIEI INDIRIZZI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.textButton}
                  onPress={handlePayment}>
                  <Icon
                    name="credit-card"
                    size={25}
                    color={theme.colors.purpal}
                  />
                  <Text style={styles.btnText}>MODALITÀ DI PAGAMENTO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    close();
                    navigation.navigate('ACCOUNT', {data: 3});
                  }}
                  style={styles.textButton}>
                  <Icon
                    name="clipboard"
                    size={25}
                    color={theme.colors.purpal}
                  />
                  <Text style={styles.btnText}>I MIEI ORDINI</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                style={styles.textButton}
                onPress={handleContact}>
                <Icon
                  name="message-square"
                  size={25}
                  color={theme.colors.purpal}
                />
                <Text style={styles.btnText}>CONTACT</Text>
              </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.textButton}
                  onPress={() => {
                    close();
                    showAlert();
                  }}>
                  <MaterialIcons
                    name="logout"
                    size={25}
                    color={theme.colors.purpal}
                  />
                  <Text style={styles.btnText}>ESCI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: scale(15)}}
                  onPress={() => {
                    close();
                    Linking.openURL('https://www.fuddapp.com/privacy');
                  }}>
                  <Label
                    title="Politica sulla riservatezza"
                    style={styles.link}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    close();
                    Linking.openURL('https://www.fuddapp.com/faq');
                  }}>
                  <Label
                    title="Supporto e domande frequenti"
                    style={styles.link}
                  />
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
                <Text style={styles.btnText}>ACCEDI</Text>
              </TouchableOpacity>
            )}
          </View>
          <ContactModal isVisible={modalVisible} close={handleModal} />
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default DrawerModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 111,
  },
  label: {color: theme.colors.black, fontSize: scale(14), fontWeight: '500'},
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    marginTop: -theme.SCREENHEIGHT * 0.01,
  },
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
    color: theme.colors.black,
    width: '90%',
  },
  link: {
    marginVertical: scale(10),
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
