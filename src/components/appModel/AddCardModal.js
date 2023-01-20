import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {Label, Title} from '../Label';
import Button from '../Button';

const AddCardModal = props => {
  const {isVisible, close} = props;
  const [shouldShow, setShouldShow] = useState(true);
  const [checkbox, setCheckBox] = useState(true);

  const data = [
    {
      id: 1,
      title: 'Can patate al forno',
    },
    {
      id: 2,
      title: 'Can patate al forno',
    },
    {
      id: 3,
      title: 'Can patate al forno',
    },
    {
      id: 4,
      title: 'Can patate al forno',
    },
  ];

  const checkBoxPress = () => {
    setCheckBox(!checkbox);
  };

  return (
    <Modal style={{margin: 0}} visible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={close}>
          <Text style={styles.closeTxt}>X</Text>
        </TouchableOpacity>
        <Title title="Costata" style={styles.title} />
        <Label
          title="180g meat, tomatoes, onion, lettuce, sauce 180g meat, tomatoes, onion, lettuce, sauce"
          style={styles.subTitle}
        />
        <View style={styles.priceDetails}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn}>
              <Icon size={scale(16)} name="minus" color={theme.colors.gray} />
            </TouchableOpacity>
            <Title title="1" />
            <TouchableOpacity style={styles.btn}>
              <Icon size={scale(16)} name="plus" color={theme.colors.gray} />
            </TouchableOpacity>
          </View>
          <Title title="€ 12.00" style={{color: theme.colors.purpal}} />
        </View>
      </View>

      <View
        style={{
          height: theme.SCREENHEIGHT * 0.3,
          marginTop: scale(120),
        }}>
        <TouchableOpacity
          onPress={() => setShouldShow(!shouldShow)}
          style={styles.categoryTitle}>
          <Title title="Come preferisci il prodotto?" />
          {shouldShow ? (
            <Icon
              name="chevron-up"
              size={scale(22)}
              color={theme.colors.gray}
            />
          ) : (
            <Icon
              name="chevron-down"
              size={scale(22)}
              color={theme.colors.gray}
            />
          )}
        </TouchableOpacity>

        {shouldShow ? (
          <>
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.itemView}>
                    <Label title={item.title} style={styles.name} />
                    <Icon
                      onPress={() => checkBoxPress()}
                      name={checkbox ? 'circle' : 'check-circle'}
                      size={scale(22)}
                      color={theme.colors.primary}
                    />
                  </View>
                );
              }}
            />
          </>
        ) : null}
      </View>
      <View style={styles.bottomView}>
        <Button
          title="Aggiungi al carrello"
          style={styles.button}
          titleStyle={styles.btntxt}
        />
        <Title title="€ 12.00" style={styles.price} />
      </View>
    </Modal>
  );
};

export default AddCardModal;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: theme.SCREENHEIGHT * 0.76,
    backgroundColor: theme.colors.white,
    position: 'absolute',
    bottom: 0,
    width: theme.SCREENWIDTH,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    padding: scale(10),
  },
  title: {
    fontSize: scale(16),
    marginVertical: scale(10),
  },
  subTitle: {
    color: theme.colors.gray,
    fontSize: scale(13),
    textAlign: 'center',
    width: theme.SCREENWIDTH * 0.9,
  },
  priceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: scale(10),
  },
  btn: {
    borderWidth: scale(1.5),
    borderColor: theme.colors.gray,
    borderRadius: scale(12),
    width: scale(25),
    padding: scale(3),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: theme.SCREENWIDTH * 0.3,
    justifyContent: 'space-between',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    backgroundColor: theme.colors.gray4,
    marginHorizontal: scale(10),
    borderBottomWidth: 0.4,
    borderColor: theme.colors.gray2,
  },
  name: {
    fontSize: scale(14),
    color: theme.colors.black,
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    marginHorizontal: scale(15),
    marginVertical: scale(10),
  },
  closeBtn: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 18,
  },
  closeTxt: {fontSize: 30, color: theme.colors.black},
  bottomView: {
    backgroundColor: theme.colors.white,
    height: scale(70),
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0.2,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: '100%',
    elevation: scale(4),
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.purpal,
    marginHorizontal: 0,
    width: theme.SCREENWIDTH * 0.55,
    marginTop: scale(10),
  },
  btntxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
});
