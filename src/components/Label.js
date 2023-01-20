import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme, scale} from '../utils';

const Label = props => {
  const {title, style, numberOfLines} = props;
  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
};

const Title = props => {
  const {title, style, numberOfLines} = props;
  return (
    <Text numberOfLines={numberOfLines} style={[styles.title, style]}>
      {title}
    </Text>
  );
};

const Error = props => {
  const {error, style} = props;
  return <Text style={[styles.error, style]}>{error}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: scale(13),
    color: theme.colors.black1,
  },
  title: {
    color: theme.colors.black,
    fontSize: scale(15.5),
    fontWeight: '600',
  },
  error: {
    textAlign: 'center',
    color: theme.colors.red,
    fontSize: scale(12),
  },
});

export {Label, Title, Error};
