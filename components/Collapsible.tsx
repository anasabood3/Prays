import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import {  TouchableOpacity, useColorScheme } from 'react-native';
import tw from 'twrnc'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';

export function Collapsible({ children, title,isBold=false }: PropsWithChildren & { title: string,isBold?:boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const language = useSelector((state: RootState) => state.settings.language);

  return (
    <ThemedView
      darkColor={Colors.dark.colorLevel2}
      lightColor={Colors.light.colorLevel2}>
      <TouchableOpacity
        style={[tw`flex-row items-center gap-[2] p-[12] `, language == 'ar' ? { flexDirection: 'row-reverse' } : {}]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type={isBold?'defaultSemiBold':'default'}>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={tw`mt-[6] ml-[12]`} darkColor={Colors.dark.colorLevel2}
        lightColor={Colors.light.colorLevel2}>{children}</ThemedView>}
    </ThemedView>
  );
}

