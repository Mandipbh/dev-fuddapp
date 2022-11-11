import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {images, scale, theme} from '../utils';

const Header = props => {
  const {onPressUser, onPressMenu} = props;
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconView} onPress={onPressMenu}>
        <Icon name="menu" size={scale(22)} color={theme.colors.white} />
      </TouchableOpacity>
      <Image source={images.appIcon} style={styles.logo} />
      <TouchableOpacity style={styles.iconView} onPress={onPressUser}>
        <Icon name="user" size={scale(22)} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(12),
  },
  logo: {
    resizeMode: 'contain',
    height: scale(65),
    width: theme.SCREENWIDTH / 2,
    marginVertical: scale(10),
  },
  iconView: {
    backgroundColor: theme.colors.purpal,
    padding: scale(8),
    borderRadius: scale(50),
  },
});
