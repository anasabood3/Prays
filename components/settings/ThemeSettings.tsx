import { Appearance, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { updateTheme } from '@/contexts/settingsSlice';
import { SelectMenu } from '../SelectMenu';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { SettingsItem } from './ThemeItem';
import { i18n } from '@/core/translate';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SectionContainer } from '../Containers';





export default function ThemeSettings() {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const backgroundColor = useThemeColor({dark:Colors.dark.containerBackground,light:Colors.light.containerBackground},'background')
  const dispatch = useDispatch();

    return (
      <SectionContainer
        darkColor={Colors.dark.containerBackground}
        lightColor={Colors.light.containerBackground}>
        <View style={styles.MultipleContainer}>
          <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("Appearance")}</ThemedText>
          <SettingsItem >
            <SelectMenu
              data={[{ label: "Light", value: 'light' }, { label: "Dark", value: 'dark' }]}
              value={theme}
              updateSelected={(e) => { dispatch(updateTheme(e.value)); Appearance.setColorScheme(e.value); }}
              placeHolder={''}>
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


