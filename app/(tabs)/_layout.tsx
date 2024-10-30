import {Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useSelector } from 'react-redux'
import { RootState } from '../../contexts/store';
import { i18n } from '@/core/translate';
import { useColorScheme } from 'react-native';
import { Colors } from '@/core/theming';
// import { useIsFirstTime } from '@/hooks/use-is-first-time';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const language = useSelector((state: RootState) => state.settings.language);
  // const [isFirstTime] = useIsFirstTime();
  i18n.locale = language;
  // if (isFirstTime) {
  //   return <Redirect href="/onboarding" />;
  // }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle:{borderTopWidth: 0},
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('Home'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="qibla"
        options={{
          title: i18n.t('Qibla'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'navigate-circle' : 'navigate-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: i18n.t('Calendar'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('Settings'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
