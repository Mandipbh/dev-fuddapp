import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import {Button, InputBox, Label, TimePickerModel, Title} from '../components';
import {useNavigation} from '@react-navigation/native';
import SetLocationModel from '../components/appModel/SetLocationModel';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const keyboardVerticalOffset = Platform.OS === 'ios' ? scale(40) : 0;
const startOfMonth = moment().format('YYYY-MM-DD');
const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [process, setProcesss] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [timeModel, setTimeModel] = useState(false);
  const [timeSloat, setTimeSlot] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const selAddress = useSelector(state => state.UserReducer.selAddress);
  console.log('selAddress ?>? ', endOfMonth);
  const handleTimer = time => {
    setTimeModel(!timeModel);
    if (time !== null) {
      const timeslot = time.replace(' ', 'TO');
      setTimeSlot(timeslot);
    }
  };
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
          }}>
          <Image source={images.check} style={styles.checkImg} />
          <Title title="Ordine Completato!" style={styles.ordin} />
        </View>
      ) : (
        <>
          <View
            style={{
              height:
                Platform.OS === 'android'
                  ? theme.SCREENHEIGHT * 0.83
                  : theme.SCREENHEIGHT * 0.78,
            }}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView
                contentContainerStyle={{paddingBottom: scale(10)}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                  <View
                    style={[
                      styles.productView,
                      styles.row,
                      {justifyContent: 'space-between', marginTop: scale(40)},
                    ]}>
                    <View>
                      <Title title="Orario di consegna" />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setOpen(!open);
                          }}>
                          <Label
                            title="Date"
                            style={{marginTop: scale(5), fontSize: scale(12)}}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setTimeModel(!timeModel)}>
                          <Label
                            title="Time"
                            style={{marginTop: scale(5), fontSize: scale(12)}}
                          />
                        </TouchableOpacity>
                      </View>
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
                        title={'Nome Cognome'}
                        style={{color: theme.colors.gray}}
                      />
                      <Label
                        title={selAddress?.AddressName}
                        style={{
                          marginTop: scale(5),
                          fontSize: scale(12),
                          width: '100%',
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={[styles.btn, {width: '20%'}]}
                      onPress={() => {
                        setLocationModel(!locationModel);
                      }}>
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
                      <Title title="Dati di pagamento" />
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
                  <View
                    style={[
                      styles.productView1,
                      // styles.row,
                      // {justifyContent: 'space-between'},
                    ]}>
                    <Title title="Hai un codice sconto?" />
                    <View style={styles.viewData}>
                      <TextInput
                        style={styles.copun}
                        placeholder="Codice sconto"
                      />
                      <TouchableOpacity style={styles.applyBtn}>
                        <Text style={styles.applyTxt}>Applica</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Label title="" />
                </View>
                <Button
                  title="Invia ordine"
                  style={styles.submitBtn}
                  titleStyle={styles.btnTxt}
                  onPress={() => {
                    setProcesss(!process);
                  }}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </>
      )}
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        maximumDate={new Date(endOfMonth)}
        minimumDate={new Date(startOfMonth)}
      />
      <TimePickerModel isVisible={timeModel} close={handleTimer} />
      <SetLocationModel
        isShow={locationModel}
        close={() => {
          setLocationModel(!locationModel);
        }}
      />
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
    // bottom: theme.SCREENHEIGHT * -0.08,
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
    width: '55%',
    borderColor: 'transprent',
    borderRadius: 20,
    paddingVertical: 5,
    height: theme.SCREENHEIGHT * 0.04,
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
  productView1: {
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
    // marginVertical: scale(10),
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
  applyBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
    marginLeft: 20,
  },
  applyTxt: {
    color: theme.colors.white,
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  copun: {
    borderWidth: scale(1),
    height: scale(40),
    width: '60%',
    borderRadius: scale(15),
    marginLeft: scale(3),
    borderColor: theme.colors.gray,
    paddingLeft: scale(5),
  },
  viewData: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: scale(10),
  },
});
