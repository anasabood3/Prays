import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, Pressable } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import TimingSettings from '@/components/settings/TimingSettings';
import SwipeModal from '@/components/SwipeModal';

interface metaModalData {
  title: string;
  info: string;
  content: React.JSX.Element;
}
export default function SettingsTab() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<metaModalData>();

  return (
    <SafeAreaView style={styles.settingsContainer} >
      
      <ThemedText type="title" style={styles.titleContainer}>Settings</ThemedText>
      <ThemedView
        style={styles.settingsItem}>
        <Pressable
          onPress={() => { setModalContent({ title: "timings", info: "dsfs", content: <TimingSettings /> }); setIsVisible(true) }}>
          <ThemedText type='defaultSemiBold'>Prayer Times</ThemedText>
        </Pressable>
      </ThemedView>

   

    
      {/* <ThemedView
        style={styles.settingsItem}>
        <Pressable
          onPress={() => { setModalContent({ title: "notifications", info: "dsfs", content: <Notifications /> }); setIsVisible(true) }}>
          <ThemedText type='defaultSemiBold'>Notifications</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView
        style={styles.settingsItem}>
        <Pressable
          onPress={() => { setModalContent({ title: "themes", info: "dsfs", content: <Themes /> }); setIsVisible(true) }}>
          <ThemedText type='defaultSemiBold'>Themes</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView
        style={styles.settingsItem}>
        <Pressable
          onPress={() => { setModalContent({ title: "langauges", info: "dsfs", content: <Languages /> }); setIsVisible(true) }}>
          <ThemedText type='defaultSemiBold'>Languages</ThemedText>
        </Pressable>
      </ThemedView>
  */}

      <ThemedView
        style={styles.settingsItem}>
        <Collapsible
          title='About us'
        >
          <ThemedText >this is about us</ThemedText>
        </Collapsible>

      </ThemedView>



      <ThemedView
        style={styles.settingsItem}>
        <Collapsible
          title='Privacy Policy'
        >
          <ThemedText >this is Privacy Policy</ThemedText>
        </Collapsible>

      </ThemedView> 
      <SwipeModal visible={isVisible} setVisible={setIsVisible}>
        <>{modalContent?.content}</>
      </SwipeModal>
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
  },
  settingsItem: {
    padding: 15,
    margin: 4,
    borderRadius:9,
  }
});
