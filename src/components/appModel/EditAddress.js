import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {images, scale, theme} from '../../utils';
import InputBox from '../InputBox';
import Button from '../Button';
import {useState} from 'react';
import ApiService, {API} from '../../utils/ApiService';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAddress} from '../../redux/Actions/UserActions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Feather';
import {Title, Error} from '../Label';
import {useToast} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications';

const EditAddress = props => {
  const {isVisible, close, editData} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState(null);
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [addressData, setAddressData] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.UserReducer?.userDetails);
  const addRef = useRef();
  const toast = useToast();
  const toastRef = useRef();

  const handlePlaceChanged = async (data, addData) => {
    const zipCode = data?.address_components.find(addressComponent =>
      addressComponent.types.includes('postal_code'),
    )?.short_name;
    const place = data;

    let latt,
      lngg,
      addrSel,
      placeName,
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

    addrSel =
      place.formatted_address !== undefined ? place.formatted_address : '';
    placeName = place.name !== undefined ? place.name : '';
    placeId = place.place_id !== undefined ? place.place_id : '';
    // console.log('place >>> ', place);
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

    var addressName = null,
      postalCode = null,
      numberStreet = null;
    if (data.address_components) {
      for (const obj of data.address_components) {
        if (obj.types.includes('route')) {
          addressName = obj.short_name;
        } else if (obj.types.includes('street_number')) {
          numberStreet = obj.long_name;
          setStreetNumber(numberStreet);
        } else if (obj.types.includes('postal_code')) {
          postalCode = obj.long_name;
        }
      }
    }

    const frmData = {
      //   ...editData,
      AddressId: editData?.Id,
      Latitute: latt?.toString(),
      Longitude: lngg.toString(),
      UserId: userData?.UserId,
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
      toast.show('indirizzo non valido', toast, {duration: 500});
      addRef.current?.setAddressText('');
    } else {
      setAddressData(frmData);
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
  const handleSave = () => {
    if (addressData !== '') {
      try {
        setLoad(true);
        const frmData = {
          ...addressData,
          AddressId: editData?.Id,
          Description: address,
          Firstname: firstName,
          Lastname: lastName,
          Phone: mobile,
        };
        const options = {payloads: frmData};
        ApiService.post('Users/SaveUserAddress', options)
          .then(res => {
            setLoad(false);
            close();
            if (res?.Status == 'Success') {
              dispatch(getAllAddress());
            }
          })
          .catch(error => {
            setLoad(false);
            console.log('error catch ', error.response);
            //   close();
            dispatch(getAllAddress());
          });
      } catch (error) {
        setLoad(false);
        console.log('eror save address ', error);
        //   close();
        dispatch(getAllAddress());
      }
    } else {
      toastRef.current.show('indirizzo non valido', toast, {duration: 1000});

      addRef.current?.setAddressText('');
    }
  };
  useEffect(() => {
    if (editData) {
      setFirstName(editData?.Name?.toString());
      setLastname(editData?.LastName?.toString());
      setMobile(editData?.Telephone?.toString());
      setAddress(editData?.Address?.toString());
      const tmpData = {
        ...addressData,

        FullAddress: editData?.AddressName,
        Latitute: editData?.Lat,
        Longitude: editData?.Lon,
        Postcode: editData?.PostalCode,
        StreetNo: editData?.StreetNumber,
        Address: editData?.Address,
        UserId: userData?.UserId,
        AddressId: userData?.Id,
        City: editData?.City,
      };
      setAddressData(tmpData);
    }
  }, [editData]);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            <Title title="modifica indirizzo" style={{textAlign: 'center'}} />
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View style={styles.divider} />
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={[styles.container, {paddingHorizontal: 0}]}>
              <ScrollView
                style={styles.container}
                contentContainerStyle={{
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
                }}
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
                  placeholder="nome di battesimo"
                  style={{marginBottom: scale(3), width: '95%'}}
                />
                <InputBox
                  value={lastName}
                  onChangeText={txt => {
                    setLastname(txt);
                  }}
                  placeholder="cognome"
                  keyboardType="numeric"
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
                    setMobile(txt);
                  }}
                  placeholder="Telefono"
                  style={{marginBottom: scale(3)}}
                />
              </ScrollView>
            </KeyboardAvoidingView>
            <Image source={images.appIcon2} style={styles.appIcon} />
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
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    // marginTop: theme.SCREENHEIGHT * 0.2,
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
  btntxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  appIcon: {
    height: scale(50),
    resizeMode: 'contain',
    alignSelf: 'center',
    top: scale(0),
    opacity: 0.35,
    marginVertical: scale(5),
  },
  btn: {
    // padding: scale(5),
    // paddingHorizontal: scale(10),
    backgroundColor: theme.colors.primary,
    borderRadius: scale(20),
    // marginHorizontal: scale(20),
    width: '100%',
  },
});

export default EditAddress;
