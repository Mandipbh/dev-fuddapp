/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-date-picker';
import {scale, theme} from '../utils';
import {Label, Loader, Restaurant, TimePickerModel, Title} from '../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import SliderModal from '../components/appModel/SliderModal';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getAllCategory} from '../redux/Actions/HomeAction';
import moment from 'moment';
import {getpopularRestaurants} from '../redux/Actions/RestaurantAction';
import ApiService, {API} from '../utils/ApiService';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const isFocuse = useIsFocused();
  const [selectedModal, setSelectedModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [timeModel, setTimeModel] = useState(false);
  const [timeSloat, setTimeSlot] = useState(null);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [selCategory, setSelCategory] = useState('');
  const [search, setSearch] = useState();
  const [loadding, setLoadding] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const [pModel, setPmodel] = useState(false);
  const dispatch = useDispatch();
  const seladdress = useSelector(state => state.UserReducer.selAddress);
  const [load, setLoad] = useState(false);
  const cartData = useSelector(state => state?.CartReducer.cartData);

  const selectedCat = useSelector(
    state => state?.RestaurantReducers?.selCategory,
  );
  useEffect(() => {
    if (selectedCat !== null) {
      setSelCategory(selectedCat?.Nome);
    }
    const now = `${moment(new Date()).format('HH:mm')}`;
    console.log('now >>', now); //18:33   19:03

    const times = now.split(':');
    let splitedHour = times[0];
    let splitedMin = times[1];
    let newHOur = 0;
    let newMin = '00';
    let newoundedTime = '';
    let newtimeSlot = '';

    if (splitedMin >= 15 && splitedMin <= 30) {
      newHOur = parseInt(splitedHour, 10);
      newMin = '30'; //19:00
    } else if (splitedMin > 30 && splitedMin <= 45) {
      newHOur = parseInt(splitedHour, 10);
      newMin = '30';
    } else if (splitedMin > 45) {
      newHOur = parseInt(splitedHour, 10) + 1;
      newMin = '00';
    } else {
      newHOur = parseInt(splitedHour, 10);
      newMin = '00'; //18:00
    }

    newoundedTime = newHOur.toString().concat(':', newMin.toString());
    console.log('newoundedTime', newoundedTime);

    let newEndHour = 0;
    let newEndMin = '00';
    let newEndoundTime = '';

    console.log('splitedHour', splitedHour);
    console.log('newHOur', newHOur);

    if (parseInt(splitedHour) !== parseInt(newHOur)) {
      newEndMin = '30';
      newEndHour = parseInt(newHOur, 10);
    } else {
      if (parseInt(newMin) === 30) {
        newEndMin = '00';
        newEndHour = parseInt(newHOur, 10) + 1;
      } else {
        newEndMin = '30';
        newEndHour = parseInt(newHOur, 10);
      }
    }

    newEndoundTime = newEndHour.toString().concat(':', newEndMin.toString());
    newtimeSlot = newoundedTime
      .toString()
      .concat('TO', newEndoundTime.toString());

    console.log('newtimeSlot', newtimeSlot);

    // setTimeSlot(
    //   `${moment(new Date()).format('HH:mm')} ${moment(new Date())
    //     .add(30, 'minute')
    //     .format('HH:mm')}`,
    // );

    setTimeSlot(newtimeSlot);
  }, [isFocuse]);
  useEffect(() => {
    setLoadding(true);

    const data =
      // {
      //   id: 0,
      //   date: '01-12-2022',
      //   timeSlot: '16:00TO16:30',
      //   category: '',
      //   latitute: '',
      //   longitude: '',
      // };

      {
        date: moment(date).format('DD-MM-YYYY'),
        timeSlot: timeSloat, //'16:00TO16:30',
        category: selCategory,
        latitute: seladdress?.Lat === undefined ? '' : seladdress?.Lat,
        longitude: seladdress?.Lon === undefined ? '' : seladdress?.Lon,
      };
    console.log('Payload of ??? ', data);
    dispatch(getpopularRestaurants(data));
    dispatch(getAllCategory());
  }, [isFocuse, selCategory, timeSloat, date]);

  const categoryData = useSelector(state => state.HomeReducers?.categoryList);
  const restaurantData = useSelector(
    state => state.RestaurantReducers?.restaurantList,
  );
  // const loadding = useSelector(state => state.RestaurantReducers.loadding);

  useEffect(() => {
    setRestaurantsData(restaurantData?.Restaurants);
    setLoadding(false);
  }, [restaurantData]);
  const IconClosePicker = data => {
    if (data !== undefined) {
      setSelCategory(data?.Nome);
      setSelectedModal(false);
    }
  };

  const handleTimer = time => {
    console.log('time slo >> .', time);
    setTimeModel(!timeModel);
    if (time !== null) {
      const timeslot = time.replace(' ', 'TO');
      setTimeSlot(timeslot);
    }
  };

  const renderList = ({item, index}) => {
    return (
      <Restaurant
        item={item}
        index={index}
        onPress={() => {
          navigation.navigate('Details', {
            item: item,
            restaurantsData: restaurantsData,
          });
        }}
      />
    );
  };

  const handleSearch = text => {
    if (text) {
      const newData = restaurantData?.Restaurants.filter(function (item) {
        const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRestaurantsData(newData);
      setSearch(text);
    } else {
      setRestaurantsData(restaurantData?.Restaurants);
      setSearch(text);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          <Icon
            name="chevron-left"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <Title title="Ristoranti" style={styles.title} />
          <Icon
            onPress={() => setSelectedModal(true)}
            name="sliders"
            size={scale(22)}
            color={theme.colors.black}
          />
        </View>

        <View style={styles.fillterView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setTimeModel(!timeModel);
            }}>
            <Icon name="clock" size={scale(15)} color={theme.colors.gray2} />
            <Label title={timeSloat} style={styles.lbl} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setOpen(!open);
            }}>
            <Icon name="calendar" size={scale(15)} color={theme.colors.gray2} />
            <Label
              title={moment(date).format('DD-MM-YYYY')}
              style={styles.lbl}
            />
          </TouchableOpacity>
        </View>
        {/* <GooglePlacesAutocomplete
          placeholder="Inserisci indirizzo"
          onPress={(data, details = null) => {
          }}
          query={{
            key: 'AIzaSyDxUeU36VnWRBXAok6txlBCV2rq9UhHWT4',
            language: 'en',
          }}
        /> */}
        <View style={[styles.textinputContainer, styles.shadow]}>
          <Icon
            name="search"
            size={scale(23)}
            color={theme.colors.placeholder}
          />
          <TextInput
            placeholder="Piatti, ristoranti o tipi di cucina"
            style={styles.searchbox}
            placeholderTextColor={theme.colors.placeholder}
            value={search}
            onChangeText={txt => {
              handleSearch(txt);
            }}
          />
        </View>

        <FlatList
          style={{height: '70%'}}
          data={restaurantsData}
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              restaurantsData?.length === 0 && (
                <View style={styles.noDataCon}>
                  <Title title="Nessun ristorante" />
                </View>
              )
            );
          }}
        />
      </View>
      <SliderModal
        data={categoryData?.Categories}
        isVisible={selectedModal}
        close={IconClosePicker}
      />
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TimePickerModel isVisible={timeModel} close={handleTimer} />
      {Platform.OS !== 'ios' && loadding && <Loader loading={loadding} />}
    </SafeAreaView>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    paddingHorizontal: scale(12),
    paddingTop: Platform.OS === 'ios' ? 0 : scale(10),
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(3),
  },
  title: {
    fontSize: scale(22),
  },
  fillterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(20),
  },
  btn: {
    width: theme.SCREENWIDTH * 0.45,
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: theme.colors.purpal1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: scale(9),
  },
  lbl: {
    fontSize: scale(11),
    color: theme.colors.gray,
  },
  textinputContainer: {
    height: scale(45),
    backgroundColor: theme.colors.white,
    borderRadius: scale(20),

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    marginVertical: scale(15),
    shadowColor: theme.colors.purpal1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: scale(9),
  },
  searchbox: {
    fontSize: scale(13),
    color: theme.colors.placeholder,
    marginLeft: scale(10),
    fontWeight: '600',
    width: '100%',
  },
  noDataCon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: theme.SCREENHEIGHT / 2,
  },
});
