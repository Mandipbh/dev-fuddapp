import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Account, Restaurant, RestaturantDetails} from '../screens';
import {scale, theme} from '../utils';
import {Platform, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Comman = () => {
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.white}}>
      <Text>Hello</Text>
    </View>
  );
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
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName="RISTORANTI"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.purpal,
        tabBarInactiveTintColor: '#555',

        tabBarStyle: {
          position: 'absolute',
          backgroundColor: theme.colors.white,
          paddingTop: Platform.OS === 'ios' ? scale(5) : scale(5),
          borderTopLeftRadius: scale(30),
          borderTopRightRadius: scale(30),
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
        options={{
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
        component={Account}
        options={{
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
        name="AUITO"
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
