import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {scale, theme, timeSlot} from '../utils';
import {
  Header,
  Button,
  Label,
  Title,
  RestaurantsCard,
  CategoryCard,
  FoodCard,
  PaymentMethod,
  ContactModal,
  OrderPaymentMethod,
} from '../components';
import {foodData} from '../utils/MockData';
import DrawerModal from '../components/appModel/DrawerModal';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  getAllCategory,
  getAllRestaurants,
  getpopularRestaurants,
} from '../redux/Actions/HomeAction';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import SetLocationModel from '../components/appModel/SetLocationModel';
import moment from 'moment';
import {setCategory} from '../redux/Actions/RestaurantAction';
import OrderModal from '../components/appModel/OrderModal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Feather';
import {selectedAddress} from '../redux/Actions/UserActions';

const Category = ({categoryListData}) => {
  return (
    <View>
      <Title title="Categorie" style={styles.title} />
      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {categoryListData &&
          categoryListData?.map((item, index) => {
            return <CategoryCard item={item} index={index} />;
          })}
      </ScrollView>
    </View>
  );
};

const PopularRestaturants = ({ExternalRestaurantData, navigation}) => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.popularView}>
        <Title title="Ristoranti popolari" style={styles.title} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RISTORANTI', {
              screen: 'RISTORANTI',
            });
          }}>
          <Label title="VEDI TUTTO" style={styles.seeAll} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {ExternalRestaurantData &&
          ExternalRestaurantData?.map((item, index) => {
            return <RestaurantsCard item={item} index={index} Popular />;
          })}
      </ScrollView>
    </View>
  );
};

