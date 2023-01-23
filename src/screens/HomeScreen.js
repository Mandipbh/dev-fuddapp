import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
} from '../components';
import {foodCategory, foodData, popularRestaurants} from '../utils/MockData';
import LinearGradient from 'react-native-linear-gradient';
import DrawerModal from '../components/appModel/DrawerModal';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getAllCategory} from '../redux/Actions/HomeAction';

const Category = () => {
  return (
    <View style={styles.categoryContainer}>
      <Title title="Categories" style={styles.title} />
      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {foodCategory?.map((item, index) => {
          return <CategoryCard item={item} index={index} />;
        })}
      </ScrollView>
    </View>
  );
};

const PopularRestaturants = () => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.popularView}>
        <Title title="Popular Restaurants" style={styles.title} />
        <Label title="SEE ALL" style={styles.seeAll} />
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {popularRestaurants?.map((item, index) => {
          return <RestaurantsCard item={item} index={index} />;
        })}
      </ScrollView>
    </View>
  );
};

const Restaturants = () => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.popularView}>
        <Title title="Restaurants" style={styles.title} />
        <Label title="SEE ALL" style={styles.seeAll} />
      </View>

      <ScrollView
        contentContainerStyle={{paddingVertical: scale(15)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {popularRestaurants.reverse()?.map((item, index) => {
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
  const dispatch = useDispatch();
  const IconClosePicker = () => {
    setSelectedModal(false);
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
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
      <DrawerModal isVisible={selectedModal} close={IconClosePicker} />
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
        {!categoryView ? (
          <Button
            onPress={() => {
              setCategoryView(true);
            }}
            title={'Trova ristoranti'}
            style={styles.ristroBtn}
            titleStyle={styles.btnText}
          />
        ) : (
          <View style={{marginVertical: scale(20)}} />
        )}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {categoryView && Food()}

          {!categoryView && Category()}
          {PopularRestaturants()}
          {!categoryView && Restaturants()}
        </ScrollView>
      </View>
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
    height: '67%',
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
