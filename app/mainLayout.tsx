import { RootState } from '@/contexts/store';
import { i18n } from '@/core/translate';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { loadSelectedTheme, useThemeConfig } from '../core/theming';


loadSelectedTheme();

export default function MainLayout() {

    // const [twrncScheme, _, setColorScheme] = useAppColorScheme(tw);
    // const colorScheme = useColorScheme();
    const language = useSelector((state: RootState) => state.settings.language);

    useEffect(() => {
        i18n.locale = language;
    }, [language]);


    const theme = useThemeConfig();

    return (
        <ThemeProvider value={theme}>
            <Stack>
                <Stack.Screen name="+not-found" />
                <Stack.Screen name='onboarding' options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
