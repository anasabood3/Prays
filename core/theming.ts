import AsyncStorage from "@react-native-async-storage/async-storage";
import DarkTheme from "@react-navigation/native";
import DefaultTheme from "@react-navigation/native";
import { Theme } from "@react-navigation/native";
import { Appearance, useColorScheme } from "react-native";





const tintColorLight = '#002';
const tintColorDark = '#fff';



export type ColorSchemeType = 'light' | 'dark' | 'device';



export const DarkTheme_:Theme  = {
  ...DarkTheme,
  dark: true,
  colors: {
    primary: '#ffff',
    text: '#ECEDEE',
    background: '#1C1C1f',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    card: '#000'
  }
};

export const LightTheme_:Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: '#000',
    text: '#11181C',
    background: '#32d',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    card: '#fff',

  }
};

export function useThemeConfig() {
  const colorScheme= useColorScheme();
  if (colorScheme === 'dark') return DarkTheme_;

  return LightTheme_;
}

export async function loadSelectedTheme() {
  const data = await AsyncStorage.getItem('SELECTED_THEME');
  if (data) {
    const selected_theme = JSON.parse(data);
    Appearance.setColorScheme(selected_theme == 'dark' ? 'dark' : 'light');
  }
}



export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    colorLevel2:"#FFE6A7",
    containerBackground:"rgba(225, 229, 242, .6)",
    colorLevel1:"",
  },
  dark: {
    text: '#ECEDEE',
    background: '#1C1C1C',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    colorLevel2:"#22333B",
    containerBackground:"rgba(00, 00, 00, .3)",
    colorLevel1:"",
  },
};
