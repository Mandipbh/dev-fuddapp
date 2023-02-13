import React, {useEffect} from 'react';
import {useState, useRef} from 'react';
import {StyleSheet, View, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import OTPTextView from 'react-native-otp-textinput';
import Button from '../Button';
import InputBox from '../InputBox';
import {Title, Label, Error} from '../Label';
import ApiService, {API} from '../../utils/ApiService';
import {isLogin, userData} from '../../redux/Actions/UserActions';

const VarificationModel = props => {
  const {isVisible, closeVarification, title, signUpData, close} = props;
  const [email, setemail] = useState('');
  const [number, setnumber] = useState('');
  const [otp, setotp] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [nPasswordErr, setNpasswordErr] = useState('');
  const [cpasswordErr, setCpasswordErr] = useState('');

  const dispatch = useState();

  const handleVarification = () => {
    try {
      const folderFrm = {
        email: email,
        telephone: number,
        VerificationNumber: otp,
      };
      const options = {payloads: folderFrm};
      ApiService.post(API.varifyUser, options)
        .then(res => {
          if (res.Status === 'Success') {
            dispatch(userData(res));
            dispatch(isLogin(true));
            clearFilds();
            closeVarification();
          }
        })
        .catch(e => {
          Alert.alert(e.response?.data?.Errors[0]);
        });
    } catch (error) {
      console.log('error in login ', error);
    }
  };
  useEffect(() => {
    setemail(signUpData?.email);
    setnumber(signUpData?.telephone);
  }, [signUpData]);
  const clearFilds = () => {
    setemail('');
    setnumber('');
    setotp('');
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
              placeholder="Email"
              style={styles.input}
              inputStyle={styles.inputInner}
              value={email}
              onChangeText={txt => {
                setemail(txt);
              }}
              editable={false}
            />
            {passwordErr && <Error error={passwordErr} />}
            <InputBox
              placeholder="Telefono"
              style={styles.input}
              inputStyle={styles.inputInner}
              value={number}
              onChangeText={txt => {
                setnumber(txt);
              }}
              editable={false}
            />
            {nPasswordErr && <Error error={nPasswordErr} />}
            <Label
              title="Inserisci il codice di verifica ricevuto per SMS"
              style={styles.otptxt}
            />
            <OTPTextView
              handleTextChange={e => {
                setotp(e);
              }}
              containerStyle={styles.textInputContainer}
              textInputStyle={styles.roundedTextInput}
              defaultValue=""
              inputCount={6}
              tintColor={theme.colors.primary}
            />

            {cpasswordErr && <Error error={cpasswordErr} />}
            <Button
              title="Salva"
              style={{
                backgroundColor: theme.colors.primary,
                marginTop: scale(15),
              }}
              titleStyle={{color: theme.colors.white, fontWeight: '600'}}
              onPress={() => handleVarification()}
            />
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
  textInputContainer: {
    marginBottom: 5,
    fontStyle: scale(14),
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  otptxt: {textAlign: 'center', marginVertical: scale(8)},
});

export default VarificationModel;
