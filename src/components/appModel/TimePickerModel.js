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
  const [selTime, setSelTime] = useState(null);
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

    while (startTime < endTime) {
      const str1 = startTime.format('HH:mm');
      const str2 = startTime.add(x.slotInterval, 'minutes').format('HH:mm');

      let newStr = str1.concat(' ', str2);
      console.log('newStr', newStr);

      //Push times
      allTimes.push(newStr);
    }

    setTimeSlot(allTimes);
  }, [isVisible, close]);
  return (
    <Modal
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
      visible={isVisible}>
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
          {/* <Feather
            name="x"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => {

            }}
          /> */}
        </View>

        <View style={{height: theme.SCREENHEIGHT * 0.16, marginTop: scale(10)}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {timeSloat.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.timeBtn,
                    {
                      borderBottomWidth: scale(1),
                      borderColor:
                        item === selTime
                          ? theme.colors.black
                          : theme.colors.white,
                    },
                  ]}
                  onPress={() => {
                    setSelTime(item);
                  }}>
                  <Label title={item} style={styles.txt} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.btn} onPress={() => close(null)}>
            <Label title="Cancel" style={styles.cantxt} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              close(selTime);
            }}>
            <Label title="Confirm" style={styles.contxt} />
          </TouchableOpacity>
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
    // flex: 1,
    height: theme.SCREENHEIGHT * 0.3,
    // position: 'absolute',
    bottom: 0,
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderRadius: scale(15),
    padding: scale(5),
    alignItems: 'center',
    width: '100%',
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
  bottomView: {
    flexDirection: 'row',
    paddingVertical: scale(5),
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: scale(5),
  },
  cantxt: {
    color: theme.colors.red,
  },
  contxt: {
    color: theme.colors.black1,
  },
});
