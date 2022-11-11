import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
    josefinSans: 'JosefinSans',
  },
  colors: {
    backgroundColor: '#f7f8fa',
    primary: '#f7a031',
    orange: '#e3af7b',
    white: '#FFFFFF',
    black: '#000000',
    black1:'#1e1c01',
    gray: '#9E9E9E',
    gray1: '#eaeaea',
    gray2: '#bebebe',
    gray3: '#d2d2d2',
    purpal: '#52296e',
    purpal1: '#8f739a',
    blue: '#4267b2',
    lightblue1: '#8896b7',
    lightpurpal: '#F4FAFF',
    red: '#FF0000',
    lightBlue: '#DCEDFB',
    placeholder: '#b6bed4',
    green: '#4cd964',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
