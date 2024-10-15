import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { updateLanguage } from '@/contexts/settingsSlice';
import { SelectMenu } from '../SelectMenu';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { SettingsItem } from './ThemeItem';
import { i18n } from '@/core/translate';
import { languages } from '@/constants/GeneralConstans';
import { SectionContainer } from '../Containers';
import tw from 'twrnc'

export default function LangSettings() {
  const language = useSelector((state: RootState) => state.settings.language);
  const dispatch = useDispatch();
    return (
      <SectionContainer
          darkColor={Colors.dark.containerBackground}
          lightColor={Colors.light.containerBackground}>
          <View style={tw`my-[6]`}>
          <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("Language")}</ThemedText>
              <SettingsItem >
                  <SelectMenu
                      data={languages}
                      value={language}
                      updateSelected={(e) => { dispatch(updateLanguage(e.value));}}>
                  </SelectMenu>
              </SettingsItem>
          </View>
      </SectionContainer>

  );
}



