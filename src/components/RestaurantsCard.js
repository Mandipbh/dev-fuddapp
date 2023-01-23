import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import {Label, Title} from './Label';
import {scale, theme} from '../utils';

const RestaurantsCard = props => {
  const {item, index} = props;
  console.log('item?.Canvasv >>', item?.Canvas);
  return (
    <View style={styles.itemView} key={index}>
      <TouchableOpacity style={[styles.restaurantView, styles.shadow]}>
        <Image source={{uri: item?.Canvas}} style={styles.categoryIcon} />
      </TouchableOpacity>
      <Title title={item.Name} style={styles.resLabel} />
      <Label title={item?.location} style={styles.location} />
      <View style={styles.row}>
        <LinearGradient
          colors={[theme.colors.purpal1, theme.colors.orange]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: null,
            flexDirection: 'row',
            padding: scale(3),
            paddingHorizontal: scale(3),
            borderRadius: scale(15),
          }}>
          <Icon1 name="thumbs-up" color={theme.colors.white} size={scale(12)} />
          <Text style={styles.review}>{'100%'}</Text>
        </LinearGradient>
        <View style={styles.iconView}>
          <Icon name="hamburger" color={theme.colors.purpal} size={scale(11)} />
        </View>
      </View>
    </View>
  );
};

export default RestaurantsCard;

const styles = StyleSheet.create({
  itemView: {
    marginHorizontal: scale(5),
    // alignItems: 'center',
  },
  restaurantView: {
    backgroundColor: theme.colors.gray3,
    height: theme.SCREENWIDTH * 0.35,
    width: theme.SCREENWIDTH * 0.4,
    borderRadius: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    height: scale(120),
    width: '100%',
    resizeMode: 'contain',
    borderRadius: scale(10),
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
  resLabel: {
    marginTop: scale(7),
    fontSize: scale(13),
  },
  location: {
    fontSize: scale(11),
    color: theme.colors.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  review: {
    fontSize: scale(11),
    marginHorizontal: scale(1),
    color: theme.colors.white,
    fontWeight: '600',
  },
  iconView: {
    padding: scale(4),
    borderWidth: scale(0.5),
    borderRadius: scale(5),
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.gray1,
    marginLeft: scale(10),
  },
});
