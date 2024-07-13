import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, Pressable, TouchableOpacity, View } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useMemo, useState } from 'react';
import TimingSettings from '@/components/settings/TimingSettings';
import SwipeModal from '@/components/SwipeModal';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ScrollView } from 'react-native';
import ThemeSettings from '@/components/settings/ThemeSettings';
import LangSettings from '@/components/settings/LangSettings';
import { i18n } from '@/scripts/translate';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { useTheme } from '@react-navigation/native';



export default function SettingsTab() {
  const settings = useSelector((state: RootState) => state.settings);
  useMemo(()=>  {i18n.locale = settings.language},[settings.language]);
  

  return (
    <SafeAreaView >
      <ScrollView >
        <ThemedText type="title" style={styles.titleContainer}>{i18n.t('Settings')}</ThemedText>
        
     
        <TimingSettings />
        <ThemeSettings/>
        <LangSettings/>

        
        {/* <ThemedView
          style={styles.settingsItem}>
          <Pressable
            onPress={() => { setModalContent({ title: "themes", info: "dsfs", content: <Themes /> }); setIsVisible(true) }}>
            <ThemedText type='defaultSemiBold'>Themes</ThemedText>
          </Pressable>
        </ThemedView> */}


        <View style={{flexDirection:'row',justifyContent:"center",marginTop:45}}>
          <ThemedText type='link'>
            Prays v1.2
          </ThemedText>
        </View>
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
  }, 
  MultipleContainer: {
    marginVertical: 6,
  },

});
