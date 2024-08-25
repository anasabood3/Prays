import { StyleSheet, Platform, SafeAreaView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import React, { useMemo } from 'react';
import TimingSettings from '@/components/settings/TimingSettings';
import { ScrollView } from 'react-native';
import ThemeSettings from '@/components/settings/ThemeSettings';
import LangSettings from '@/components/settings/LangSettings';
import { i18n } from '@/core/translate';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '../theming';



export default function SettingsTab() {
  const settings = useSelector((state: RootState) => state.settings);
  useMemo(()=>  {i18n.locale = settings.language},[settings.language]);
  

  return (
    <SafeAreaView >
      
      <ScrollView
      stickyHeaderIndices={[0]} >
      <ThemedView>
      <ThemedText type="title" style={styles.titleContainer}>{i18n.t('Settings')}</ThemedText>
      </ThemedView>
      <ThemedView>
     
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
            Prays v1.0.0
          </ThemedText>
        </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  titleContainer: {
    marginTop: 40,
    padding:12,

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
