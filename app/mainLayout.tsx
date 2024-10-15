import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme_,DefaultTheme_ } from './theming';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { i18n } from '@/core/translate';
import { useDeviceContext } from 'twrnc';
import tw from 'twrnc';

export default function MainLayout() {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const language = useSelector((state: RootState) => state.settings.language);

    useEffect(() => {
        i18n.locale = language;
    }, [language]);

    console.log(theme);

    useDeviceContext(tw, {
        // 1️⃣  opt OUT of listening to DEVICE color scheme events
        observeDeviceColorSchemeChanges: false,
        // 2️⃣  and supply an initial color scheme
        initialColorScheme:theme=='dark'?'dark':'light' , // 'light' | 'dark' | 'device'
      });
    return (
        <ThemeProvider value={theme === 'dark' ? DarkTheme_ : DefaultTheme_}>
            <Stack>
                <Stack.Screen name="+not-found" />
                <Stack.Screen name='onboarding' options={{ headerShown: false }}/>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
