import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {scale, theme} from '../utils';
import {Label, Title} from './Label';
import {useNavigation} from '@react-navigation/core';

const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <AntDesign
          name="left"
          color={theme.colors.black}
          size={scale(22)}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Title title="Assistenza" style={styles.titleScreen} />
        <View />
      </View>
      <View style={styles.subConrtainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              name="map-pin"
              size={scale(20)}
              color={theme.colors.black}
            />
            <Label
              style={styles.subtitle}
              title={`Via Val Di Mazara 33,\n90144 Palermo, Italia`}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="phone" size={scale(20)} color={theme.colors.black} />
            <View>
              <Label
                style={[styles.subtitle, {paddingVertical: 0}]}
                title={`Assistenza Clienti`}
              />
              <Label
                style={[
                  styles.subtitle,
                  {paddingVertical: 0, fontFamily: theme.fonts.josefinSans},
                ]}
                title={`0917483700`}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: scale(10),
            }}>
            <Feather name="phone" size={scale(20)} color={theme.colors.black} />
            <View>
              <Label
                style={[styles.subtitle, {paddingVertical: 0}]}
                title={`Assistenza\nRistoratori/Aziende`}
              />
              <Label
                style={[
                  styles.subtitle,
                  {paddingVertical: 0, fontFamily: theme.fonts.josefinSans},
                ]}
                title={`0917483220`}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="mail" size={scale(20)} color={theme.colors.black} />
            <Label style={styles.subtitle} title={`info@fuddapp.it`} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(55),
    paddingHorizontal: scale(15),
  },
  titleScreen: {
    fontSize: scale(22),
    alignSelf: 'center',
    marginLeft: theme.SCREENWIDTH * 0.25,
  },
  subConrtainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: theme.colors.white,
    // marginHorizontal: scale(5),
    padding: scale(15),
    paddingHorizontal: scale(22),
    shadowColor: theme.colors.gray,
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.25,
    shadowRadius: scale(3),
    paddingVertical: theme.SCREENHEIGHT * 0.03,

    elevation: scale(2),
    borderRadius: scale(12),
    marginTop: scale(35),
    width: '90%',
    alignSelf: 'center',
  },
  subtitle: {
    fontFamily: theme.fonts.semiBold,
    // textAlign: 'center',
    fontSize: scale(14),
    paddingHorizontal: scale(10),
    color: theme.colors.black11,
    paddingVertical: scale(10),
  },
});
