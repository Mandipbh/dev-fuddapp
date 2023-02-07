import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {images, scale, theme} from '../utils';
import InputBox from './InputBox';
import Button from './Button';
import {useState} from 'react';
import ApiService from '../utils/ApiService';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAddress} from '../redux/Actions/UserActions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SaveAddress = ({back}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState(null);
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [addressData, setAddressData] = useState('');
  const userData = useSelector(state => state?.UserReducer?.userDetails);
  const dispatch = useDispatch();

  const handleSave = () => {
    try {
      console.log('addressData >> ', addressData);
      // const frmData = {
      //   Latitute: '654',
      //   Longitude: '213',
      //   UserId: userData?.UserId,
      //   StreetNo: '15',
      //   Address: address,
      //   City: 'test',
      //   Postcode: '380059',
      //   FullAddress: address,
      //   Firstname: firstName,
      //   Lastname: lastName,
      //   Description: 'test',
      //   Phone: mobile,
      // };
      // const options = {payloads: frmData};
      // ApiService.post('Users/SaveUserAddress', options)
      //   .then(res => {
      //     console.log('res address', res?.Status);
      //     if (res?.Status == 'Success') {
      //       back();
      //       dispatch(getAllAddress());
      //     }
      //   })
      //   .catch(error => {
      //     console.log('error catch ', error.response);
      //     back();
      //     dispatch(getAllAddress());
      //   });
    } catch (error) {
      console.log('eror save address ', error);
      back();
      dispatch(getAllAddress());
    }
  };
  const compIsType = (t, s) => {
    for (let z = 0; z < t.length; ++z) if (t[z] == s) return true;
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
        if (compIsType(typ, 'administrative_area_level_1'))
          state = addrComp[i].long_name;
        //store the state
        else if (compIsType(typ, 'locality')) city = addrComp[i].long_name;
        //store the city
        else if (compIsType(typ, 'country')) country = addrComp[i].long_name; //store the country

        //we can break early if we find all three data
        if (state != null && city != null && country != null) break;
      }
    }

    let nameData = '';
    // if (this.props.showKey !== undefined) {
    //   if (this.props.showKey == 'CITY') {
    //     nameData = city;
    //   } else if (this.props.showKey == 'STATE') {
    //     nameData = state;
    //   } else if (this.props.showKey == 'COUNTRY') {
    //     nameData = country;
    //   } else if (this.props.showKey == 'PLACE_NAME') {
    //     nameData = country;
    //   } else if (this.props.showKey == 'FORMATTED_ADDRESS') {
    //     nameData = addrSel;
    //   } else if (this.props.showKey == 'PLACE_ID') {
    //     nameData = placeId;
    //   } else {
    //     nameData = addrSel;
    //   }
    // } else {
    //   nameData = addrSel;
    // }

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
    const frmData = {
      Latitute: latt,
      Longitude: lngg,
      UserId: userData?.UserId,
      AddressId: 0,
      StreetNo: 'string',
      Address: address,
      City: city,
      Postcode: zipCode,
      FullAddress: addrSel,
      Firstname: firstName,
      Lastname: lastName,
      Description: addData?.description,
      Phone: mobile,
    };
    setAddressData(frmData);
    console.log(
      'stateRespstateRespstateResp  is this ',
      JSON.stringify(frmData, null, 4),
    );
  };

  return (
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
            placeholder="Inserisci indirizzo"
            // disableScroll={true}
            keepResultsAfterBlur={true}
            onPress={(data, details = null) => {
              console.log('this is data ', data);
              console.log('this is details ', details);

              // console.log('detailsdetails >> ', details);
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
              language: 'en',
              components: 'country:IT',
              sessiontoken: 'sessionToken',
              type: Array[('address', 'postal_code', 'street_number')],
            }}
          />
          <InputBox
            value={firstName}
            onChangeText={txt => {
              setFirstName(txt);
            }}
            placeholder="first name"
            style={{marginBottom: scale(3), width: '95%'}}
          />
          <InputBox
            value={lastName}
            onChangeText={txt => {
              setLastname(txt);
            }}
            placeholder="last name"
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
            placeholder="Telephone"
            style={{marginBottom: scale(3)}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Image source={images.appIcon} style={styles.appIcon} />
      <Button
        title="Salva indirinzo"
        titleStyle={styles.btntxt}
        style={styles.btn}
        onPress={() => {
          handleSave();
        }}
      />
    </View>
  );
};

export default SaveAddress;

const styles = StyleSheet.create({
  btntxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  appIcon: {
    height: scale(77),
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
  container: {height: theme.SCREENHEIGHT * 0.38, width: '100%'},
});
