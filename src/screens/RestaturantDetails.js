import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {scale, theme} from '../utils';
import {Button, CartModel, FullScreenImage, Label, Title} from '../components';
import LinearGradient from 'react-native-linear-gradient';
import {foodDetailsData, RestoInfo} from '../utils/MockData';
import {useNavigation} from '@react-navigation/native';

const RestaturantDetails = () => {
  const [selectedIndex, setSelIndex] = useState(0);
  const [viewImg, setViewImg] = useState(false);
  const [cartModel, setCartModel] = useState(false);
  const [searchtxt, setSearchTxt] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const navigation = useNavigation();
  const renderMenus = ({item, index}) => {
    return (
      <View key={index} style={styles.menuView}>
        <TouchableOpacity
          style={styles.colapseView}
          onPress={() => {
            index == selectedIndex ? setSelIndex(null) : setSelIndex(index);
          }}>
          <Title title={item.title} />
          <Icon
            name={index == selectedIndex ? 'chevron-up' : 'chevron-down'}
            size={scale(25)}
            color={theme.colors.gray}
          />
        </TouchableOpacity>
        {index == selectedIndex &&
          item?.items &&
          item?.items.map((m, i) => {
            return (
              <>
                <View style={styles.itemView} key={i}>
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => {
                        setViewImg(!viewImg);
                      }}>
                      <Image
                        source={{
                          uri: 'https://img.freepik.com/free-photo/side-view-shawarma-with-fried-potatoes-board-cookware_176474-3215.jpg?size=338&ext=jpg&ga=GA1.2.1181264738.1665484240&semt=sph',
                        }}
                        style={styles.productImage}
                      />
                    </TouchableOpacity>

                    <View style={{marginLeft: scale(10)}}>
                      <Label title={m?.title} style={styles.productname} />
                      <Label title={m?.price} style={styles.price} />
                    </View>
                  </View>
                  <Icon
                    name="plus"
                    size={scale(22)}
                    color={theme.colors.purpal}
                    style={{marginRight: scale(6)}}
                    onPress={() => {
                      setCartModel(!cartModel);
                    }}
                  />
                </View>
                <View style={styles.divider} />
              </>
            );
          })}
        {foodDetailsData?.length !== index + 1 && (
          <View style={styles.divider} />
        )}
      </View>
    );
  };

  const renderInfo = ({item, index}) => {
    return (
      <View
        style={[
          styles.menuView,
          {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: theme.colors.gray1,
          },
        ]}>
        <Text style={styles.infoText}>{item.title}</Text>
        <Text style={styles.infoText}>{item.time}</Text>
      </View>
    );
  };
  const handleModel = () => {
    setCartModel(!cartModel);
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://img.freepik.com/premium-photo/delicious-grilled-burgers_62847-14.jpg?size=626&ext=jpg&ga=GA1.2.1181264738.1665484240&semt=sph',
        }}
        style={styles.backImage}
        imageStyle={styles.image}>
        <View style={styles.header}>
          <Icon
            name="chevron-left"
            size={scale(28)}
            color={theme.colors.white}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={[styles.textinputContainer, styles.shadow]}>
            <Icon
              name="search"
              size={scale(23)}
              color={theme.colors.placeholder}
            />
            <TextInput
              placeholder={'Cerca nel menu?'}
              style={styles.searchbox}
              placeholderTextColor={theme.colors.placeholder}
              value={searchtxt}
              onChangeText={txt => {
                setSearchTxt(txt);
              }}
            />
          </View>
          <Icon1 name="bag" size={scale(25)} color={theme.colors.white} />
        </View>
        <Title title="Zancos Steak House" style={styles.headerTitle} />
        <View style={styles.subtitleView}>
          <Label title="Specialitia Carne, Hamburger" style={styles.subTitle} />
        </View>
        <View style={styles.bottomView}>
          <LinearGradient
            colors={[theme.colors.purpal1, theme.colors.orange]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: null,
              flexDirection: 'row',
              padding: scale(5),
              borderRadius: scale(15),
            }}>
            <Icon2
              name="thumbs-up"
              color={theme.colors.white}
              size={scale(12)}
            />
            <Text style={styles.review}>{'100%'}</Text>
          </LinearGradient>
          <View style={styles.timeCon}>
            <Icon name="clock" size={scale(15)} color={theme.colors.gray} />
            <Label title="45 Min." style={styles.titmeLbl} />
          </View>
        </View>
      </ImageBackground>
      <View style={styles.options}>
        <Button
          title="Menu"
          style={[styles.filBtn, styles.shadow, {shadowRadius: scale(10)}]}
          onPress={() => {
            setSelectedItem(0);
          }}
        />
        <Button
          title="Intormazioni"
          style={[styles.filBtn, styles.shadow, {shadowRadius: scale(10)}]}
          onPress={() => {
            setSelectedItem(1);
          }}
        />
      </View>
      <View>
        {selectedItem === 0 && (
          <FlatList
            data={foodDetailsData}
            renderItem={renderMenus}
            showsVerticalScrollIndicator={false}
            style={[styles.menusView, styles.shadow]}
            contentContainerStyle={{paddingBottom: scale(30)}}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.textView}>
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: scale(16),
              fontWeight: '800',
            }}>
            Zancos Steak House
          </Text>
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: scale(14),
              fontWeight: '500',
            }}>
            Via dalle palle, 88, 90146 Palermo PA, Italia
          </Text>
        </View>
        <Text style={styles.titleText}>Orari di apertura</Text>
        {selectedItem === 1 && (
          <FlatList data={RestoInfo} renderItem={renderInfo} />
        )}
      </View>
      <FullScreenImage
        isVisible={viewImg}
        close={() => {
          setViewImg(!viewImg);
        }}
      />
      <CartModel isVisible={cartModel} close={handleModel} />
    </View>
  );
};

