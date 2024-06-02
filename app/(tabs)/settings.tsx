import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import TimingSettings from '@/components/settings/TimingSettings';
import SwipeModal from '@/components/SwipeModal';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ScrollView } from 'react-native';
import ThemeSettings from '@/components/settings/ThemeSettings';

interface metaModalData {
  title: string;
  info: string;
  content: React.JSX.Element;
}
export default function SettingsTab() {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

  return (

    <SafeAreaView style={[styles.settingsContainer, { backgroundColor }]}>
      <ScrollView>
        <ThemedText type="title" style={styles.titleContainer}>Settings</ThemedText>
        
     
        <TimingSettings />
        <ThemeSettings/>

        
        {/* <ThemedView
          style={styles.settingsItem}>
          <Pressable
            onPress={() => { setModalContent({ title: "themes", info: "dsfs", content: <Themes /> }); setIsVisible(true) }}>
            <ThemedText type='defaultSemiBold'>Themes</ThemedText>
          </Pressable>
        </ThemedView> */}

        <ThemedView
          style={styles.settingsItem2}
          darkColor={Colors.dark.colorLevel2}
          lightColor={Colors.light.colorLevel2}>
          <Collapsible
            title='More'
          >
            <ThemedView
              style={styles.moreItem}
              darkColor={Colors.dark.colorLevel2}
              lightColor={Colors.light.colorLevel2}>
              <TouchableOpacity>
                <ThemedText type='link'>Privacy & Policy</ThemedText>
              </TouchableOpacity>
            </ThemedView>
            <ThemedView
              style={styles.moreItem}
              darkColor={Colors.dark.colorLevel2}
              lightColor={Colors.light.colorLevel2}>
              <TouchableOpacity>
                <ThemedText type='link'>About Us</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </Collapsible>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',

    gap: 8,
  },
  settingsContainer: {
    paddingTop: Platform.OS == "android" ? 20 : 0,
    padding: 10,
    flex: 1,
  },
  settingsItem: {
    margin: 4,
    borderRadius: 9,
  },
  settingsItem2: {
    padding: 15,
    marginHorizontal: 4,
    margin: 4,
    borderRadius: 9,
  },
  moreItem: {
    padding: 9,
    margin: 4,
  }

});
