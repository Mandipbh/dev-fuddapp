import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { images, scale, theme, timeSlot } from '../utils';
import {
  Button,
  InputBox,
  Label,
  OrderPaymentMethod,
  TimePickerModel,
  Title,
} from '../components';
import { useToast } from 'react-native-toast-notifications';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import SetLocationModel from '../components/appModel/SetLocationModel';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ApiService, { API } from '../utils/ApiService';
import { useEffect } from 'react';
import { AddToCart } from '../redux/Actions/CartAction';
import NextSlotAvailabilityModel from '../components/appModel/NextSlotAvailabilityModel';
import { selectedAddress } from '../redux/Actions/UserActions';
const keyboardVerticalOffset = Platform.OS === 'ios' ? scale(40) : 0;
const startOfMonth = moment().format('YYYY-MM-DD');
const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

const CheckoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const [process, setProcesss] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [timeModel, setTimeModel] = useState(false);
  const [timeSloat, setTimeSlot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isCoupenApplied, setCoupenApplied] = useState(false);
  const [coupenAmnt, setCoupenAmnt] = useState(0);
  const [copanCode, setCopanCode] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentModel, setPayment] = useState(false);
  const user = useSelector(state => state.UserReducer?.userDetails);
  const selAddress = useSelector(state => state.UserReducer.selAddress);
  const [load, setLoad] = useState(false);
  const [displayedTimeSloat, setDisplayedTimeSlot] = useState(null);
  var cartDataArray = useSelector(state => state?.CartReducer.cartData);
  const [paymentData, setPaymentData] = useState(null);
  const isLoginUser = useSelector(state => state.UserReducer?.login);
  const [grandTotal, setGrandTotal] = useState(0);
  const [prdTotal, setProdTotal] = useState(0);
  const [currentDay, setCurrentDay] = useState('');
  const [startClosetime, setStartClosetime] = useState('');
  const [startTime, setStartime] = useState('');
  const [endTime, setEndtime] = useState('');
  const [rID, setRId] = useState('');
  const isFocus = useIsFocused();
  const [nextSlotAvailability, setNextSlotAvailability] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [cartData, setCartData] = useState();

  const [delMsg, setDelMsg] = useState('');
  const [checkTimeslot, setCheckTimeslot] = useState('');
  const toast = useToast();


  const selectedCat = useSelector(
    state => state?.RestaurantReducers?.selCategory,
  );

  const restaurantData = useSelector(
    state => state.RestaurantReducers?.restaurantDetails,
  );

  useEffect(() => {
    setCartData(route?.params?.cartdata);
  }, [isFocus]);



  const handleTimer = time => {
    setTimeModel(!timeModel);
    // console.log('TIME >> ', time);
    if (time !== null) {
      const timeslot = time?.replace(' ', 'TO');
      const dTimeSlot = time?.replace(' ', ' TO ');
      setTimeSlot(timeslot);
      setDisplayedTimeSlot(dTimeSlot);
      setCheckTimeslot(timeslot);
    }
  };

  useEffect(() => {
    // handleRestaurantAvailability();
  }, [changeAddress == true]);

  // useEffect(() => {
  //   var timeslot = timeSlot().ptime.replace('TO', '-');
  //   setCheckTimeslot(timeslot);
  //   // handleRestaurantAvailability();
  //   console.log('ptime ??? ', timeslot);
  // }, [checkTimeslot == '']);

  const handleDate = newTime => {
    const receivedTime = newTime.split('-'); // here the time is like "16:14"
    let sTime = receivedTime[0];
    let eTime = receivedTime[1];

    setStartime(sTime);
    setEndtime(eTime);
    setStartClosetime(newTime.replace(' - ', 'TO'));
    setDisplayedTimeSlot(newTime.replace(' - ', 'TO'));
    // setTimeSlot(startClosetime.replace('TO', ' TO '));
  };
  // useEffect(() => {
  //   const today = new Date();
  //   const day = today.getDay();
  //   const daylist = [
  //     'Domenica',
  //     'Lunedì',
  //     'Martedì',
  //     'Mercoledì ',
  //     'Giovedì',
  //     'Venerdì',
  //     'Sabato',
  //   ];
  //   console.log(`Today is : ${daylist[day]}.`);
  //   setCurrentDay(daylist[day]);

  //   (restaurantData !== null || restaurantData !== undefined) &&
  //     restaurantData
  //       .filter(itm => itm.Day === daylist[day])
  //       .map(time => {
  //         setTimeSlot(time.Time);
  //         console.log('timeSloat', time.Time);
  //         handleDate(time.Time?.toString());
  //       });
  // }, [restaurantData, startClosetime, timeSloat, startTime, endTime]);

  useEffect(() => {
    if (route.params) {
      const { total, pTotal } = route?.params;
      setGrandTotal(total);
      setProdTotal(pTotal);
    }
  }, []);
  const dispatch = useDispatch();

  // select timer for order
  useEffect(() => {
    var restaurantId = restaurantData?.ID;
    setRId(restaurantId);

    let newRoundedTime = '';
    let newEndroundTime = '';
    let newtimeSlot = '';
    let restaurantOpeningTime = '';
    let restaurantClosingTime = '';

    // restaurantData?.OpeningTime  -->  JSOn response time
    // restaurantScreenSelectedTime = route?.params?.TimeSlot?.split('TO'); --> previos screen selected time


    //selected time from previous screen
    let restaurantScreenSelectedTime = route?.params?.TimeSlot?.split('TO');
    let restaurantOpenTime = '';
    let restaurantCloseTime = '';
    restaurantOpenTime =
      route?.params?.TimeSlot !== null ? restaurantScreenSelectedTime[0] : '';
    restaurantCloseTime = restaurantScreenSelectedTime[1];

    let [selectedhrs, selectedMin] = restaurantOpenTime.split(':').map(Number);
    var restScreenSelectedTime = parseInt(selectedhrs * 3600 + selectedMin * 60);

    //Json response time
    let [hrs, min] = restaurantData?.OpeningTime.split(':').map(Number);
    var jsonResponseOpenTime = parseInt(hrs * 3600 + min * 60);

    // console.log('restaurantData?.OpeningTime ', restaurantData?.OpeningTime);
    // console.log('restScreenSelectedTime', restScreenSelectedTime);
    // console.log('jsonResponseOpenTime', jsonResponseOpenTime);
    // console.log('=========================================================');

    if (restScreenSelectedTime < jsonResponseOpenTime) {

      //make json response as selected time
      let splitedResOpenTimeMin = min;

      if (splitedResOpenTimeMin > 0) {
        if (splitedResOpenTimeMin > 30) {
          splitedResOpenTimeMin = 60 - splitedResOpenTimeMin;
        } else {
          splitedResOpenTimeMin = 30 - splitedResOpenTimeMin;
        }
      }
      restaurantOpeningTime = moment(new Date().setHours(hrs, min))
        .add(splitedResOpenTimeMin, 'm')
        .format('HH:mm');

      restaurantClosingTime = moment(
        moment(new Date().setHours(hrs, min)).add(splitedResOpenTimeMin, 'm'),
      )
        .add(30, 'm')
        .format('HH:mm');

      newtimeSlot = restaurantOpeningTime
        ?.toString()
        .concat('TO', restaurantClosingTime?.toString());
      setTimeSlot(newtimeSlot);
      setCheckTimeslot(newtimeSlot);
    } else {

      setTimeSlot(route?.params?.TimeSlot);
      setCheckTimeslot(route?.params?.TimeSlot);
    }
  }, [isFocus]);

  const handleResetCoupen = () => {
    setCopanCode('');
    setCoupenApplied(false);
  };
  const handleCoupen = () => {
    const userData = user?.UserInfo;
    if (copanCode !== '') {
      try {
        const folderFrm = {
          UserId: user?.UserInfo !== undefined && userData?.Id,
          RestaurantId: route?.params?.restId,
          RiderId: 0,
          OrderId: 0,
          Date: moment(date).format('DD-MM-YYYY'),
          DiscountCode: copanCode,
          Email: user?.UserInfo !== undefined && userData?.EMail,
          ItemTotalCharge: prdTotal,
        };
        const options = { payloads: folderFrm };
        ApiService.post(API.coupenCode, options)
          .then(res => {
            if (res.Status === 'Success') {
              const coupenAmt = res.Amount;
              setCoupenAmnt(coupenAmt);
            }
            //  console.log('response >> ', res);
            setCoupenApplied(true);
          })
          .catch(c => {
            toast.show(c.response?.data?.Errors[0], toast, { duration: 1000 });

            setCoupenApplied(false);
            console.log('error catch', c.response?.data.Errors[0]);
          });
      } catch (error) {
        setCoupenApplied(false);
        console.log('error of try ', error);
      }
    } else {
      toast.show('Inserisci il codice sconto', toast, { duration: 1000 });

    }
  };
  const handlePaymentMethod = data => {
    setPaymentData(data);
    setPayment(false);
  };

  var itemList = [];
  //total price of order
  const nAmount =
    coupenAmnt !== 0
      ? grandTotal - coupenAmnt
      : grandTotal.toFixed(2).replace('.', '');

  cartData?.map(item => {
    var ingredientsList = [];
    var addOnsList = [];
    var makeTypeIds = [];

    item?.lstIngredients?.map(ingredients => {
      ingredientsList.push(ingredients.IDRiga);
    });

    item?.lstAddons?.map(addOnItem => {
      addOnsList.push({
        AddOneId: addOnItem.IDRiga,
        Quantity: addOnItem.Qty,
      });
    });

    if (
      item?.lstMakeTypes?.toString() !== '[]' ||
      item?.lstMakeTypes?.length === 0
    ) {
      if (item?.lstMakeTypes?.hasOwnProperty('Id')) {
        makeTypeIds.push(item.lstMakeTypes.Id);
      }
    } else {
      makeTypeIds.push();
    }

    // if (item?.lstMakeTypes !== null) {
    //   if (item?.lstMakeTypes !== undefined && item?.lstMakeTypes.length > 0) {
    //   } else {
    //     makeTypeIds.push();
    //   }
    // } else {
    //   makeTypeIds.push();
    // }

    //  item?.lstMakeTypes === null
    //   ? makeTypeIds.push()
    //   : makeTypeIds.push(item.lstMakeTypes.Id);

    itemList.push({
      ItemCode: item.Code,
      Quantity: item.Qty,
      MakeId: 0,
      AddOnsIds: addOnsList,
      RemoveIngredientIds: ingredientsList,
      MakeTypeIds: makeTypeIds, //makeTypeIds.push([item.lstMakeTypes.Id])
    });
  });

  //console.log('itemList >> ', JSON.stringify(itemList, null, 4));

  // var cartDetailJson = {
  //   UserId: user?.UserInfo !== undefined && user?.UserInfo.Id,
  //   RestaurantId: 3,
  //   RiderId: 0,
  //   OrderId: 0,
  //   SelectedAddressId:
  //     selAddress !== null && selAddress !== undefined && selAddress.Id,
  //   Date: moment(date).format('DD-MM-YYYY'),
  //   TimeSlot: timeSloat === null ? '' : timeSloat.replace('TO', '-'),
  //   DiscountCode: copanCode.replace('null', ''),
  //   ItemIds: itemList,
  //   PaymentRequest: paymentData,
  //   OrderDeliveryAddress: {
  //     Address: selAddress?.AddressName,
  //     lat: selAddress?.Lat,
  //     lon: selAddress?.Lon,
  //   },
  // };

  const [remainingData, setRemainingData] = useState([]);

  const handleRemainingCartData = async () => {
    var cartdata = [];
    await cartDataArray
      .filter(data => {

        return data.restaurantId !== route?.params?.restId;
      })
      .map((i, index) => {
        cartdata.push(i);
        console.log('loop', cartdata);
      });
    console.log('handleRemainingCartData', cartdata);
    setAvailableData(cartdata);
  };

  const setAvailableData = data => {
    // setRemainingData(cartData);
    console.log('cartData1', data);
    dispatch(AddToCart(data));
  };


  const handlePlaceOrder = time => {
    var cartDetailJson = {
      UserId: user?.UserInfo !== undefined && user?.UserInfo.Id,
      RestaurantId: route?.params?.restId,
      RiderId: 0,
      OrderId: 0,
      SelectedAddressId:
        selAddress !== null && selAddress !== undefined && selAddress.Id,
      Date: moment(date).format('DD-MM-YYYY'),
      // TimeSlot: timeSloat === null ? '' : timeSloat.replace('TO', '-'),
      TimeSlot: time,
      DiscountCode: copanCode.replace('null', ''),
      ItemIds: itemList,
      PaymentRequest: paymentData,
      OrderDeliveryAddress: {
        Address: selAddress?.AddressName,
        lat: selAddress?.Lat,
        lon: selAddress?.Lon,
      },
    };
    console.log('cartDetailJson', JSON.stringify(cartDetailJson, null, 4));

    if (!isLoginUser) {
      toast.show("Accedi all'app", toast, { duration: 1000 });
      navigation.navigate('ACCOUNT');
    } else if (date === null || date === undefined) {
      toast.show("Seleziona la data", toast, { duration: 1000 });
    } else if (timeSloat === null || timeSloat === undefined) {
      toast.show("Seleziona Time Slot", toast, { duration: 1000 });
    } else if (
      paymentData?.PayType === null ||
      paymentData?.PayType === undefined ||
      paymentData == ''
    ) {
      toast.show("Scegli il metodo di pagamento.", toast, { duration: 1000 });

    } else if (locationModel === undefined || locationModel === null) {
      toast.show("Seleziona l'indirizzo", toast, { duration: 1000 });

    }
    //  else if (notes === undefined || notes === null) {
    //   Alert.alert('Please add notes');
    // }
    else {
      try {
        setLoad(true);
        const options = { payloads: cartDetailJson };
        ApiService.post(API.placeOrder, options)
          .then(res => {
            //  console.log('res of placeOrder >> ', res);
            if (res.Status === 'Success') {
              setLoad(false);
              setProcesss(!process);
              setCoupenApplied(false);
              setCoupenAmnt(0);
              dispatch(selectedAddress(null));

              handleRemainingCartData();
              //dispatch(AddToCart([]));
            }
          })
          .catch(e => {
            setLoad(false);
            console.log('error in placeOrder> ', e.response?.data);
            toast.show(e.response?.data?.Errors[0], toast, { duration: 1000 });

          });
      } catch (e) {
        console.log('e in placeOrder ', e);
        setLoad(false);
      }
    }
  };

  const handleRestaurantAvailability = () => {
    if (selAddress === undefined || selAddress === null) {
      setLocationModel(true);
    } else {
      try {
        if (cartData) {
          const data = {
            Latitute: selAddress?.Lat === undefined ? '' : selAddress?.Lat,
            Longitude: selAddress?.Lon === undefined ? '' : selAddress?.Lon,
            id: cartData[0].restaurantId,
            Date: moment(date).format('DD-MM-YYYY'),
            TimeSlot: checkTimeslot,
            Category: selectedCat == null ? '' : selectedCat,
          };
          setLoad(true);

          const options = { payloads: data };

          //  console.log('payloads_options', options);

          ApiService.post(API.checkestaurantAvailability, options)
            .then(res => {
              if (res.Status === 'Success') {
                //   console.log('res of RestaurantAvailability >> ', res);
                setLoad(false);
                setDelMsg('');
                if (res.IsAvail == false) {

                  setCheckTimeslot(res.NextAvailableSlot);
                  setNextSlotAvailability(true);
                } else {
                  setNextSlotAvailability(false);
                  handlePlaceOrder(checkTimeslot);
                }

                // navigation.navigate('Checkout', {
                //   total:
                //     pTotal +
                //     dPrice +
                //     (pTotal < cartData[0].MinimumOrder ? 2 : 0),
                //   pTotal: pTotal,
                // });
              }
            })
            .catch(e => {
              setLoad(false);
              setDelMsg(
                "La consegna non è disponibile dal ristorante all'indirizzo selezionato.",
              );
              console.log(
                'error in RestaurantAvailability> ',
                e?.response.data,
              );

              toast.show(e.response?.data?.Errors[0], toast, { duration: 1000 });

            });
        }
      } catch (e) {
        console.log('e in RestaurantAvailability ', e);
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    let tmpData = { ...paymentData };
    tmpData.Notes = notes;
    setPaymentData(tmpData);
  }, [notes]);

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
        <Title title="Check Out" style={styles.title} />
      </View>
      {process ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
          }}>
          <Image source={images.check} style={styles.checkImg} />
          <Title title="Ordine Completato!" style={styles.ordin} />
        </View>
      ) : (
        <>
          <View
            style={{
              height:
                Platform.OS === 'android'
                  ? theme.SCREENHEIGHT * 0.83
                  : theme.SCREENHEIGHT * 0.78,
            }}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView
                contentContainerStyle={{ paddingBottom: scale(10) }}
                showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                  <View
                    style={[
                      styles.productView,
                      styles.row,
                      { justifyContent: 'space-between', marginTop: scale(40) },
                    ]}>
                    <View>
                      <Title title="Orario di consegna" />
                      <View style={styles.dataview}>
                        <TouchableOpacity
                          onPress={() => {
                            setOpen(!open);
                          }}>
                          <Label
                            title={moment(date).format('DD-MM-YYYY')}
                            style={{ marginTop: scale(5), fontSize: scale(12) }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setTimeModel(!timeModel)}>
                          <Label
                            title={timeSloat === null ? 'Time' : timeSloat}
                            style={{
                              marginTop: scale(5),
                              fontSize: scale(12),
                              marginLeft: scale(10),
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <TouchableOpacity style={styles.btn}>
                      <Label title="Cambia" />
                    </TouchableOpacity> */}
                  </View>
                  <View
                    style={[
                      styles.productView,
                      styles.row,
                      { justifyContent: 'space-between' },
                    ]}>
                    <View style={{ width: '80%' }}>
                      <Title title="Indirizzo di consegna" />
                      <Label
                        title={'Nome Cognome'}
                        style={{ color: theme.colors.gray }}
                      />
                      <Label
                        title={selAddress?.AddressName}
                        style={{
                          marginTop: scale(5),
                          fontSize: scale(12),
                          width: '100%',
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={[styles.btn, { width: '20%' }]}
                      onPress={() => {
                        setLocationModel(!locationModel);
                      }}>
                      <Label title="Cambia" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.productView,
                      styles.row,
                      { justifyContent: 'space-between' },
                    ]}>
                    <View>
                      <Title title="Dati di pagamento" />
                      {paymentData?.PaymentMethodID && (
                        <Label
                          title={paymentData?.PaymentMethodID}
                          style={{ color: theme.colors.gray }}
                        />
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        setPayment(true);
                      }}>
                      <Label title="Cambia" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.productView,
                      styles.row,
                      { justifyContent: 'space-between' },
                    ]}>
                    <View>
                      <Title title="Note per il ristorante" />
                      <InputBox
                        multiline={true}
                        style={styles.inputBox}
                        placeholder="Note"
                        inputStyle={{
                          textAlignVertical: 'top',
                          paddingTop: 0,
                          paddingBottom: 0,
                          height: theme.SCREENHEIGHT * 0.13,
                        }}
                        onChangeText={txt => {
                          setNotes(txt);
                        }}
                        numberOfLines={4}
                      />
                    </View>
                  </View>
                  <View style={styles.productView1}>
                    <Title title="Hai un codice sconto?" />
                    <View style={styles.viewData}>
                      <TextInput
                        style={styles.copun}
                        placeholder="Codice sconto"
                        value={copanCode}
                        onChangeText={txt => {
                          setCopanCode(txt);
                        }}
                      />
                      <View
                        style={{
                          // justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                          style={styles.applyBtn}
                          onPress={() => handleCoupen()}>
                          <Text style={styles.applyTxt}>Applica</Text>
                        </TouchableOpacity>

                        {copanCode && (
                          <TouchableOpacity
                            onPress={() => {
                              handleResetCoupen();
                            }}>
                            <Icon
                              name="rotate-ccw"
                              size={scale(20)}
                              color={theme.colors.black}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>

                    {isCoupenApplied && (
                      <Title title="Codice Coupen applicato con successo!" />
                    )}
                  </View>
                  <Label title="" />
                </View>
                <View
                  style={[
                    styles.priceingView,
                    { paddingHorizontal: scale(5), paddingBottom: scale(10) },
                  ]}>
                  <Label title="Somma totale" />
                  <Label title={`€ ${grandTotal.toFixed(2)}`} />
                </View>
                {isCoupenApplied && (
                  <>
                    <View
                      style={[
                        styles.priceingView,
                        { paddingHorizontal: scale(8) },
                      ]}>
                      <Label title="Fudd App Resto Promotion" />
                      <Label
                        title={`− € ${coupenAmnt}`}
                        style={{ color: theme.colors.red }}
                      />
                    </View>
                    <View style={styles.divider} />
                    <View
                      style={[
                        styles.priceingView,
                        ,
                        { paddingHorizontal: scale(8), paddingBottom: scale(30) },
                      ]}>
                      <Label title="Totale Finale" />
                      <Label
                        title={`€ ${(grandTotal - coupenAmnt).toFixed(2)}`}
                      />
                    </View>
                  </>
                )}

                {load ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                ) : (
                  <Button
                    title="Invia ordine"
                    style={styles.submitBtn}
                    titleStyle={styles.btnTxt}
                    onPress={() => {
                      handleRestaurantAvailability();
                    }}
                  />
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </>
      )}
      <DatePicker
        confirmText="CONFIRM"
        cancelText="ANNULLA"
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        title="Seleziona la data"
        theme="light"
        // maximumDate={new Date(endOfMonth)}
        minimumDate={new Date(startOfMonth)}
      />
      <TimePickerModel isVisible={timeModel} close={handleTimer} />
      <SetLocationModel
        // fromCheckOut={true}
        isShow={locationModel}
        close={() => {
          // if (isFromCheckOutpage == true) {
          //   setChangeAddress(true);
          // }
          setLocationModel(!locationModel);
        }}
        isCart
      />
      <OrderPaymentMethod
        isVisible={paymentModel}
        close={handlePaymentMethod}
        nAmount={nAmount}
        notes={notes}
      />

      <NextSlotAvailabilityModel
        isVisible={nextSlotAvailability}
        timeslot={checkTimeslot}
        close={stime => {
          stime !== null && handlePlaceOrder(stime);
          setNextSlotAvailability(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    paddingHorizontal: scale(12),
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    width: theme.SCREENWIDTH * 0.9,
    // bottom: theme.SCREENHEIGHT * -0.08,
  },
  btnTxt: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: scale(15),
  },
  headerView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingHorizontal: scale(3),
    paddingVertical: scale(10),
  },
  inputBox: {
    marginHorizontal: 0,
    borderBottomWidth: 0,
    width: theme.SCREENWIDTH * 0.85,
    borderColor: 'transprent',
    borderRadius: 20,
    paddingVertical: 5,
    height: theme.SCREENHEIGHT * 0.15,
  },
  title: {
    fontSize: scale(22),
    marginLeft: theme.SCREENWIDTH * 0.25,
  },
  ordin: {
    fontSize: scale(25),
    textAlign: 'center',
    marginTop: theme.SCREENHEIGHT * 0.05,
    width: scale(150),
  },
  SubView: {
    margin: scale(20),
  },
  PriceView: {
    marginHorizontal: scale(5),
    marginTop: scale(10),
  },
  productView: {
    padding: scale(17),
    borderRadius: scale(15),
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.purpal1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: scale(9),
    marginVertical: scale(10),
  },
  productView1: {
    padding: scale(17),
    borderRadius: scale(15),
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.purpal1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: scale(9),
    // marginVertical: scale(10),
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  items: {
    // marginVertical: scale(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
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
  },
  btn: {
    borderWidth: scale(1),
    borderColor: theme.colors.gray,
    padding: scale(3),
    borderRadius: scale(12),
    marginBottom: scale(20),
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
    marginHorizontal: scale(15),
  },
  dataview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkImg: {
    height: theme.SCREENHEIGHT * 0.3,
    width: theme.SCREENWIDTH * 0.8,
    resizeMode: 'contain',
  },
  applyBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
    marginLeft: 20,
    marginHorizontal: scale(20),
  },
  applyTxt: {
    color: theme.colors.white,
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: theme.fonts.josefinSans,
  },
  copun: {
    borderWidth: scale(1),
    height: scale(40),
    width: '40%',
    borderRadius: scale(15),
    marginLeft: scale(3),
    borderColor: theme.colors.gray,
    paddingLeft: scale(5),
  },
  viewData: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: scale(10),
  },
  divider: {
    width: '112%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
});
