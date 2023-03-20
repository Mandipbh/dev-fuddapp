import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {scale, theme} from '../utils';
import {
  Button,
  CartModel,
  FullScreenImage,
  Label,
  Loader,
  Title,
} from '../components';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {restaurantDetails} from '../redux/Actions/RestaurantAction';
import ApiService, {API, APP_BASE_URL} from '../utils/ApiService';
import {AddToCart} from '../redux/Actions/CartAction';
import moment from 'moment';

const RestaturantDetails = ({route, navigation}) => {
  const [selectedIndex, setSelIndex] = useState(0);
  const [viewImg, setViewImg] = useState(false);
  const [imgPath, setImgPath] = useState(null);
  const [cartModel, setCartModel] = useState(false);
  const [searchtxt, setSearchTxt] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [details, setDetails] = useState();
  const [selItem, setSelItem] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [load, setLoad] = useState(false);
  const [resId, setrid] = useState(null);
  const [date, setDate] = useState(new Date());
  const seladdress = useSelector(state => state.UserReducer.selAddress);
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocuse = useIsFocused();
  //get restaurant details & menus
  useEffect(() => {
    if (route?.params?.item?.ID) {
      setrid(route?.params?.item.ID);
    }
    setLoad(true);
    const data = {
      latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
      longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
      id: route?.params?.item?.ID,
      date: moment(date).format('DD-MM-YYYY'),
      timeSlot: `${moment(new Date()).format('HH:mm')}-${moment(new Date())
        .add(30, 'minute')
        .format('HH:mm')}`,
      Category: '',
    };

    setLoad(true);

    try {
      const options = {payloads: data};
      ApiService.post(API.getPerticularRestaurant, options)
        .then(res => {
          if (res) {
            console.log('res?.RestaurantDetail', res?.RestaurantDetail);
            setLoad(false);
            setDetails(res?.RestaurantDetail);
            // dispatch({
            //   type: GETRESTAURANTDETAILS,
            //   payload: res?.RestaurantDetail,
            // });
          }
        })
        .catch(c => {
          setLoad(false);
          console.log('catch of restaurants >> ressst ', c.response);
        });
    } catch (error) {
      setLoad(false);
      console.log('error in restaurants', error);
    }

    dispatch(restaurantDetails(data));
  }, [isFocuse]);

  const restaurantData = useSelector(
    state => state.RestaurantReducers?.restaurantDetails,
  );

  //set details
  // useEffect(() => {
  //   // AddToCart(restaurantData);
  //   console.log('restaurantData_', restaurantData);
  //   setLoad(false);
  //   setDetails(res?.RestaurantDetail);
  // }, [restaurantData]);

  function getNameData(d, searchKey) {
    let returnData = [];
    const recursion = rcData => {
      if (rcData?.Name && rcData?.Code) {
        if (rcData.Name?.toUpperCase().includes(searchKey.toUpperCase())) {
          returnData.push(rcData);
        }
        return;
      }
      if (Array.isArray(rcData) || rcData instanceof Object) {
        for (const key in rcData) {
          recursion(rcData[key]);
        }
      }
    };
    recursion(d);
    return returnData;
  }

  useEffect(() => {
    let data = getNameData(details, searchtxt);
    setFilterData(data);
    // const findCategoryId = data?.map(i => {
    //   return i?.MasterId;
    // });
    // const s = details?.Menu.Categories.filter(e => {
    //   const ss = findCategoryId.includes(e?.ID);
    //   if (ss && ss !== false) {
    //     if (e.Name && e.Name !== undefined) {
    //       return {Id: e.ID, name: e.Name};
    //     }
    //   }
    // });
    // const tmp
    // s.map((f)=>{
    //   f.Products?.map((fi)=>{

    //   })
    // })
  }, [searchtxt]);

  const renderMenus = ({item, index}) => {
    return (
      <View key={index} style={styles.menuView}>
        <TouchableOpacity
          style={styles.colapseView}
          onPress={() => {
            index == selectedIndex ? setSelIndex(null) : setSelIndex(index);
          }}>
          <Title title={`${item?.Name} (${item?.Products?.length})`} />
          <Icon
            name={index == selectedIndex ? 'chevron-up' : 'chevron-down'}
            size={scale(25)}
            color={theme.colors.gray}
          />
        </TouchableOpacity>
        {index == selectedIndex &&
          item?.Products &&
          item?.Products.map((m, i) => {
            return (
              <>
                <View style={styles.itemView} key={i}>
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => {
                        setViewImg(!viewImg);
                        setImgPath(
                          details?.Menu?.ProductsImagePrefix + m?.Image,
                        );
                      }}>
                      <Image
                        source={{
                          uri: details?.Menu?.ProductsImagePrefix + m?.Image,
                        }}
                        style={styles.productImage}
                      />
                    </TouchableOpacity>

                    <View style={{marginLeft: scale(10)}}>
                      <Label title={m?.Name} style={styles.productname} />
                      <Label
                        title={m?.Amount?.toFixed(2) + ' €'}
                        style={styles.price}
                      />
                    </View>
                  </View>
                  <Icon
                    name="plus"
                    size={scale(22)}
                    color={theme.colors.purpal}
                    style={{marginRight: scale(6)}}
                    onPress={() => {
                      // console.log('onPress>', JSON.stringify(m, null, 4));
                      handleCartAddItem(m);
                      // setCartModel(!cartModel);
                    }}
                  />
                </View>
                <View style={styles.divider} />
              </>
            );
          })}
        {details?.Menu?.Categories?.length !== index + 1 && (
          <View style={styles.divider} />
        )}
      </View>
    );
  };

  const renderInfo = ({item, index}) => {
    const time = item?.Time?.replace('<br />', ' ');
    return (
      <View style={styles.menuViews} key={index}>
        <Text style={styles.infoText}>{item?.Day}</Text>
        <Text style={styles.infoText}>{time}</Text>
      </View>
    );
  };
  const handleModel = async item => {
    console.log('handleModel', item);
    setCartModel(false);
    if (item !== null) {
      if (item !== undefined) {
        const tmpArr = cartData === undefined ? [] : [...cartData];
        // tmpArr.push(item);

        dispatch(AddToCart(tmpArr));

        var matchingObj = await cartData.find(o => o.Name === item.Name);

        if (matchingObj) {
          matchingObj.Qty++;
        } else {
          let itemQtyhandle = {...item};
          itemQtyhandle.Qty = 1;
          itemQtyhandle.restaurantId = route?.params?.item.ID;
          itemQtyhandle.MinimumOrder = details?.MinimumOrder;
          itemQtyhandle.MinOrderSupplment = details?.MinOrderSupplment;
          itemQtyhandle.Image =
            details?.Menu?.ProductsImagePrefix + item?.Image;
          tmpArr.push(itemQtyhandle);
        }
        setSelItem(item);
      } else {
        setSelItem(item);
        setCartModel(true);
        let itemQtyhandle = {...item};
        itemQtyhandle.Qty = 1;
        itemQtyhandle.restaurantId = route?.params?.item.ID;
        itemQtyhandle.MinimumOrder = details?.MinimumOrder;
        itemQtyhandle.MinOrderSupplment = details?.MinOrderSupplment;
        itemQtyhandle.Image = details?.Menu?.ProductsImagePrefix + item?.Image;
        // show?  null : tmpArr.push(itemQtyhandle) : null
      }
    }
  };

  const cartData = useSelector(state => state?.CartReducer.cartData);

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
        itemQtyhandle.restaurantId = route?.params?.item.ID;
        itemQtyhandle.MinimumOrder = details?.MinimumOrder;
        itemQtyhandle.MinOrderSupplment = details?.MinOrderSupplment;
        itemQtyhandle.Image = details?.Menu?.ProductsImagePrefix + item?.Image;
        tmpArr.push(itemQtyhandle);
      }
      setSelItem(item);
    } else {
      setSelItem(item);
      setCartModel(true);
      let itemQtyhandle = {...item};
      itemQtyhandle.Qty = 1;
      itemQtyhandle.restaurantId = route?.params?.item.ID;
      itemQtyhandle.MinimumOrder = details?.MinimumOrder;
      itemQtyhandle.MinOrderSupplment = details?.MinOrderSupplment;
      itemQtyhandle.Image = details?.Menu?.ProductsImagePrefix + item?.Image;
      // show?  null : tmpArr.push(itemQtyhandle) : null
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: APP_BASE_URL + restaurantData?.Canvas,
        }}
        style={styles.backImage}
        imageStyle={styles.image}>
        <View style={styles.header}>
          <Icon
            name="chevron-left"
            size={scale(28)}
            color={theme.colors.white}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={[styles.textinputContainer, styles.shadow]}>
            <Icon
              name="search"
              size={scale(23)}
              color={theme.colors.placeholder}
            />
            <TextInput
              placeholder={'Cerca nel menu?'}
              style={styles.searchbox}
              placeholderTextColor={theme.colors.placeholder}
              value={searchtxt}
              onChangeText={txt => {
                setSearchTxt(txt);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => {
              navigation.navigate('Cart', {restaurantId: resId});
              // setCartModel(!cartModel);
            }}>
            <Icon1 name="bag" size={scale(25)} color={theme.colors.white} />
            <Label title={cartData?.length} style={styles.Cartcount} />
          </TouchableOpacity>
        </View>
        <Title title={restaurantData?.Name} style={styles.headerTitle} />
        <View style={styles.subtitleView}>
          {restaurantData?.Tags !== undefined && !load && (
            <Label title={restaurantData?.Tags} style={styles.subTitle} />
          )}
        </View>
        <View style={styles.bottomView}>
          {restaurantData?.Percentage && (
            <LinearGradient
              colors={[theme.colors.purpal1, theme.colors.orange]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.linCon}>
              <Icon2
                name="thumbs-up"
                color={theme.colors.white}
                size={scale(12)}
              />
              <Text
                style={styles.review}>{`${restaurantData?.Percentage}%`}</Text>
            </LinearGradient>
          )}
          {!restaurantData?.IsOpen && (
            <View style={styles.timeCon}>
              <Icon name="clock" size={scale(15)} color={theme.colors.gray} />
              {restaurantData?.OpeningTime && (
                <Label
                  title={`Pre-order ${restaurantData?.OpeningTime}`}
                  style={styles.titmeLbl}
                />
              )}
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.options}>
        <Button
          title="Menu"
          style={[styles.filBtn, styles.shadow, {shadowRadius: scale(10)}]}
          onPress={() => {
            setSelectedItem(0);
          }}
          titleStyle={{
            color: selectedItem === 0 ? theme.colors.black : theme.colors.gray,
          }}
        />
        <Button
          title="Intormazioni"
          style={[styles.filBtn, styles.shadow, {shadowRadius: scale(10)}]}
          onPress={() => {
            setSelectedItem(1);
          }}
          titleStyle={{
            color: selectedItem === 1 ? theme.colors.black : theme.colors.gray,
          }}
        />
      </View>
      <View>
        {selectedItem === 0 && searchtxt === '' ? (
          <FlatList
            data={details?.Menu?.Categories}
            renderItem={renderMenus}
            showsVerticalScrollIndicator={false}
            style={[styles.menusView, styles.shadow]}
            contentContainerStyle={{paddingBottom: scale(30)}}
            ListEmptyComponent={() => {
              return (
                details?.Menu?.Categories?.length === 0 && (
                  <View style={styles.noDataCon}>
                    <Title title="Nessun ristorante" />
                  </View>
                )
              );
            }}
          />
        ) : (
          <>
            {selectedItem === 0 && (
              <View style={styles.menuView}>
                {filterData?.map((m, i) => {
                  return (
                    <>
                      <View style={styles.itemView} key={i}>
                        <View style={styles.row}>
                          <TouchableOpacity
                            onPress={() => {
                              setViewImg(!viewImg);
                              setImgPath(
                                details?.Menu?.ProductsImagePrefix + m?.Image,
                              );
                            }}>
                            <Image
                              source={{
                                uri:
                                  details?.Menu?.ProductsImagePrefix + m?.Image,
                              }}
                              style={styles.productImage}
                            />
                          </TouchableOpacity>

                          <View style={{marginLeft: scale(10)}}>
                            <Label title={m?.Name} style={styles.productname} />
                            <Label
                              title={m?.Amount?.toFixed(2) + ' €'}
                              style={styles.price}
                            />
                          </View>
                        </View>
                        <Icon
                          name="plus"
                          size={scale(22)}
                          color={theme.colors.purpal}
                          style={{marginRight: scale(6)}}
                          onPress={() => {
                            handleCartAddItem(m);

                            // setCartModel(!cartModel);
                          }}
                        />
                      </View>
                      <View style={styles.divider} />
                    </>
                  );
                })}
              </View>
            )}
          </>
        )}
      </View>
      {selectedItem === 1 && (
        <View style={{height: theme.SCREENHEIGHT * 0.48}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoContainer}>
              <View style={styles.textView}>
                <Text style={styles.title}>{restaurantData?.Name}</Text>
                <Text style={styles.addres}>
                  {restaurantData?.Addresses[0]}
                </Text>
              </View>
              <Text style={styles.titleText}>Orari di apertura</Text>

              <FlatList
                data={restaurantData?.OpeningTimes}
                renderItem={renderInfo}
              />
            </View>
          </ScrollView>
        </View>
      )}

      <FullScreenImage
        isVisible={viewImg}
        close={() => {
          setViewImg(!viewImg);
        }}
        image={imgPath}
      />
      {load && <Loader loading={load} />}
      <CartModel data={selItem} isVisible={cartModel} close={handleModel} />
    </View>
  );
};

