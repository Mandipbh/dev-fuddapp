import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import {Label, Title} from '../Label';
import Button from '../Button';
import {useState} from 'react';
import AddCardModal from './AddCardModal';
import {useEffect} from 'react';

const CartModel = props => {
  const {isVisible, close, data} = props;
  const [cartModel, setCartModel] = useState(false);
  const [totalPrice, setPrice] = useState(0);
  const [wantProduct, setWantProduct] = useState(null);
  const [rIds, setRIds] = useState([]);
  // const [rIdData, setRIds] = useState([]);
  const closeModal = () => {
    setCartModel(false);
  };
  useEffect(() => {
    setPrice(data?.Amount);
  }, [data]);

  return (
    <Modal
      style={styles.Maincontainer}
      visible={isVisible}
      backdropColor={theme.colors.black}
      backdropOpacity={0.2}>
      <View style={styles.container}>
        <Icon
          name="x"
          size={scale(30)}
          color={theme.colors.white}
          style={styles.closeIcon}
          onPress={close}
        />
        <View style={styles.subView}>
          <Title title={data?.Name} style={styles.title} />
          <Label title={data?.Description} style={styles.subTitle} />
          {/* <View style={styles.priceDetails}>
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
          </View> */}
          <View style={styles.itemContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled>
              {data?.lstAddons?.length > 0 && (
                <>
                  <TouchableOpacity style={styles.categoryTitle}>
                    <Title title={'Aggiungi ingredienti'} />
                    <Icon
                      name="chevron-down"
                      size={scale(22)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                  <ScrollView
                    style={{height: theme.SCREENHEIGHT * 0.2}}
                    nestedScrollEnabled>
                    {data?.lstAddons?.length > 0 && (
                      <View style={styles.card}>
                        <View style={styles.subItem}>
                          {data?.lstAddons?.map((item, index) => {
                            return (
                              <View style={styles.itemView} key={index}>
                                <View>
                                  <Label
                                    title={item?.Descrizione}
                                    style={styles.name}
                                  />
                                  <Label
                                    title={`${item?.Prezzo?.toString()}€`}
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
                                  <TouchableOpacity style={styles.btns}>
                                    <Icon
                                      size={scale(scale(13))}
                                      name="minus"
                                      color={theme.colors.gray}
                                    />
                                  </TouchableOpacity>
                                  <Label
                                    title="0"
                                    style={{marginHorizontal: scale(8)}}
                                  />
                                  <TouchableOpacity style={styles.btns}>
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
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </>
              )}

              {data?.lstIngredients?.length > 0 && (
                <>
                  <TouchableOpacity style={styles.categoryTitle}>
                    <Title title={'Rimuovi Ingredienti'} />
                    <Icon
                      name="chevron-down"
                      size={scale(22)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                  <ScrollView
                    style={{height: theme.SCREENHEIGHT * 0.2}}
                    nestedScrollEnabled>
                    {data?.lstIngredients?.length > 0 && (
                      <View style={styles.card}>
                        <View style={styles.subItem}>
                          {data?.lstIngredients?.map((item, index) => {
                            return (
                              <View style={styles.itemView} key={index}>
                                <View>
                                  <Label
                                    title={item?.Descrizione}
                                    style={styles.name}
                                  />
                                  <Label
                                    title={`${item?.Prezzo}€`}
                                    style={styles.itemprice}
                                  />
                                </View>
                                <Icon
                                  name={
                                    rIds.includes(item?.IDRiga)
                                      ? 'check-square'
                                      : 'square'
                                  } //circle
                                  size={scale(20)}
                                  color={theme.colors.primary}
                                  onPress={() => {
                                    rIds.push(item?.IDRiga);
                                    setRIds(rIds);
                                  }}
                                />
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </>
              )}

              {data?.lstMakeTypes?.length > 0 && (
                <>
                  <TouchableOpacity style={styles.categoryTitle}>
                    <Title title={'Comeil prodotto?'} />
                    <Icon
                      name="chevron-down"
                      size={scale(22)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                  <ScrollView
                    style={{height: theme.SCREENHEIGHT * 0.25}}
                    nestedScrollEnabled>
                    {data?.lstMakeTypes?.length > 0 && (
                      <View style={styles.card}>
                        <View style={styles.subItem}>
                          {data?.lstMakeTypes?.map((item, index) => {
                            return (
                              <View style={styles.itemView}>
                                <View>
                                  <Label
                                    title={item?.Prodo}
                                    style={styles.name}
                                  />
                                  <Label
                                    title={`${item?.ImportoUnitario}€`}
                                    style={styles.itemprice}
                                  />
                                </View>

                                <Icon
                                  name={
                                    item?.Id === wantProduct?.Id
                                      ? 'check-circle'
                                      : 'circle'
                                  } //circle
                                  size={scale(20)}
                                  color={
                                    item?.Id !== wantProduct?.Id
                                      ? theme.colors.gray
                                      : theme.colors.primary
                                  }
                                  onPress={() => {
                                    setWantProduct(item);
                                  }}
                                />
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => close(true)}
            title="Aggiungi al carrello"
            style={styles.button}
            titleStyle={styles.btntxt}
          />
          <Title title={`€ ${totalPrice}`} style={styles.price} />
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
    fontSize: scale(11),
  },
  btn: {
    borderWidth: scale(1.5),
    borderColor: theme.colors.gray,
    borderRadius: scale(12),
    width: scale(25),
    padding: scale(3),
    alignItems: 'center',
  },
  btns: {
    borderWidth: scale(1.5),
    borderColor: theme.colors.gray,
    borderRadius: scale(12),
    alignItems: 'center',
    width: scale(23),
    padding: scale(0),
    height: scale(23),
    justifyContent: 'center',
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
  itemContainer: {width: '95%', height: '70%', marginTop: scale(10)},
});

export default CartModel;
