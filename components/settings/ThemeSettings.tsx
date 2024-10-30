import { Appearance, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { SelectMenu } from '../SelectMenu';
import { Colors } from '@/core/theming';
import { View } from 'react-native';
import { SettingsItem } from './ThemeItem';
import { i18n } from '@/core/translate';
import { SectionContainer } from '../Containers';
import { saveItem } from '@/core/storage';




export default function ThemeSettings() {
  // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const colorScheme = useColorScheme();

    return (
      <SectionContainer
        darkColor={Colors.dark.containerBackground}
        lightColor={Colors.light.containerBackground}>
        <View style={styles.MultipleContainer}>
          <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("Appearance")}</ThemedText>
          <SettingsItem >
            <SelectMenu
              data={[{ label: "Light", value: 'light' }, { label: "Dark", value: 'dark' }]}
              value={colorScheme=='dark'?'dark':'light'}
              updateSelected={(e) => {  Appearance.setColorScheme(e.value); saveItem(e.value,'SELECTED_THEME');}}
              >
            </SelectMenu>
          </SettingsItem>
        </View>
      </SectionContainer>

  );
}

const styles = StyleSheet.create({

  MultipleContainer: {
    marginVertical: 6,
  },
  contianer: {
    borderRadius: 5,
    padding: 8,
    marginBottom: 6,
  }

})


