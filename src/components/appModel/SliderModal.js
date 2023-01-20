import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';

const SliderModal = props => {
  const {isVisible, close} = props;
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      style={{
        marginLeft: scale(120),
        margin: 0,
        backgroundColor: 'transparent',
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{top: 40, alignSelf: 'flex-end'}}
          onPress={() => close()}>
          <Text>X</Text>
        </TouchableOpacity>
        <View style={{marginTop: scale(50)}}>
          <Text
            style={[
              styles.mainText,
              {fontSize: 24, color: theme.colors.black},
            ]}>
            Tutte le cucine
          </Text>
          <View
            style={[
              styles.textContainer,
              {marginTop: scale(40), backgroundColor: theme.colors.purpal},
            ]}>
            <Text style={styles.mainText}>Top of the week</Text>
          </View>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.mainText}>Italiana</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.mainText}>Panini e Burger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.mainText}>Sushi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.mainText}>Dal mondo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.mainText}>Dolci e gelati</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.mainText}>Poke e Bowl</Text>
          </TouchableOpacity>
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
  btnText: {marginLeft: scale(10), fontWeight: '600'},
  mainText: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    color: theme.colors.white,
  },
  textContainer: {
    marginHorizontal: scale(18),
    padding: 7,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginVertical: scale(10),
  },
});
