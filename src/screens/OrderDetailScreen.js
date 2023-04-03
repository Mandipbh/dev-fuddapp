import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale, theme } from '../utils';
import { Label, Title } from '../components/Label';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import ApiService, { API } from '../utils/ApiService';
import { useState } from 'react';

const OrderDetails = ({ props, route }) => {
  const { params } = route;
  const [oI, setOi] = useState(null);
  // const oI = params?.data;
  const navigation = useNavigation();
  useEffect(() => {
    try {
      ApiService.get(
        API.orderDetails + `${params?.data?.Number || params?.data?.OrderId}`,
      )
        .then(res => {
          setOi(res?.OrderDetails);
        })
        .catch(error => {
          console.log('error catch ', error);
        });
    } catch (error) {
      console.log('error delete catch ', error);
    }
  }, [params?.data]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <AntDesign
            name="left"
            color={theme.colors.black}
            size={scale(22)}
            onPress={() => {
              params?.back == 1
                ? navigation.navigate('ACCOUNT', {
                  screen: 'Account',
                  params: { data: 3 },
                })
                : // navigation.navigate('ACCOUNT', {data: 3})
                navigation.goBack();
            }}
          />

          <Title title="Dettagli dell'ordine" style={styles.titleScreen} />
          <View />
        </View>
        <View style={styles.mainContainer}>
          {oI?.Number && (
            <ScrollView
              style={styles.scrollViewCon}
              showsVerticalScrollIndicator={false}>
              {/* <AntDesign
            name="checkcircleo"
            size={scale(80)}
            color={theme.colors.green1}
            style={{alignSelf: 'center'}}
          /> */}
              {/* <Text style={styles.txt}>
            {` Grazie, abbiamo ricevuto il tuo ordine\n${oI?.Restaurant}\nalle ${oI?.DeliveryTime}`}
          </Text> */}
              <View style={styles.row}>
                <View
                  style={[
                    styles.box,
                    {
                      borderLeftColor: theme.colors.gray,
                      borderRightWidth: scale(0.5),
                    },
                  ]}>
                  <Label style={styles.subtitle1} title={'Ordine n°'} />
                  <Label style={styles.subtitle} title={oI?.Number} />
                </View>
                <View style={styles.box}>
                  <Label
                    style={styles.subtitle1}
                    title={'Data di prenotazione '}
                  />
                  <Label
                    style={styles.subtitle}
                    title={moment(oI?.Date).format('ddd DD MMMM, yyyy')}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View
                  style={[
                    styles.box,
                    {
                      borderLeftColor: oI?.StatusColor,
                      borderRightWidth: scale(0.5),
                    },
                  ]}>
                  <Label style={styles.subtitle1} title={'Status'} />
                  <Label
                    style={[styles.subtitle, { color: theme.colors.primary }]}
                    title={oI?.Status}
                  />
                </View>
                <View style={[styles.box]}>
                  <Label style={styles.subtitle1} title={'Pagamento'} />
                  <Label style={styles.subtitle} title={oI?.PaymentMethod} />
                </View>
              </View>

              <View>
                <Label style={styles.title} title="Dettagli di spedizione" />
                <View style={styles.row1}>
                  <Feather
                    name="map-pin"
                    size={scale(15)}
                    color={theme.colors.black}
                  />
                  <Label style={styles.subtitle} title={` ${oI?.Restaurant}`} />
                </View>
                <View style={styles.calCon}>
                  <Feather
                    name="calendar"
                    size={scale(15)}
                    color={theme.colors.black}
                  />
                  <Label
                    style={[styles.subtitle, { paddingVertical: scale(5) }]}
                    title={` ${moment(oI?.DeliveryDate).format(
                      'ddd DD MMMM, yyyy',
                    )}     `}
                  />
                  <View style={styles.row1}>
                    <Feather
                      name="clock"
                      size={scale(15)}
                      color={theme.colors.black}
                    />
                    <Label
                      style={styles.subtitle}
                      title={` ${oI?.DeliveryTime}`}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Label
                  style={styles.title}
                  title="Indirizzo di consegna e contatti"
                />
                <View
                  style={{
                    // flexDirection: 'row',
                    // alignItems: 'center',
                    paddingVertical: scale(5),
                  }}>
                  <Label
                    title={` ${oI?.DeliveryName}`}
                    style={[styles.subtitle, { textAlign: 'left' }]}
                  />
                  <View style={styles.mapCon}>
                    <Feather
                      name="map-pin"
                      size={scale(15)}
                      color={theme.colors.black}
                    />
                    <Label
                      style={[styles.subtitle, { textAlign: 'left' }]}
                      title={` ${oI?.DeliveryAddressPart}`}
                    />
                  </View>
                </View>
                <View style={styles.phoneCon}>
                  <View style={styles.row1}>
                    <FontAwesome
                      name="phone"
                      size={scale(15)}
                      color={theme.colors.black}
                    />
                    <Label
                      style={styles.subtitle}
                      title={` ${oI?.Telephone}`}
                    />
                  </View>

                  <View style={styles.row1}>
                    <Feather
                      name="mail"
                      size={scale(15)}
                      color={theme.colors.black}
                    />
                    <Label style={styles.subtitle} title={` ${oI?.Email}`} />
                  </View>
                </View>
              </View>
              {oI?.Comments && (
                <View style={styles.note}>
                  <Label
                    style={[styles.subtitle, { width: '65%', textAlign: 'left' }]}
                    title={oI?.Comments}
                  />
                </View>
              )}

              <View style={styles.detailsView}>
                {oI?.OrderRows &&
                  oI?.OrderRows.map((product, idx) => {
                    console.log('product >>> ', product)
                    return (
                      <>
                        <View style={styles.itemDetails} key={idx}>
                          <View style={styles.row1}>
                            {product?.Total !== 0 && (
                              <Label
                                style={{
                                  color: theme.colors.gray5,
                                  fontSize: scale(11),
                                }}
                                title={`${product?.Qty}X `}
                              />
                            )}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              {product?.Total <= 0 && <Label
                                style={{
                                  color: theme.colors.black1,
                                  fontSize: scale(12),
                                  fontFamily: theme.fonts.semiBold,
                                  fontWeight: '800'
                                }}
                                title={'senza'}
                              />}
                              <Label
                                style={{
                                  color: theme.colors.gray5,
                                  fontSize: scale(11),
                                }}
                                title={` ${product?.Product}`}
                              />
                            </View>

                          </View>

                          {product?.Total > 0 && (
                            <Label
                              style={{
                                fontSize: scale(11),
                              }}
                              title={`${product?.Total?.toFixed(2)}€`}
                            />
                          )}
                        </View>
                      </>
                    );
                  })}
              </View>

              <View style={styles.row}>
                <Label title={'Totale prodotti  '} />
                <Label title={`€${oI?.SubTotal?.toFixed(2)}`} />
              </View>

              {oI?.MinOrderCharge > 0 && (
                <View style={styles.row}>
                  <Label title={oI?.MinOrderChargeDesc} />
                  <Label title={`€${(oI?.MinOrderCharge).toFixed(2)}`} />
                </View>
              )}
              {oI?.DeliveryFee > 0 && (
                <View style={styles.row}>
                  <Label title={'Impasto Gluten Free'} />
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
              <View style={styles.totalFin}>
                <Label
                  title="Totale Finale"
                  style={[styles.price, { fontWeight: '600' }]}
                />
                <Label
                  title={`€${oI?.Total.toFixed(2)}`}
                  style={styles.price}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    padding: scale(12),
    // alignItems: 'center',
    margin: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: theme.colors.white,
    borderRadius: scale(10),
    minHeight: theme.SCREENHEIGHT * 0.5,
  },
  txt: {
    fontSize: scale(13),
    color: theme.colors.black1,
    fontFamily: theme.fonts.semiBold,
    textAlign: 'center',
    marginVertical: scale(5),
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: scale(5),
    borderBottomWidth: scale(0.5),
    paddingBottom: scale(5),
  },
  subtitle1: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.fonts.josefinSans,
    textAlign: 'center',
    fontSize: scale(12),
  },
  mapCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(5),
  },
  box: {
    width: '49%',
  },
  title: {
    textAlign: 'center',
    paddingVertical: scale(8),
  },
  note: {
    flexDirection: 'row',
    backgroundColor: theme.colors.green2,
    borderRadius: scale(5),
    padding: scale(3),
    marginVertical: scale(8),
    marginTop: scale(15),
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: scale(0.3),
    borderBottomWidth: scale(0.3),
    paddingVertical: scale(4),
  },
  totalFin: { flexDirection: 'row', justifyContent: 'space-between' },
  price: {
    fontSize: scale(12),
    color: theme.colors.red,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(55),
    paddingHorizontal: scale(12),
  },
  titleScreen: {
    fontSize: scale(22),
    alignSelf: 'center',
    marginLeft: theme.SCREENWIDTH * 0.11,
  },
  detailsView: {
    borderTopWidth: scale(0.8),
    borderBottomWidth: scale(0.5),
    marginVertical: scale(3),
    borderColor: theme.colors.gray1,
    paddingVertical: scale(5),
    width: '100%',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  scrollViewCon: { height: theme.SCREENHEIGHT * 0.73, overflow: 'hidden' },
  calCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(5),
    borderBottomWidth: scale(0.5),
  },
  phoneCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.5),
    paddingBottom: scale(10),
    // paddingVertical: scale(6),
  },
});
