import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsTab() {
  return (
    <SafeAreaView style={styles.settingsContainer} >
      <ThemedText type="title" style={styles.titleContainer}>Settings</ThemedText>
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
    padding: 10,
    margin: 4,
    borderWidth: 2,
  }
});
