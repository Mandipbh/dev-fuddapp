import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import {Label, Title} from './Label';
import {scale, theme} from '../utils';
import {APP_BASE_URL} from '../utils/ApiService';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';

const RestaurantsCard = props => {
  const {item, index, Popular} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.itemView} key={index}>
      <TouchableOpacity
        style={[styles.restaurantView, styles.shadow]}
        onPress={() => {
          Popular
            ? navigation.navigate('RISTORANTI', {
                screen: 'Details',
                params: {item: item},
              })
            : // navigation.navigate('RISTORANTI', {category: item})
              // navigation.navigate('RISTORANTI', {
              //   screen: 'Details',
              //   params: {item: item},
              // })
              Linking.openURL(item?.ExternalUrl);
        }}>
        <FastImage
          source={{uri: Popular ? APP_BASE_URL + item?.Canvas : item?.Canvas}}
          style={styles.categoryIcon}
        />
      </TouchableOpacity>
      <Title title={item.Name} style={styles.resLabel} numberOfLines={1} />
      <Label title={item?.Tags} style={styles.location} numberOfLines={1} />
      {Popular && (
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <LinearGradient
            colors={[theme.colors.purpal1, theme.colors.orange]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.linBtn}>
            <Icon1
              name="thumbs-up"
              color={theme.colors.white}
              size={scale(12)}
            />
            <Text style={styles.review}>{`${item?.Percentage} %`}</Text>
          </LinearGradient>
          {Popular && (
            <View style={styles.iconView}>
              <FastImage
                source={{
                  uri:
                    Popular !== undefined || Popular !== null
                      ? APP_BASE_URL + item?.CategoryTagIcons[0]
                      : '',
                }}
                style={styles.categoryIconImg}
              />
              {/* <Icon name="hamburger" color={theme.colors.purpal} size={scale(11)} /> */}
            </View>
          )}
        </View>
      )}
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
    height: scale(130),
    width: '100%',
    resizeMode: 'cover',
    borderRadius: scale(10),
  },
  categoryIconImg: {
    height: scale(20),
    width: scale(20),
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
    width: theme.SCREENWIDTH * 0.4,
  },
  location: {
    fontSize: scale(11),
    color: theme.colors.gray,
    width: scale(120),
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
    fontFamily: theme.fonts.josefinSans,
  },
  iconView: {
    padding: scale(2),
    // borderWidth: scale(0.5),
    borderRadius: scale(5),
    // borderColor: theme.colors.gray,
    backgroundColor: theme.colors.category,
    // marginLeft: scale(10),
    marginHorizontal: scale(15),
  },
  linBtn: {
    width: null,
    flexDirection: 'row',
    padding: scale(3),
    paddingHorizontal: scale(3),
    borderRadius: scale(15),
  },
});
