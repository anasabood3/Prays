import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Provider, useSelector } from 'react-redux'
import { RootState, store } from '../../contexts/store';
import { i18n } from '@/scripts/translate';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const language = useSelector((state: RootState) => state.settings.language);
  i18n.locale = language;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
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
          title:  i18n.t('Qibla'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'navigate-circle' : 'navigate-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title:  i18n.t('Calendar'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title:  i18n.t('Settings'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
