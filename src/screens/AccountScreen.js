import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale, theme} from '../utils';
import {Label, Login, Signup, Title} from '../components';

const AccountScreen = () => {
  const [reg, setReg] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Subcontainer}>
        <View style={styles.headerView}>
          <Icon
            name="left"
            color={theme.colors.black}
            size={scale(22)}
            onPress={() => {
              setReg(!reg);
            }}
          />
          <Title title="Account" style={styles.title} />
        </View>
        {!reg ? <Login /> : <Signup />}
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  Subcontainer: {
    paddingHorizontal: scale(12),
  },
  title: {
    fontSize: scale(22),
    textAlign: 'center',
    marginLeft: theme.SCREENWIDTH * 0.25,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(55),
    paddingHorizontal: scale(5),
  },
});
