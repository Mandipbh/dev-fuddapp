import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import {Label, Title} from '../Label';
import {useState} from 'react';
import moment from 'moment';
import {useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';

const TimePickerModel = props => {
  const {isVisible, close} = props;
  const [timeSloat, setTimeSlot] = useState([]);
  useEffect(() => {
    let x = {
      slotInterval: 30,
      openTime: '10:00',
      closeTime: '01:00',
    };

    //Format the time
    let startTime = moment(x.openTime, 'HH:mm');

    //Format the end time and the next day to it
    let endTime = moment(x.closeTime, 'HH:mm').add(1, 'days');

    //Times
    let allTimes = [];

    //Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
      //Push times
      allTimes.push(
        startTime.format('HH:mm') +
          ' ' +
          startTime.add(x.slotInterval, 'minutes').format('HH:mm'),
      );
      //Add interval of 30 minutes
      startTime.add(x.slotInterval, 'minutes');
    }

    setTimeSlot(allTimes);
  }, []);
  return (
    <Modal visible={isVisible} style={styles.modelStyle}>
      <BlurView
        style={styles.blurView}
        blurType="dark" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Title title="Select Time " />
          <Feather
            name="x"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => {
              close(null);
            }}
          />
        </View>

        <View style={{height: '75%', marginTop: scale(10)}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {timeSloat.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.timeBtn}
                  onPress={() => {
                    close(item);
                  }}>
                  <Label title={item} style={styles.txt} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModel;

const styles = StyleSheet.create({
  modelStyle: {
    margin: 0,
    height: '35%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderRadius: scale(20),
    padding: scale(5),
    alignItems: 'center',
  },
  textButton: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  btnText: {marginLeft: scale(10), fontWeight: '600'},
  timeBtn: {
    padding: scale(5),
  },
  txt: {
    fontSize: scale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    width: '90%',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.3),
    paddingBottom: scale(3),
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
