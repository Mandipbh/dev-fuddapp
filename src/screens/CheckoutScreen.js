import {
  ActivityIndicator,
  Alert,
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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, scale, theme} from '../utils';
import {
  Button,
  InputBox,
  Label,
  OrderPaymentMethod,
  TimePickerModel,
  Title,
} from '../components';
import {useNavigation} from '@react-navigation/native';
import SetLocationModel from '../components/appModel/SetLocationModel';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ApiService, {API} from '../utils/ApiService';
import {useEffect} from 'react';
import {AddToCart} from '../redux/Actions/CartAction';
const keyboardVerticalOffset = Platform.OS === 'ios' ? scale(40) : 0;
const startOfMonth = moment().format('YYYY-MM-DD');
const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

const CheckoutScreen = ({route}) => {
  const navigation = useNavigation();
  const [process, setProcesss] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [] = useState(false);
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
  const cartData = useSelector(state => state?.CartReducer.cartData);
  const [paymentData, setPaymentData] = useState(null);
  const isLoginUser = useSelector(state => state.UserReducer?.login);
  const [grandTotal, setGrandTotal] = useState(0);
  const [prdTotal, setProdTotal] = useState(0);
  const [currentDay, setCurrentDay] = useState('');
  const [startClosetime, setStartClosetime] = useState('');
  const [startTime, setStartime] = useState('');
  const [endTime, setEndtime] = useState('');
  const [rID, setRId] = useState('');

  const restaurantData = useSelector(
    state => state.RestaurantReducers?.restaurantDetails,
  );

  const handleTimer = time => {
    setTimeModel(!timeModel);
    // console.log('TIME >> ', time);
    if (time !== null) {
      const timeslot = time?.replace(' ', 'TO');
      const dTimeSlot = time?.replace(' ', ' TO ');
      setTimeSlot(timeslot);
      setDisplayedTimeSlot(dTimeSlot);
    }
  };

  const handleDate = newTime => {
    console.log('newTime', newTime);
    const receivedTime = newTime.split('-'); // here the time is like "16:14"
    let sTime = receivedTime[0];
    let eTime = receivedTime[1];

    setStartime(sTime);
    setEndtime(eTime);
    setStartClosetime(newTime.replace(' - ', 'TO'));
    setDisplayedTimeSlot(newTime.replace(' - ', 'TO'));
    // setTimeSlot(startClosetime.replace('TO', ' TO '));
  };
  const seladdress = useSelector(state => state.UserReducer.selAddress);
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

  console.log('seladdress ??? ', seladdress);
  useEffect(() => {
    console.log('route.params', route.params);
    if (route.params) {
      const {total, pTotal} = route?.params;
      setGrandTotal(total);
      setProdTotal(pTotal);
    }
  }, []);
  const dispatch = useDispatch();

  // select timer for order
  useEffect(() => {
    var restaurantId = restaurantData?.ID;
    setRId(restaurantId);

    console.log('RID', rID);

    var now = `${moment(new Date()).format('HH:mm')}`;

    const times = now.split(':');
    let splitedHour = times[0];
    // let splitedMin = times[1];
    let newHOur = 0;
    let newMin = '00';
    let newRoundedTime = '';
    let newEndroundTime = '';
    let newtimeSlot = '';
    let displaytimeslot = '';
    let restaurantOpeningTime = '';

    let splitedMin = times[1];
    if (splitedMin > 30) {
      splitedMin = 60 - splitedMin;
    } else {
      splitedMin = 30 - splitedMin;
    }

    now = moment(new Date()).add(splitedMin, 'm');
    newRoundedTime = moment(new Date()).add(splitedMin, 'm').format('HH:mm');
    // newEndroundTime = moment(now).add(30, 'm').format('HH:mm');

    if (restaurantData?.OpeningTime !== '') {
      let [hrs, min] = restaurantData?.OpeningTime.split(':').map(Number);
      console.log('hrs', hrs);
      console.log('min', min);
      let splitedResOpenTimeMin = min;
      if (splitedResOpenTimeMin > 30) {
        splitedResOpenTimeMin = 60 - splitedResOpenTimeMin;
      } else {
        splitedResOpenTimeMin = 30 - splitedResOpenTimeMin;
      }

      restaurantOpeningTime = moment(new Date().setHours(hrs, min))
        .add(splitedResOpenTimeMin, 'm')
        .format('HH:mm');

      if (restaurantOpeningTime > newRoundedTime) {
        newEndroundTime = moment(
          moment(new Date().setHours(hrs, min)).add(splitedResOpenTimeMin, 'm'),
        )
          .add(30, 'm')
          .format('HH:mm');
      } else {
        newEndroundTime = moment(now).add(30, 'm').format('HH:mm');
      }
    } else {
      newEndroundTime = moment(now).add(30, 'm').format('HH:mm');
    }

    console.log('now_', now);
    console.log('newRoundedTime_', newRoundedTime);
    console.log('restaurantOpeningTime_', restaurantOpeningTime);
    console.log('newEndroundTime', newEndroundTime);

    var str1 =
      restaurantData?.OpeningTime !== ''
        ? restaurantOpeningTime > newRoundedTime
          ? restaurantOpeningTime.split(':')
          : newRoundedTime.split(':')
        : newRoundedTime.split(':');

    var str2 = newEndroundTime.split(':');

    var totalSeconds1 = parseInt(str1[0] * 3600 + str1[1] * 60);
    var totalSeconds2 = parseInt(str2[0] * 3600 + str2[1] * 60);

    if (totalSeconds2 > totalSeconds1) {
      // newRoundedTime = moment(new Date())
      //   .add(splitedMin, 'm')
      //   .format('HH:mm');
      newtimeSlot =
        restaurantOpeningTime > newRoundedTime
          ? restaurantOpeningTime
              .toString()
              .concat('TO', newEndroundTime.toString())
          : newRoundedTime.toString().concat('TO', newEndroundTime.toString());
      setTimeSlot(newtimeSlot);
    } else {
      displaytimeslot = newRoundedTime
        .toString()
        .concat(' TO ', newEndroundTime.toString());
      console.log('Noooo >>> ', displaytimeslot);
      console.log('newEndroundTime ? ', newEndroundTime);
      setDisplayedTimeSlot(displaytimeslot);

      newtimeSlot =
        restaurantOpeningTime > newRoundedTime
          ? restaurantOpeningTime
              .toString()
              .concat('TO', newEndroundTime.toString())
          : newRoundedTime.toString().concat('TO', newEndroundTime.toString());
      setTimeSlot(newtimeSlot);
    }

    console.log('newtimeSlot', newtimeSlot);
    setTimeSlot(newtimeSlot);
    // var newEndroundTime = moment(now).add(30, 'm').toDate();

    // console.log('now', now);
    // console.log('newEndroundTime', newEndroundTime);

    // if (splitedMin >= 15 && splitedMin <= 30) {
    //   newHOur = parseInt(splitedHour, 10);
    //   newMin = '30'; //19:00
    // } else if (splitedMin > 30 && splitedMin <= 45) {
    //   newHOur = parseInt(splitedHour, 10);
    //   newMin = '30';
    // } else if (splitedMin > 45) {
    //   newHOur = parseInt(splitedHour, 10) + 1;
    //   newMin = '00';
    // } else {
    //   newHOur = parseInt(splitedHour, 10);
    //   newMin = '00'; //18:00
    // }

    // newoundedTime = newHOur.toString().concat(':', newMin.toString());

    // let newEndHour = 0;
    // let newEndMin = '00';
    // let newEndoundTime = '';

    // if (parseInt(splitedHour) !== parseInt(newHOur)) {
    //   newEndMin = '30';
    //   newEndHour = parseInt(newHOur, 10);
    // } else {
    //   if (parseInt(newMin) === 30) {
    //     newEndMin = '00';
    //     newEndHour = parseInt(newHOur, 10) + 1;
    //   } else {
    //     newEndMin = '30';
    //     newEndHour = parseInt(newHOur, 10);
    //   }
    // }

    // newEndoundTime = newEndHour.toString().concat(':', newEndMin.toString());
    // newtimeSlot = newoundedTime
    //   .toString()
    //   .concat('TO', newEndoundTime.toString());

    // displaytimeslot = newoundedTime
    //   .toString()
    //   .concat(' TO ', newEndoundTime.toString());
    // console.log('newtimeSlot', newtimeSlot);

    // setDisplayedTimeSlot(displaytimeslot);
    // setTimeSlot(newtimeSlot);
  }, [restaurantData]);

  const handleResetCoupen = () => {
    setCopanCode('');
    setCoupenApplied(false);
  };
  console.log('resturn >>>> ', restaurantData);
  const handleCoupen = () => {
    const userData = user?.UserInfo;
    if (copanCode !== '') {
      try {
        const folderFrm = {
          UserId: user?.UserInfo !== undefined && userData?.Id,
          RestaurantId: 3,
          RiderId: 0,
          OrderId: 0,
          Date: moment(date).format('DD-MM-YYYY'),
          DiscountCode: copanCode,
          Email: user?.UserInfo !== undefined && userData?.EMail,
          ItemTotalCharge: prdTotal,
        };
        console.log('handleCoupen ', folderFrm);
        const options = {payloads: folderFrm};
        ApiService.post(API.coupenCode, options)
          .then(res => {
            if (res.Status === 'Success') {
              const coupenAmt = res.Amount;
              setCoupenAmnt(coupenAmt);
            }
            console.log('response >> ', res);
            setCoupenApplied(true);
          })
          .catch(c => {
            Alert.alert(c.response?.data?.Errors[0]);
            setCoupenApplied(false);
            console.log('error catch', c.response?.data.Errors[0]);
          });
      } catch (error) {
        setCoupenApplied(false);
        console.log('error of try ', error);
      }
    } else {
      alert('Inserisci il codice sconto');
    }
  };
  const handlePaymentMethod = data => {
    setPaymentData(data);
    setPayment(false);
  };

  var itemList = [];

  // var paymentrequestData = {
  //   PayType:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType,
  //   PaymentMethodID:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.title?.title,
  //   Notes: notes,
  //   sCardName:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType === 3
  //       ? paymentData.sCardName
  //       : '',
  //   sCardNumber:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType === 3
  //       ? paymentData.sCardNumber
  //       : '',
  //   sCardExpMonth:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType === 3
  //       ? paymentData.sCardExpMonth
  //       : '',
  //   sCardExpYear:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType === 3
  //       ? paymentData.sCardExpYear
  //       : '',
  //   sCardCvc:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType === 3
  //       ? paymentData.sCardCvc
  //       : '',
  //   sCardPostcode:
  //     paymentData !== null &&
  //     paymentData !== undefined &&
  //     paymentData.paymentType === 3
  //       ? paymentData.sCardPostcode
  //       : '',
  //   sCustomerEmail: user !== undefined && user?.UserInfo?.EMail,
  //   nAmount: (coupenAmnt !== 0 ? grandTotal - coupenAmnt : grandTotal)
  //     .toFixed(2)
  //     .replace('.', ''),
  // };

  //total price of order
  const nAmount =
    coupenAmnt !== 0
      ? grandTotal - coupenAmnt
      : grandTotal.toFixed(2).replace('.', '');

  cartData.map(item => {
    console.log('cartItem', item);
    var ingredientsList = [];
    var addOnsList = [];
    var makeTypeIds = [];

    item.lstIngredients.map(ingredients => {
      ingredientsList.push(ingredients.IDRiga);
    });

    item.lstAddons.map(addOnItem => {
      addOnsList.push({
        AddOneId: addOnItem.IDRiga,
        Quantity: addOnItem.Qty,
      });
    });

    console.log('item?.lstMakeTypes', item?.lstMakeTypes);

    // [  "lstMakeTypes": []
    //    "lstMakeTypes": {
    //     "CodiceProdo": "Bianca",
    //     "Id": 25935,
    //     "ImportoUnitario": 0,
    //     "Prodo": "con Bacon affumicato",
    //     "Variante": "56"
    //   }]

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

  var cartDetailJson = {
    UserId: user?.UserInfo !== undefined && user?.UserInfo.Id,
    RestaurantId: 3,
    RiderId: 0,
    OrderId: 0,
    SelectedAddressId:
      selAddress !== null && selAddress !== undefined && selAddress.Id,
    Date: moment(date).format('DD-MM-YYYY'),
    TimeSlot: timeSloat === null ? '' : timeSloat.replace('TO', '-'),
    DiscountCode: copanCode.replace('null', ''),
    ItemIds: itemList,
    PaymentRequest: paymentData,
    OrderDeliveryAddress: {
      Address: selAddress?.AddressName,
      lat: selAddress?.Lat,
      lon: selAddress?.Lon,
    },
  };

  console.log('paymentData ?? ', paymentData);
  const handlePlaceOrder = () => {
    console.log('cartDetailJson', JSON.stringify(cartDetailJson, null, 4));

    if (!isLoginUser) {
      Alert.alert('Please login into the App');
      navigation.navigate('ACCOUNT');
    } else if (date === null || date === undefined) {
      Alert.alert('Please select Date');
    } else if (timeSloat === null || timeSloat === undefined) {
      Alert.alert('Please select time slot');
    } else if (
      paymentData?.PayType === null ||
      paymentData?.PayType === undefined ||
      paymentData == ''
    ) {
      Alert.alert('Please select atleast one payment option');
    } else if (locationModel === undefined || locationModel === null) {
      Alert.alert('Please select address');
    }
    //  else if (notes === undefined || notes === null) {
    //   Alert.alert('Please add notes');
    // }
    else {
      try {
        setLoad(true);
        const options = {payloads: cartDetailJson};
        console.log('payLoad', JSON.stringify(options, null, 4));
        ApiService.post(API.placeOrder, options)
          .then(res => {
            console.log('res of placeOrder >> ', res);
            if (res.Status === 'Success') {
              setLoad(false);
              setProcesss(!process);
              setCoupenApplied(false);
              setCoupenAmnt(0);
              dispatch(AddToCart([]));
            }
          })
          .catch(e => {
            setLoad(false);
            console.log('error in placeOrder> ', e.response?.data);
            Alert.alert(e.response?.data?.Errors[0]);
          });
      } catch (e) {
        console.log('e in placeOrder ', e);
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    let tmpData = {...paymentData};
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
                contentContainerStyle={{paddingBottom: scale(10)}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                  <View
                    style={[
                      styles.productView,
                      styles.row,
                      {justifyContent: 'space-between', marginTop: scale(40)},
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
                            style={{marginTop: scale(5), fontSize: scale(12)}}
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
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{width: '80%'}}>
                      <Title title="Indirizzo di consegna" />
                      <Label
                        title={'Nome Cognome'}
                        style={{color: theme.colors.gray}}
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
                      style={[styles.btn, {width: '20%'}]}
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
                      {justifyContent: 'space-between'},
                    ]}>
                    <View>
                      <Title title="Dati di pagamento" />
                      <Label
                        title="Carta di credito"
                        style={{color: theme.colors.gray}}
                      />
                      <Label
                        title=""
                        style={{
                          marginTop: scale(5),
                          fontSize: scale(12),
                          width: '100%',
                        }}
                      />
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
                      {justifyContent: 'space-between'},
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
                          console.log('notes >> ', txt);
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
                    {paddingHorizontal: scale(5), paddingBottom: scale(10)},
                  ]}>
                  <Label title="Somma totale" />
                  <Label title={`€ ${grandTotal.toFixed(2)}`} />
                </View>
                {isCoupenApplied && (
                  <>
                    <View
                      style={[
                        styles.priceingView,
                        {paddingHorizontal: scale(8)},
                      ]}>
                      <Label title="Fudd App Resto Promotion" />
                      <Label
                        title={`− € ${coupenAmnt}`}
                        style={{color: theme.colors.red}}
                      />
                    </View>
                    <View style={styles.divider} />
                    <View
                      style={[
                        styles.priceingView,
                        ,
                        {paddingHorizontal: scale(8), paddingBottom: scale(30)},
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
                      handlePlaceOrder();
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
        cancelText="Annulla"
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
        // maximumDate={new Date(endOfMonth)}
        minimumDate={new Date(startOfMonth)}
      />
      <TimePickerModel isVisible={timeModel} close={handleTimer} />
      <SetLocationModel
        isShow={locationModel}
        close={() => {
          setLocationModel(!locationModel);
        }}
      />
      <OrderPaymentMethod
        isVisible={paymentModel}
        close={handlePaymentMethod}
        nAmount={nAmount}
        notes={notes}
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
  row: {flexDirection: 'row', alignItems: 'center'},
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
