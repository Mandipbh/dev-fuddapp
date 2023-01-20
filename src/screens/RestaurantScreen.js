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
import {scale, theme} from '../utils';
import {Label, Restaurant, Title} from '../components';
import {RestaurantsData} from '../utils/MockData';
import {useNavigation} from '@react-navigation/native';
import SliderModal from '../components/appModel/SliderModal';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const [selectedModal, setSelectedModal] = useState(false);
  const IconClosePicker = () => {
    setSelectedModal(false);
  };
  const renderList = ({item, index}) => {
    return (
      <Restaurant
        item={item}
        index={index}
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
    );
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
          <SliderModal isVisible={selectedModal} close={IconClosePicker} />
        </View>
        <View style={styles.fillterView}>
          <TouchableOpacity style={styles.btn}>
            <Icon name="clock" size={scale(15)} color={theme.colors.gray2} />
            <Label title="Orario consega" style={styles.lbl} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Icon name="map-pin" size={scale(15)} color={theme.colors.gray2} />
            <Label title="Orario consega" style={styles.lbl} />
          </TouchableOpacity>
        </View>
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
          />
        </View>
        <FlatList
          style={{height: '70%'}}
          data={RestaurantsData}
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
