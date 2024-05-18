import { StyleSheet, Platform, Switch, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useReducer, useState, useContext, useEffect } from 'react';

import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { loadSettings, updateFajrAngle,updateIshaaAngle, updateAsrCalMehtod,updateAutoLocation,updateCalcMethod, updateTimingSystem } from '@/contexts/settingsSlice';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Select } from "native-base";
import { clacMethods,asrCalcMethod,generateAnglesRange } from '@/constants/CalcMethods';
import RNPickerSelect from 'react-native-picker-select';

export default function TimingSettings() {
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const cal_method = useSelector((state: RootState) => state.settings.clacMethod);
  const timing_system = useSelector((state:RootState)=>state.settings.twentyFourSystem);
  const asr_cal_method = useSelector((state:RootState)=>state.settings.asrCalcMehtod);
  const fajr_angle = useSelector((state:RootState)=>state.settings.fajrAngle);
  const ishaa_angle = useSelector((state:RootState)=>state.settings.ishaaAngle);
  // const auto_location = useSelector((state:RootState)=>state.settings.autoLocation);
  const dispatch = useDispatch() 

  return (
    <ThemedView >

      <ThemedView style={[styles.settingsItem,styles.flexItem]} lightColor='#EDEDE9' darkColor='#023047'>
        <ThemedText type='defaultSemiBold'>24-Hour Time</ThemedText>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={timing_system ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {dispatch(updateTimingSystem(!timing_system))}}
          value={timing_system}
        />
      </ThemedView>


      <ThemedView lightColor='#EDEDE9' darkColor='#023047' style={[styles.settingsItem,]}>
        <ThemedText type='defaultSemiBold'>Calculation Method</ThemedText>
        <ThemedView
          style={[styles.settingsItem,]}>
          <RNPickerSelect
            value={cal_method.toString()}
            onValueChange={(e) => { dispatch(updateCalcMethod(e)) }}
            items={clacMethods} />
        </ThemedView>
      </ThemedView>      



      <ThemedView lightColor='#EDEDE9' darkColor='#023047' style={[styles.settingsItem,]}>
              <ThemedText type='defaultSemiBold'>Asr Method</ThemedText>
      <ThemedView style={styles.settingsItem}>
        <RNPickerSelect
          value={asr_cal_method.toString()}
          onValueChange={(e) => { dispatch(updateAsrCalMehtod(e)); }}
          items={asrCalcMethod}/>
      </ThemedView>
      </ThemedView>


      <ThemedView lightColor='#EDEDE9' darkColor='#023047' style={[styles.settingsItem,]}>
        <ThemedText type='defaultSemiBold'>Custom Angles</ThemedText>
        <ThemedView style={styles.settingsItem}>
          <ThemedText type='default'>Fajr Angle</ThemedText>
          <RNPickerSelect
            value={fajr_angle.toString()}
            onValueChange={(e) => { dispatch(updateFajrAngle(e)); }}
            items={generateAnglesRange()} />

          <ThemedText type='default'>Ishaa Angle</ThemedText>
          <RNPickerSelect
            value={ishaa_angle.toString()}
            onValueChange={(e) => { dispatch(updateIshaaAngle(e)); }}
            items={generateAnglesRange()}
             />
        </ThemedView>
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
    margin: 4,
    borderRadius:6,
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

  },
  
  flexItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})
