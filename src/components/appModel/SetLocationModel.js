import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { scale, theme } from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/AntDesign';
// import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Label, Title } from '../Label';
import { Button } from '../index';
import { KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddress, selectedAddress } from '../../redux/Actions/UserActions';
import { useNavigation } from '@react-navigation/core';

const SetLocationModel = props => {
  const { isShow, close } = props;
  const [selAdd, setSelAdd] = useState(null);
  const [saveAddress, setSaveAddress] = useState([]);

  const addressList = useSelector(state => state.HomeReducers.addressList);
  const seladdress = useSelector(state => state.UserReducer.selAddress);

  console.log('seladdressReducer', seladdress);
  console.log('addressList_', addressList);
  const dispatch = useDispatch();

  // const userInfo = useSelector(state => state.AppReducer.userDetails);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getAllAddress());
  }, [isShow]);
  useEffect(() => {
    setSaveAddress(addressList?.UserAddresses);
    if (seladdress !== undefined) {
      setSelAdd(seladdress);
    }
  }, [addressList, isShow]);

  const compIsType = (t, s) => {
    for (let z = 0; z < t.length; ++z) {
      if (t[z] == s) {
        return true;
      }
    }
    return false;
  };

  // const handlePlaceChanged = async data => {
  //   const place = data;
  //   // let userInfo = this.props.route.params?.data;
  //   let latt,
  //     lngg,
  //     addrSel,
  //     placeName,
  //     placeId = '';
  //   let country,
  //     state,
  //     city = null;
  //   if (place.geometry !== undefined) {
  //     const plcGeom = place.geometry;
  //     if (plcGeom.location !== undefined) {
  //       const { lat, lng } = place?.geometry?.location;

  //       latt = lat;
  //       lngg = lng;
  //     }
  //   }

  //   addrSel =
  //     place.formatted_address !== undefined ? place.formatted_address : '';
  //   placeName = place.name !== undefined ? place.name : '';
  //   placeId = place.place_id !== undefined ? place.place_id : '';
  //   if (place.address_components !== undefined) {
  //     let addrComp = place.address_components;
  //     for (let i = 0; i < addrComp.length; ++i) {
  //       var typ = addrComp[i].types;
  //       if (compIsType(typ, 'administrative_area_level_1')) {
  //         state = addrComp[i].long_name;
  //       }
  //       //store the state
  //       else if (compIsType(typ, 'locality')) {
  //         city = addrComp[i].long_name;
  //       }
  //       //store the city
  //       else if (compIsType(typ, 'country')) {
  //         country = addrComp[i].long_name;
  //       } //store the country

  //       //we can break early if we find all three data
  //       if (state != null && city != null && country != null) {
  //         break;
  //       }
  //     }
  //   }

  //   let nameData = '';
  //   // if (this.props.showKey !== undefined) {
  //   //   if (this.props.showKey == 'CITY') {
  //   //     nameData = city;
  //   //   } else if (this.props.showKey == 'STATE') {
  //   //     nameData = state;
  //   //   } else if (this.props.showKey == 'COUNTRY') {
  //   //     nameData = country;
  //   //   } else if (this.props.showKey == 'PLACE_NAME') {
  //   //     nameData = country;
  //   //   } else if (this.props.showKey == 'FORMATTED_ADDRESS') {
  //   //     nameData = addrSel;
  //   //   } else if (this.props.showKey == 'PLACE_ID') {
  //   //     nameData = placeId;
  //   //   } else {
  //   //     nameData = addrSel;
  //   //   }
  //   // } else {
  //   //   nameData = addrSel;
  //   // }

  //   let stateResp = {
  //     lat: latt,
  //     lng: lngg,
  //     formattedAddress: addrSel,
  //     placeName: placeName,
  //     placeId: placeId,
  //     city: city,
  //     state: state,
  //     country: country,
  //     textboxtext: nameData,
  //   };
  // };

  const handleAddress = item => {
    setSelAdd(item);
    console.log('selected ADDress >> ', item);

    dispatch(selectedAddress(item));
  };
  const handleLocationSet = () => {
    if (selAdd === null || selAdd === undefined) {
      alert('Seleziona un indirizzo');
      // Toast.show('Seleziona un indirizzo', Toast.show);
    } else {
      close();
    }
  };
  return (
    <Modal
      isVisible={isShow}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      statusBarTranslucent
      backdropColor={theme.colors.black1}
      backdropOpacity={0.5}
      style={{ margin: 0 }}>
      <View
        style={[
          styles.mainContainer,
          // externalStyle.shadow,
          {
            elevation: scale(3),
            shadowColor: theme.colors.black,
            shadowRadius: scale(2),
          },
        ]}>
        <View style={styles.container}>
          <View style={styles.headerCon}>
            <Title title="Gestione indirizzi" />
            <Icon name="x" size={scale(20)} onPress={close} />
          </View>

          {saveAddress?.length > 0 ? (
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.container, { paddingHorizontal: 0 }]}>
                {/* <GooglePlacesAutocomplete
              placeholder="Inserisci indirizzo"
              disableScroll={false}
              keepResultsAfterBlur={true}
              onPress={(data, details = null) => {
                handlePlaceChanged(details);
                const {lat, lng} = details?.geometry?.location;
              }}
              fetchDetails={true}
              query={{
                key: 'AIzaSyDxUeU36VnWRBXAok6txlBCV2rq9UhHWT4',
                // language: 'en',
                // types: '(cities)',
                // components: 'country:IT',
                language: 'en',
                components: 'country:IT',
                sessiontoken: 'sessionToken',
                type: 'address',
              }}
            /> */}
                <View style={styles.addressCon}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {saveAddress &&
                      saveAddress?.map((item, index) => {
                        return (
                          <View style={styles.viewCon} key={index}>
                            <TouchableOpacity
                              style={styles.checkboxCon}
                              onPress={() => {
                                handleAddress(item);
                              }}>
                              {selAdd?.Id === item?.Id && (
                                <View style={styles.check} />
                              )}
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.btn}
                              onPress={() => {
                                handleAddress(item);
                              }}>
                              <Label
                                title={item?.AddressName}
                                style={styles.btnTxt}
                              />
                              <View style={styles.devider} />
                              <View style={styles.row}>
                                <Label
                                  title={`${item?.Name} ${item?.LastName}`}
                                />
                                <View style={styles.row}>
                                  <Icon
                                    name="phone"
                                    style={{ marginLeft: scale(8) }}
                                  />
                                  <Label title={` ${item?.Telephone}`} />
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </ScrollView>
                </View>
                <Button
                  title="Imposta"
                  style={{
                    backgroundColor: theme.colors.primary,
                    marginTop: scale(10),
                  }}
                  titleStyle={{ color: theme.colors.white }}
                  onPress={() => {
                    handleLocationSet();
                  }}
                />
                <TouchableOpacity
                  style={styles.addressBtn}
                  onPress={() => {
                    close();
                    setTimeout(() => {
                      navigation.navigate('ACCOUNT', { data: 11 });
                    }, 600);
                  }}>
                  <Icon1
                    name="plus"
                    size={scale(22)}
                    color={theme.colors.green}
                  />
                  <Label title="Aggiungi indirizzo" style={styles.btnlbl} />
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
          ) : (
            <View style={styles.nodataCon}>
              <TouchableOpacity
                style={styles.addressBtn}
                onPress={() => {
                  close();
                  setTimeout(() => {
                    navigation.navigate('ACCOUNT', { data: 11 });
                  }, 600);
                }}>
                <Icon1
                  name="plus"
                  size={scale(22)}
                  color={theme.colors.green}
                />
                <Label title="Aggiungi indirizzo" style={styles.btnlbl} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.transparent,
    width: theme.SCREENWIDTH,
    // position: 'absolute',
    marginTop: theme.SCREENHEIGHT * 0.2,
    bottom: scale(0),
  },
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    paddingHorizontal: scale(20),
    paddingTop: scale(5),
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    margin: scale(0),
    height: theme.SCREENHEIGHT * 0.8,
  },
  headerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: scale(1),
  },
  input: {
    marginVertical: scale(10),
    fontFamily: theme.fonts.PoppinsMedium,
    width: '100%',
    alignSelf: 'center',
  },
  checkboxCon: {
    height: scale(15),
    width: scale(15),
    borderRadius: scale(7),
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.gray,
  },
  check: {
    height: scale(6),
    width: scale(6),
    borderRadius: scale(3),
    backgroundColor: theme.colors.gray,
  },
  addressCon: {
    height: theme.SCREENHEIGHT * 0.5,
    marginVertical: scale(5),
  },
  btn: {
    flexDirection: 'column',
    marginVertical: scale(2),
    marginLeft: scale(5),
    // height: scale(20),
  },
  btnTxt: {
    width: '80%',
    marginVertical: scale(4),
    fontSize: scale(14),
    // paddingHorizontal: scale(2),
  },
  viewCon: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  devider: {
    borderWidth: scale(1),
    borderStyle: 'dotted',
    width: theme.SCREENWIDTH,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(3),
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
    // marginVertical: scale(15),
  },
  btnlbl: {
    marginLeft: scale(10),
    fontWeight: '600',
    fontSize: scale(14),
    color: theme.colors.gray,
  },
  nodataCon: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SetLocationModel;
