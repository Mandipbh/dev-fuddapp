import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Home,
  Account,
  Restaurant,
  RestaturantDetails,
  CartScreen,
  Checkout,
  OrderDetails,
  OrderDetailScreen,
} from '../screens';
import {scale, theme} from '../utils';
import {Platform, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AboutUs, Label} from '../components';
import {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Comman = () => {
  return <AboutUs />;
};

const Restaturant = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="RISTORANTI"
        component={Restaurant}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={RestaturantDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const restaurantList = ({navigation, route}) => ({
  tabPress: () => navigation.navigate(route.name),
});

const AccountLis = ({navigation, route}) => ({
  tabPress: () => navigation.navigate(route.name),
});
const BottomTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName="RISTORANTI"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.purpal,
        tabBarInactiveTintColor: '#555',

        tabBarStyle: {
          height: Platform.OS === 'ios' ? scale(70) : scale(55),
          position: 'absolute',
          backgroundColor: theme.colors.white,
          paddingTop: Platform.OS === 'ios' ? scale(5) : scale(0),
          borderTopLeftRadius: scale(25),
          borderTopRightRadius: scale(25),
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: scale(10),
          fontFamily: 'JosefinSans-SemiBold',
          // fontWeight: '700',
          paddingBottom: scale(5),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome5
                name="home"
                size={scale(20)}
                color={focused ? theme.colors.purpal : theme.colors.gray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="RISTORANTI"
        component={Restaturant}
        listeners={restaurantList}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <MIcon
                name="silverware-fork-knife"
                size={scale(20)}
                color={focused ? theme.colors.purpal : theme.colors.gray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ACCOUNT"
        component={AccountStack}
        listeners={AccountLis}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome5
                name="user-alt"
                size={scale(20)}
                color={focused ? theme.colors.purpal : theme.colors.gray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ASSISTENZA"
        component={Comman}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="questioncircle"
                size={scale(20)}
                color={focused ? theme.colors.purpal : theme.colors.gray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
