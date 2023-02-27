import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {BlurView} from '@react-native-community/blur';

const SliderModal = props => {
  const {isVisible, close, data} = props;
  const [selCategory, setSelCategory] = useState(null);
  return (
    <Modal animationType="fade" visible={isVisible} style={styles.modalCon}>
      <BlurView
        style={styles.blurView}
        blurType="dark" // Values = dark, light, xlight .
        blurAmount={2}
        // viewRef={this.state.viewRef}
        reducedTransparencyFallbackColor={theme.colors.black}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={{top: 40, alignSelf: 'flex-end'}}
          onPress={() => close()}></TouchableOpacity>
        <View style={{marginTop: scale(50)}}>
          <View style={styles.headerContainer}>
            <Text
              style={[
                styles.mainText,
                {fontSize: 24, color: theme.colors.black},
              ]}>
              Tutte le cucine
            </Text>
            <Icon
              name="x"
              size={scale(22)}
              onPress={() => {
                close(null);
              }}
            />
          </View>

          <ScrollView>
            {data &&
              data.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.textContainer,
                      {
                        backgroundColor:
                          item === selCategory
                            ? theme.colors.primary
                            : theme.colors.white,
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      close(item);
                      setSelCategory(item?.ID);
                    }}>
                    <Text
                      style={[
                        styles.mainText,
                        {
                          color:
                            item === selCategory
                              ? theme.colors.white
                              : theme.colors.primary,
                          fontSize: scale(13),
                        },
                      ]}>
                      {item?.Nome}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SliderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(5),
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  modalCon: {
    marginLeft: scale(120),
    margin: 0,
    backgroundColor: 'transparent',
  },
  btnText: {marginLeft: scale(10), fontWeight: '600'},
  mainText: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    color: theme.colors.white,
    fontFamily: theme.fonts.josefinSans,
  },
  textContainer: {
    marginHorizontal: scale(18),
    padding: 7,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginVertical: scale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.5,

    elevation: scale(1),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(8),
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
