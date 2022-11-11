import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import {Label, Title} from './Label';
import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/Entypo';
const Restaurant = props => {
  const {item, index, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardView} key={index}>
      <Image
        source={{
          uri: 'https://t3.ftcdn.net/jpg/03/42/82/20/240_F_342822084_Sz4Hsw2STInarbm1eIVzNpvD2bFApzC8.jpg',
        }}
        style={styles.Icon}
      />
      <ImageBackground
        source={{
          uri: 'https://as1.ftcdn.net/v2/jpg/02/97/67/70/1000_F_297677001_zX7ZzRq8DObUV5IWTHAIhAae6DuiEQh4.jpg',
        }}
        style={styles.backImage}
        imageStyle={styles.image}>
        <View style={styles.statusView}>
          <TouchableOpacity style={styles.btn}>
            <Label title="Aperto" style={styles.lbl} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Label title="21 minuti" style={styles.lbl} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.bttomCon}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Title title={item.name} style={styles.title} />
          <LinearGradient
            colors={[theme.colors.purpal1, theme.colors.orange]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: null,
              flexDirection: 'row',
              padding: scale(5),
              borderRadius: scale(15),
            }}>
            <Icon1
              name="thumbs-up"
              color={theme.colors.white}
              size={scale(12)}
            />
            <Text style={styles.review}>{'100%'}</Text>
          </LinearGradient>
          <View style={styles.km}>
            <Text style={styles.review}>{'1.2 km'}</Text>
          </View>
        </View>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', marginTop: scale(8)},
          ]}>
          <Label title="Speciltia Carne, Hamburguer" style={styles.details} />
          <Label title="Orddine minimo 15€" style={styles.details} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    // height: theme.SCREENHEIGHT * 0.18,
    backgroundColor: theme.colors.white,
    marginVertical: scale(20),
    borderRadius: scale(10),
    // overflow: 'hidden',
    paddingBottom: scale(5),
  },
  backImage: {
    height: theme.SCREENHEIGHT * 0.15,
    width: '100%',
    resizeMode: 'contain',
  },

  image: {
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  Icon: {
    height: scale(50),
    width: scale(50),
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 11,
    top: scale(-17),
    borderRadius: scale(10),
  },
  btn: {
    padding: scale(5),
    paddingHorizontal: scale(10),
    backgroundColor: theme.colors.white,
    borderRadius: scale(5),
  },
  lbl: {
    color: theme.colors.green,
    fontSize: scale(11),
    fontWeight: '600',
  },
  statusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: scale(10),
  },
  title: {
    fontSize: scale(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    review: {
      fontSize: scale(11),
      marginHorizontal: scale(5),
      color: theme.colors.white,
      fontWeight: '600',
    },
  km: {
    padding: scale(4),
    borderRadius: scale(10),
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.purpal,
    marginLeft: scale(5),
  },
  bttomCon: {
    padding: scale(10),
  },
  details: {
    fontSize: scale(11),
    color: theme.colors.lightblue1,
  },
});
