import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, Switch, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable } from 'react-native';
// import { initialSettings,SettingsState  } from '@/Contexts/SettingsContext';
// import React, { useReducer, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RootState } from '@/Contexts/store';
// import { useSelector, useDispatch } from 'react-redux'
// import { loadSettings, updateAngles, updateAsrCalMehtod,updateAutoLocation,updateCalcMethod, updateTimingSystem } from '@/Contexts/settingsSlice';
// import { useThemeColor } from '@/hooks/useThemeColor';
// import RNPickerSelect from 'react-native-picker-select';

export default function TimingSettings() {
//   const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
//   const cal_method = useSelector((state: RootState) => state.settings.clacMethod);
//   const timing_system = useSelector((state:RootState)=>state.settings.twentyFourSystem);
//   const asr_cal_method = useSelector((state:RootState)=>state.settings.asrCalcMehtod);
//   const custom_angles = useSelector((state:RootState)=>state.settings.customAngles);
//   // const notifications = useSelector((state:RootState)=>state.settings.notifications);
//   const auto_location = useSelector((state:RootState)=>state.settings.autoLocation);
//   const dispatch = useDispatch() 

  return (
    <ThemedView>
      {/* <ThemedView style={styles.settingsItem}>
        <ThemedText type='defaultSemiBold'>24-Hour Time</ThemedText>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={timing_system ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {dispatch(updateTimingSystem(!timing_system))}}
          value={timing_system}
        />
      </ThemedView>
      <ThemedView>
        <RNPickerSelect
          value={cal_method.toString()}
          onValueChange={(e) => { dispatch(updateCalcMethod(e)) }}
          items={[
            { label: 'University of Islamic Sciences, Karachi', value: 1 },
            { label: ' Islamic Society of North America', value: 2 },
            { label: 'Muslim World League', value: 3 },
            { label: 'Umm Al-Qura University, Makkah', value: 4 },
            { label: 'Egyptian General Authority of Survey', value: 5 },
            { label: ' Institute of Geophysics, University of Tehran', value: 7 },

          ]}
        />
      </ThemedView>



   

      <ThemedView >
        <RNPickerSelect
          value={asr_cal_method.toString()}
          onValueChange={(e) => { dispatch(updateAsrCalMehtod(e)); }}
          items={[
            { label: 'Earlier Asr Time - Schafii, Malki and Nanbali', value: 1 },
            { label: ' Later Asr Time Hanafi', value: 2 },
          ]}
        />
      </ThemedView>

      <ThemedView style={[{borderColor:useThemeColor({light:"#1c100b",dark:"#cce7d1"},'icon')},styles.settingsItem]}>
        <ThemedText type='defaultSemiBold'>Custom Angles</ThemedText>
        <TextInput
          autoCorrect={false}
          autoCapitalize='none'
          style={[{color},styles.input]}
          onChangeText={(e) => { dispatch(updateAngles(e));}}
          value={custom_angles} />
      </ThemedView>

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
      <ThemedView>

      </ThemedView>

     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsItem: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    margin: 4,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation:4,
    borderRadius:6,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})
