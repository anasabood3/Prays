import { StyleSheet, Platform, Switch, TextInput, ScrollViewBase, ScrollViewComponent } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useReducer, useState, useContext, useEffect } from 'react';

import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { loadSettings, updateFajrAngle, updateIshaaAngle, updateAsrCalMehtod, updateAutoLocation, updateCalcMethod, updateTimingSystem } from '@/contexts/settingsSlice';
import { useThemeColor } from '@/hooks/useThemeColor';
import { clacMethods, asrCalcMethods, generateAnglesRange } from '@/constants/CalcMethods';
import { SelectMenu } from '../SelectMenu';

export default function TimingSettings() {

  const cal_method = useSelector((state: RootState) => state.settings.clacMethod);
  const timing_system = useSelector((state: RootState) => state.settings.twentyFourSystem);
  const asr_cal_method = useSelector((state: RootState) => state.settings.asrCalcMehtod);
  const fajr_angle = useSelector((state: RootState) => state.settings.fajrAngle);
  const ishaa_angle = useSelector((state: RootState) => state.settings.ishaaAngle);
  // const auto_location = useSelector((state:RootState)=>state.settings.autoLocation);
  const dispatch = useDispatch();

  return (
    <ThemedView style={{paddingHorizontal:5}}>
      <ThemedView >
        <ThemedText type='defaultSemiBold'>Calculation Method</ThemedText>
        <ThemedView lightColor='#FFE6A7' darkColor='#1D3D47' style={[styles.settingsItem,]}>
          <SelectMenu
            data={clacMethods}
            value={cal_method.toString()}
            updateSelected={(e) => { dispatch(updateCalcMethod(e.value)) }}
            placeHolder={clacMethods[cal_method - 1].label}>
          </SelectMenu>
        </ThemedView>
      </ThemedView>


      <ThemedView>
        <ThemedText type='defaultSemiBold'>Asr Method</ThemedText>
        <ThemedView lightColor='#FFE6A7' darkColor='#1D3D47' style={[styles.settingsItem,]}>
          <SelectMenu
            data={asrCalcMethods}
            value={asr_cal_method.toString()}
            updateSelected={(e) => { dispatch(updateAsrCalMehtod(e.value)) }}
            placeHolder={clacMethods[cal_method - 1].label}
          >
          </SelectMenu>
        </ThemedView>
      </ThemedView>

 

      <ThemedView>
        <ThemedText type='defaultSemiBold'>Custom Angles</ThemedText>

        <ThemedView lightColor='#FFE6A7' darkColor='#1D3D47' style={[styles.settingsItem,]}>
          <SelectMenu
            data={generateAnglesRange()}
            value={fajr_angle.toString()}
            updateSelected={(e) => { dispatch(updateFajrAngle(e.value)); }}
            placeHolder={`Fajr Angel: ${fajr_angle.toString()}°`}>
          </SelectMenu>
        </ThemedView>
        
        <ThemedView lightColor='#FFE6A7' darkColor='#1D3D47' style={[styles.settingsItem,]}>
          <SelectMenu
            data={generateAnglesRange()}
            value={ishaa_angle.toString()}
            updateSelected={(e) => { dispatch(updateIshaaAngle(e.value)); }}
            placeHolder={`Ishaa Angel: ${ishaa_angle.toString()}°`}>
          </SelectMenu>
        </ThemedView>
      </ThemedView>

      <ThemedView style={[styles.settingsItem, styles.flexItem]} lightColor='#FFE6A7' darkColor='#1D3D47'>
        <ThemedText type='defaultSemiBold'>24-Hour Time</ThemedText>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={timing_system ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => { dispatch(updateTimingSystem(!timing_system)) }}
          value={timing_system}
        />
      </ThemedView>


      {/* 
      <ThemedView style={styles.settingsItem}>
        <ThemedText type='defaultSemiBold'>Auto Location</ThemedText>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={auto_location ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {dispatch(updateAutoLocation(!auto_location))}}
          value={auto_location}
        />
      </ThemedView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsItem: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    margin: 5,
    borderRadius: 6,

  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,

  },

  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdown: {
    height: 40,

  },
  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,

  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,

  },

  selectMenu: {
    padding: 6,
    margin: 3,
  },
  selectItem: {
    padding: 4,
  }

})

