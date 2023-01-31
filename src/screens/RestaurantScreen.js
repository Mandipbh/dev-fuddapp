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

  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      id: 0,
      date: '01-12-2022',
      timeSlot: '16:00TO16:30',
      category: '',
      latitute: '',
      longitude: '',
    };
    //  {
    //   date: moment(date).format('DD-MM-YYYY'),
    //   timeSlot: `${moment(new Date()).format('HH:mm')}-${moment(new Date())
    //     .add(30, 'minute')
    //     .format('HH:mm')}`, //'16:00TO16:30',
    //   category: selCategory,
    //   latitute: '',
    //   longitude: '',
    // };
    dispatch(getpopularRestaurants(data));
    dispatch(getAllCategory());
    setTimeSlot(
      `${moment(new Date()).format('HH:mm')} ${moment(new Date())
        .add(30, 'minute')
        .format('HH:mm')}`,
    );
  }, [isFocuse, selCategory, timeSloat, date]);

  const categoryData = useSelector(state => state.HomeReducers?.categoryList);
  const restaurantData = useSelector(
    state => state.RestaurantReducers?.restaurantList,
  );
  // const loadding = useSelector(state => state.RestaurantReducers.loadding);
  useEffect(() => {
    setRestaurantsData(restaurantData?.Restaurants);
  }, [restaurantData]);
  const IconClosePicker = data => {
    setSelCategory(data?.Nome);
    setSelectedModal(false);
  };
  const handleTimer = time => {
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
          console.log('itemitemitem>>>> ', item);
          navigation.navigate('Details');
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
            console.log(data, details);
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
      {<Loader loading={false} />}
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
});
