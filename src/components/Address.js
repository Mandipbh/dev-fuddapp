import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import {Label} from './Label';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getAllAddress} from '../redux/Actions/UserActions';
import {useState} from 'react';
import ApiService, {API} from '../utils/ApiService';

const Address = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAddress());
  }, []);
  const [addressData, setAddressData] = useState([]);
  const addressList = useSelector(state => state.HomeReducers.addressList);
  useEffect(() => {
    setAddressData(addressList?.UserAddresses);
  }, [addressList]);
  const handleDeleteAddress = item => {
    try {
      ApiService.get(API.deleteAddress + item?.Id)
        .then(res => {
          dispatch(getAllAddress());
        })
        .catch(error => {
          console.log('error catch ', error);
        });
    } catch (error) {
      console.log('error delete catch ', error);
    }
  };
  return (
    <View>
      <ScrollView
        style={{maxHeight: theme.SCREENHEIGHT * 0.4}}
        showsVerticalScrollIndicator={false}>
        {addressData &&
          addressData.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.addressCard,
                  {
                    borderBottomColor:
                      addressData.length === index + 1
                        ? theme.colors.white
                        : theme.colors.gray,
                  },
                ]}>
                <View style={styles.nameCon}>
                  <Label
                    title={`${item.Name} ${item?.LastName}`}
                    style={{fontWeight: '600'}}
                  />
                  <TouchableOpacity style={styles.btn}>
                    <Label title="Modifica" style={styles.lbl} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addressView}>
                  <Label title={item.AddressName} style={styles.addresstxt} />
                  <Icon
                    name="trash-2"
                    color={theme.colors.red}
                    size={scale(16)}
                    style={styles.deleteIcon}
                    onPress={() => {
                      handleDeleteAddress(item);
                    }}
                  />
                </View>

                {/* <Label title={item.email} style={styles.email} /> */}
                <Label title={item.Telephone} style={styles.phone} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  addressCard: {
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: scale(0.7),
    marginVertical: scale(10),
    paddingBottom: scale(10),
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    margin: scale(8),
  },
  addresstxt: {
    fontSize: scale(12),
    marginTop: scale(10),
  },
  email: {
    fontSize: scale(10),
  },
  phone: {
    fontSize: scale(10),
  },
  btn: {
    padding: scale(5),
    paddingHorizontal: scale(10),
    borderWidth: scale(0.9),
    borderColor: theme.colors.gray2,
    borderRadius: scale(13),
  },
  nameCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lbl: {
    fontSize: scale(11),
    color: theme.colors.gray,
  },
});
