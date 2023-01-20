import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, scale, theme} from '../utils';
import {Button, InputBox, Label, Title} from '../components';
import {useNavigation} from '@react-navigation/native';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [process, setProcesss] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Icon
          name="chevron-left"
          size={scale(28)}
          color={theme.colors.black}
          onPress={() => {
            navigation.replace('Tab');
          }}
        />
        <Title title="Check Out" style={styles.title} />
      </View>
      {process ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
            // flex: 2,
          }}>
          <Image source={images.check} style={styles.checkImg} />
          <Title title="Ordine Completato!" style={styles.ordin} />
        </View>
      ) : (
        <>
          <View style={styles.mainContainer}>
            <View
              style={[
                styles.productView,
                styles.row,
                {justifyContent: 'space-between', marginTop: scale(40)},
              ]}>
              <View>
                <Title title="Orario di consegna" />
                <Label
                  title="Prima possibile"
                  style={{marginTop: scale(5), fontSize: scale(12)}}
                />
              </View>
              <TouchableOpacity style={styles.btn}>
                <Label title="Cambia" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.productView,
                styles.row,
                {justifyContent: 'space-between'},
              ]}>
              <View style={{width: '80%'}}>
                <Title title="Indirizzo di consegna" />
                <Label
                  title="Nome Cognome"
                  style={{color: theme.colors.gray}}
                />
                <Label
                  title="Via Resuttana, 352/b, 90146 Palermo PA, Italia
              3803366254"
                  style={{
                    marginTop: scale(5),
                    fontSize: scale(12),
                    width: '100%',
                  }}
                />
              </View>
              <TouchableOpacity style={[styles.btn, {width: '20%'}]}>
                <Label title="Cambia" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.productView,
                styles.row,
                {justifyContent: 'space-between'},
              ]}>
              <View>
                <Title title="Note per il ristorante" />
                <Label
                  title="Carta di credito"
                  style={{color: theme.colors.gray}}
                />
                <Label
                  title="Mastercard - 6293 23******* 7563"
                  style={{
                    marginTop: scale(5),
                    fontSize: scale(12),
                    width: '100%',
                  }}
                />
              </View>
              <TouchableOpacity style={styles.btn}>
                <Label title="Cambia" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.productView,
                styles.row,
                {justifyContent: 'space-between'},
              ]}>
              <View>
                <Title title="Note per il ristorante" />
                <InputBox
                  multiline={true}
                  style={styles.inputBox}
                  placeholder="Note"
                  inputStyle={{fontSize: scale(12), marginLeft: -10}}
                />
              </View>
            </View>
          </View>
          <Button
            title="Invia ordine"
            style={styles.submitBtn}
            titleStyle={styles.btnTxt}
            onPress={() => {
              setProcesss(!process);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  mainContainer: {
    paddingHorizontal: scale(12),
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    bottom: theme.SCREENHEIGHT * -0.08,
  },
  btnTxt: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  headerView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingHorizontal: scale(3),
    paddingVertical: scale(10),
  },
  inputBox: {
    marginHorizontal: 0,
    borderBottomWidth: 0,
    width: '80%',
    borderColor: 'transprent',
  },
  title: {
    fontSize: scale(22),
    marginLeft: theme.SCREENWIDTH * 0.25,
  },
  ordin: {
    fontSize: scale(25),
    textAlign: 'center',
    marginTop: theme.SCREENHEIGHT * 0.05,
    width: scale(150),
  },
  SubView: {
    margin: scale(20),
  },
  PriceView: {
    marginHorizontal: scale(5),
    marginTop: scale(10),
  },
  productView: {
    padding: scale(17),
    borderRadius: scale(15),
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.purpal1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: scale(9),
    marginVertical: scale(10),
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  items: {
    // marginVertical: scale(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
  },
  desc: {
    fontSize: scale(11),
    marginTop: scale(3),
  },
  detailsView: {
    marginLeft: scale(10),
  },
  productImg: {
    height: scale(35),
    width: scale(35),
  },
  btn: {
    borderWidth: scale(1),
    borderColor: theme.colors.gray,
    padding: scale(3),
    borderRadius: scale(12),
    marginBottom: scale(20),
  },
  number: {
    marginHorizontal: scale(10),
    color: theme.colors.red,
  },
  price: {
    color: theme.colors.red,
  },
  priceingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(4),
  },
  checkImg: {
    height: theme.SCREENHEIGHT * 0.3,
    width: theme.SCREENWIDTH * 0.8,
    resizeMode: 'contain',
  },
});
