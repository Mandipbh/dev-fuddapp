import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AlertModel, Button, InputBox, Loader, Title} from '../../components';
import {scale, theme} from '../../utils';
import {useNavigation} from '@react-navigation/native';
const h = Dimensions.get('screen').height;
const w = Dimensions.get('screen').width;
import {getUrserDetails, usersCollection} from '../../utils/FirebaseServices';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../../redux/Actions/UserActions';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrormsg] = useState('');
  const dispatch = useDispatch();

  const clearFilds = () => {
    setEmail('');
    setPassword('');
  };
  const handleLogin = async () => {
    // if (email !== '' && password !== '') {
    //   try {
    //     setLoader(true);
    //     auth()
    //       .signInWithEmailAndPassword(email, password)
    //       .then(async res => {
    //         let userId = res.user.uid;
    //         usersCollection.doc(userId).onSnapshot(documentSnapshot => {
    //           setLoader(false);
    //           clearFilds();
    //           dispatch(userData(documentSnapshot.data()));
    //           dispatch(isLogin(true));
    //           navigation.navigate('Home');
    //         });
    //       })
    //       .catch(error => {
    //         if (error.code === 'auth/user-not-found') {
    //           setShow(true);
    //           setErrormsg('That email address is not found!');
    //         } else if (error.code === 'auth/wrong-password') {
    //           setShow(true);
    //           setErrormsg(
    //             'The password is invalid or the user does not have a password.',
    //           );
    //         } else {
    //           setShow(true);
    //           setErrormsg('Enter data is wrong');
    //         }
    //         console.log('error ', error);
    //       })
    //       .finally(f => {
    //         setLoader(false);
    //         console.log('finally ', f);
    //       });
    //   } catch (error) {
    //     setLoader(false);
    //     console.log('error try', error);
    //   }
    // } else {
    //   alert('Please enter email and password');
    // }
  };
  const closeModel = () => {
    setShow(false);
    setErrormsg('');
  };
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        height: theme.SCREENHEIGHT,
      }}>
      <View style={styles.firstView}>
        <Title
          style={{
            color: theme.colors.white,
            fontSize: 23,
            marginTop: theme.SCREENHEIGHT * 0.1,
            left: -theme.SCREENWIDTH * 0.1,
          }}
          title={'Login to your account'}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          marginTop: h * 0.4,
        }}>
        <InputBox
          style={styles.textInput}
          placeholder="Your Email"
          onChangeText={txt => {
            setEmail(txt);
          }}
        />
        <InputBox
          onChangeText={txt => {
            setPassword(txt);
          }}
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          passwordIcon
        />
      </View>
      <Button
        title={'Login'}
        style={styles.btn}
        onPress={() => {
          handleLogin();
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.loginText}>Create new Account</Text>
      </TouchableOpacity>
      {loader && <Loader loading={loader} />}
      {show && (
        <AlertModel title="Login" subTitle={errorMsg} close={closeModel} />
      )}
    </KeyboardAwareScrollView>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  firstView: {
    height: theme.SCREENHEIGHT / 3,
    backgroundColor: theme.colors.purpal,
    position: 'absolute',
    width: '100%',
    top: -h * 0.02,
    zIndex: -111,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 250 : 200,
    // borderBottomLeftRadius: theme.SCREENHEIGHT * 2,
  },
  lastView: {
    height: theme.SCREENHEIGHT * 0.5,
    width: '100%',
    backgroundColor: theme.colors.purpal,
    position: 'absolute',
    borderRadius: 200,
    bottom: -18,
    right: -w * 0.5,
    zIndex: -11,
  },
  textInput: {
    width: theme.SCREENWIDTH - scale(70),
    // borderRadius: 10,
    // backgroundColor: '#DDA0DD',
    elevation: Platform.OS === 'android' ? 5 : 15,
    // marginTop: 20,
    // fontSize: 18,
    paddingLeft: 15,
    // fontWeight: '600',
  },
  btn: {
    marginTop: scale(25),
  },
  loginText: {
    alignSelf: 'center',
    color: theme.colors.purpal,
    fontWeight: '700',
    padding: 10,
    fontFamily: theme.fonts.josefinSans,
  },
});
