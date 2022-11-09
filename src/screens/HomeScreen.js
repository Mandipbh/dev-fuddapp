import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../utils';
import {Header, Button, Label, Title, RestaurantsCard} from '../components';
import {foodCategory, popularRestaurants} from '../utils/MockData';

const Category = () => {
  return (
    <View style={styles.categoryContainer}>
      <Title title="Categories" style={styles.title} />
      <ScrollView
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {foodCategory?.map((item, index) => {
          return (
            <View style={styles.itemView} key={index}>
              <TouchableOpacity style={[styles.categoryView, styles.shadow]}>
                <Image source={{uri: item.image}} style={styles.categoryIcon} />
              </TouchableOpacity>
              <Label title={item.name} style={styles.categoryLabel} />
            </View>
          );
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
        contentContainerStyle={{paddingVertical: scale(5)}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {popularRestaurants.reverse()?.map((item, index) => {
          return <RestaurantsCard item={item} index={index} />;
        })}
      </ScrollView>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.mainContainer}>
        <View style={[styles.textinputContainer, styles.shadow]}>
          <Icon
            name="search"
            size={scale(23)}
            color={theme.colors.placeholder}
          />
          <TextInput
            placeholder="Inserisci il tuo indirizzo completo"
            style={styles.searchbox}
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>
        <Button
          title="Trova ristoranti"
          style={styles.ristroBtn}
          titleStyle={styles.btnText}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {Category()}
          {PopularRestaturants()}
          {Restaturants()}
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
  },
  ristroBtn: {
    width: '65%',
    height: scale(38),
    backgroundColor: theme.colors.purpal,
    marginVertical: scale(15),
  },
  btnText: {
    fontSize: scale(14),
    fontWeight: '700',
    color: theme.colors.white,
  },
  scrollView: {
    height: '67%',
  },
  scrollViewContainer: {
    // paddingBottom:Platform.OS=='ios'? scale(30),
  },
  categoryContainer: {
    marginTop: scale(25),
  },
  itemView: {
    marginHorizontal: scale(5),
    alignItems: 'center',
  },
  categoryView: {
    backgroundColor: theme.colors.white,
    height: scale(60),
    width: scale(60),
    borderRadius: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    height: scale(40),
    width: scale(40),
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: scale(12),
    marginTop: scale(4),
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
});