export default RestaturantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  backImage: {
    height: theme.SCREENHEIGHT * 0.29,
    width: '100%',
    resizeMode: 'cover',
  },
  menusView: {
    height: '53%',
    backgroundColor: theme.colors.white,
    marginHorizontal: scale(10),
    borderRadius: scale(15),
    marginBottom: scale(5),
  },
  image: {
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    opacity: 0.89,
  },
  header: {
    flexDirection: 'row',
    padding: scale(20),
    marginTop: Platform.OS === 'ios' ? scale(15) : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textinputContainer: {
    height: scale(40),
    backgroundColor: theme.colors.white,
    borderRadius: scale(20),
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchbox: {
    fontSize: scale(13),
    color: theme.colors.placeholder,
    marginLeft: scale(10),
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: scale(23),
    textAlign: 'center',
    fontWeight: '900',
    color: theme.colors.white,
    marginTop: scale(10),
  },
  subtitleView: {
    paddingVertical: scale(5),
    backgroundColor: theme.colors.black1,
    alignSelf: 'center',
    paddingHorizontal: scale(15),
    borderRadius: scale(15),
    opacity: 0.8,
    marginTop: scale(10),
  },
  subTitle: {
    fontSize: scale(14),
    color: theme.colors.white,
    fontWeight: '600',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginTop: scale(12),
  },
  review: {
    fontSize: scale(11),
    marginHorizontal: scale(5),
    color: theme.colors.white,
    fontWeight: '800',
  },
  timeCon: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(15),
  },
  titmeLbl: {
    fontSize: scale(11),
    color: theme.colors.gray,
    marginLeft: scale(3),
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: scale(10),
    marginHorizontal: theme.SCREENWIDTH * 0.25,
  },
  filBtn: {
    width: scale(100),
    margin: 0,
    borderRadius: scale(12),
  },
  menuView: {
    padding: scale(10),
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    paddingVertical: scale(5),
    borderColor: theme.colors.gray,
    marginHorizontal: scale(10),
  },
  colapseView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
  productImage: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    backgroundColor: theme.colors.white,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(5),
    backgroundColor: theme.colors.backgroundColor,
    borderBottomColor: theme.colors.gray,
    width: '100%',
    paddingVertical: scale(5),
    // borderBottomWidth: scale(1),
    alignSelf: 'center',
  },
  productname: {
    fontSize: scale(14),
    fontWeight: '300',
    color: theme.colors.black,
  },
  price: {
    fontSize: scale(12),
    color: theme.colors.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: '93%',
    height: scale(0.6),
    alignSelf: 'center',
    backgroundColor: theme.colors.gray,
  },
  infoContainer: {
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: scale(20),
    marginHorizontal: scale(10),
    borderRadius: 15,
  },
  infoText: {color: theme.colors.gray, fontWeight: '700'},
  textView: {
    marginHorizontal: scale(20),
    borderBottomWidth: 1,
    borderColor: theme.colors.gray1,
    paddingBottom: scale(10),
  },
  titleText: {
    color: theme.colors.gray,
    fontSize: scale(14),
    fontWeight: '800',
    marginLeft: scale(20),
    marginBottom: scale(30),
    marginTop: scale(10),
  },
});
