import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, theme} from '../utils';
import Icon from 'react-native-vector-icons/Feather';
import {Label} from './Label';
import {orderData} from '../utils/MockData';
import ApiService, {API} from '../utils/ApiService';
import {ALLORDERS} from '../redux/Actions/ActionsTypes';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../redux/Actions/OrderAction';
import moment from 'moment';

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
  }, [allOrders]);

  // console.log(
  //   'Data of Orders',
  //   JSON.stringify(getAllOrder[0].OrderRows, null, 4),
  // );

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
                    <Label title={oI.Restaurant} style={styles.prodTitle} />
                    {selIndex === index ? (
                      <Label
                        title={`€${oI.Total} - ${moment(oI.DeliveryDate)
                          .utc()
                          .format('DD/MM/YYYY')}`}
                        style={styles.pd}
                      />
                    ) : (
                      <Label
                        title={`${moment(oI.DeliveryDate)
                          .utc()
                          .format('DD/MM/YYYY')}`}
                        style={styles.pd}
                      />
                    )}
                  </View>
                  {/* <TouchableOpacity style={styles.btn}>
                    <Label title="Riordina" style={styles.btntxt} />
                  </TouchableOpacity> */}
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
                                style={{color: theme.colors.gray5}}
                                title={`${product?.Qty}X `}
                              />
                              <Label
                                style={{color: theme.colors.gray5}}
                                title={`${product?.Product}`}
                              />
                            </View>
                          );
                        })}
                      {/* <Label title={oI.orderdetails} /> */}
                    </View>
                    <View
                      style={[
                        styles.row,
                        {width: '100%', marginBottom: scale(8)},
                      ]}>
                      <Label
                        title="Total Amount"
                        style={[styles.price, {fontWeight: '600'}]}
                      />
                      <Label title={`€${oI.Total}`} style={styles.price} />
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
  prodTitle: {
    fontSize: scale(14),
    color: theme.colors.black,
  },
  pd: {
    fontSize: scale(12),
    marginBottom: scale(4),
    color: theme.colors.gray2,
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
    justifyContent: 'space-between',
  },
});
