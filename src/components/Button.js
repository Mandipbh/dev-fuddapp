import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {scale, theme} from '../utils';
import {Label} from './index';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
const Button = props => {
  const {onPress, style, title, titleStyle, Icon, ButtonIcon} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttoncontainer, styles.shadow, style]}>
      {Icon && (
        <ICON
          name={Icon}
          size={scale(22)}
          color={theme.colors.white}
          style={{left: scale(-4)}}
        />
      )}
      {ButtonIcon && (
        <Icon1
          name={ButtonIcon}
          size={scale(22)}
          color={theme.colors.white}
          style={{left: scale(-4)}}
        />
      )}
      <Text style={[styles.buttontxt, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttoncontainer: {
    justifyContent: 'center',
    marginHorizontal: scale(35),
    backgroundColor: theme.colors.white,
    width: theme.SCREENWIDTH - scale(70),
    alignSelf: 'center',
    borderRadius: scale(18),
    alignItems: 'center',
    marginBottom: scale(13),
    flexDirection: 'row',
    height: theme.SCREENHEIGHT * 0.055,
  },
  buttonImage: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    left: scale(-10),
    alignSelf: 'center',
  },
  buttontxt: {
    fontSize: scale(13),
    color: theme.colors.black,
    // fontFamily: theme.fonts.muktaSemiBold,
  },
  title: {color: theme.colors.blue, textAlign: 'center'},
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default Button;
