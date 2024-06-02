import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const language = useSelector((state: RootState) => state.settings.language);

  return (
    <ThemedView
      darkColor={Colors.dark.colorLevel2}
      lightColor={Colors.light.colorLevel2}>
      <TouchableOpacity
        style={[styles.heading,language=='ar'?{flexDirection:'row-reverse'}:{}]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content} darkColor={Colors.dark.colorLevel2}
        lightColor={Colors.light.colorLevel2}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding:12
  },
  content: {
    marginTop: 6,
    marginLeft: 12,
  },
});
