import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';

const NoteCard = props => {
  const {children, backgroundColor, index, onPress} = props;
  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          index % 2 !== 0 ? theme.colors.lightpurpal : theme.colors.lightBlue,
        margin: scale(5),
        paddingVertical: scale(15),
        paddingHorizontal: scale(15),
        borderRadius: scale(15),
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default NoteCard;

const styles = StyleSheet.create({});
