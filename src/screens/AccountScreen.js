import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import {images, scale, theme} from '../utils';
import {
  Address,
  Label,
  Login,
  MyAccountInfo,
  MyOrders,
  SaveAddress,
  Signup,
  Title,
} from '../components';
import {profileData} from '../utils/MockData';

const AccountScreen = () => {
  const [reg, setReg] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showImg, setImg] = useState(true);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Subcontainer}>
        <View style={styles.headerView}>
          <Icon
            name="left"
            color={theme.colors.black}
            size={scale(22)}
            onPress={() => {
              setSelectedMenu(null);
            }}
          />
          <Title title="Account" style={styles.title} />
        </View>
        {selectedMenu == null && (
          <View style={{alignItems: 'center'}}>
            <Title title={'Benvenuto'} style={{fontSize: scale(18)}} />
            <Title title={'Davide Barba'} style={{fontSize: scale(18)}} />
          </View>
        )}

        {selectedMenu === 11 && (
          <>
            <Title
              title={'Aggiungi indirizzo'}
              style={{fontSize: scale(18), alignSelf: 'center'}}
            />

            <View style={[styles.textinputContainer, styles.shadow]}>
              <TextInput
                placeholder={'Cerca indirizzo'}
                style={styles.searchbox}
                placeholderTextColor={theme.colors.placeholder}
              />
              <Icon1
                name="search"
                size={scale(23)}
                color={theme.colors.placeholder}
              />
            </View>
          </>
        )}
        {selectedMenu === 2 && (
          <>
            <Title
              title={'I miei indirizzi'}
              style={{fontSize: scale(18), alignSelf: 'center'}}
            />
          </>
        )}
        {selectedMenu === 0 && (
          <>
            <Title
              title={'I miei Ordini'}
              style={{fontSize: scale(18), alignSelf: 'center'}}
            />
          </>
        )}
        {selectedMenu === 1 && (
          <>
            <Title
              title={'Il mio account '}
              style={{fontSize: scale(18), alignSelf: 'center'}}
            />
          </>
        )}
        <View style={styles.detailsContainer}>
          {/* <Login /> */}
          {selectedMenu === 0 && <MyOrders />}
          {selectedMenu === 1 && <MyAccountInfo />}
          {selectedMenu === 2 && <Address />}
          {selectedMenu === 11 && <SaveAddress />}
          {selectedMenu === 4 && (
            <Login
              onPress={() => {
                setSelectedMenu(5);
              }}
            />
          )}
          {selectedMenu === 5 && (
            <Signup
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
                    index === 3 ? null : setSelectedMenu(item.id);
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
              height: scale(100),
              width: theme.SCREENWIDTH * 0.5,
              resizeMode: 'stretch',
              alignSelf: 'center',
              marginVertical: scale(20),
            }}
          />
        )}
      </View>
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
    marginHorizontal: scale(8),
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
    height: scale(40),
    backgroundColor: theme.colors.white,
    // borderWidth: scale(0.5),
    borderRadius: scale(20),
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
});
