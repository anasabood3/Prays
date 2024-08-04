import { Appearance, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { updateTheme } from '@/contexts/settingsSlice';
import { SelectMenu } from './SelectMenu';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { SettingsItem } from './ThemeItem';
import { i18n } from '@/scripts/translate';
import { useThemeColor } from '@/hooks/useThemeColor';





export default function ThemeSettings() {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const backgroundColor = useThemeColor({dark:Colors.dark.containerBackground,light:Colors.light.containerBackground},'background')
  const dispatch = useDispatch();

    return (
      <ThemedView
          style={[styles.contianer,{backgroundColor}]}>
          <View style={styles.MultipleContainer}>
          <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("Appearance")}</ThemedText>
              <SettingsItem >
                  <SelectMenu
                      data={[{label:"Light",value:'light'},{label:"Dark",value:'dark'}]}
                      value={theme}
                      updateSelected={(e) => { dispatch(updateTheme(e.value));Appearance.setColorScheme(e.value);}}
                      placeHolder={''}>
                  </SelectMenu>
              </SettingsItem>
          </View>
      </ThemedView>

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


