import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { images, scale, theme } from '../utils';
import InputBox from './InputBox';
import { Label } from './Label';
import ChangePassword from './appModel/ChangePassword';

const MyAccountInfo = ({ user }) => {
  const [passwordModel, setModel] = useState(false);
  return (
    <View>
      <ScrollView
        style={{
          height: theme.SCREENHEIGHT * 0.6,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputView}>
          <Label title="NOME COMPLETO" style={styles.inputTitle} />
          <InputBox
            placeholder={user?.UserName ? user?.UserName : 'Davide Barba'}
            style={styles.input}
            editable={false}
            inputStyle={styles.inputInner}
          />
        </View>
        <View style={styles.inputView}>
          <Label title="E-MAIL" style={styles.inputTitle} />
          <InputBox
            placeholder={
              user?.UserInfo?.EMail ? user?.UserInfo?.EMail : 'email'
            }
            style={styles.input}
            editable={false}
            inputStyle={styles.inputInner}
          />
        </View>
        <View style={styles.inputView}>
          <Label title="TELEFONO" style={styles.inputTitle} />
          <InputBox
            placeholder={
              user?.UserInfo?.Telefono1
                ? user?.UserInfo?.Telefono1
                : '0123456789'
            }
            style={styles.input}
            editable={false}
            inputStyle={styles.inputInner}
          />
        </View>
        <TouchableOpacity
          style={[styles.inputView, { width: '100%' }]}
          onPress={() => {
            setModel(!passwordModel);
          }}>
          <Label title="PAROLA D'ORDINE" style={styles.inputTitle} />
          <InputBox
            placeholder="**********"
            style={styles.input}
            editable={false}
            inputStyle={styles.inputInner}
            onTouchStart={() => {
              setModel(!passwordModel);
            }}
          />
        </TouchableOpacity>
      </ScrollView>
      <ChangePassword
        title="Cambia Password"
        isVisible={passwordModel}
        close={() => {
          setModel(!passwordModel);
        }}
      />
    </View>
  );
};

export default MyAccountInfo;

const styles = StyleSheet.create({
  mainCard: {
    borderBottomWidth: scale(0.8),
    borderColor: theme.colors.gray,
    marginVertical: scale(10),
  },
  inputView: {
    width: '100%',
    // backgroundColor: 'lime',
    // marginLeft: 0,
    marginVertical: scale(8),
  },
  input: { marginBottom: scale(3), width: '100%', alignSelf: 'center' },
  inputTitle: {
    fontSize: scale(11),
    color: theme.colors.gray,
    top: scale(5),
  },
  prodTitle: {
    fontSize: scale(14),
    color: theme.colors.black,
  },
  pd: {
    fontSize: scale(12),
    marginBottom: scale(4),
    color: theme.colors.gray2,
  },
  btn: {
    width: scale(60),
    borderWidth: scale(1),
    borderColor: theme.colors.red,
    borderRadius: scale(10),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    textAlign: 'center',
    color: theme.colors.red,
    fontSize: scale(11),
  },
  detailsView: {
    borderTopWidth: scale(0.8),
    borderBottomWidth: scale(0.5),
    marginVertical: scale(3),
    borderColor: theme.colors.gray1,
    paddingVertical: scale(5),
    width: '65%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: scale(12),
    color: theme.colors.black,
  },
  inputInner: {
    paddingHorizontal: scale(0),
  },
});
