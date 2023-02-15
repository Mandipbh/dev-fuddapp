import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {scale, theme} from '../../utils';
import {Title, Label, Error} from '../Label';

const PaymentMethod = props => {
  const {isVisible, close} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {<Title title={'PAGAMENTI'} style={{textAlign: 'center'}} />}
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.subTitleView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Label
                title="Accettiamo pagamenti in contanti.  "
                style={styles.label}
              />
              <Icon
                name="credit-card"
                color={theme.colors.purpal}
                size={scale(20)}
              />
            </View>

            <Label
              title="Accettiamo pagamenti tramite carta di credito con i circuiti:"
              style={[styles.label, {marginTop: scale(10)}]}
            />
            <View style={{marginTop: scale(10)}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon1
                  name="cc-mastercard"
                  color={theme.colors.purpal}
                  size={scale(20)}
                />
                <Label title="MASTERCARD" style={styles.label1} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  name="cc-visa"
                  color={theme.colors.purpal}
                  size={scale(20)}
                />
                <Label title="MASTERCARD" style={styles.label1} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon1
                  name="credit-card"
                  color={theme.colors.purpal}
                  size={scale(20)}
                />
                <Label title="American Express" style={styles.label1} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: scale(10),
                }}>
                <Label
                  title="I pagamenti con carta di credito sono transati tramite il servizio STRIPE "
                  style={[styles.label, {width: '90%'}]}
                />
                <Icon1
                  name="cc-stripe"
                  color={theme.colors.purpal}
                  size={scale(22)}
                />
              </View>
            </View>
          </View>
        </View>
        <BlurView
          style={styles.blurView}
          blurType="dark" // Values = dark, light, xlight .
          blurAmount={2}
          // viewRef={this.state.viewRef}
          reducedTransparencyFallbackColor="white"
        />
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 111,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  label: {color: theme.colors.black, fontSize: scale(14), fontWeight: '500'},
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    // marginTop: -theme.SCREENHEIGHT * 0.01,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  label1: {
    fontSize: scale(14),
    marginLeft: scale(5),
    color: theme.colors.black,
    fontWeight: '600',
  },
  subTitleView: {
    paddingVertical: scale(10),
  },
});

export default PaymentMethod;
