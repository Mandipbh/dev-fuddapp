import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import {Label, Title} from '../Label';
import {useState} from 'react';
import {useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';

const MonthPickerModel = props => {
  const {isVisible, close} = props;
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    setMonths([
      {title: '01'},
      {title: '02'},
      {title: '03'},
      {title: '04'},
      {title: '05'},
      {title: '06'},
      {title: '07'},
      {title: '08'},
      {title: '09'},
      {title: 10},
      {title: 11},
      {title: 12},
    ]);
  }, [isVisible, close]);

  return (
    <Modal
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        flex: 1,
      }}
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
          <Title
            title="Selezionare il mese"
            style={{paddingBottom: scale(2), marginLeft: scale(5)}}
          />
          {/* <Feather
            name="x"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => {

            }}
          /> */}
        </View>

        <View style={{height: theme.SCREENHEIGHT * 0.24, marginTop: scale(10)}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {months.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.timeBtn,
                    {
                      borderBottomWidth: scale(1),
                      borderColor:
                        item.title === month
                          ? theme.colors.black
                          : theme.colors.white,
                    },
                  ]}
                  onPress={() => {
                    setMonth(item.title);
                  }}>
                  <Label title={item?.title} style={styles.txt} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.btn} onPress={() => close(null)}>
            <Label title="ANNULLA" style={styles.cantxt} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              close(month);
            }}>
            <Label title="CONFIRM" style={styles.contxt} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MonthPickerModel;

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
    height: theme.SCREENHEIGHT * 0.37,
    // position: 'absolute',
    bottom: 0,
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    // borderRadius: scale(15),
    padding: scale(5),
    alignItems: 'center',
    width: '90%',
  },
  textButton: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  btnText: {marginLeft: scale(10), fontWeight: '600'},
  timeBtn: {
    padding: scale(5),
    alignItems: 'center',
  },
  txt: {
    fontSize: scale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: scale(0.6),
    borderBottomColor: theme.colors.gray,
    // paddingBottom: scale(3),
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

    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    borderTopWidth: scale(0.6),
    borderTopColor: theme.colors.gray,
    flex: 1,
  },
  btn: {
    paddingHorizontal: scale(5),
  },
  cantxt: {
    color: theme.colors.btnColor,
  },
  contxt: {
    color: theme.colors.btnColor,
  },
});
