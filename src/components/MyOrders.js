import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, theme} from '../utils';
import Icon from 'react-native-vector-icons/Feather';
import {Label} from './Label';
import {orderData} from '../utils/MockData';
import ApiService, {API} from '../utils/ApiService';
import {ALLORDERS} from '../redux/Actions/ActionsTypes';
import {useDispatch, useSelector} from 'react-redux';

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

export const getAllOrders = () => {
  return async dispatch => {
    try {
      ApiService.get(API.getAllOrders)
        .then(res => {
          if (res) {
            dispatch({type: ALLORDERS, payload: res});
          }
          // console.log('this is res', JSON.stringify(res, null, 4));
        })
        .catch(c => {
          console.log('catch of category >> ', c);
        });
    } catch (error) {
      console.log('error in category', error);
    }
  };
};


const MyOrders = () => {
  const [selIndex, setIindex] = useState(0);

  const dispatch = useDispatch();
  const [getAllOrder, setgetAllOrder] = useState(allOrders);

  const allOrders = useSelector(state => state.HomeReducers.allOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {
    setgetAllOrder(allOrders);
  }, [allOrders]);

  console.log('Data of Orders', JSON.stringify(getAllOrder, null, 4));

  return (
    <View>
      <ScrollView
        style={{height: theme.SCREENHEIGHT * 0.4}}
        showsVerticalScrollIndicator={false}>
        {orderData?.map((oI, index) => {
          return (
            <View style={styles.mainCard} key={index}>
              <View style={[styles.row, {alignItems: 'center'}]}>
                <View style={{marginVertical: scale(8)}}>
                  <Label title={oI.name} style={styles.prodTitle} />
                  {selIndex === index ? (
                    <Label
                      title={`${oI.price} - ${oI.date}`}
                      style={styles.pd}
                    />
                  ) : (
                    <Label title={oI.date} style={styles.pd} />
                  )}
                </View>
                <TouchableOpacity style={styles.btn}>
                  <Label title="Riordina" style={styles.btntxt} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.row, {alignItems: 'center'}]}
                  onPress={() => {
                    setIindex(index);
                  }}>
                  <Label title="Dettagli " />
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
                    <Label title={oI.orderdetails} />
                  </View>
                  <View
                    style={[
                      styles.row,
                      {width: '65%', marginBottom: scale(8)},
                    ]}>
                    <Label
                      title="Total Amount"
                      style={[styles.price, {fontWeight: '600'}]}
                    />
                    <Label title={oI.totalAmount} style={styles.price} />
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
    width: '65%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: scale(12),
    color: theme.colors.black,
  },
});
