import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import {optionsData} from '../../utils/MockData';
import Button from '../Button';
import InputBox from '../InputBox';
import {Title, Label, Error} from '../Label';

const OrderPaymentMethod = props => {
  const {isVisible, close} = props;
  const [option, setOptions] = useState(null);
  const [cardHolderName, setName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [zip, setZip] = useState(null);
  const cardObject = {
    sCardName: cardHolderName,
    sCardNumber: cardNumber,
    sCardExpMonth: month,
    sCardExpYear: year,
    sCardCvc: cvv,
    sCardPostcode: zip,
  };
  const handleCard = () => {
    if (option !== null) {
      close(cardObject);
    } else {
      alert('Scegli il metodo di pagamento. ');
    }
  };
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => {}}>
      <BlurView
        style={styles.blurView}
        blurType="dark" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={styles.headerView}>
            {<Title title="Dati di pagamento" style={{textAlign: 'center'}} />}
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close();
                setOptions(null);
              }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.subTitleView}>
            {optionsData.map((item, idx) => {
              return (
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.checkboxCon}
                    onPress={() => {
                      setOptions(item);
                    }}>
                    {option?.id === item?.id && <View style={styles.check} />}
                  </TouchableOpacity>
                  <Label title={item?.title} style={styles.lbl} />
                </View>
              );
            })}
            {option?.id === 3 && (
              <View style={{marginTop: scale(10)}}>
                <InputBox
                  placeholder="Intestatario carta di credito"
                  style={styles.txtInput1}
                  value={cardHolderName}
                  onChangeText={txt => {
                    setName(txt);
                  }}
                />
                <InputBox
                  placeholder="Card Number"
                  style={styles.txtInput1}
                  value={cardNumber}
                  onChangeText={txt => {
                    setCardNumber(txt);
                  }}
                  maxLength={19}
                  keyboardType="number-pad"
                />
                <View style={styles.rowView}>
                  <TextInput
                    placeholder="MM"
                    style={styles.txtInput}
                    value={month}
                    onChangeText={txt => {
                      setMonth(txt);
                    }}
                    maxLength={2}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    placeholder="YYYY"
                    style={styles.txtInput}
                    value={year}
                    onChangeText={txt => {
                      setYear(txt);
                    }}
                    maxLength={4}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.rowView}>
                  <TextInput
                    placeholder="CVV"
                    value={cvv}
                    onChangeText={txt => {
                      setCvv(txt);
                    }}
                    style={styles.txtInput}
                    maxLength={4}
                  />
                  <TextInput
                    placeholder="Zip Code"
                    value={zip}
                    onChangeText={txt => {
                      setZip(txt);
                    }}
                    style={styles.txtInput}
                    maxLength={6}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            )}
            <Button
              onPress={() => {
                handleCard();
              }}
              style={{
                backgroundColor: theme.colors.primary,
                marginTop: scale(10),
              }}
              title="Submit"
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
    // justifyContent: 'center',
    paddingVertical: scale(20),
    // backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 111,
    marginTop: theme.SCREENHEIGHT * 0.1,
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
  checkboxCon: {
    height: scale(15),
    width: scale(15),
    borderRadius: scale(7),
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.gray,
  },
  check: {
    height: scale(6),
    width: scale(6),
    borderRadius: scale(3),
    backgroundColor: theme.colors.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  lbl: {
    marginLeft: scale(5),
  },
  txtInput: {
    height: scale(40),
    width: theme.SCREENWIDTH * 0.3,
    borderWidth: 1,
    borderRadius: scale(15),
    borderColor: theme.colors.gray,
    padding: scale(10),
    margin: scale(2),
    marginVertical: scale(5),
  },
  txtInput1: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: scale(12),
    borderBottomColor: theme.colors.gray,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default OrderPaymentMethod;
