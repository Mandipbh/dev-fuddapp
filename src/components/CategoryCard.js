import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import {Label} from './Label';
import {APP_BASE_URL} from '../utils/ApiService';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '../redux/Actions/RestaurantAction';

const CategoryCard = props => {
  const {item, index} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.itemView}>
        <TouchableOpacity
          style={[styles.categoryView, styles.shadow]}
          onPress={() => {
            dispatch(setCategory(item));
            navigation.navigate('RISTORANTI');
          }}>
          <FastImage
            source={{uri: APP_BASE_URL + item?.ImgFullPath}}
            style={styles.categoryIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <Label
          title={item?.Nome}
          style={styles.categoryLabel}
          numberOfLines={2}
        />
      </View>
    </>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  itemView: {
    marginHorizontal: scale(6),
    alignItems: 'center',
    maxWidth: scale(60),
  },
  categoryView: {
    backgroundColor: theme.colors.white,
    height: scale(60),
    width: scale(60),
    borderRadius: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'hidden',
  },
  categoryIcon: {
    height: scale(40),
    width: scale(40),
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: scale(11),
    marginTop: scale(4),
    // maxWidth: '50%',
    // textAlign: 'center',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
