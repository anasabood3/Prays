import { StyleSheet } from 'react-native';
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
export default function ThemeSettings() {
  const theme = useSelector((state: RootState) => state.settings.theme);
  const dispatch = useDispatch();
    return (
      <ThemedView
          darkColor={Colors.dark.containerBackground}
          lightColor={Colors.light.containerBackground}
          style={styles.contianer}>
          <View style={styles.MultipleContainer}>
          <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>Appearance</ThemedText>
              <SettingsItem >
                  <SelectMenu
                      data={[{label:"light",value:1},{label:"dark",value:2}]}
                      value={theme}
                      updateSelected={(e) => { dispatch(updateTheme(e.label));console.log(theme)}}
                      placeHolder={theme}>
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
  contianer:{
    borderRadius:5,
    padding:8
  }

})


