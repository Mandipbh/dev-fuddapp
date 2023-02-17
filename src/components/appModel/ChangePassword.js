import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {scale, theme} from '../../utils';
import ApiService, {API} from '../../utils/ApiService';
import Button from '../Button';
import InputBox from '../InputBox';
import {Title, Label, Error} from '../Label';

const ChangePassword = props => {
  const {isVisible, close, title, subTitle} = props;
  const [oldPassword, setOldPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConPassword, setConPassword] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [nPasswordErr, setNpasswordErr] = useState('');
  const [cpasswordErr, setCpasswordErr] = useState('');
  const user = useSelector(state => state.UserReducer?.userDetails);
  const [load, setLoad] = useState(false);
  let error = false;
  const handleValidation = () => {
    if (oldPassword?.trim() === '') {
      error = true;
      setpasswordErr('Please enter password');
    } else {
      setpasswordErr('');
    }
    if (NewPassword?.trim() === '') {
      error = true;
      setNpasswordErr('Please enter new password');
    } else if (ConPassword?.trim() === '') {
      error = true;
      setCpasswordErr('Please enter confrim password');
    } else if (NewPassword !== ConPassword) {
      error = true;
      setCpasswordErr('Both password are not match');
    } else {
      error = false;
      setNpasswordErr('');
      setpasswordErr('');
      setCpasswordErr('');
    }
    return error;
  };

  const handleForgotPassword = () => {
    if (!handleValidation()) {
      clearFilds();
      close();
      try {
        setLoad(true);
        const folderFrm = {
          UserId: user?.UserId,
          OldPassword: oldPassword,
          NewPassword: NewPassword,
        };
        const options = {payloads: folderFrm};
        ApiService.post(API.updatePassword, options)
          .then(res => {
            setLoad(false);
            if (res.Status === 'Success') {
              console.log('res of login >> ', res);
              close();
            }
          })
          .catch(e => {
            setLoad(false);
            alert(e.response?.data?.Errors[0]);
            // console.log('error in login> ', e.response?.data?.Errors[0]);
          });
      } catch (error) {
        console.log('error in login ', error);
      }
    }
  };
  const clearFilds = () => {
    setOldPassword('');
    setNewPassword('');
    setConPassword('');
    setNpasswordErr('');
    setpasswordErr('');
    setCpasswordErr('');
  };
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <BlurView
        style={styles.blurView}
        blurType="dark" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor="white"
      />
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
              placeholder="Password attuale"
              style={styles.input}
              inputStyle={styles.inputInner}
              value={oldPassword}
              onChangeText={txt => {
                setOldPassword(txt);
              }}
              secureTextEntry
            />
            {passwordErr && <Error error={passwordErr} />}
            <InputBox
              placeholder="Nuova password"
              style={styles.input}
              inputStyle={styles.inputInner}
              value={NewPassword}
              onChangeText={txt => {
                setNewPassword(txt);
              }}
              secureTextEntry
            />
            {nPasswordErr && <Error error={nPasswordErr} />}
            <InputBox
              placeholder="Conferma password"
              style={styles.input}
              inputStyle={styles.inputInner}
              value={ConPassword}
              onChangeText={txt => {
                setConPassword(txt);
              }}
              secureTextEntry
            />
            {cpasswordErr && <Error error={cpasswordErr} />}
            {load ? (
              <ActivityIndicator
                size={scale(40)}
                color={theme.colors.primary}
              />
            ) : (
              <Button
                title="Salva"
                style={{
                  backgroundColor: theme.colors.primary,
                  marginTop: scale(15),
                }}
                titleStyle={{color: theme.colors.white, fontWeight: '600'}}
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
    paddingHorizontal: scale(8),
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
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ChangePassword;
