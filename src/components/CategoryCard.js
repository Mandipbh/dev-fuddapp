import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import {Label} from './Label';
import {APP_BASE_URL} from '../utils/ApiService';

const CategoryCard = props => {
  const {item, index} = props;
  return (
    <View style={styles.itemView} key={index}>
      <TouchableOpacity style={[styles.categoryView, styles.shadow]}>
        <Image
          source={{uri: APP_BASE_URL + item?.ImgFullPath}}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>
      <Label title={item?.Nome} style={styles.categoryLabel} />
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
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
    overflow: 'hidden',
  },
  categoryIcon: {
    height: scale(55),
    width: scale(55),
    resizeMode: 'cover',
  },
  categoryLabel: {
    fontSize: scale(12),
    marginTop: scale(4),
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
