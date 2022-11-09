import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import {Title, Label} from '../Label';

const AlertModel = props => {
  const {isVisible, close, title, subTitle} = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {<Title title={title} />}
            <Icon name="x" size={scale(22)} onPress={close} />
          </View>
          <View style={styles.divider} />
          <View style={styles.subTitleView}>
            <Label title={subTitle} numberOfLines={3} style={{top: scale(5)}} />
          </View>
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
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.85,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(15),
    zIndex: 111,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(7),
    // paddingHorizontal:scale(10),
    // marginVertical:scale(8)
  },
  divider: {
    width: '112%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  subTitleView: {
    paddingVertical: scale(20),
  },
});

export default AlertModel;
