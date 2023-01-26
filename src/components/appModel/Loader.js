import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
// import {LottieLoader} from 'lottie-loader-react-native';
import LottieView from 'lottie-react-native';
import {scale, theme, loader} from '../../utils';

const Loader = props => {
  const {loading, background} = props;
  return (
    <Modal
      transparent={loading}
      animationType={'none'}
      visible={loading}
      backdropOpacity={0.8}
      onRequestClose={() => {}}>
      <View style={[styles.modalBackground, background]}>
        <View style={styles.activityIndicatorWrapper}>
          <LottieView
            source={loader}
            autoPlay
            loop
            style={{height: scale(250)}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: '#00000020',
    zIndex: 111,
  },
  label: {textAlign: 'center', color: theme.colors.black},
  activityIndicatorWrapper: {
    // backgroundColor: theme.colors.white,
    height: scale(100),
    width: scale(100),
    borderRadius: scale(10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: scale(10),
    zIndex: 111,
  },
  lottie: {width: 100, height: 100, zIndex: 11},
});

export default Loader;
