/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
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
import {BlurView} from '@react-native-community/blur';

const CartModel = props => {
  const {isVisible, close, data} = props;
  const [cartModel, setCartModel] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [totalPrice, setPrice] = useState(0);
  const [wantProduct, setWantProduct] = useState(null);
  const [rIds, setRIds] = useState([]);
  const [checkbox, setCheckBox] = useState(0);
  const [count, setCount] = useState(0);
  let [addonData, setAddonData] = useState([]);
  const [pTotal, setPTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [selIndex, setIdx] = useState(0);
  const tmpDataForCircle = wantProduct?.ImportoUnitario;
  // const popItem = ({ item }) => {
  //   rIds.includes(item?.IDRiga) ? setCheckBox(!checkbox) : null
  // }
  const dataObject = {
    Name: productDetails.Name,
    Amount: productDetails.Amount,
    productQuantity: 1,
    Image: productDetails.Image,
    lstAddons: addonData,
    lstMakeTypes: wantProduct,
    lstIngredients: rIds,
  };
  // const [rIdData, setRIds] = useState([]);
  const closeModal = () => {
    setCartModel(false);
  };
  useEffect(() => {
    setPrice(data?.Amount);
    setProductDetails(data);
    console.log('data ?? ', data?.lstAddons);
    data?.lstAddons?.length > 0 && setAddonData(data?.lstAddons);
    // data?.lstAddons?.length === 0 && setAddonData([]);
    calculatePrice();
  }, [data, productDetails.lstAddons, wantProduct, addonData]);

  const handleAggiungi = (item, index) => {
    let tmpData = [...productDetails?.lstAddons];
    //lstAddons
    // tmpData[index].Qty = 1;
    tmpData.Qty = tmpData.Qty + 1;
    setCount(tmpData.includes);
  };
  const handleCartAddItem = async item => {
    const tmpArr = cartData === undefined ? [] : [...cartData];
    // tmpArr.push(item);

    dispatch(AddToCart(tmpArr));
    if (
      item?.lstIngredients?.length === 0 &&
      item?.lstAddons?.length === 0 &&
      item?.lstAddons.length === 0
    ) {
      var matchingObj = await cartData.find(o => o.Name === item.Name);

      if (matchingObj) {
        matchingObj.Qty++;
      } else {
        let itemQtyhandle = {...item};
        itemQtyhandle.Qty = 1;
        itemQtyhandle.Image = details?.Menu?.ProductsImagePrefix + item?.Image;
        tmpArr.push(itemQtyhandle);
      }
      setSelItem(item);
    } else {
      setSelItem(item);
      setCartModel(true);
    }
  };

  const handleIncriment = (item, idx) => {
    let tmpArr = [...addonData];
    tmpArr[idx].Qty = tmpArr[idx].Qty + 1;
    setAddonData(tmpArr);
  };

  const handleDecriment = (item, idx) => {
    let tempArray = [...addonData];
    tempArray[idx].Qty != 0
      ? (tempArray[idx].Qty = tempArray[idx].Qty - 1)
      : null;
    setAddonData(tempArray);
  };

  function clearify() {
    setProductDetails([]);
    setCartModel(false);
    // emptyQty()
    close();
    // let tmpArr = [...addonData]
    // tmpArr.Qty == 0
    // setAddonData(tmpArr)
  }

  const deleteByIndexProduct = index => {
    console.log('clicked position', index);
    const tmpArr = [...rIds];
    const x = tmpArr.splice(index, 1);
    setRIds(x);

    // rIds.filter((item, itemIndex) => itemIndex != index)
  };

  const changeShow = props => {
    setShow(!show);
    setAddonData([]);
    props.onSubmit(show);
  };

  // const emptyQty = () => {
  //   let tmp = [...addonData]
  //   tmp[idx].Qty != 0 ? tmp[idx].Qty = 0 : null
  //   setAddonData(tmp)
  // }
  const calculatePrice = () => {
    const tmparr = [...addonData];
    const initialValue = 0;
    const total = tmparr.reduce(
      (accumulator, current) => accumulator + current.Prezzo * current.Qty,
      initialValue,
    );
    // let total = tmparr[idx]

    const totalValue = total + tmpDataForCircle || total;
    setPTotal(totalValue);
  };

  const handleIngredienti = (item, index) => {
    const lstIngredients = [...productDetails.lstIngredients];
    if (lstIngredients[index]?.IsChecked) {
      lstIngredients[index].IsChecked = false; // lstIngredients[index]?.IsChecked = false
    } else {
      lstIngredients[index].IsChecked = true;
    }
    const tmpdata = {
      ...productDetails,
      lstIngredients,
    };

    setProductDetails(tmpdata);
  };
  return (
    <Modal
      style={styles.Maincontainer}
      visible={isVisible}
      backdropColor={theme.colors.black}
      backdropOpacity={0.2}>
      <BlurView
        style={styles.blurView}
        blurType="xlight" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.container}>
        <Icon
          name="x"
          size={scale(30)}
          color={theme.colors.white}
          style={styles.closeIcon}
          onPress={() => {
            clearify();
          }}
        />
        <View style={styles.subView}>
          <Icon
            name="x"
            size={scale(30)}
            color={theme.colors.bla}
            style={styles.closeIcon}
            onPress={() => {
              clearify();
            }}
          />
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
              contentContainerStyle={{paddingBottom: theme.SCREENHEIGHT * 0.1}}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled>
              {data?.lstAddons?.length > 0 && (
                <>
                  <TouchableOpacity
                    style={styles.categoryTitle}
                    onPress={() => {
                      selIndex === 0 ? setIdx(null) : setIdx(0);
                    }}>
                    <Title title={'Aggiungi ingredienti'} />
                    <Icon
                      name={selIndex === 0 ? 'chevron-up' : 'chevron-down'}
                      size={scale(22)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                  {selIndex === 0 && (
                    <ScrollView
                      style={{
                        height: null,
                        maxHeight: theme.SCREENHEIGHT * 0.68,
                      }}
                      nestedScrollEnabled>
                      {addonData?.length > 0 && (
                        <View style={styles.card}>
                          <View style={styles.subItem}>
                            {productDetails?.lstAddons?.map((item, idx) => {
                              return (
                                <View style={styles.itemView} key={idx}>
                                  <View>
                                    <Label
                                      title={item?.Descrizione}
                                      style={styles.name}
                                    />
                                    <Label
                                      title={`${item?.Prezzo.toFixed(
                                        2,
                                      )?.toString()}€`}
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
                                    <View
                                      style={[
                                        styles.row,
                                        {
                                          justifyContent: 'space-around',
                                          alignItems: 'center',
                                        },
                                      ]}>
                                      <TouchableOpacity
                                        style={styles.btns}
                                        onPress={() => {
                                          handleDecriment(item, idx);
                                        }}>
                                        <Icon
                                          size={scale(13)}
                                          name="minus"
                                          color={theme.colors.gray}
                                        />
                                      </TouchableOpacity>
                                      <Label
                                        title={item?.Qty}
                                        style={{marginHorizontal: scale(8)}}
                                      />

                                      <TouchableOpacity
                                        style={styles.btns}
                                        // onPress={() => indexInc()}>
                                        onPress={() =>
                                          handleIncriment(item, idx)
                                        }>
                                        <Icon
                                          size={scale(scale(13))}
                                          name="plus"
                                          color={theme.colors.gray}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      )}
                    </ScrollView>
                  )}
                </>
              )}

              {productDetails?.lstIngredients?.length > 0 && (
                <>
                  <TouchableOpacity
                    style={styles.categoryTitle}
                    onPress={() => {
                      selIndex === 1 ? setIdx(null) : setIdx(1);
                    }}>
                    <Title title={'Rimuovi Ingredienti'} />
                    <Icon
                      name={selIndex === 1 ? 'chevron-up' : 'chevron-down'}
                      size={scale(22)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                  {selIndex === 1 && (
                    <ScrollView
                      style={{
                        height: null,
                        maxHeight: theme.SCREENHEIGHT * 0.68,
                      }}
                      nestedScrollEnabled>
                      {productDetails?.lstIngredients?.length > 0 && (
                        <View style={styles.card}>
                          <View style={styles.subItem}>
                            {productDetails?.lstIngredients?.map(
                              (item, index) => {
                                return (
                                  <View style={styles.itemView} key={index}>
                                    <View>
                                      <Label
                                        title={item?.Descrizione}
                                        style={styles.name}
                                      />
                                      <Label
                                        title={`${item?.Prezzo?.toFixed(2)}€`}
                                        style={styles.itemprice}
                                      />
                                    </View>
                                    <TouchableOpacity
                                      onPress={() => {
                                        handleIngredienti(item, index);
                                      }}>
                                      {item?.IsChecked ? (
                                        <Icon
                                          name="check-square"
                                          size={scale(20)}
                                          color={theme.colors.primary}
                                        />
                                      ) : (
                                        <Icon
                                          name="square"
                                          size={scale(20)}
                                          color={theme.colors.primary}
                                        />
                                      )}
                                    </TouchableOpacity>
                                  </View>
                                );
                              },
                            )}
                          </View>
                        </View>
                      )}
                    </ScrollView>
                  )}
                </>
              )}

              {productDetails?.lstMakeTypes?.length > 0 && (
                <>
                  <TouchableOpacity
                    style={styles.categoryTitle}
                    onPress={() => {
                      selIndex === 2 ? setIdx(null) : setIdx(2);
                    }}>
                    <Title title={'Comeil prodotto?'} />
                    <Icon
                      name={selIndex === 2 ? 'chevron-up' : 'chevron-down'}
                      size={scale(22)}
                      color={theme.colors.gray}
                    />
                  </TouchableOpacity>
                  {selIndex === 2 && (
                    <ScrollView
                      style={{
                        height: null,
                        maxHeight: theme.SCREENHEIGHT * 0.68,
                      }}
                      nestedScrollEnabled>
                      {productDetails?.lstMakeTypes?.length > 0 && (
                        <View style={styles.card}>
                          <View style={styles.subItem}>
                            {productDetails?.lstMakeTypes?.map(
                              (item, index) => {
                                return (
                                  <View style={styles.itemView}>
                                    <View>
                                      <Label
                                        title={item?.Prodo}
                                        style={styles.name}
                                      />
                                      <Label
                                        title={`${item?.ImportoUnitario.toFixed(
                                          2,
                                        )}€`}
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
                              },
                            )}
                          </View>
                        </View>
                      )}
                    </ScrollView>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => close(true) && changeShow && handleAggiungi}
            title="Aggiungi al carrello"
            style={styles.button}
            titleStyle={styles.btntxt}
          />
          {/* <Title title={`€ ${totalPrice?.toFixed(2)}`} style={styles.price} /> */}
          <Title
            title={`€ ${data?.Amount + pTotal + (pTotal === 0 ? 0 : 0)}`}
            style={styles.price}
          />
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
    // marginBottom: scale(10),
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    marginVertical: scale(5),
    backgroundColor: theme.colors.gray3,
    padding: scale(5),
    borderRadius: scale(8),
  },
  container: {
    alignSelf: 'center',
    // height: theme.SCREENHEIGHT * 0.8,
    // backgroundColor: theme.colors.white,
    position: 'absolute',
    bottom: 0,
    width: theme.SCREENWIDTH,
    // borderTopLeftRadius: scale(25),
    // borderTopRightRadius: scale(25),
  },
  subView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    height: theme.SCREENHEIGHT,
    backgroundColor: theme.colors.white,
    position: 'absolute',
    bottom: 0,
    width: theme.SCREENWIDTH,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(13),
    paddingTop: scale(25),
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
    borderWidth: 1,
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
  itemContainer: {
    width: '95%',
    height: '95%',
    marginTop: scale(10),
    paddingBottom: scale(100),
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default CartModel;
