import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {scale, theme} from '../utils';

const InputBox = props => {
  const {
    multiline,
    value,
    keyboardType,
    placeholder,
    secureTextEntry,
    onChangeText,
    numberOfLines,
    style,
    inputStyle,
    maxLength,
    onFocus,
    onBlur,
    onTouchStart,
    fildIcon,
    // passwordType,
    // passwordRegex,
    onSubmitEditing,
    blurOnSubmit,
    returnKeyType,
    Img,
    passwordIcon,
    editable,
  } = props;
  const [showpassword, setShowpassword] = React.useState(false);
  //   TextInput.defaultProps.selectionColor = theme.colors.black;
  return (
    <View style={[styles.inputContainer, style]}>
      {Img ? (
        <Icon1
          name={Img}
          size={scale(25)}
          color={theme.colors.black}
          style={{
            textAlignVertical: 'center',
            left: scale(5),
            // top: scale(9),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : null}
      {fildIcon ? (
        <Icon
          name={fildIcon}
          size={scale(15)}
          color={theme.colors.black}
          style={{
            textAlignVertical: 'center',
            // left: scale(15),
            marginLeft: scale(20),
            top: scale(-2),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : null}
      <TextInput
        multiline={multiline}
        value={value}
        placeholderTextColor={theme.colors.gray}
        keyboardType={keyboardType ? keyboardType : 'default'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={
          secureTextEntry ? (!showpassword ? secureTextEntry : false) : false
        }
        style={[styles.input, inputStyle]}
        maxLength={maxLength}
        editable={editable}
        numberOfLines={numberOfLines}
        blurOnSubmit={blurOnSubmit}
        textAlignVertical={props.textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
        returnKeyType={returnKeyType}
        textContentType={'oneTimeCode'}
        onFocus={onFocus}
        onBlur={onBlur}
        onTouchStart={onTouchStart}
      />
      {/* {Img ? (
        <Icon
          name="lock"
          size={scale(20)}
          color={theme.colors.grey22}
          style={{marginRight: scale(10), marginTop: scale(10)}}
        />
      ) : null} */}
      {passwordIcon && (
        <Icon
          name={!showpassword ? 'eye' : 'eye-off'}
          size={scale(18)}
          color={theme.colors.grey22}
          style={styles.icon}
          onPress={() => setShowpassword(!showpassword)}
        />
      )}
      {/* {passwordType ? <Text style={styles.regex}>{passwordRegex}</Text> : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: scale(20),
    marginBottom: scale(7),
    height: theme.SCREENHEIGHT * 0.068,
    flexDirection: 'row',
    borderBottomWidth: scale(0.8),
    borderBottomColor: theme.colors.gray1,
  },
  icon: {
    marginRight: scale(10),
    alignSelf: 'center',
    right: 5,
  },
  input: {
    flex: 1,
    height: theme.SCREENHEIGHT * 0.068,
    // textAlign: 'center',
    paddingHorizontal: scale(8),
    fontSize: scale(14),
    color: theme.colors.black,
  },
  regex: {
    top: scale(10),
    right: 10,
    fontSize: scale(12),
  },
});

export default InputBox;
