import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Modal, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import Toast from 'react-native-simple-toast';
import {scale, theme} from '../../utils';
import ApiService, {API} from '../../utils/ApiService';
import Button from '../Button';
import InputBox from '../InputBox';
import {Title, Error} from '../Label';

const ForgotPassword = props => {
  const {isVisible, close, title} = props;
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [load, setLoad] = useState(false);

  let error = false;
  const handleValidation = () => {
    if (email?.trim() === '') {
      error = true;
      setEmailErr('Please enter email');
    } else {
      setEmailErr('');
      error = false;
    }

    return error;
  };

  const handleForgotPassword = () => {
    if (!handleValidation()) {
      try {
        setLoad(true);
        ApiService.get(API.recoveryPassword + email)
          .then(res => {
            console.log('res >>> ', res);
            if (res.Status === 'Success') {
              setLoad(false);
              // Toast.show(
              //   'La password è condivisa. Si prega di controllare la posta.',
              //   Toast.SHORT,
            // );
              close();
              clearFilds();
            }
          })
          .catch(e => {
            setLoad(false);
            Alert.alert(e.response?.data?.Errors[0]);
          });
      } catch (e) {
        setLoad(false);
        console.log('error in login ', e);
      }
    }
  };
  const clearFilds = () => {
    setEmail('');
    setEmailErr('');
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
            {<Title title={title} style={{textAlign: 'center'}} />}
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close();
                clearFilds();
              }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.subTitleView}>
            <InputBox
              placeholder="Inserisci l'indirizzo email per recuperare la password"
              style={styles.input}
              inputStyle={styles.inputInner}
              value={email}
              onChangeText={txt => {
                setEmail(txt);
              }}
            />
            {emailErr && <Error error={emailErr} />}

            {load ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
              <Button
                title="Invia"
                style={{
                  backgroundColor: theme.colors.primary,
                  marginTop: scale(15),
                }}
                titleStyle={styles.txt}
                onPress={() => handleForgotPassword()}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: '#00000020',
    zIndex: 111,
  },
  label: {textAlign: 'center', color: theme.colors.black},
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    marginTop: theme.SCREENHEIGHT * 0.2,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    paddingHorizontal: scale(5),
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  subTitleView: {
    paddingVertical: scale(10),
  },
  inputInner: {
    paddingHorizontal: 0,
    color: theme.colors.black,
    fontSize: scale(11),
  },
  txt: {color: theme.colors.white, fontWeight: '600'},
});

export default ForgotPassword;
