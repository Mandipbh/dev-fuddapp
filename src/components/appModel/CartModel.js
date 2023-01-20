import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import {Label, Title} from '../Label';
import Button from '../Button';
import {cartData} from '../../utils/MockData';
import {useState} from 'react';
import AddCardModal from './AddCardModal';

const CartModel = props => {
  const {isVisible, close} = props;
  const [cartModel, setCartModel] = useState(false);
  const closeModal = () => {
    setCartModel(false);
  };

  return (
    <Modal
      style={styles.Maincontainer}
      visible={isVisible}
      backdropColor={theme.colors.black}
      backdropOpacity={0.5}>
      <View style={styles.container}>
        <Icon
          name="x"
          size={scale(30)}
          color={theme.colors.white}
          style={styles.closeIcon}
          onPress={close}
        />
        <View style={styles.subView}>
          <Title title="Zancos Burger" style={styles.title} />
          <Label
            title="180g meat, tomatoes, onion, lettuce, sauce"
            style={styles.subTitle}
          />
          <View style={styles.priceDetails}>
            <View
              style={[
                styles.row,
                {
                  alignItems: 'center',
                  width: theme.SCREENWIDTH * 0.3,
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity style={styles.btn}>
                <Icon size={scale(16)} name="minus" color={theme.colors.gray} />
              </TouchableOpacity>
              <Title title="1" />
              <TouchableOpacity style={styles.btn}>
                <Icon size={scale(16)} name="plus" color={theme.colors.gray} />
              </TouchableOpacity>
            </View>

            <Title title="€ 12.00" style={{color: theme.colors.purpal}} />
          </View>
          <View style={{width: '95%', marginTop: scale(10)}}>
            <ScrollView>
              {cartData.map((item, index) => {
                return (
                  <View style={styles.card}>
                    <TouchableOpacity style={styles.categoryTitle}>
                      <Title title={item.title} />
                      <Icon
                        name="chevron-down"
                        size={scale(22)}
                        color={theme.colors.gray}
                      />
                    </TouchableOpacity>
                    <View style={styles.subItem}>
                      {!item.isCheck &&
                        item.items.map((subItem, i) => {
                          return (
                            <View style={styles.itemView}>
                              <View>
                                <Label
                                  title={subItem.title}
                                  style={styles.name}
                                />
                                <Label
                                  title={subItem.price}
                                  style={styles.itemprice}
                                />
                              </View>
                              <View
                                style={[
                                  styles.row,
                                  {
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                  },
                                ]}>
                                <TouchableOpacity
                                  style={[
                                    styles.btn,
                                    {
                                      width: scale(23),
                                      padding: scale(0),
                                      height: scale(23),
                                      justifyContent: 'center',
                                    },
                                  ]}>
                                  <Icon
                                    size={scale(scale(13))}
                                    name="minus"
                                    color={theme.colors.gray}
                                  />
                                </TouchableOpacity>
                                <Label
                                  title="1"
                                  style={{marginHorizontal: scale(8)}}
                                />
                                <TouchableOpacity
                                  style={[
                                    styles.btn,
                                    {
                                      width: scale(23),
                                      padding: scale(0),
                                      height: scale(23),
                                      justifyContent: 'center',
                                    },
                                  ]}>
                                  <Icon
                                    size={scale(scale(13))}
                                    name="plus"
                                    color={theme.colors.gray}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      {item.isCheck &&
                        item.items.map((subItem, i) => {
                          return (
                            <View style={styles.itemView}>
                              <Label title={subItem.name} style={styles.name} />
                              <Icon
                                name="check-square"
                                size={scale(20)}
                                color={theme.colors.primary}
                              />
                            </View>
                          );
                        })}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => setCartModel(true)}
            title="Aggiungi al carrello"
            style={styles.button}
            titleStyle={styles.btntxt}
          />
          <Title title="€ 12.00" style={styles.price} />
        </View>
        <AddCardModal isVisible={cartModel} close={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Maincontainer: {
    margin: 0,
  },
  row: {
    flexDirection: 'row',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: scale(10),
    marginBottom: scale(10),
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
  },
  container: {
    alignSelf: 'center',
    height: theme.SCREENHEIGHT * 0.8,
    // backgroundColor: theme.colors.white,
    position: 'absolute',
    bottom: 0,
    width: theme.SCREENWIDTH,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
  },
  subView: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    height: theme.SCREENHEIGHT * 0.75,
    backgroundColor: theme.colors.white,
    position: 'absolute',
    bottom: 0,
    width: theme.SCREENWIDTH,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(13),
  },
  card: {
    marginVertical: scale(6),
  },
  title: {
    fontSize: scale(16),
    marginVertical: scale(10),
  },
  subTitle: {
    color: theme.colors.gray,
    fontSize: scale(13),
  },
  btn: {
    borderWidth: scale(1.5),
    borderColor: theme.colors.gray,
    borderRadius: scale(12),
    width: scale(25),
    padding: scale(3),
    alignItems: 'center',
  },
  priceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: scale(10),
  },
  bottomView: {
    backgroundColor: theme.colors.white,
    height: scale(70),
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0.2,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: '100%',
    elevation: scale(4),
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.purpal,
    marginHorizontal: 0,
    width: theme.SCREENWIDTH * 0.55,
    marginTop: scale(10),
  },
  btntxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  price: {
    color: theme.colors.purpal,
    fontSize: scale(22),
    fontWeight: '800',
  },
  itemView: {
    width: '100%',
    marginVertical: scale(8),
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: scale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scale(7),
  },
  name: {
    fontSize: scale(14),
    color: theme.colors.black,
  },
  itemprice: {
    color: theme.colors.gray,
    fontWeight: '600',
  },
  subItem: {
    backgroundColor: theme.colors.gray4,
    padding: scale(8),
  },
});

export default CartModel;
