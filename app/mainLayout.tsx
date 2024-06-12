import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
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
    useEffect(()=>{
        theme=='dark'?Appearance.setColorScheme('dark'):Appearance.setColorScheme('light')
    })
    
    return (
                <NavigationContainer independent theme={theme==='dark'?DarkTheme:DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                </NavigationContainer>

    );
}
