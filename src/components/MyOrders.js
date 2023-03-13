import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, theme} from '../utils';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {Label} from './Label';
import {orderData} from '../utils/MockData';
import ApiService, {API} from '../utils/ApiService';
import {ALLORDERS, REORDERS} from '../redux/Actions/ActionsTypes';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../redux/Actions/OrderAction';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';

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

  const dispatch = useDispatch();
  const [getAllOrder, setgetAllOrder] = useState(allOrders);

  const allOrders = useSelector(state => state.HomeReducers.allOrders);
  const user = useSelector(state => state.UserReducer?.userDetails);
  useEffect(() => {
    dispatch(getAllOrders(user?.UserId));
  }, []);

  useEffect(() => {
    setgetAllOrder(allOrders?.OrderList);
    console.log('_allOrders', allOrders);
  }, [allOrders]);

  return (
    <View>
      <ScrollView
        style={{height: theme.SCREENHEIGHT * 0.4}}
        showsVerticalScrollIndicator={false}>
        {getAllOrder &&
          getAllOrder?.map((oI, index) => {
            return (
              <View style={styles.mainCard} key={index}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <View style={{marginVertical: scale(8)}}>
                    <View style={styles.orderCon}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Label
                          title={`${oI.Restaurant} `}
                          style={styles.prodTitle}
                        />
                        <Label
                          title={' - ' + oI?.Status}
                          style={{color: oI?.StatusColor, fontSize: scale(11)}}
                        />
                      </View>

                      <TouchableOpacity
                        style={[styles.row, {alignItems: 'center'}]}
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
                          style={{fontSize: scale(11)}}
                        />
                        <Label
                          title={`${moment(oI.DeliveryDate)
                            .utc()
                            .format('DD/MM/YYYY')} @ ${oI?.DeliveryTime}`}
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
                            style={[styles.pd, {marginTop: scale(1)}]}
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
                            style={[styles.pd, {marginTop: scale(1)}]}
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
                            style={[styles.pd, {marginTop: scale(1)}]}
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
                      </View>
                    ) : (
                      <Label
                        title={`${moment(oI.DeliveryDate)
                          .utc()
                          .format('DD/MM/YYYY')}`}
                        style={styles.pd}
                      />
                    )}
                  </View>

                  <TouchableOpacity
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
                  </TouchableOpacity>
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
                    {oI?.MinOrderCharge > 0 && (
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
                        <Label title={oI?.KmFee} />
                        <Label title={`€${(oI?.KmFee).toFixed(2)}`} />
                      </View>
                    )}
                    {oI?.Discount > 0 && (
                      <View style={styles.row}>
                        <Label
                          title={oI?.DiscountName}
                          style={{color: theme.colors.red}}
                        />
                        <Label
                          title={`- €${(oI?.Discount).toFixed(2)}`}
                          style={{color: theme.colors.red}}
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
                        title="Total Amount"
                        style={[styles.price, {fontWeight: '600'}]}
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
    width: theme.SCREENWIDTH * 0.7,
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
    marginTop: scale(-10),
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
});
