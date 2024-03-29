import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Signup,
  SignIn,
  ReOrderCartScreen,
  ReOrderCheckOutScreen,
} from '../screens';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const MianStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReOrder"
          component={ReOrderCartScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ReCheckOut"
          component={ReOrderCheckOutScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MianStack;
