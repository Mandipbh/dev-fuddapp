/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { scale, theme } from '../utils';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { Label } from './Label';
import { orderData } from '../utils/MockData';
import ApiService, { API } from '../utils/ApiService';
import { ALLORDERS, REORDERS } from '../redux/Actions/ActionsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../redux/Actions/OrderAction';
import moment from 'moment';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { AddToCart } from '../redux/Actions/CartAction';

// export const getAllOrders = () => {
//   return async dispatch => {
//     try {
//       ApiService.get(API.getAllOrders).then(res => {
//         if (res) {
//           console.log('getAllOrders', JSON.stringify(res, null, 4));
//           dispatch({type: ORDERS, payload: res});
//         }
//       });
//     } catch (error) {
//       console.log('error in Orders', error);
//     }
//   };
// };

const MyOrders = () => {
  const navigation = useNavigation();
  const [selIndex, setIindex] = useState(0);
  const [loadding, setLoadding] = useState(0);
  const isFocuse = useIsFocused();
  const dispatch = useDispatch();
  const [getAllOrder, setgetAllOrder] = useState(allOrders);

  const allOrders = useSelector(state => state.HomeReducers.allOrders);
  const user = useSelector(state => state.UserReducer?.userDetails);
  const [reOrderData, setReOrderData] = useState({});
  const [dataArray, setDataArray] = useState([]);
  var OrderDataArray = [];

  useEffect(() => {
    setLoadding(true);
    dispatch(getAllOrders(user?.UserId));
  }, [isFocuse]);

  useEffect(() => {
    setgetAllOrder(allOrders?.OrderList);
    setLoadding(false);
  }, [allOrders]);

  const handleGetOrderDetail = (orderId, Email) => {
    console.log('orderId', orderId);
    try {
      ApiService.get(API.ReOrder + `id=${orderId}&userEmail=${Email}`)
        .then(res => {
          console.log(
            'myOrderResponse',
            JSON.stringify(res?.cartDetails, null, 4),
          );

          var reOrderCartData = {
            Adds: false,
            AddsCode: '',
            ID: res?.cartDetails?.Rest?.ID,
            restaurantId: res?.cartDetails?.Rest?.ID,
            Amount: res?.cartDetails?.Items[0]?.Amount,
            Code: res?.cartDetails?.Items[0]?.Code,
            Composition: res?.cartDetails?.Items[0]?.Composition,
            Description: res?.cartDetails?.Items[0]?.Description,
            Dinner: res?.cartDetails?.Items[0]?.Dinner,
            Image: res?.cartDetails?.Items[0]?.Image,
            Ingredients: res?.cartDetails?.Items[0]?.Ingredients,
            Lunch: res?.cartDetails?.Items[0]?.lunch,
            MakeTypes: res?.cartDetails?.Items[0]?.MakeTypes,
            MasterId: res?.cartDetails?.Items[0]?.MasterId,
            Name: res?.cartDetails?.Items[0]?.Name,
            Qty: res?.cartDetails?.Items[0]?.Qty,
            Vars: res?.cartDetails?.Items[0]?.Vars,
            lstAddons:
              res?.cartDetails?.Items[0].lstAddons !== null
                ? res?.cartDetails?.Items[0].lstAddons
                : [],
            lstIngredients:
              res?.cartDetails?.Items[0]?.lstIngredients !== null
                ? res?.cartDetails?.Items[0]?.lstIngredients
                : [],
            lstMakeTypes:
              res?.cartDetails?.Items[0]?.lstMakeTypes !== null
                ? res?.cartDetails?.Items[0]?.lstMakeTypes
                : [],
            MinimumOrder: res?.cartDetails?.MinimumOrder,
            DeliveryFee: res?.cartDetails?.DeliveryFee,
            OrderTotalCharge: res?.cartDetails?.OrderTotalCharge,
            nNetAmount: res?.cartDetails?.Items[0]?.nNetAmount,
            sAddonIDCSV: res?.cartDetails?.Items[0]?.sAddonIDCSV,
            sAddonNameCSV: res?.cartDetails?.Items[0]?.sAddonNameCSV,
            sIngredientIDCSV: res?.cartDetails?.Items[0]?.sIngredientIDCSV,
            sIngredientNameCSV: res?.cartDetails?.Items[0]?.sIngredientNameCSV,
            sMakeTypeIDCSV: res?.cartDetails?.Items[0]?.sMakeTypeIDCSV,
            sMakeTypeNameCSV: res?.cartDetails?.Items[0]?.sMakeTypeNameCSV,
            sTempID: res?.cartDetails?.Items[0]?.sTempID,
            Items: res?.cartDetails.Items,
          };

          OrderDataArray.push(reOrderCartData);
          dispatch(AddToCart(OrderDataArray));

          navigation.navigate('RISTORANTI', {
            screen: 'Details',
            params: { item: reOrderCartData },
          })
          // navigation.navigate('RISTORANTI', {
          //   screen: 'Cart',
          //   params: {restaurantId: reOrderCartData?.ID},
          // });
        })
        .catch(error => {
          console.log('error catch ', error);
        });
    } catch (error) {
      console.log('error delete catch ', error);
    }
  };

  return (
    <View>
      <ScrollView
        style={{ height: theme.SCREENHEIGHT * 0.4 }}
        showsVerticalScrollIndicator={false}>
        {console.log('getAllOrder', JSON.stringify(getAllOrder, null, 4))}
        {getAllOrder &&
          getAllOrder?.reverse()?.map((oI, index) => {
            return (
              <View style={styles.mainCard} key={index}>
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <View style={{ marginVertical: scale(8) }}>
                    <View style={[styles.orderCon, { alignItems: 'center' }]}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Label
                          title={`${oI.Restaurant} `}
                          style={styles.prodTitle}
                        />
                        <Label
                          title={' - ' + oI?.Status}
                          style={{
                            color: oI?.StatusColor,
                            fontSize: scale(11),
                          }}
                        />
                      </View>
                      {selIndex === index && (
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            // navigation.navigate('ReOrder', {
                            //   orderId: oI.Number,
                            //   Email: oI.Email,
                            // });
                            handleGetOrderDetail(oI.Number, oI.Email);
                            // navigation.navigate('Cart', { restaurantId: resId });
                          }}>
                          <Label title="Riordina" style={styles.btntxt} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={[styles.row, { alignItems: 'center' }]}
                        onPress={() => {
                          selIndex === index
                            ? setIindex(null)
                            : setIindex(index);
                        }}>
                        <Label
                          title="Dettagli "
                          style={{
                            color: theme.colors.gray5,
                            fontSize: scale(12),
                          }}
                        />
                        <Icon
                          name={
                            selIndex === index ? 'chevron-up' : 'chevron-down'
                          }
                          size={scale(18)}
                          color={theme.colors.gray}
                        />
                      </TouchableOpacity>
                    </View>

                    {selIndex === index ? (
                      <View>
                        <Label
                          title={`Ordine n° - ${oI?.Number}`}
                          style={{ fontSize: scale(11) }}
                        />
                        <Label
                          title={`${moment(oI.DeliveryDate).format(
                            'DD/MM/YYYY',
                          )} @ ${oI?.DeliveryTime}`}
                          style={styles.pd}
                        />

                        <Label
                          title={`${oI?.DeliveryName}`}
                          style={styles.pd}
                        />
                        <View style={styles.row1}>
                          <Icon
                            name="map-pin"
                            size={scale(12)}
                            color={theme.colors.gray5}
                          />
                          <Label
                            title={` ${oI?.DeliveryAddressPart}`}
                            style={[styles.pd, { marginTop: scale(1) }]}
                          />
                        </View>
                        <View style={styles.row1}>
                          <Icon1
                            name="call"
                            size={scale(12)}
                            color={theme.colors.gray5}
                          />
                          <Label
                            title={` ${oI?.Telephone}`}
                            style={[styles.pd, { marginTop: scale(1) }]}
                          />
                        </View>
                        <View style={styles.row1}>
                          <Icon1
                            name="mail"
                            size={scale(12)}
                            color={theme.colors.gray5}
                          />
                          <Label
                            title={` ${oI?.Email}`}
                            style={[styles.pd, { marginTop: scale(1) }]}
                          />
                        </View>

                        <Label
                          title={`Pagamento - ${oI?.PaymentMethod}`}
                          style={[
                            styles.pd,
                            {
                              // color: theme.colors.black,
                              // fontFamily: theme.fonts.josefinSans,
                            },
                          ]}
                        />
                        <View style={styles.row1}>
                          <Label
                            title="Note ordine :"
                            style={{ fontSize: scale(11) }}
                          />
                          <Label
                            title={` ${oI?.Comments}`}
                            style={[
                              styles.pd,
                              { marginBottom: 0, marginLeft: scale(2) },
                            ]}
                          />
                        </View>
                      </View>
                    ) : (
                      <Label
                        title={`${moment(oI.DeliveryDate).format(
                          'DD/MM/YYYY',
                        )}`}
                        style={styles.pd}
                      />
                    )}
                  </View>

                  {/* <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.navigate('ReOrder', {
                        orderId: oI.Number,
                        Email: oI.Email,
                      });
                    }}>
                    <Label title="Riordina" style={styles.btntxt} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.row,
                      {alignItems: 'center', marginTop: scale(-10)},
                    ]}
                    onPress={() => {
                      selIndex === index ? setIindex(null) : setIindex(index);
                    }}>
                    <Label
                      title="Dettagli "
                      style={{color: theme.colors.gray5, fontSize: scale(12)}}
                    />
                    <Icon
                      name={selIndex === index ? 'chevron-up' : 'chevron-down'}
                      size={scale(18)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity> */}
                </View>
                {selIndex === index && (
                  <>
                    <View style={styles.detailsView}>
                      {oI?.OrderRows &&
                        oI?.OrderRows.map((product, idx) => {
                          return (
                            <View style={styles.itemDetails} key={idx}>
                              <Label
                                style={{
                                  color: theme.colors.gray5,
                                  fontSize: scale(11),
                                }}
                                title={`${product?.Qty}X `}
                              />
                              <Label
                                style={{
                                  color: theme.colors.gray5,
                                  fontSize: scale(11),
                                }}
                                title={`${product?.Product}`}
                              />
                            </View>
                          );
                        })}

                      {/* <Label title={oI.orderdetails} /> */}
                    </View>
                    <View style={styles.row}>
                      <Label title={'Totale prodotti  '} />
                      <Label title={(oI?.SubTotal).toFixed(2)} />
                    </View>
                    {oI?.MinOrderCharge > 0 && (
                      <View style={styles.row}>
                        <Label title={oI?.MinOrderChargeDesc} />
                        <Label title={`€${(oI?.MinOrderCharge).toFixed(2)}`} />
                      </View>
                    )}
                    {oI?.DeliveryFee > 0 && (
                      <View style={styles.row}>
                        <Label title={'Spese di consegna'} />
                        <Label title={`€${(oI?.DeliveryFee).toFixed(2)}`} />
                      </View>
                    )}
                    {oI?.RainFee > 0 && (
                      <View style={styles.row}>
                        <Label title={'Supplemento pioggia'} />
                        <Label title={`€${(oI?.RainFee).toFixed(2)}`} />
                      </View>
                    )}
                    {oI?.KmFee > 0 && (
                      <View style={styles.row}>
                        <Label title={oI?.km} />
                        <Label title={`€${(oI?.KmFee).toFixed(2)}`} />
                      </View>
                    )}
                    {oI?.Discount > 0 && (
                      <View style={styles.row}>
                        <Label
                          title={oI?.DiscountName}
                          style={{ color: theme.colors.red }}
                        />
                        <Label
                          title={`- €${(oI?.Discount).toFixed(2)}`}
                          style={{ color: theme.colors.red }}
                        />
                      </View>
                    )}
                    <View
                      style={[
                        styles.row,
                        {
                          width: '100%',
                          marginBottom: scale(8),
                          borderTopWidth: scale(0.7),
                          marginTop: scale(3),
                          borderTopColor: theme.colors.gray5,
                        },
                      ]}>
                      <Label
                        title="Totale Finale"
                        style={[styles.price, { fontWeight: '600' }]}
                      />
                      <Label
                        title={`€${oI.Total.toFixed(2)}`}
                        style={styles.price}
                      />
                    </View>
                  </>
                )}
              </View>
            );
          })}
        {!loadding && getAllOrder?.length === 0 ? (
          <View style={styles.nodata}>
            <Label title="Nessun ordine" />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  mainCard: {
    borderBottomWidth: scale(0.8),
    borderColor: theme.colors.gray,
    marginVertical: scale(10),
  },
  orderCon: {
    width: theme.SCREENWIDTH * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prodTitle: {
    fontSize: scale(14),
    color: theme.colors.black,
  },
  pd: {
    fontSize: scale(10),
    marginBottom: scale(4),
    color: theme.colors.gray5,
  },
  btn: {
    width: scale(60),
    borderWidth: scale(1),
    borderColor: theme.colors.red,
    borderRadius: scale(10),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: scale(-10),
  },
  btntxt: {
    textAlign: 'center',
    color: theme.colors.red,
    fontSize: scale(11),
  },
  detailsView: {
    borderTopWidth: scale(0.8),
    borderBottomWidth: scale(0.5),
    marginVertical: scale(3),
    borderColor: theme.colors.gray1,
    paddingVertical: scale(5),
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: scale(12),
    color: theme.colors.black,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodata: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: theme.SCREENHEIGHT * 0.35,
  },
});
