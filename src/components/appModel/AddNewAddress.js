import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import React, {useRef} from 'react';
import {images, scale, theme} from '../../utils';

import Button from '../Button';
import {useState} from 'react';
import ApiService from '../../utils/ApiService';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAddress, selectedAddress} from '../../redux/Actions/UserActions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Feather';
import InputBox from '../InputBox';
import {useToast} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications';
import { useEffect } from 'react';

const AddNewAddress = props => {
  const {isVisible, close, title, subTitle} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [addressData, setAddressData] = useState('');
  const [load, setLoad] = useState(false);
  const userData = useSelector(state => state?.UserReducer?.userDetails);
  const dispatch = useDispatch();
  const [streetNumber, setStreetNumber] = useState('');
  const addRef = useRef();
  const toast = useToast();
  const toastRef = useRef();

  const validation = () => {
    let error = false;
    if (firstName === '') {
      toastRef.current.show('Inserisci il tuo nome di battesimo', toast, {
        duration: 1000,
      });
      error = true;
    } else if (lastName === '') {
      toastRef.current.show('AInserire il cognome', toast, {duration: 1000});
      error = true;
    } else if (address === '') {
      toastRef.current.show('Inserisci un indirizzo valido', toast, {
        duration: 1000,
      });

      error = true;
    } else if (mobile === '') {
      toastRef.current.show('Inserisci un numero di cellulare valido', toast, {
        duration: 1000,
      });

      error = true;
    } else {
      error = false;
    }
    return error;
  };

  const handleSave = () => {
    if (!validation()) {
      if (addressData === '') {
        addRef.current?.setAddressText('');
        toastRef.current.show(
          "Inserisci un indirizzo preciso con numero civico. L' indirizzo selezionato è troppo vago.",
          toast,
          {duration: 1000},
        );
      } else {
        console.log('Error2', 'success');
        try {
          const passData = {
            Address: addressData.Address,
            AddressName: addressData.FullAddress,
            City: addressData.City,

            LastName: lastName,
            Lat: addressData?.Latitute,
            Lon: addressData?.Longitude,
            Name: firstName,
            Notations: null,
            PostalCode: addressData?.Postcode,
            StreetNumber: streetNumber,
            Telephone: mobile,
          };
          dispatch(selectedAddress(passData));
          setLoad(true);
          const frmData = {
            ...addressData,
            Firstname: firstName,
            Lastname: lastName,
            Description: address,
            Phone: mobile,
          };
          const options = {payloads: frmData};
          console.log('options >>> ', frmData);
          ApiService.post('Users/SaveUserAddress', options)
            .then(res => {
              setLoad(false);
              console.log('res address', res?.Status);
              if (res?.Status == 'Success') {
                close();
                dispatch(getAllAddress());
                clearData();
              }
            })
            .catch(error => {
              setLoad(false);
              console.log('error catch ', error.response);
              close();
              dispatch(getAllAddress());
            });
        } catch (error) {
          setLoad(false);
          console.log('eror save address ', error);
          close();
          dispatch(getAllAddress());
        }
      }
    }
  };
  const compIsType = (t, s) => {
    for (let z = 0; z < t.length; ++z) {
      if (t[z] == s) {
        return true;
      }
    }
    return false;
  };
  const handlePlaceChanged = async (data, addData) => {
    const zipCode = data?.address_components.find(addressComponent =>
      addressComponent.types.includes('postal_code'),
    )?.short_name;
    const place = data;
    let latt,
      lngg,
      addrSel,
      placeName,
      street_number,
      placeId = '';
    let country,
      state,
      city = null;
    if (place.geometry !== undefined) {
      const plcGeom = place.geometry;
      if (plcGeom.location !== undefined) {
        const {lat, lng} = place?.geometry?.location;
        latt = lat;
        lngg = lng;
      }
    }
    console.log('street_number ??? ', street_number);
    addrSel =
      place.formatted_address !== undefined ? place.formatted_address : '';
    placeName = place.name !== undefined ? place.name : '';
    placeId = place.place_id !== undefined ? place.place_id : '';
    if (place.address_components !== undefined) {
      let addrComp = place.address_components;
      for (let i = 0; i < addrComp.length; ++i) {
        var typ = addrComp[i].types;
        if (compIsType(typ, 'administrative_area_level_1')) {
          state = addrComp[i].long_name;
        }
        //store the state
        else if (compIsType(typ, 'locality')) {
          city = addrComp[i].long_name;
        }
        //store the city
        else if (compIsType(typ, 'country')) {
          country = addrComp[i].long_name;
        } //store the country

        //we can break early if we find all three data
        if (state != null && city != null && country != null) {
          break;
        }
      }
    }

    let nameData = '';

    let stateResp = {
      lat: latt,
      lng: lngg,
      formattedAddress: addrSel,
      placeName: placeName,
      placeId: placeId,
      city: city,
      state: state,
      country: country,
      textboxtext: nameData,
      Description: addData?.description,
    };

    var addressName = null,
      postalCode = null,
      numberStreet = null;
    if (data.address_components) {
      for (const obj of data.address_components) {
        if (obj.types.includes('route')) {
          addressName = obj.short_name;
          console.log('addressName', addressName);
        } else if (obj.types.includes('street_number')) {
          numberStreet = obj.long_name;
          setStreetNumber(numberStreet);
          console.log('numberStreet', numberStreet);
        } else if (obj.types.includes('postal_code')) {
          postalCode = obj.long_name;
          console.log('postalCode', postalCode);
        }
      }
    }

    console.log('data?.address_components >> ', data?.address_components);
    const frmData = {
      Latitute: latt?.toString(),
      Longitude: lngg.toString(),
      UserId: userData?.UserId,
      AddressId: 0,
      StreetNo: numberStreet !== null ? numberStreet : '',
      City: city,
      Postcode: zipCode,
      FullAddress: addrSel,
      Firstname: firstName,
      Lastname: lastName,
      Description: addData?.description,
      Phone: mobile,
      Address: placeName,
    };
    if (frmData.StreetNo === '') {
      setAddressData('');
    } else {
      setAddressData(frmData);
    }

    console.log(
      'stateRespstateRespstateResp  is this ',
      JSON.stringify(frmData, null, 4),
    );
  };
  const clearData = () => {
    setFirstName('');
    setLastname('');
    setMobile('');
    setAddress('');
    setAddressData('');
  };

  useEffect(() => {
    clearData();
  }, [isVisible === true]);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Icon
            name="x"
            size={scale(20)}
            color={theme.colors.black}
            style={styles.closeIcon}
            onPress={() => {
              close();
            }}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, {paddingHorizontal: 0}]}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.view}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <GooglePlacesAutocomplete
                ref={addRef}
                placeholder="Inserisci indirizzo"
                // disableScroll={true}
                keepResultsAfterBlur={true}
                onPress={(data, details = null) => {
                  handlePlaceChanged(details, data);
                  const {lat, lng} = details?.geometry?.location;
                }}
                // debounce={200}
                fetchDetails={true}
                query={{
                  key: 'AIzaSyDxUeU36VnWRBXAok6txlBCV2rq9UhHWT4',
                  // language: 'en',
                  // types: '(cities)',
                  // components: 'country:IT',
                  language: 'it',
                  components: 'country:IT',
                  sessiontoken: 'sessionToken',
                  type: Array[
                    ('address',
                    'postal_code',
                    'street_number',
                    'street_address')
                  ],
                }}
                textInputProps={{
                  placeholderTextColor: theme.colors.gray,
                  returnKeyType: 'search',
                }}
                styles={{
                  description: {color: 'black'},

                  textInput: {
                    color: theme.colors.black,
                    marginHorizontal: scale(15),
                    borderBottomWidth: scale(1),
                    borderBottomColor: theme.colors.gray1,
                    fontSize: scale(14),
                    fontFamily: theme.fonts.semiBold,
                    marginLeft: scale(15),
                    paddingLeft: scale(10),
                  },
                }}
              />
              <InputBox
                value={firstName}
                onChangeText={txt => {
                  setFirstName(txt);
                }}
                placeholder="Nome di battesimo"
                style={{marginBottom: scale(3)}}
              />
              <InputBox
                value={lastName}
                onChangeText={txt => {
                  setLastname(txt);
                }}
                placeholder="Cognome"
                style={{marginBottom: scale(3)}}
              />
              <InputBox
                value={address}
                onChangeText={txt => {
                  setAddress(txt);
                }}
                placeholder="Intercom at, staircase, floor"
                style={{marginBottom: scale(3)}}
              />
              <InputBox
                value={mobile}
                onChangeText={txt => {
                  setMobile(txt.replace(/[^0-9]/g, ''));
                }}
                placeholder="Telefono"
                style={{marginBottom: scale(3)}}
                keyboardType="numeric"
              />
            </ScrollView>
          </KeyboardAvoidingView>
          <Image source={images.appIcon} style={styles.appIcon} />
          {load ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <Button
              title="Salva indirinzo"
              titleStyle={styles.btntxt}
              style={styles.btn}
              onPress={() => {
                handleSave();
              }}
            />
          )}
        </View>
      </View>
      <Toast ref={toastRef} />
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
    width: theme.SCREENWIDTH * 0.85,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(15),
    zIndex: 111,
    maxHeight: theme.SCREENHEIGHT * 0.65,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(7),
    // paddingHorizontal:scale(10)
    // marginVertical:scale(8)
  },
  divider: {
    width: '112%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  subTitleView: {
    paddingVertical: scale(20),
  },
  btntxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  appIcon: {
    height: scale(85),
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
    top: scale(40),
    opacity: 0.35,
  },
  btn: {
    // padding: scale(5),
    // paddingHorizontal: scale(10),
    backgroundColor: theme.colors.primary,
    borderRadius: scale(20),
    // marginHorizontal: scale(20),
    width: '100%',
  },
  view: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    // flexGrow: 1,
  },
  closeIcon: {
    position: 'absolute',
    right: scale(5),
    top: scale(10),
    padding: scale(5),
    zIndex: 1,
  },
});

export default AddNewAddress;
