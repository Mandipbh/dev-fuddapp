import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {images, scale, theme} from '../utils';
import {Address, Label, Login, Signup, Title} from '../components';
import {profileData} from '../utils/MockData';

const AccountScreen = () => {
  const [reg, setReg] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Subcontainer}>
        <View style={styles.headerView}>
          <Icon
            name="left"
            color={theme.colors.black}
            size={scale(22)}
            onPress={() => {
              setReg(!reg);
            }}
          />
          <Title title="Account" style={styles.title} />
        </View>
        {/* <View style={{alignItems: 'center'}}>
          <Title title={'Benvenuto'} style={{fontSize: scale(18)}} />
          <Title title={'Davide Barba'} style={{fontSize: scale(18)}} />
        </View> */}

        {/* <View style={styles.detailsContainer}>
          <Address />
          {profileData.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.option}>
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
        </View> */}
        {/* <TouchableOpacity style={styles.addressBtn}>
          <Icon name="plus" size={scale(22)} color={theme.colors.green} />
          <Label title="Aggiungi indirizzo" style={styles.btnlbl} />
        </TouchableOpacity>
        <Image
          source={images.appIcon}
          style={{
            height: scale(100),
            width: theme.SCREENWIDTH * 0.5,
            resizeMode: 'stretch',
            alignSelf: 'center',
            marginVertical: scale(20),
          }}
        /> */}
        {!reg ? <Login /> : <Signup />}
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
    paddingVertical: scale(15),
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
});
