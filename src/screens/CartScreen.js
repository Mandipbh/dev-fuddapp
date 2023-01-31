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
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, theme} from '../utils';
import {Button, Label, Title} from '../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const CartScreen = () => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state?.CartReducer.cartData);
  const dispatch = useDispatch();
  const incrimentCart = () => {};
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
          {cartData &&
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
                        uri: 'https://t3.ftcdn.net/jpg/02/19/27/26/360_F_219272634_wPHgMm8oGm0YVcY5zJt1OfoB9iG3hJwU.jpg',
                      }}
                      style={styles.productImg}
                    />
                    <View style={styles.detailsView}>
                      <Title title={i?.Name} />
                      <Label title={i?.Description} style={styles.desc} />
                    </View>
                  </View>
                  <View style={[styles.row, {justifyContent: 'space-evenly'}]}>
                    <View style={[styles.row]}>
                      <TouchableOpacity style={styles.btn}>
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
                    <Title title="€ 12.00" style={styles.price} />
                  </View>
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.PriceView}>
          <View style={styles.priceingView}>
            <Title title="Totale Prodotti" />
            <Title title="€ 36.00" style={styles.number} />
          </View>
          <View style={styles.priceingView}>
            <Title title="Spese di consegna" />
            <Title title="€ 2.90" style={styles.number} />
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
            <Title title="€ 38.90" style={styles.number} />
          </View>
        </View>
      </ScrollView>
      <Button
        title="Procedi al CheckOut"
        style={styles.submitBtn}
        titleStyle={styles.btnTxt}
        onPress={() => {
          navigation.navigate('Checkout');
        }}
      />
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
});
