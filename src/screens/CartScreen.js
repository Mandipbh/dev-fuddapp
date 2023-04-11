import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Emptycart, scale, theme } from '../utils';
import { Button, Label, Title, Error } from '../components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../redux/Actions/CartAction';

import ApiService, { API } from '../utils/ApiService';
import moment from 'moment';
import LoginModel from '../components/appModel/LoginModel';
import SetLocationModel from '../components/appModel/SetLocationModel';
import { timeSlot } from '../utils/TimeSlot';
import NextSlotAvailabilityModel from '../components/appModel/NextSlotAvailabilityModel';

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state?.CartReducer.cartData);
  const user = useSelector(state => state.UserReducer?.userDetails);
  const selectedCat = useSelector(
    state => state?.RestaurantReducers?.selCategory,
  );
  const seladdress = useSelector(state => state.UserReducer.selAddress);
  const [delMsg, setDelMsg] = useState('');
  const dispatch = useDispatch();
  const [pTotal, setPTotal] = useState(0);
  const [load, setLoad] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dPrice, setDPrice] = useState(0);
  const [loginModel, setLoginModel] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [nextSlotAvailability, setNextSlotAvailability] = useState(false);
  const isFocus = useIsFocused();

  const [listedCartData, setListedCartData] = useState([]);
  const [tmpData, setTmpData] = useState([]);
  const [hasCartDataAvailable, setCartDataAvailable] = useState(false);

  const [selectedTime, setTime] = useState('');
  var cartDataArray = [];

  console.log('cartDataScreen', JSON.stringify(cartData, null, 4));

  useEffect(() => {
    var timeslot = route?.params?.selectedTimeSlot;
    setTime(timeslot);

    cartData?.map((data, index) => {
      if (data.restaurantId == route?.params?.restaurantId) {
        cartDataArray.push(data);
        setTmpData(cartDataArray);
      }
    });
    setListedCartData(cartDataArray);
  }, [isFocus]);

  const incrimentCart = (selitm, idx) => {
    var lstAddOns = [];
    selitm?.lstAddons?.map(addOn => {
      lstAddOns.push(addOn);
    });

    var lstIngredient = [];
    selitm?.lstIngredients?.map(ingredient => {
      lstIngredient.push(ingredient);
    });
    var makeTypeObj = selitm?.lstMakeTypes;
    // listedCartData[idx].Qty = listedCartData[idx].Qty + 1;
    const tmparr = [...cartData];
    tmparr.map(async (data, i) => {
      if (
        data.Name == selitm.Name &&
        JSON.stringify(data.lstAddons) === JSON.stringify(lstAddOns) &&
        JSON.stringify(data.lstMakeTypes) === JSON.stringify(makeTypeObj) &&
        JSON.stringify(data.lstIngredients) === JSON.stringify(lstIngredient)
      ) {
        tmparr[i].Qty = tmparr[i].Qty + 1;
      }
    }, []);
    setTmpData(tmparr);

    //dispatch(AddToCart(tmparr));
  };

  const decrimentCart = (selitm, idx) => {
    var lstAddOns = [];
    selitm?.lstAddons?.map(addOn => {
      lstAddOns.push(addOn);
    });

    var lstIngredient = [];
    selitm?.lstIngredients?.map(ingredient => {
      lstIngredient.push(ingredient);
    });
    var makeTypeObj = selitm?.lstMakeTypes;

    const tmparr = [...cartData];
    tmparr.map(async (data, i) => {
      if (
        data.Name == selitm.Name &&
        JSON.stringify(data.lstAddons) === JSON.stringify(lstAddOns) &&
        JSON.stringify(data.lstMakeTypes) === JSON.stringify(makeTypeObj) &&
        JSON.stringify(data.lstIngredients) === JSON.stringify(lstIngredient)
      ) {
        if (data.Qty == 1) {
          // tmparr.remove(data);
          const index = tmparr.indexOf(data);
          tmparr.splice(index, 1);
        } else {
          tmparr[i].Qty = tmparr[i].Qty - 1;
        }
      }
    }, []);
    setTmpData(tmparr);

    dispatch(AddToCart(tmparr));
  };

  const calculatePrice = () => {
    if (availableCartItem !== null && availableCartItem !== undefined) {
      const tmparr = [...availableCartItem];
      const initialValue = 0;
      const total = tmparr?.reduce(
        (accumulator, current) => accumulator + current.Amount * current?.Qty,
        initialValue,
      );
      setPTotal(total);
      getCalculateDeliveryPrice(total);
    }
  };
  const isLoginUser = useSelector(state => state.UserReducer?.login);

  var availableCartItem = cartData?.filter(function (data) {
    return data.restaurantId == route?.params?.restaurantId;
  });
  useEffect(() => {
    var hasCartData =
      cartData?.filter(function (data) {
        return data.restaurantId == route?.params?.restaurantId;
      }).length > 0;
    setCartDataAvailable(hasCartData);

    if (listedCartData !== null && listedCartData !== undefined) {
      calculatePrice();
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listedCartData, cartData, tmpData]);

  const getCalculateDeliveryPrice = total => {
    try {
      if (listedCartData) {
        const data = {
          Latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
          Longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
          RestaurantId: listedCartData[0].restaurantId,
          OrderPrice: total,
        };

        setLoad(true);
        const options = { payloads: data };

        ApiService.post(API.CalculateDeliveryPrice, options)
          .then(res => {
            if (res.Status === 'Success') {
              setDPrice(res.DeliveryPrice);
              setLoad(false);
            }
          })
          .catch(e => {
            console.log('error response > . ', e.response);
            setLoad(false);
          });
      }
    } catch (e) {
      console.log('e in CalculateDeliveryPrice ', e);
      setLoad(false);
    }
  };

  const handleClose = () => {
    setLoginModel(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Icon
          name="chevron-left"
          size={scale(28)}
          color={theme.colors.black}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Title title="Carrello" style={styles.title} />
      </View>

      <View style={styles.productView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {hasCartDataAvailable ? (
            cartData
              .filter(data => data.restaurantId == route?.params?.restaurantId)
              .map((i, index) => {
                // listedCartData?.map((i, index) => {
                return (
                  <View
                    style={{
                      borderBottomColor: theme.colors.gray1,
                      borderBottomWidth:
                        listedCartData?.length === index + 1 ? 0 : scale(1),
                      paddingVertical: scale(5),
                    }}>
                    <View style={styles.items}>
                      <Image
                        source={{
                          uri: i?.Image,
                        }}
                        style={styles.productImg}
                      />
                      <View style={styles.detailsView}>
                        <Title title={i?.Name} />
                        {/* <Label title={i?.Code} style={styles.desc} /> */}
                      </View>
                    </View>
                    {
                      (console.log('111', typeof i?.lstMakeTypes),
                        console.log('222 ', i?.lstAddons?.length > 0),
                        console.log('333 ', i?.lstIngredients?.length > 0))
                    }
                    {typeof i?.lstMakeTypes === 'object' ||
                      i?.lstAddons?.length > 0 ||
                      i?.lstIngredients?.length > 0 ? (
                      <View
                        style={{
                          marginLeft: scale(45),
                          paddingBottom: scale(5),
                        }}>
                        {typeof i?.lstMakeTypes === 'object' && (
                          <Label
                            title={i?.lstMakeTypes?.Prodo}
                            style={{ fontWeight: '400' }}
                          />
                        )}
                        {i?.lstAddons?.length > 0 &&
                          i?.lstAddons?.map(lsItem => (
                            <View
                              style={[styles.row, { marginVertical: scale(1) }]}>
                              <Label
                                title="con "
                                style={{ color: theme.colors.primary }}
                              />
                              <Label
                                title={lsItem?.Descrizione?.trim()}
                                style={{ fontWeight: '400' }}
                              />
                            </View>
                          ))}
                        {i?.lstIngredients?.length > 0 &&
                          i?.lstIngredients?.map(item => (
                            <View
                              style={[styles.row, { marginVertical: scale(1) }]}>
                              <Label
                                title="senza "
                                style={{ color: theme.colors.primary }}
                              />
                              <Label
                                title={item?.Descrizione?.trim()}
                                style={{ fontWeight: '400' }}
                              />
                            </View>
                          ))}
                      </View>
                    ) : null}

                    <View
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={[styles.row, { justifyContent: 'space-between' }]}>
                      <View style={[styles.row, { marginLeft: scale(45) }]}>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            decrimentCart(i, index);
                          }}>
                          <Icon1
                            name={i?.Qty <= 1 ? 'delete' : 'minus'}
                            size={scale(16)}
                            color={theme.colors.gray}
                          />
                        </TouchableOpacity>
                        <Title title={i?.Qty} style={styles.number} />
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            incrimentCart(i, index);
                          }}>
                          <Icon
                            name="plus"
                            size={scale(16)}
                            color={theme.colors.gray}
                          />
                        </TouchableOpacity>
                      </View>
                      <Title
                        title={`€ ${(i?.Amount * i?.Qty)?.toFixed(2)}`}
                        style={styles.price}
                      />
                      {/* i?.Items?.length > 0 ? i?.Items.map((data, index) =>  { return <Title title={data?.Name} />} ) */}
                    </View>
                  </View>
                );
              })
          ) : (
            <>
              <View style={styles.noDataCon}>
                <LottieView
                  source={Emptycart}
                  autoPlay
                  loop
                  style={{ height: scale(240) }}
                />
                <Title title="Carrello vuoto" />
              </View>
            </>
          )}
        </ScrollView>
      </View>

      {hasCartDataAvailable && (
        <View style={styles.PriceView}>
          <View style={styles.priceingView}>
            <Title title="Totale Prodotti" />
            <Title title={`€ ${pTotal?.toFixed(2)}`} style={styles.number} />
          </View>

          {pTotal < listedCartData[0]?.MinimumOrder && (
            <View style={styles.priceingView}>
              <Title
                title={`Sipplemento ordine inferiore a €${listedCartData[0].MinimumOrder}`}
                MinOrderCharge
                style={{ width: '70%' }}
              />
              <Title
                title={`€ ${listedCartData[0]?.MinOrderSupplment?.toFixed(2)}`}
                style={styles.number}
              />
            </View>
          )}
          <View style={styles.priceingView}>
            <Title title="Spese di consegna" />
            <Title title={`€ ${dPrice?.toFixed(2)}`} style={styles.number} />
          </View>

          <View
            style={[
              styles.priceingView,
              {
                borderTopWidth: scale(1),
                borderTopColor: theme.colors.gray,
                paddingTop: scale(10),
              },
            ]}>
            <Title title="Totale Finale" />
            <Title
              title={`€ ${(
                pTotal +
                dPrice +
                (pTotal < tmpData[0]?.MinimumOrder
                  ? tmpData[0]?.MinOrderSupplment
                  : 0)
              ).toFixed(2)}`}
              style={styles.number}
            />
          </View>
          {/* {delMsg !== '' && <Error error={delMsg} />}  */}
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: theme.SCREENHEIGHT * 0.05,
          zIndex: 111,
        }}>
        {hasCartDataAvailable && (
          <Button
            title="Procedi al CheckOut"
            style={styles.submitBtn}
            titleStyle={styles.btnTxt}
            onPress={() => {
              if (!isLoginUser) {
                setLoginModel(true);
              } else {
                navigation.navigate('Checkout', {
                  total:
                    pTotal +
                    (pTotal < availableCartItem[0].MinimumOrder
                      ? availableCartItem[0].MinOrderSupplment
                      : 0),
                  pTotal: pTotal,
                  dPrice: dPrice,
                  restId: route?.params?.restaurantId,
                  TimeSlot: selectedTime,
                  cartdata: availableCartItem,
                  selectedDate: route?.params?.selectedDate,
                });
              }

              // if (seladdress?.Lat === undefined || seladdress?.Lat === null) {
              //   Alert.alert('Select the address');
              // } else {
              //   handleRestaurantAvailability();
              // }
            }}
          />
        )}
      </View>
      <SetLocationModel
        isShow={locationModel}
        close={() => {
          setLocationModel(false);
        }}
      />
      <LoginModel isVisible={loginModel} close={handleClose} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    paddingHorizontal: scale(12),
  },
  submitBtn: {
    // backgroundColor: theme.colors.red,
    backgroundColor: theme.colors.primary,
    bottom: theme.SCREENHEIGHT * 0.05,
  },
  btnTxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  title: {
    fontSize: scale(22),
    marginLeft: theme.SCREENWIDTH * 0.3,
  },
  SubView: {
    margin: scale(20),
  },
  PriceView: {
    paddingHorizontal: scale(15),
    marginHorizontal: scale(5),
    marginTop: scale(10),
    height: theme.SCREENHEIGHT * 0.18,
  },
  productView: {
    padding: scale(15),
    borderRadius: scale(15),
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.purpal1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: scale(9),
    margin: scale(15),
    maxHeight: theme.SCREENHEIGHT * 0.45,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  items: {
    // marginVertical: scale(7),
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontSize: scale(11),
    marginTop: scale(3),
  },
  detailsView: {
    marginLeft: scale(10),
  },
  productImg: {
    height: scale(35),
    width: scale(35),
    borderRadius: scale(17),
  },
  btn: {
    borderWidth: scale(1),
    borderColor: theme.colors.gray,
    padding: scale(3),
    borderRadius: scale(12),
  },
  number: {
    marginHorizontal: scale(10),
    color: theme.colors.red,
  },
  price: {
    color: theme.colors.red,
  },
  priceingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(4),
  },
  noDataCon: {
    // height: scale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
