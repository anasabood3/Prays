import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { updateFajrAngle, updateIshaaAngle, updateAsrCalMehtod, updateAutoLocation, updateCalcMethod, updateTimingSystem } from '@/contexts/settingsSlice';
import { clacMethods, asrCalcMethods } from '@/constants/GeneralConstans';
import { SelectMenu } from '../SelectMenu';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import Adjustment from './Adjustment';
import { Collapsible } from '../Collapsible';
import SettingsSwitch from './SettingsSwitch';
import SettingsSlider from './SettingsSlider';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TimingSettings() {


  const color = useThemeColor({ light: "black", dark: "white" }, 'text');
  const cal_method = useSelector((state: RootState) => state.settings.clacMethod);
  const timing_system = useSelector((state: RootState) => state.settings.twentyFourSystem);
  const asr_cal_method = useSelector((state: RootState) => state.settings.asrCalcMehtod);
  const fajr_angle = useSelector((state: RootState) => state.settings.fajrAngle);
  const ishaa_angle = useSelector((state: RootState) => state.settings.ishaaAngle);
  const auto_location = useSelector((state: RootState) => state.settings.autoLocation);
  const dispatch = useDispatch();

  return (

      <ThemedView
      darkColor={Colors.dark.containerBackground}
      lightColor={Colors.light.containerBackground}
      style={styles.contianer}
      >
      <SettingsItem>
        <SettingsSwitch
          title={"24-Hour Time"}
          value={timing_system}
          behaviour={(e) => dispatch(updateTimingSystem(e))} />
      </SettingsItem>



      <SettingsItem>
        <SettingsSwitch
          title={"Auto Location"}
          value={auto_location}
          behaviour={(e) => dispatch(updateAutoLocation(e))} />
      </SettingsItem>



      <View style={styles.MultipleContainer}>
        <ThemedText type='defaultSemiBold' style={{paddingLeft:12}}>Calculation Method</ThemedText>
        <SettingsItem >
          <SelectMenu
            data={clacMethods}
            value={cal_method.toString()}
            updateSelected={(e) => { dispatch(updateCalcMethod(e.label)) }}
            placeHolder={cal_method}>
          </SelectMenu>
        </SettingsItem>
      </View>


      <View style={styles.MultipleContainer}>
        <ThemedText type='defaultSemiBold' style={{paddingLeft:12}}>Asr Method</ThemedText>
        <SettingsItem>
          <SelectMenu
            data={asrCalcMethods}
            value={asr_cal_method.toString()}
            updateSelected={(e) => { dispatch(updateAsrCalMehtod(e.value)) }}
            placeHolder={asrCalcMethods[asr_cal_method - 1].label}
          >
          </SelectMenu>
        </SettingsItem>
      </View>



      <View style={styles.MultipleContainer}>
        <SettingsItem>
          <Collapsible
          title='Custom Angels'>
          <SettingsSlider
            label={'Fajr Angel'}
            minimumValue={-19}
            maximumValue={19}
            step={.5}
            value={fajr_angle}
            behviour={(e) => dispatch(updateFajrAngle(e))}
          />
          <SettingsSlider
            label={'Ishaa Angel'}
            minimumValue={-19}
            maximumValue={19}
            step={.5}
            value={ishaa_angle}
            behviour={(e) => dispatch(updateIshaaAngle(e))}
          />
          </Collapsible>
        </SettingsItem>




      </View>


      <SettingsItem >
        <Collapsible title='Adjustments'>
          <Adjustment index={0} label='Fajr' />
          <Adjustment index={1} label='Sunrise' />
          <Adjustment index={2} label='Dhuhr' />
          <Adjustment index={3} label='Asr' />
          <Adjustment index={4} label='Maghrib' />
          <Adjustment index={5} label='Ishaa' />
          </Collapsible>
      </SettingsItem>


      </ThemedView>

  );
}

const styles = StyleSheet.create({
  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 1,
  },

  settingsItem: {
    margin: 5,
    borderRadius: 6,
    padding:5,

  },
  MultipleContainer: {
    marginVertical: 6,
  },
  contianer:{
    borderRadius:5,
    padding:8
  }

})

interface SettingsItemProps{
  children:JSX.Element;
}
const SettingsItem = (props:SettingsItemProps)=>{
  return (
    <ThemedView
    style={styles.settingsItem}
    lightColor={Colors.light.colorLevel2}
    darkColor={Colors.dark.colorLevel2}>
      {props.children}
    </ThemedView>
  );
}
