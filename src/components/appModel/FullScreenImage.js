import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';

const FullScreenImage = props => {
  const {isVisible, close, image} = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={close}>
      <View style={styles.modalBackground}>
        <Icon
          name="x"
          onPress={close}
          size={scale(30)}
          color={theme.colors.white}
          style={styles.close}
        />
        <View style={styles.activityIndicatorWrapper}>
          <FastImage
            source={{
              uri: image,
            }}
            style={styles.foodImg}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000050',
    zIndex: 111,
    width: '100%',
  },
  label: {textAlign: 'center', color: theme.colors.black},
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    width: theme.SCREENWIDTH * 0.98,
    borderRadius: scale(15),
    padding: scale(10),
    zIndex: 111,
    alignSelf: 'center',
  },
  foodImg: {
    height: theme.SCREENHEIGHT * 0.4,
    width: '100%',
    resizeMode: 'contain',
  },
  close: {alignSelf: 'flex-end', marginRight: scale(20)},
});

export default FullScreenImage;
