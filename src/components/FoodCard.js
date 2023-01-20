import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {scale, theme} from '../utils';
import {Title} from './Label';

const FoodCard = props => {
  const {item, index, onPress, styleImage} = props;
  return (
    <TouchableOpacity
      style={{height: scale(110)}}
      key={index}
      onPress={onPress}>
      <ImageBackground
        style={[styles.image, styleImage]}
        imageStyle={{
          borderRadius: scale(25),
          width: '100%',
          resizeMode: 'cover',
          height: scale(100),
        }}
        source={{
          uri: 'https://img.freepik.com/free-photo/top-view-indian-food-with-copy-space_23-2148747659.jpg?size=626&ext=jpg&ga=GA1.2.1181264738.1665484240&semt=sph',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[theme.colors.white, theme.colors.purpal]}
          style={styles.gradient}></LinearGradient>
        <Title
          title={item?.title ? item?.title : 'FOOD'}
          style={styles.title}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  image: {
    height: theme.SCREENHEIGHT * 0.18,
    width: theme.SCREENWIDTH * 0.43,
    margin: scale(5),
    overflow: 'hidden',
  },
  gradient: {
    height: '74%',
    width: '100%',
    opacity: 0.6,
    borderRadius: scale(25),
  },
  title: {
    color: theme.colors.white,
    alignSelf: 'center',
    bottom: theme.SCREENHEIGHT * 0.08,
    fontSize: scale(18),
    fontWeight: '800',
  },
});
