import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import {Label, Title} from '../Label';
import {useState} from 'react';
import {orderData} from '../../utils/MockData';
import Icon from 'react-native-vector-icons/Feather';
import {BlurView} from '@react-native-community/blur';

const OrderModal = props => {
  const {isVisible, close} = props;

  const [selIndex, setIindex] = useState(0);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {<Title title={'My Orders'} style={{textAlign: 'center'}} />}
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View style={styles.divider} />
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
                          name={
                            selIndex === index ? 'chevron-up' : 'chevron-down'
                          }
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
        </View>
      </View>
      <BlurView
        style={styles.blurView}
        blurType="dark" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor="white"
      />
    </Modal>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  mainCard: {
    borderBottomWidth: scale(0.8),
    borderColor: theme.colors.gray,
    marginVertical: scale(10),
  },
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    marginTop: -theme.SCREENHEIGHT * 0.01,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  modalView: {
    backgroundColor: theme.colors.white,
    marginTop: scale(70),
    marginHorizontal: scale(15),
    borderRadius: 15,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 111,
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
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
});
