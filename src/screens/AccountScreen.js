import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {images, scale, theme} from '../utils';
import {
  Address,
  ContactModal,
  Label,
  Login,
  MyAccountInfo,
  MyOrders,
  SaveAddress,
  Signup,
  Title,
} from '../components';
import {profileData} from '../utils/MockData';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {isLogin, logout} from '../redux/Actions/UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const AccountScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showImg, setImg] = useState(true);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const isLoginUser = useSelector(state => state.UserReducer?.login);
  const dispatch = useDispatch();
  const user = useSelector(state => state.UserReducer?.userDetails);
  const navigation = useNavigation();
  const isFoucse = useIsFocused();
  useEffect(() => {
    if (!isLoginUser) {
      setSelectedMenu(4);
    } else {
      setSelectedMenu(1);
    }
  }, [isFoucse]);

  useEffect(() => {
    if (
      selectedMenu == null ||
      selectedMenu == 1 ||
      selectedMenu == 2 ||
      selectedMenu == 0
    ) {
      setImg(true);
    } else {
      setImg(false);
    }
  }, [selectedMenu]);
  const handleClick = (id, index) => {
    if (id === 4) {
      handleShowAlert();
    } else {
      index === 3 ? null : setSelectedMenu(id);
    }
  };

  const handlePress = (id, index) => {
    if (id === 3) {
      setModalVisible(true);
    } else {
      index === 3 || index === 4 ? null : setSelectedMenu(id);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    AsyncStorage.clear();
    dispatch(isLogin(false));
    navigation.goBack();
  };

  const handleShowAlert = () => {
    Alert.alert('Sei sicuro di voler andare?', null, [
      {
        text: 'Cancel',
        cancelable: true,
      },
      {
        text: 'Yes',
        onPress: () => {
          handleLogout();
        },
      },
    ]);
    // dispatch(logout());
    // AsyncStorage.clear();
    // dispatch(isLogin(false));
    // navigation.replace('Tab');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Subcontainer}>
        <View style={styles.headerView}>
          {isLoginUser && selectedMenu !== null && (
            <Icon
              name="left"
              color={theme.colors.black}
              size={scale(22)}
              onPress={() => {
                setSelectedMenu(null);
              }}
            />
          )}
          <Title
            title="Account"
            style={[
              styles.title,
              {
                marginLeft:
                  selectedMenu === null
                    ? theme.SCREENWIDTH * 0.33
                    : theme.SCREENWIDTH * 0.25,
              },
            ]}
          />
        </View>
        {selectedMenu == null && (
          <View style={{alignItems: 'center'}}>
            <Title title={'Benvenuto'} style={{fontSize: scale(18)}} />
            <Title title={'Davide Barba'} style={{fontSize: scale(18)}} />
          </View>
        )}

        {selectedMenu === 11 && (
          <>
            <Title title={'Aggiungi indirizzo'} style={styles.headerTitle} />

            {/* <View style={[styles.textinputContainer, styles.shadow]}> */}
            {/* <TextInput
                placeholder={'Cerca indirizzo'}
                style={styles.searchbox}
                placeholderTextColor={theme.colors.placeholder}
                value={text}
                onChangeText={txt => {
                  setText(txt);
                }}
              /> */}

            {/* <Icon1
                name="search"
                size={scale(22)}
                color={theme.colors.placeholder}
              />
            </View> */}
          </>
        )}
        {selectedMenu === 2 && (
          <>
            <Title title={'I miei indirizzi'} style={styles.headerTitle} />
          </>
        )}
        {selectedMenu === 0 && (
          <>
            <Title title={'I miei Ordini'} style={styles.headerTitle} />
          </>
        )}
        {selectedMenu === 1 && (
          <>
            <Title title={'Il mio account '} style={styles.headerTitle} />
          </>
        )}
        <View style={styles.detailsContainer}>
          {/* <Login /> */}
          {selectedMenu === 0 && <MyOrders />}
          {selectedMenu === 1 && <MyAccountInfo user={user} />}
          {selectedMenu === 2 && <Address />}
          {selectedMenu === 11 && (
            <SaveAddress
              back={() => {
                setSelectedMenu(2);
              }}
            />
          )}
          {selectedMenu === 4 && (
            <Login
              isFocus={isFoucse}
              onPress={() => {
                setSelectedMenu(1);
              }}
              onPressRegister={() => {
                setSelectedMenu(5);
              }}
            />
          )}
          {selectedMenu === 5 && (
            <Signup
              isFocus={isFoucse}
              onPress={() => {
                setSelectedMenu(null);
              }}
            />
          )}
          {selectedMenu === null &&
            profileData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    handleClick(item.id, index);
                    handlePress(item.id, index);
                    // alert(`${item.id}`);
                  }}>
                  <Label title={item.title} />
                  <View
                    style={[
                      styles.divider,
                      {
                        borderBottomColor:
                          profileData.length == index + 1
                            ? theme.colors.white
                            : theme.colors.gray,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
        {selectedMenu === 2 && (
          <TouchableOpacity
            style={styles.addressBtn}
            onPress={() => {
              setSelectedMenu(11);
            }}>
            <Icon name="plus" size={scale(22)} color={theme.colors.green} />
            <Label title="Aggiungi indirizzo" style={styles.btnlbl} />
          </TouchableOpacity>
        )}

        {showImg && (
          <Image
            source={images.appIcon}
            style={{
              height: scale(85),
              width: theme.SCREENWIDTH * 0.5,
              resizeMode: 'stretch',
              alignSelf: 'center',
              marginTop: scale(10),
              // marginVertical: scale(5),
            }}
          />
        )}
      </View>
      <ContactModal isVisible={modalVisible} close={handleClose} />
    </SafeAreaView>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  detailsContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: theme.colors.white,
    // marginHorizontal: scale(5),
    padding: scale(15),
    paddingHorizontal: scale(22),
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.25,
    shadowRadius: scale(3),
    paddingVertical: theme.SCREENHEIGHT * 0.03,

    elevation: scale(2),
    borderRadius: scale(12),
    marginTop: scale(35),
  },
  Subcontainer: {
    paddingHorizontal: scale(12),
  },
  title: {
    fontSize: scale(22),
    textAlign: 'center',
    marginLeft: theme.SCREENWIDTH * 0.25,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(55),
    paddingHorizontal: scale(5),
  },
  appLogo: {resizeMode: 'contain', alignSelf: 'center'},
  option: {
    paddingVertical: scale(10),
  },
  divider: {
    width: '100%',
    height: scale(16),
    borderBottomWidth: scale(0.8),
    borderBottomColor: theme.colors.gray,
  },
  addressBtn: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(10),
    borderWidth: scale(1),
    borderRadius: scale(20),
    borderColor: theme.colors.gray,
    marginVertical: scale(15),
  },
  btnlbl: {
    marginLeft: scale(10),
    fontWeight: '600',
    fontSize: scale(14),
    color: theme.colors.gray,
  },

  textinputContainer: {
    height: scale(45),
    backgroundColor: theme.colors.white,
    // borderWidth: scale(0.5),
    borderRadius: scale(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    marginTop: scale(10),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchbox: {
    fontSize: scale(13),
    color: theme.colors.placeholder,
    marginLeft: scale(10),
    fontWeight: '600',
  },
  headerTitle: {
    textAlign: 'center',
  },
});
