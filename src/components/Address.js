import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import {Label} from './Label';
import {dummyAddress} from '../utils/MockData';

const Address = () => {
  return (
    <View>
      <ScrollView
        style={{maxHeight: theme.SCREENHEIGHT * 0.4}}
        showsVerticalScrollIndicator={false}>
        {dummyAddress.map((item, index) => {
          console.log('length >> ', index);
          console.log('dummyAddress length >> ', dummyAddress.length);
          return (
            <View
              key={index}
              style={[
                styles.addressCard,
                {
                  borderBottomColor:
                    dummyAddress.length === index + 1
                      ? theme.colors.white
                      : theme.colors.gray,
                },
              ]}>
              <View style={styles.nameCon}>
                <Label title={item.name} />
                <TouchableOpacity style={styles.btn}>
                  <Label title="Modifica" style={styles.lbl} />
                </TouchableOpacity>
              </View>
              <Label title={item.address} style={styles.addresstxt} />
              <Label title={item.email} style={styles.email} />
              <Label title={item.phone} style={styles.phone} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  addressCard: {
    paddingBottom: scale(5),
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: scale(0.7),
    marginVertical: scale(5),
  },
  addresstxt: {
    fontSize: scale(12),
    marginTop: scale(10),
  },
  email: {
    fontSize: scale(10),
  },
  phone: {
    fontSize: scale(10),
  },
  btn: {
    padding: scale(5),
    paddingHorizontal: scale(10),
    borderWidth: scale(0.9),
    borderColor: theme.colors.gray2,
    borderRadius: scale(13),
  },
  nameCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lbl: {
    fontSize: scale(11),
    color: theme.colors.gray,
  },
});
