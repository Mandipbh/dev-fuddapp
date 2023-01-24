import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import Button from '../Button';
import InputBox from '../InputBox';
import {Title, Label} from '../Label';

const ChangePassword = props => {
  const {isVisible, close, title, subTitle} = props;
  const [text, setText] = useState('');
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {<Title title={title} style={{textAlign: 'center'}} />}
          </View>
          <View style={styles.divider} />
          <View style={styles.subTitleView}>
            <InputBox
              placeholder="Password attuale"
              style={styles.input}
              editable={false}
              inputStyle={styles.inputInner}
              value={text}
              onChangeText={txt => {
                setText(txt);
              }}
            />
            <InputBox
              placeholder="Nuova password"
              style={styles.input}
              editable={false}
              inputStyle={styles.inputInner}
            />
            <InputBox
              placeholder="Conferma password"
              style={styles.input}
              editable={false}
              inputStyle={styles.inputInner}
            />
            <Button
              title="Salva"
              style={{
                backgroundColor: theme.colors.primary,
                marginTop: scale(15),
              }}
              titleStyle={{color: theme.colors.white, fontWeight: '600'}}
              onPress={close}
            />
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
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    marginTop: theme.SCREENHEIGHT * 0.2,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: scale(8),
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  subTitleView: {
    paddingVertical: scale(10),
  },
  inputInner: {
    paddingHorizontal: 0,
    color: theme.colors.black,
  },
});

export default ChangePassword;
