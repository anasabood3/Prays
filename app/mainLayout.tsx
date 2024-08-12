import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { i18n } from '@/scripts/translate';
import { Appearance } from 'react-native';


export default function MainLayout() {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const language = useSelector((state: RootState) => state.settings.language);

    useEffect(() => {
        i18n.locale = language;
    }, [language]);
    
    useEffect(() => {
        theme == 'dark' ? Appearance.setColorScheme('dark') : Appearance.setColorScheme('light')
    })

    // if (isFirstTime) {
    //     return <Redirect href="/onboarding" />;
    // }

    return (
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="+not-found" />
                <Stack.Screen name='onboarding' options={{ headerShown: false }}/>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
