import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {images, scale, theme} from '../utils';
import InputBox from './InputBox';
import {Error, Label} from './Label';
import Button from './Button';
import {useState} from 'react';
import VarificationModel from './appModel/VarificationModel';
import ApiService, {API} from '../utils/ApiService';
import {useEffect} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Signup = props => {
  const {onPress, isFocus, moveLogin} = props;
  const [name, setName] = useState('');
  const [sureName, setSureName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [CPasseword, setCPasseword] = useState('');
  const [signupRes, setSignupRes] = useState('');
  const [varification, setVarification] = useState(false);
  const [load, setLoad] = useState(false);
  const [errrMsg, setErrorMsg] = useState({
    nameErr: '',
    sureNameErr: '',
    emailErr: '',
    mobileErr: '',
    passwordErr: '',
    CPassewordErr: '',
  });
  const toast = useToast();

  let error = false;
  const handleValidation = () => {
    let Emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errr = {...errrMsg};
    if (name.trim() === '') {
      errr.nameErr = 'Inserisci il nome';
      error = true;
    } else {
      errr.nameErr = '';
    }
    if (sureName.trim() === '') {
      error = true;
      errr.sureNameErr = 'Si prega di inserire Surename';
    } else {
      errr.sureNameErr = '';
    }
    if (email.trim() === '') {
      error = true;
      errr.emailErr = `Inserisci l'email`;
    } else {
      errr.emailErr = '';
    }
    if (Emailreg.test(email) === false) {
      error = true;
      errr.emailErr = `inserire una email valida, grazie`;
    } else {
      errr.emailErr = '';
    }
    if (mobile.trim() === '') {
      error = true;
      errr.mobileErr = `Inserisci il numero di cellulare`;
    } else {
      errr.mobileErr = '';
    }
    if (password.trim() === '') {
      error = true;
      errr.passwordErr = 'Per favore, inserisci la password';
    } else {
      errr.passwordErr = '';
    }
    if (CPasseword.trim() === '') {
      error = true;
      errr.CPassewordErr = 'Per favore, inserisci la password';
    } else if (password !== CPasseword) {
      error = true;
      errr.CPassewordErr = 'La password non corrisponde';
    } else {
      errr.CPassewordErr = '';
    }

    setErrorMsg(errr);
    return error;
  };
  const handleClose = () => {
    setVarification(false);
    onPress();
    moveLogin();
  };

  // useEffect(() => {
  //   setName('');
  //   setPassword('');
  // }, [isFocus]);

  const handleSignup = () => {
    if (!handleValidation()) {
      try {
        setLoad(true);
        const folderFrm = {
          email: email,
          password: password,
          firstName: name,
          lastName: sureName,
          telephone: mobile,
          NewsLetterCheck: false,
        };
        const options = {payloads: folderFrm};
        ApiService.post(API.signUp, options)
          .then(res => {
            if (res.Status === 'Success') {
              setSignupRes(folderFrm);
              setVarification(true);
              setLoad(false);
            }
          })
          .catch(e => {
            setLoad(false);
            toast.show(e.response?.data?.Errors[0], toast, {duration: 1000});

            // console.log('error in login> ', e.response?.data?.Errors[0]);
          });
      } catch (e) {
        setLoad(false);
        console.log('error in login ', e);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      bounces
      contentContainerStyle={{
        paddingBottom: theme.SCREENHEIGHT * 0.12,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Label title={'Registrati'} style={styles.title} />
        <View style={styles.devider} />
        <InputBox
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
          placeholder="Nome"
          style={styles.input}
        />
        {errrMsg.nameErr && <Error error={errrMsg.nameErr} />}
        <InputBox
          value={sureName}
          onChangeText={txt => {
            setSureName(txt);
          }}
          placeholder="Cognome"
          style={styles.input}
        />
        {errrMsg.sureNameErr && <Error error={errrMsg.sureNameErr} />}
        <InputBox
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
          placeholder="Email"
          style={styles.input}
        />
        {errrMsg.emailErr && <Error error={errrMsg.emailErr} />}
        <InputBox
          value={mobile}
          onChangeText={txt => {
            setMobile(txt);
          }}
          placeholder="N. Mobile "
          keyboardType="numeric"
          style={styles.input}
        />
        {errrMsg.mobileErr && <Error error={errrMsg.mobileErr} />}
        <InputBox
          value={password}
          onChangeText={txt => {
            setPassword(txt);
          }}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        {errrMsg.passwordErr && <Error error={errrMsg.passwordErr} />}
        <InputBox
          value={CPasseword}
          onChangeText={txt => {
            setCPasseword(txt);
          }}
          placeholder="Conferma password"
          style={styles.input}
          secureTextEntry
        />
        {errrMsg.CPassewordErr && <Error error={errrMsg.CPassewordErr} />}
        {load ? (
          <ActivityIndicator size={scale(40)} color={theme.colors.primary} />
        ) : (
          <Button
            title="Registrati"
            style={styles.loginButton}
            titleStyle={[styles.buttonLabel, {color: theme.colors.white}]}
            onPress={() => {
              handleSignup();
            }}
          />
        )}
        {/* <View style={styles.appTextView}>
        <Image
        source={images.appIcon}
        style={styles.logo}
        resizeMode="contain"
        />
        
      </View> */}
        {/* <Text style={styles.text}>
          Fudd<Text style={styles.text1}>app</Text>
        </Text> */}
        <VarificationModel
          signUpData={signupRes}
          isVisible={varification}
          title="Attivazione Account"
          close={() => {
            setVarification(false);
            moveLogin();
          }}
          closeVarification={handleClose}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Signup;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: theme.colors.white,
    // marginHorizontal: scale(8),
    // padding: scale(15),
    // paddingHorizontal: scale(22),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0.2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 0.5,
    // paddingVertical: theme.SCREENHEIGHT * 0.03,

    // elevation: scale(2),
    // borderRadius: scale(12),
  },
  title: {
    fontWeight: '500',
    fontSize: scale(15),
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginLeft: scale(0),
  },
  devider: {
    height: scale(1),
    backgroundColor: theme.colors.gray1,
    width: '100%',
    marginVertical: scale(5),
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: scale(40),
    marginTop: scale(10),
  },
  buttonLabel: {
    fontWeight: '700',
    fontSize: scale(12),
  },
  text: {
    fontSize: scale(44),
    color: theme.colors.purpal,
    fontWeight: '700',
    opacity: 0.3,
    fontFamily: theme.fonts.josefinSans,
  },
  text1: {
    fontSize: scale(44),
    color: theme.colors.primary,
    fontWeight: '700',
    opacity: 0.3,
  },
  appTextView: {
    position: 'absolute',
    bottom: scale(-15),
    zIndex: -1,
  },
  logo: {
    height: scale(70),
    width: scale(160),
    resizeMode: 'strech',
    opacity: 0.2,
  },
});