export default RestaturantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  backImage: {
    height: theme.SCREENHEIGHT * 0.29,
    width: '100%',
    resizeMode: 'cover',
  },
  menusView: {
    height: '53%',
    backgroundColor: theme.colors.white,
    marginHorizontal: scale(10),
    borderRadius: scale(15),
    marginBottom: scale(5),
  },
  image: {
    // borderTopLeftRadius: scale(10),
    // borderTopRightRadius: scale(10),
    opacity: 0.89,
  },
  header: {
    flexDirection: 'row',
    padding: scale(20),
    marginTop: Platform.OS === 'ios' ? scale(15) : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textinputContainer: {
    height: scale(40),
    backgroundColor: theme.colors.white,
    borderRadius: scale(20),
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  noDataCon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: theme.SCREENHEIGHT / 2,
  },
  searchbox: {
    fontSize: scale(13),
    color: theme.colors.placeholder,
    marginLeft: scale(10),
    fontWeight: '600',
    width: '100%',
  },
  cartBtn: {justifyContent: 'center', alignItems: 'center'},
  Cartcount: {
    position: 'absolute',
    fontWeight: '600',
    color: theme.colors.white,
    top: Platform.OS === 'ios' ? scale(10.5) : scale(5.5),
  },
  headerTitle: {
    fontSize: scale(22),
    textAlign: 'center',
    fontWeight: '900',
    color: theme.colors.white,
  },
  subtitleView: {
    paddingVertical: scale(3),
    backgroundColor: theme.colors.black1,
    alignSelf: 'center',
    paddingHorizontal: scale(15),
    borderRadius: scale(15),
    opacity: 0.8,
    marginTop: scale(5),
  },
  subTitle: {
    fontSize: scale(13),
    color: theme.colors.white,
    fontWeight: '600',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginTop: scale(8),
  },
  review: {
    fontSize: scale(11),
    marginHorizontal: scale(5),
    color: theme.colors.white,
    fontWeight: '800',
    fontFamily: theme.fonts.josefinSans,
  },
  timeCon: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(15),
  },
  titmeLbl: {
    fontSize: scale(11),
    color: theme.colors.gray,
    marginLeft: scale(3),
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: scale(10),
    marginHorizontal: theme.SCREENWIDTH * 0.25,
  },
  linCon: {
    width: null,
    flexDirection: 'row',
    padding: scale(5),
    borderRadius: scale(15),
  },
  filBtn: {
    width: scale(100),
    margin: 0,
    borderRadius: scale(12),
  },
  menuView: {
    padding: scale(10),
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    paddingVertical: scale(5),
    borderColor: theme.colors.gray,
    marginHorizontal: scale(10),
  },
  menuViews: {
    padding: scale(10),
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    paddingVertical: scale(5),
    marginHorizontal: scale(10),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.gray1,
  },

  colapseView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
  productImage: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    backgroundColor: theme.colors.white,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    backgroundColor: theme.colors.backgroundColor,
    borderBottomColor: theme.colors.gray,
    width: '100%',
    paddingVertical: scale(5),
    // borderBottomWidth: scale(1),
    alignSelf: 'center',
  },
  productname: {
    fontSize: scale(14),
    fontWeight: '300',
    color: theme.colors.black,
  },
  price: {
    fontSize: scale(12),
    color: theme.colors.gray,
  },
  title: {
    color: theme.colors.gray,
    fontSize: scale(16),
    fontWeight: '800',
    fontFamily: theme.fonts.josefinSans,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: '93%',
    height: scale(0.6),
    alignSelf: 'center',
    backgroundColor: theme.colors.gray,
  },
  infoContainer: {
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: scale(20),
    marginHorizontal: scale(10),
    borderRadius: 15,
  },
  infoText: {
    color: theme.colors.gray,
    fontWeight: '700',
    fontFamily: theme.fonts.josefinSans,
  },
  textView: {
    marginHorizontal: scale(20),
    borderBottomWidth: 1,
    borderColor: theme.colors.gray1,
    paddingBottom: scale(10),
    fontFamily: theme.fonts.josefinSans,
    fontWeight: '400',
  },
  titleText: {
    color: theme.colors.gray,
    fontSize: scale(14),
    fontWeight: '800',
    marginLeft: scale(20),
    marginBottom: scale(30),
    marginTop: scale(10),
  },
});
