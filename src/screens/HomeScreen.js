import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../utils';
import {
  Header,
  Button,
  Label,
  Title,
  RestaurantsCard,
  CategoryCard,
  FoodCard,
  PaymentMethod,
  ContactModal,
} from '../components';
import {foodData} from '../utils/MockData';
import DrawerModal from '../components/appModel/DrawerModal';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  getAllCategory,
  getAllRestaurants,
  getpopularRestaurants,
} from '../redux/Actions/HomeAction';
import {useIsFocused} from '@react-navigation/core';
import SetLocationModel from '../components/appModel/SetLocationModel';
import moment from 'moment';
import {setCategory} from '../redux/Actions/RestaurantAction';

const Category = ({categoryListData}) => {
  return (
    <View style={styles.categoryContainer}>
      <Title title="Categories" style={styles.title} />
      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {categoryListData &&
          categoryListData?.map((item, index) => {
            return <CategoryCard item={item} index={index} />;
          })}
      </ScrollView>
    </View>
  );
};

const PopularRestaturants = ({ExternalRestaurantData}) => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.popularView}>
        <Title title="Popular Restaurants" style={styles.title} />
        <TouchableOpacity>
          <Label title="SEE ALL" style={styles.seeAll} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {ExternalRestaurantData &&
          ExternalRestaurantData?.map((item, index) => {
            return <RestaurantsCard item={item} index={index} Popular />;
          })}
      </ScrollView>
    </View>
  );
};

const Restaturants = ({restaurant}) => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.popularView}>
        <Title title="Restaurants" style={styles.title} />
        {/* <Label title="SEE ALL" style={styles.seeAll} /> */}
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: scale(15)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {restaurant &&
          restaurant.reverse()?.map((item, index) => {
            return (
              <TouchableOpacity>
                <RestaurantsCard item={item} index={index} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

const HomeScreen = () => {
  const [categoryView, setCategoryView] = useState(false);
  const [searchtxt, setSearchTxt] = useState('');
  const [selectedModal, setSelectedModal] = useState(false);
  const [categoryListData, setCategoryData] = useState([]);
  const [restaurant, setExternalRestaurant] = useState([]);
  const [popularRestaurants, setPopularRestaturants] = useState([]);
  const [locationModel, setLocationModel] = useState(false);
  const [contactModal,setContact]=useState(false)
  const [paymentModel,setPayModel]=useState(false)
  const isFocuse = useIsFocused();
  const dispatch = useDispatch();
  const IconClosePicker = () => {
    setSelectedModal(false);
  };
  const isLoginUser = useSelector(state => state.UserReducer?.login);
  const seladdress = useSelector(state => state.UserReducer.selAddress);

  useEffect(() => {
    dispatch(getAllCategory());
    let obj = {
      id: 0,
      date: moment().format('DD-MM-YYYY'),
      timeSlot: '16:00TO16:30',
      category: '',
      longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
      latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
    };
    dispatch(getAllRestaurants(obj));
    dispatch(getpopularRestaurants());
    dispatch(setCategory(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocuse, selectedModal, seladdress]);

  const categoryData = useSelector(state => state.HomeReducers?.categoryList);
  const ExternalRestaurant = useSelector(
    state => state.HomeReducers.allRestaurants,
  );
  const popularRes = useSelector(
    state => state.HomeReducers?.GetAllExternalRestaurant,
  );
  useEffect(() => {
    setPopularRestaturants(popularRes?.Restaurants);
  }, [popularRes]);
  useEffect(() => {
    setCategoryData(categoryData?.Categories);
  }, [categoryData]);
  useEffect(() => {
    setExternalRestaurant(ExternalRestaurant?.Restaurants);
  }, [ExternalRestaurant]);

  const Food = () => {
    return (
      <>
        <FoodCard
          // item={item}
          index={0}
          onPress={() => {
            setCategoryView(false);
          }}
          styleImage={{width: '95%'}}
        />
        <FlatList
          data={foodData}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <FoodCard
                item={item}
                index={index}
                onPress={() => {
                  setCategoryView(false);
                }}
              />
            );
          }}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header onPressMenu={() => setSelectedModal(true)} />
      <DrawerModal isVisible={selectedModal} close={IconClosePicker} handlePayment={ ()=>{setPayModel(true);setSelectedModal(false)}} handleContact={()=>{setContact(true); setSelectedModal(false)}}  />
      <View style={styles.mainContainer}>
        <View style={[styles.textinputContainer, styles.shadow]}>
          <Icon
            name="search"
            size={scale(23)}
            color={theme.colors.placeholder}
          />
          <TextInput
            value={searchtxt}
            onChangeText={txt => {
              setSearchTxt(txt);
            }}
            placeholder={
              categoryView
                ? 'Cosa ti portiamo?'
                : 'Inserisci il tuo indirizzo completo'
            }
            style={styles.searchbox}
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>
        {isLoginUser && (
          <Button
            onPress={() => {
              setLocationModel(true);
            }}
            title={'Scegli tra i tuoi indirizzi'}
            style={styles.ristroBtn}
            titleStyle={styles.btnText}
          />
        )}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {categoryView && Food()}

          {!categoryView && <Category categoryListData={categoryListData} />}
          <PopularRestaturants ExternalRestaurantData={popularRestaurants} />
          {!categoryView && <Restaturants restaurant={restaurant} />}
        </ScrollView>
      </View>
      <SetLocationModel
        isShow={locationModel}
        close={() => {
          setLocationModel(!locationModel);
        }}
      />
    <PaymentMethod isVisible={paymentModel} close={()=>{setPayModel(false)}}  />
    <ContactModal  isVisible={contactModal} close={()=>setContact(false)} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    paddingHorizontal: scale(12),
  },
  textinputContainer: {
    height: scale(40),
    backgroundColor: theme.colors.white,
    borderWidth: scale(0.5),
    borderRadius: scale(20),

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
  searchbox: {
    fontSize: scale(13),
    color: theme.colors.placeholder,
    marginLeft: scale(10),
    fontWeight: '600',
    width: '100%',
  },
  ristroBtn: {
    width: '65%',
    height: scale(38),
    backgroundColor: theme.colors.purpal,
    marginTop: scale(20),
  },
  btnText: {
    fontSize: scale(14),
    fontWeight: '700',
    color: theme.colors.white,
  },
  scrollView: {
    height: Platform.OS==='android'?'73%':'60%',
  },

  categoryContainer: {
    marginTop: scale(25),
  },
  title: {
    fontSize: scale(16),
    marginVertical: scale(10),
  },
  popularView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: scale(11),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(144, 130, 152, 0.55)',
  },
});
