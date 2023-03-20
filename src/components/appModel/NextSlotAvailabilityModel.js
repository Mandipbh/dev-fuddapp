import {Modal, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import InputBox from '../InputBox';
import Button from '../Button';
import {BlurView} from '@react-native-community/blur';
import {Title, Error, Label} from '../Label';
import {scale, theme} from '../../utils';
import {StyleSheet, Alert, ActivityIndicator} from 'react-native';

const NextSlotAvailabilityModel = props => {
  const {isVisible, close, timeslot} = props;

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
                title={'Conferma dell`ordine'}
                style={{textAlign: 'center'}}
              />
            }
            <Icon
              name="x"
              size={scale(22)}
              color={theme.colors.black}
              onPress={() => {
                close(null);
              }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.subTitleView}>
            <Label
              title="Il ristorante non può prendere ordini per la fascia oraria selezionata."
              style={styles.subTitle}
            />
            <Text style={styles.txt1}>
              Fascia oraria disponibile
              <Text style={{color: theme.colors.green}}>{` ${timeslot}`}</Text>
            </Text>
            {/* <Label
              title={`Fascia oraria disponibile ${timeslot}`}
              style={styles.subTitle}
            /> */}
            <Label
              title="Vuoi effettuare la prenotazione?"
              style={styles.subTitle}
            />
            <Button
              title="Si"
              style={{
                backgroundColor: theme.colors.primary,
                marginTop: scale(15),
              }}
              titleStyle={styles.txt}
              onPress={() => {
                close(timeslot);
              }}
            />
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
    // marginTop: theme.SCREENHEIGHT * 0.2,
    justifyContent: 'center',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    paddingHorizontal: scale(5),
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    height: scale(0.5),
    backgroundColor: theme.colors.gray,
    overflow: 'hidden',
  },
  subTitleView: {
    padding: scale(9),
  },
  subTitle: {
    fontWeight: '400',
    color: theme.colors.gray,
    fontFamily: theme.fonts.josefinSans,
    fontSize: scale(13.4),
    marginVertical: scale(10),
  },
  inputInner: {
    paddingHorizontal: 0,
    color: theme.colors.black,
    fontSize: scale(11),
  },
  txt: {color: theme.colors.white, fontWeight: '600'},
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  txt1: {
    color: theme.colors.gray,
    fontFamily: theme.fonts.josefinSans,
    fontSize: scale(13.4),
  },
});

export default NextSlotAvailabilityModel;
