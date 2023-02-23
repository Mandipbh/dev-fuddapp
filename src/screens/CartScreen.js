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
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Emptycart, scale, theme} from '../utils';
import {Button, Label, Title} from '../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart} from '../redux/Actions/CartAction';

const CartScreen = () => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state?.CartReducer.cartData);
  const user = useSelector(state => state.UserReducer?.userDetails);
  
  console.log('user details >> ',user.UserName)
  
  const dispatch = useDispatch();
  const [pTotal, setPTotal] = useState(0);
  
  var itemList=[];
  var removeIngredientsList=[];
  var addOnsList=[];
  var maketypeIds=[];
  var removeIngredientIds=[];
  var makeTypeIds=[];

  var paymentrequestData={
    "PayType":1,
    "PaymentMethodID":"",
    "Notes":"tesdtsf",
    "sCardName":"",
    "sCardNumber":"",
    "sCardExpMonth":"",
    "sCardExpYear":"",
    "sCardCvc":"",
    "sCardPostcode":"",
    "sCustomerEmail":"",
    "nAmount":0
};

// removeIngredientIds.map((ingredientId)=>{
//   removeIngredientIds.push(ingredientId);
// });

// makeTypeIds.map((typeId)=>{
//   makeTypeIds.push(typeId);
// });




cartData.map((item) => {
  itemList.push({
     "ItemCode": item.Code,
      "Quantity": 0,
      "MakeId": 0, 
      "AddOnsIds":item.lstAddons.map((addOnItem)=>{
        addOnsList.push({
            "AddOneId":0,
            "Quantity":0
        });
      }),
      "RemoveIngredientIds":removeIngredientIds,
      "MakeTypeIds":item.lstMakeTypes.map((typeId)=>{
        makeTypeIds.push(typeId);
      }) 
    });
});

  var cartDetailJson = {
      "UserId":user.UserId,
      "RestaurantId":0,
      "RiderId":0,
      "OrderId":0,
      "SelectedAddressId":0,
      "Date":"",
      "TimeSlot":"",
      "DiscountCode":"",
      "ItemIds":itemList,
      "PaymentRequest":paymentrequestData
  };
  

  console.log('cartData>>',JSON.stringify(cartData,null,4));


  const incrimentCart = (selitm, idx) => {
    const tmparr = [...cartData];
    tmparr[idx].Qty = tmparr[idx].Qty + 1;
    dispatch(AddToCart(tmparr));
  };

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
  };
  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);
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
      <ScrollView style={styles.mainContainer}>
        <ScrollView style={styles.productView} nestedScrollEnabled={true}>
          {cartData?.length > 0 ? (
            cartData.map((i, index) => {
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
                  style={{height: scale(250)}}
                />
                <Title title="Carrello vuoto" />
              </View>
            </>
          )}
        </ScrollView>
        {cartData?.length > 0 && (
          <View style={styles.PriceView}>
            <View style={styles.priceingView}>
              <Title title="Totale Prodotti" />
              <Title title={`€ ${pTotal}`} style={styles.number} />
            </View>
            <View style={styles.priceingView}>
              <Title title="Spese di consegna" />
              <Title
                title={`€ ${pTotal === 0 ? 0 : 2.9}`}
                style={styles.number}
              />
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
                title={`€ ${pTotal + (pTotal === 0 ? 0 : 2.9)}`}
                style={styles.number}
              />
            </View>
          </View>
        )}
      </ScrollView>
      {cartData?.length > 0 && (
        <Button
          title="Procedi al CheckOut"
          style={styles.submitBtn}
          titleStyle={styles.btnTxt}
          onPress={() => {
            // navigation.navigate('Checkout');
            console.log("button_clicked",JSON.stringify(cartDetailJson,null,4) );
          }}
        />
      )}
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
    paddingHorizontal: scale(3),
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
    marginHorizontal: scale(5),
    marginTop: scale(10),
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
    marginVertical: scale(20),
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
