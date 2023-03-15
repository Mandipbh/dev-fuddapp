import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import {Error, Label, Title} from '../Label';
import {useState} from 'react';
import {orderData} from '../../utils/MockData';
import Icon from 'react-native-vector-icons/Feather';
import {BlurView} from '@react-native-community/blur';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getAllOrders} from '../../redux/Actions/OrderAction';
import Button from '../Button';
import InputBox from '../InputBox';
import {isLogin, userData} from '../../redux/Actions/UserActions';
import ApiService, {API} from '../../utils/ApiService';

const LoginModel = props => {
  const {isVisible, close} = props;

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
      setNameErr('Inserisci il nome utente');
    } else {
      setNameErr('');
    }
    if (password.trim() === '') {
      error = true;
      setpasswordErr('Per favore, inserisci la password');
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
              close();
            }
          })
          .catch(e => {
            setLoad(false);
            console.log('error in login> ', e.response);
            // Alert.alert(e.response?.data?.Errors[0]);
          });
      } catch (e) {
        console.log('e in login ', e);
        setLoad(false);
      }
    } else {
    }
  };

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {
              <Title
                title={'Accedi al tuo account'}
                style={{textAlign: 'center'}}
              />
            }
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View style={styles.divider} />
          <View>
            <InputBox
              placeholder="Nome utente"
              value={name}
              onChangeText={txt => {
                setName(txt);
              }}
              style={[styles.input, {marginTop: theme.SCREENHEIGHT * 0.03}]}
              keyboardType="email-address"
              autoCompleteType="username"
            />
            {nameErr && <Error error={nameErr} />}
            <InputBox
              secureTextEntry
              value={password}
              onChangeText={txt => {
                setPassword(txt);
              }}
              placeholder="Parola d'ordine"
              style={styles.input}
              autoCompleteType="password"
            />
            {passwordErr && <Error error={passwordErr} />}
            {!load ? (
              <Button
                title="Accedi"
                style={[styles.loginButton, {marginTop: scale(15)}]}
                titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
                onPress={() => {
                  handleLogin();
                }}
              />
            ) : (
              <ActivityIndicator
                size={scale(40)}
                color={theme.colors.primary}
              />
            )}
          </View>
        </View>
      </View>
      <BlurView
        style={styles.blurView}
        blurType="dark" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor="white"
      />
    </Modal>
  );
};

export default LoginModel;

const styles = StyleSheet.create({
  mainCard: {
    borderBottomWidth: scale(0.8),
    borderColor: theme.colors.gray,
    marginVertical: scale(10),
  },
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
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  modalView: {
    backgroundColor: theme.colors.white,
    marginTop: scale(70),
    marginHorizontal: scale(15),
    borderRadius: 15,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 111,
  },
  prodTitle: {
    fontSize: scale(14),
    color: theme.colors.black,
  },
  pd: {
    fontSize: scale(12),
    marginBottom: scale(4),
    color: theme.colors.gray2,
  },
  btn: {
    width: scale(60),
    borderWidth: scale(1),
    borderColor: theme.colors.red,
    borderRadius: scale(10),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    textAlign: 'center',
    color: theme.colors.red,
    fontSize: scale(11),
  },
  detailsView: {
    borderTopWidth: scale(0.8),
    borderBottomWidth: scale(0.5),
    marginVertical: scale(3),
    borderColor: theme.colors.gray1,
    paddingVertical: scale(5),
    width: '65%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: scale(12),
    color: theme.colors.black,
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: scale(35),
  },
  buttonLabel: {
    fontWeight: '700',
    fontSize: scale(12),
  },
});
