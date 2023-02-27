import {
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
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ApiService, {API} from '../utils/ApiService';
import { useEffect } from 'react';
const keyboardVerticalOffset = Platform.OS === 'ios' ? scale(40) : 0;
const startOfMonth = moment().format('YYYY-MM-DD');
const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [process, setProcesss] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [] = useState(false);
  const [timeModel, setTimeModel] = useState(false);
  const [timeSloat, setTimeSlot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [copanCode, setCopanCode] = useState(null);
  const [notes, setNotes] = useState(null);
  const [paymentModel, setPayment] = useState(false);
  const user = useSelector(state => state.UserReducer?.userDetails);
  const selAddress = useSelector(state => state.UserReducer.selAddress);
  const [load, setLoad] = useState(false);
  const cartData = useSelector(state => state?.CartReducer.cartData);
  const [paymentData,setPaymentData]=useState(null);
  const isLoginUser = useSelector(state => state.UserReducer?.login);

  const handleTimer = time => {
    setTimeModel(!timeModel);
    console.log('TIME >> ',time);
    if (time !== null) {
      const timeslot = time.replace(' ', 'TO');
      setTimeSlot(timeslot);
    }
  };
  console.log('user ??/ ', user?.UserInfo);
  const handleCoupen = () => {
    const userData = user?.UserInfo;
    try {
      const folderFrm = {
        UserId: user?.UserInfo !==undefined && userData?.Id,
        RestaurantId: 3,
        RiderId: 0,
        OrderId: 0,
        Date: date,
        DiscountCode: copanCode,
        Email: user?.UserInfo !==undefined && userData?.EMail,
        ItemTotalCharge: 25.0,
      };
      console.log('handleCoupen ', folderFrm);
      const options = {payloads: folderFrm};
      ApiService.post(API.coupenCode, options)
              .then(res => {
          console.log('response >> ', res);
        })
        .catch(c => {
          console.log('error catch', c);
        });
    } catch (error) {
      console.log('error of try ', error);
    }
  };

  const handlePaymentMethod = data => {
    console.log("paymentdata",data);
    setPaymentData(data);
    setPayment(false);
  };

  var itemList = [];


  var paymentrequestData = {
    PayType: (paymentData !==null && paymentData!==undefined)  && paymentData.paymentType,
    PaymentMethodID: '',
    Notes: notes,
    sCardName:(paymentData !==null && paymentData!==undefined) && paymentData.paymentType===3?paymentData.sCardName:'',
    sCardNumber: (paymentData !==null && paymentData!==undefined) && paymentData.paymentType===3?paymentData.sCardNumber:'',
    sCardExpMonth:(paymentData !==null && paymentData!==undefined) && paymentData.paymentType===3?paymentData.sCardExpMonth:'',
    sCardExpYear:(paymentData !==null && paymentData!==undefined) && paymentData.paymentType===3?paymentData.sCardExpYear:'',
    sCardCvc:(paymentData !==null && paymentData!==undefined) && paymentData.paymentType===3?paymentData.sCardCvc:'',
    sCardPostcode:(paymentData !==null && paymentData!==undefined) && paymentData.paymentType===3?paymentData.sCardPostcode:'',
    sCustomerEmail: user!==undefined && user?.UserInfo?.EMail,
    nAmount: 0,
  };

  

  cartData.map(item => {
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

    item.lstMakeTypes.Id == null
      ? makeTypeIds.push()
      : makeTypeIds.push(item.lstMakeTypes.Id);

    itemList.push({
      ItemCode: item.Code,
      Quantity: item.Qty,
      MakeId: 0,
      AddOnsIds: addOnsList,
      RemoveIngredientIds: ingredientsList,
      MakeTypeIds: makeTypeIds, //makeTypeIds.push([item.lstMakeTypes.Id])
    });
  });

  var cartDetailJson = {
    UserId: user?.UserInfo !==undefined && user?.UserInfo.Id,
    RestaurantId: 3,
    RiderId: 0,
    OrderId: 0,
    SelectedAddressId: (selAddress!==null && selAddress !==undefined) &&  selAddress.Id,
    Date: moment(date).utc().format('DD-MM-YYYY'),
    TimeSlot: timeSloat===null?'':timeSloat,
    DiscountCode: '',
    ItemIds: itemList,
    PaymentRequest: paymentrequestData,
  };

  console.log('cartDetailJson >>', JSON.stringify(user, null, 4));

  const handlePlaceOrder = () => {

    // console.log('user?.UserInfo.Id',user?.UserInfo.Id);

     if( !isLoginUser){
     Alert.alert("Please login into the App")
     navigation.navigate('ACCOUNT')
    }else if(date === null || date===undefined){
     Alert.alert('Please select Date'); 
    }else if(timeSloat === null || timeSloat===undefined){
     Alert.alert('Please select time slot'); 
    }else if(paymentData === null || paymentData===undefined){
     Alert.alert('Please select atleast one payment option'); 
    }else if(locationModel === undefined || locationModel === null){
     Alert.alert('Please select address'); 
    }else if(notes === undefined || notes === null){
     Alert.alert('Please add notes'); 
    } else{
       try {
      setLoad(true);
      const options = {payloads: cartDetailJson};
      console.log('payLoad', JSON.stringify(options, null, 4));
      ApiService.post(API.placeOrder, options)
        .then(res => {
          if (res.Status === 'Success') {
            console.log('res of placeOrder >> ', res);
            setLoad(false);
            setProcesss(!process);
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
console.log('user ',isLoginUser)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Icon
          name="chevron-left"
          size={scale(28)}
          color={theme.colors.black}
          onPress={() => {
            navigation.replace('Tab');
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
                            title={moment(date).utc().format('DD-MM-YYYY')}
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
                    <TouchableOpacity style={styles.btn}>
                      <Label title="Cambia" />
                    </TouchableOpacity>
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
                        inputStyle={{fontSize: scale(12), marginLeft: -10}}
                        onChangeText={txt => {
                          setNotes(txt);
                          console.log("notes >> ",txt);
                        }}
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
                      <TouchableOpacity
                        style={styles.applyBtn}
                        onPress={() => handleCoupen()}>
                        <Text style={styles.applyTxt}>Applica</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Label title="" />
                </View>
                <Button
                  title="Invia ordine"
                  style={styles.submitBtn}
                  titleStyle={styles.btnTxt}
                  onPress={() => {
                    handlePlaceOrder()
                  }}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </>
      )}
      <DatePicker
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
    // bottom: theme.SCREENHEIGHT * -0.08,
  },
  btnTxt: {
    color: theme.colors.white,
    fontWeight: '600',
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
    width: '55%',
    borderColor: 'transprent',
    borderRadius: 20,
    paddingVertical: 5,
    height: theme.SCREENHEIGHT * 0.04,
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
    width: '30%',
    alignItems: 'center',
    marginLeft: 20,
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
    width: '60%',
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
});
