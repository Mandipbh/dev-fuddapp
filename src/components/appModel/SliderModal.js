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
import {useEffect} from 'react';
import {Title} from '../Label';
import { useSelector } from 'react-redux';

const SliderModal = props => {
  const {isVisible, close, data} = props;
  const [selCategory, setSelCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    setCategoryData(data?.reverse());
  }, [data]);
// const sAd = useSelector(state=>state.)
  // console.log('selCategory ??/ ', selCategory);
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
            <Title
              title=" Tutte le cucine"
              style={{
                textAlign: 'center',
                width: '80%',
                marginLeft: scale(10),
                fontSize: scale(18),
              }}
            />
            <Icon
              name="x"
              size={scale(22)}
              onPress={() => {
                close(null);
              }}
            />
          </View>

          <ScrollView>
            {categoryData &&
              categoryData.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.textContainer,
                      {
                        backgroundColor:
                          item?.Id === selCategory
                            ? theme.colors.purpal
                            : theme.colors.primary,
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      if (item?.Id !== selCategory) {
                        close(item);
                        setSelCategory(item?.Id);
                      } else {
                        close(null);
                        setSelCategory(null);
                      }
                    }}>
                    <Text
                      style={[
                        styles.mainText,
                        {
                          color:
                            item?.Id !== selCategory
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
    marginBottom: scale(8),
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
