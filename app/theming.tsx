import DarkTheme from "@react-navigation/native";
import DefaultTheme from "@react-navigation/native";



const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const DarkTheme_ = {
    ...DarkTheme,
    dark: true,
    colors: {
        primary: '#003',
        text: '#ECEDEE',
        background: '#1C1C1f',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
        card: '#000'
    }
};

export const DefaultTheme_ = {
    ...DefaultTheme,
    dark:false,
    colors:{
        primary: '#003',
        text: '#11181C',
        background: '#32d',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
        card: '#fff',
        
    }
  };


  export const Colors = {
    light: {
      tint: tintColorLight,
      icon: '#687076',
      tabIconDefault: '#687076',
      tabIconSelected: tintColorLight,
      colorLevel2:"#FFE6A7",
      containerBackground:"rgba(225, 229, 242, .4)",
    },
    dark: {
      tint: tintColorDark,
      icon: '#9BA1A6',
      tabIconDefault: '#9BA1A6',
      tabIconSelected: tintColorDark,
      colorLevel2:"#22333B",
      containerBackground:"rgba(00, 00, 00, .2)",
    },
  };