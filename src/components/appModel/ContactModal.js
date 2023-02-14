import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, View,  ActivityIndicator, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {scale, theme} from '../../utils';
import ApiService, {API} from '../../utils/ApiService';
import Button from '../Button';
import InputBox from '../InputBox';
import {Title, Label, Error} from '../Label';

const ContactModal = props => {
  const {isVisible, close, title, subTitle} = props;
  const user = useSelector(state => state.UserReducer?.userDetails);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {
              <Title
                title={'Informazioni di contatto'}
                style={{textAlign: 'center'}}
              />
            }
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
            <Label
              title={user?.UserInfo?.RagSoc}
              style={[styles.label, {marginTop: scale(10)}]}
            />
            <View style={{marginTop: scale(10)}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="phone"
                  color={theme.colors.gray}
                  size={scale(20)}
                />
                  <Label title={user?.UserInfo?.Telefono1} style={[styles.label,{marginLeft:scale(5)}]} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center',marginTop:scale(10)}}>
                <Icon
                  name="mail"
                  color={theme.colors.gray}
                  size={scale(20)}
                />
                  <Label title={user?.UserInfo?.EMail} style={[styles.label,{marginLeft:scale(5)}]} />
              </View>
            </View>
          </View>
        </View>
        <BlurView
        style={styles.blurView}
        blurType="light"  // Values = dark, light, xlight .
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
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 111,
      },
      label: {color: theme.colors.black,fontSize:scale(14),fontWeight:'500'},
      activityIndicatorWrapper: {
        backgroundColor: theme.colors.white,
        // height: theme.SCREENHEIGHT * 0.2,
        width: theme.SCREENWIDTH * 0.92,
        borderRadius: scale(10),
        // paddingVertical:scale(20),
        padding: scale(10),
        zIndex: 111,
        marginTop: -theme.SCREENHEIGHT * 0.01,
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
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ContactModal;