const Restaturants = ({restaurant}) => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.popularView}>
        <Title title="Advertising" style={styles.title} />
        {/* <Label title="SEE ALL" style={styles.seeAll} /> */}
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: scale(15)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {restaurant &&
          restaurant.reverse()?.map((item, index) => {
            return (
              <TouchableOpacity>
                <RestaurantsCard item={item} index={index} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

const HomeScreen = () => {
  const [categoryView, setCategoryView] = useState(false);
  const [searchtxt, setSearchTxt] = useState('');
  const [selectedModal, setSelectedModal] = useState(false);
  const [categoryListData, setCategoryData] = useState([]);
  const [restaurant, setExternalRestaurant] = useState([]);
  const [popularRestaurants, setPopularRestaturants] = useState([]);
  const [locationModel, setLocationModel] = useState(false);
  const [contactModal, setContact] = useState(false);
  const [paymentModel, setPayModel] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const isFocuse = useIsFocused();
  const navigation = useNavigation();
  const ref = useRef();
  const dispatch = useDispatch();
  const IconClosePicker = () => {
    setSelectedModal(false);
  };
  const isLoginUser = useSelector(state => state.UserReducer?.login);
  const seladdress = useSelector(state => state.UserReducer.selAddress);

  const handleCloseModal = () => {
    setOrderModalVisible(!orderModalVisible);
  };
  useEffect(() => {
    const timeSlotData = timeSlot();
    dispatch(getAllCategory());
    let obj = {
      id: 0,
      date: moment().format('DD-MM-YYYY'),
      timeSlot: timeSlotData.ptime,
      category: '',
      longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
      latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
    };
    dispatch(getAllRestaurants(obj));
    dispatch(getpopularRestaurants());
    dispatch(setCategory(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocuse, selectedModal, seladdress]);

  const categoryData = useSelector(state => state.HomeReducers?.categoryList);
  const ExternalRestaurant = useSelector(
    state => state.HomeReducers.allRestaurants,
  );
  const popularRes = useSelector(
    state => state.HomeReducers?.GetAllExternalRestaurant,
  );

  useEffect(() => {
    setPopularRestaturants(popularRes?.Restaurants);
  }, [popularRes]);

  useEffect(() => {
    setCategoryData(categoryData?.Categories);
  }, [categoryData]);

  useEffect(() => {
    setExternalRestaurant(ExternalRestaurant?.Restaurants);
  }, [ExternalRestaurant]);

  //render all foods
  const Food = () => {
    return (
      <>
        <FoodCard
          // item={item}
          index={0}
          onPress={() => {
            setCategoryView(false);
          }}
          styleImage={{width: '95%'}}
        />
        <FlatList
          data={foodData}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <FoodCard
                item={item}
                index={index}
                onPress={() => {
                  setCategoryView(false);
                }}
              />
            );
          }}
        />
      </>
    );
  };

  // handle google autocomplate Search
  const compIsType = (t, s) => {
    for (let z = 0; z < t.length; ++z) if (t[z] == s) return true;
    return false;
  };
  const handlePlaceChanged = async (data, addData) => {
  
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

    let stateResp = {
      lat: latt,
      lng: lngg,
      formattedAddress: addrSel,
      placeName: placeName,
      placeId: placeId,
      city: city,
      state: state,
      country: country,
    };

    const frmData = {
      Lat: latt?.toString(),
      Lon: lngg.toString(),
      AddressName: addrSel,
      placeName: placeName,
      StreetNo: data?.address_components[0]?.long_name,
     Address: placeName,
    };
    dispatch(selectedAddress(frmData));
    console.log(
      'stateRespstateRespstateResp  is this ',
      JSON.stringify(frmData, null, 4),
    );
  };

  useEffect(() => {
    if (seladdress !== null) {
      ref.current?.setAddressText(seladdress?.AddressName);
    }
  }, [isFocuse, seladdress]);
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressMenu={() => setSelectedModal(true)}
        onPressUser={() => navigation.navigate('ACCOUNT')}
      />
      <DrawerModal
        isVisible={selectedModal}
        close={IconClosePicker}
        handlePayment={() => {
          setPayModel(true);
          setSelectedModal(false);
        }}
        handleContact={() => {
          setContact(true);
          setSelectedModal(false);
        }}
        handleMyOrder={() => {
          setOrderModalVisible(true);
        }}
      />
      <View style={styles.mainContainer}>
        <ScrollView
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
          style={{
            position: 'absolute',
            top: theme.SCREENHEIGHT * 0.01,
            width: '100%',
            zIndex: 11,
            alignSelf: 'center',
          }}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <GooglePlacesAutocomplete
            // renderLeftButton={() => (
            //   <Icon
            //     name="search"
            //     size={scale(22)}
            //     color={theme.colors.black}
            //     style={{
            //       backgroundColor: theme.colors.white,
            //       padding: scale(10),
            //     }}
            //   />
            // )}
            placeholder="Inserisci il tuo indirizzo completo"
            keepResultsAfterBlur={true}
            onPress={(data, details = null) => {
              handlePlaceChanged(details, data);
            }}
            fetchDetails={true}
            query={{
              key: 'AIzaSyDxUeU36VnWRBXAok6txlBCV2rq9UhHWT4',
              language: 'en',
              components: 'country:IT',
              sessiontoken: 'sessionToken',
              type: Array[
                ('address', 'postal_code', 'street_number', 'street_address')
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
                marginHorizontal: scale(5),
                borderBottomWidth: scale(1),
                borderBottomColor: theme.colors.gray1,
                fontSize: scale(14),
                fontFamily: theme.fonts.josefinSans,

                paddingLeft: scale(10),
              },
            }}
            ref={ref}
            renderRightButton={() =>
              ref.current?.getAddressText() ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.white,
                    left: scale(-5),
                    height: scale(39),
                    paddingHorizontal: scale(5),
                    justifyContent: 'center',
                    borderBottomWidth: scale(1),
                    borderBottomColor: theme.colors.gray1,
                  }}
                  onPress={() => {
                    ref.current?.setAddressText('');
                    dispatch(selectedAddress(null));
                  }}>
                  <Icon name={'x'} color={'black'} size={20} />
                </TouchableOpacity>
              ) : null
            }
          />
        </ScrollView>

        {/* <View style={[styles.textinputContainer, styles.shadow]}>
          <Icon
            name="search"
            size={scale(23)}
            color={theme.colors.placeholder}
          /> */}

        {/* <TextInput
            value={searchtxt}
            onChangeText={txt => {
              setSearchTxt(txt);
            }}
            placeholder={
              categoryView
                ? 'Cosa ti portiamo?'
                : 'Inserisci il tuo indirizzo completo'
            }
            style={styles.searchbox}
            placeholderTextColor={theme.colors.placeholder}
          /> */}

        {/* </View> */}
        {isLoginUser && (
          <Button
            onPress={() => {
              setLocationModel(true);
            }}
            title={'Trova ristoranti'}
            style={styles.ristroBtn}
            titleStyle={styles.btnText}
          />
        )}
        {!isLoginUser && <View style={{height: scale(40)}} />}
        <View
          style={{
            height: isLoginUser
              ? theme.SCREENHEIGHT * 0.6
              : theme.SCREENHEIGHT * 0.7,
            paddingTop: !isLoginUser ? scale(20) : 0,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {!categoryView && <Category categoryListData={categoryListData} />}
            <PopularRestaturants
              ExternalRestaurantData={popularRestaurants}
              navigation={navigation}
            />
            {!categoryView && <Restaturants restaurant={restaurant} />}
          </ScrollView>
        </View>
      </View>
      <SetLocationModel
        isShow={locationModel}
        close={() => {
          setLocationModel(!locationModel);
        }}
      />
      <PaymentMethod
        isVisible={paymentModel}
        close={() => {
          setPayModel(false);
        }}
      />
      <ContactModal isVisible={contactModal} close={() => setContact(false)} />
      <OrderModal isVisible={orderModalVisible} close={handleCloseModal} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    paddingHorizontal: scale(12),
  },
  textinputContainer: {
    height: scale(40),
    backgroundColor: theme.colors.white,
    borderWidth: Platform.OS === 'ios' ? scale(0.5) : scale(1),
    borderRadius: scale(20),

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
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
    width: '100%',
  },
  ristroBtn: {
    width: '65%',
    height: scale(38),
    backgroundColor: theme.colors.purpal,
    marginTop: scale(60),
  },
  btnText: {
    fontSize: scale(14),
    fontWeight: '700',
    color: theme.colors.white,
  },
  scrollView: {
    height: Platform.OS === 'android' ? '70%' : '75%',
  },

  categoryContainer: {
    // marginTop: scale(25),
  },
  title: {
    fontSize: scale(16),
    marginVertical: scale(10),
  },
  popularView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: scale(11),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(144, 130, 152, 0.55)',
  },
});
