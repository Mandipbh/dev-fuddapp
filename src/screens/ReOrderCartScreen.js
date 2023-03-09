import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Emptycart, scale, theme} from '../utils';
import {Button, Label, Title, Error} from '../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart} from '../redux/Actions/CartAction';
import ApiService, {API} from '../utils/ApiService';
import moment from 'moment';
import LoginModel from '../components/appModel/LoginModel';
import SetLocationModel from '../components/appModel/SetLocationModel';

const ReOrderCartScreen = () => {
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
  const incrimentCart = (selitm, idx) => {
    const tmparr = [...cartData];
    tmparr[idx].Qty = tmparr[idx].Qty + 1;
    dispatch(AddToCart(tmparr));
  };

  console.log('CartScreen>>', cartData);

  const decrimentCart = (selitm, idx) => {
    const tmparr = [...cartData];
    if (tmparr[idx].Qty <= 1) {
      tmparr.splice(idx, 1);
    } else {
      tmparr[idx].Qty = tmparr[idx].Qty - 1;
    }
    dispatch(AddToCart(tmparr));
  };

  const calculatePrice = () => {
    const tmparr = [...cartData];
    const initialValue = 0;
    const total = tmparr.reduce(
      (accumulator, current) => accumulator + current.Amount * current.Qty,
      initialValue,
    );
    setPTotal(total);
    getCalculateDeliveryPrice(total);
  };
  const isLoginUser = useSelector(state => state.UserReducer?.login);
  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  const getCalculateDeliveryPrice = total => {
    try {
      if (cartData) {
        const data = {
          Latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
          Longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
          id: cartData[0].restaurantId,
          OrderPrice: total,
        };
        setLoad(true);

        const options = {payloads: data};
        console.log('options', options);

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

  const handleRestaurantAvailability = () => {
    console.log('handleRestaurantAvailability-cartData', cartData);
    if (seladdress === undefined || seladdress === null) {
      setLocationModel(true);
    } else {
      try {
        if (cartData) {
          const data = {
            Latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
            Longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
            id: cartData[0].restaurantId,
            Date: moment(date).format('DD-MM-YYYY'),
            TimeSlot: `${moment(new Date()).format('HH:mm')}-${moment(
              new Date(),
            )
              .add(30, 'minute')
              .format('HH:mm')}`,
            Category: selectedCat == null ? '' : selectedCat,
          };

          // {
          //   Latitute: '11.1569145',
          //   Longitude: '13.3312435',
          //   id: 3,
          //   Date: '24-02-2023',
          //   TimeSlot: '15:28-15:58',
          //   Category: '',
          // };

          setLoad(true);

          const options = {payloads: data};
          ApiService.post(API.checkestaurantAvailability, options)
            .then(res => {
              if (res.Status === 'Success') {
                console.log('res of RestaurantAvailability >> ', res);
                setLoad(false);
                setDelMsg('');
                navigation.navigate('Checkout', {
                  total:
                    pTotal +
                    (dPrice !== 0 ? dPrice : 2.9) +
                    (pTotal < cartData[0].MinimumOrder ? 2 : 0),
                  pTotal: pTotal,
                });
              }
            })
            .catch(e => {
              setLoad(false);
              setDelMsg(
                "La consegna non è disponibile dal ristorante all'indirizzo selezionato.",
              );
              console.log(
                'error in RestaurantAvailability> ',
                e?.response.data?.Errors[0],
              );
              //Alert.alert(e.response?.data?.Errors[0]);
            });
        }
      } catch (e) {
        console.log('e in RestaurantAvailability ', e);
        setLoad(false);
      }
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
          {cartData?.length > 0 ? (
            cartData.map((i, index) => {
              console.log('item Of cart >> ', i?.MinOrderSupplment);
              return (
                <View
                  style={{
                    borderBottomColor: theme.colors.gray1,
                    borderBottomWidth:
                      cartData?.length === index + 1 ? 0 : scale(1),
                    paddingBottom: scale(10),
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
                      <Label title={i?.Code} style={styles.desc} />
                    </View>
                  </View>
                  <View style={[styles.row, {justifyContent: 'space-evenly'}]}>
                    <View style={[styles.row]}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          decrimentCart(i, index);
                        }}>
                        <Icon1
                          name="delete"
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
                  style={{height: scale(240)}}
                />
                <Title title="Carrello vuoto" />
              </View>
            </>
          )}
        </ScrollView>
      </View>

      {cartData?.length > 0 && (
        <View style={styles.PriceView}>
          <View style={styles.priceingView}>
            <Title title="Totale Prodotti" />
            <Title title={`€ ${pTotal.toFixed(2)}`} style={styles.number} />
          </View>
          {pTotal < cartData[0].MinimumOrder && (
            <View style={styles.priceingView}>
              <Title
                title={`Sipplemento ordine inferiore a €${cartData[0].MinimumOrder}`}
                style={{width: '70%'}}
              />
              <Title
                title={`€ ${cartData[0].MinOrderSupplment.toFixed(2)}`}
                style={styles.number}
              />
            </View>
          )}
          {isLoginUser && (
            <View style={styles.priceingView}>
              <Title title="Spese di consegna" />
              <Title
                title={`€ ${dPrice === 0 ? 2.9 : dPrice.toFixed(2)}`}
                style={styles.number}
              />
            </View>
          )}

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
                (dPrice !== 0 ? dPrice : 2.9) +
                (pTotal < cartData[0].MinimumOrder ? 2 : 0)
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
        {cartData?.length > 0 && (
          <Button
            title="Procedi al CheckOut"
            style={styles.submitBtn}
            titleStyle={styles.btnTxt}
            onPress={() => {
              if (isLoginUser) {
                handleRestaurantAvailability();
              } else {
                setLoginModel(true);
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
      {/* <SetLocationModel
        isShow={locationModel}
        close={() => {
          setLocationModel(false);
        }}
      /> */}

      {/* <LoginModel isVisible={loginModel} close={handleClose} /> */}
    </SafeAreaView>
  );
};

export default ReOrderCartScreen;

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