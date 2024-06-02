import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '@/contexts/store';
import { i18n } from '@/scripts/translate';


export default function MainLayout() {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const language = useSelector((state: RootState) => state.settings.language);

    useEffect(()=>{
        i18n.locale=language;
      },[language]);
    
    return (
                <ThemeProvider value={theme==='dark'?DarkTheme:DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                </ThemeProvider>

    );
}