import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { updateFajrAngle, updateIshaaAngle, updateAsrCalMehtod, updateCityLocation, updateCalcMethod, updateTimingSystem, updateAdjustments, updateAutoSettings, resetAdjustments, updateAutoLocation } from '@/contexts/settingsSlice';
import { clacMethods, asrCalcMethods, cities } from '@/constants/GeneralConstans';
import { SelectMenu } from '../SelectMenu';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import Adjustment from './Adjustment';
import { Collapsible } from '../Collapsible';
import SettingsSwitch from './SettingsSwitch';
import SettingsSlider from './SettingsSlider';
import { SettingsItem } from './ThemeItem';
import { i18n } from '@/core/translate';
import { SectionContainer } from '../Containers';
import { fetchLocation, geocode, reverseGeocode } from '@/core/location';
import { updateCity, updateLocation } from '@/contexts/dataSlice';
import { saveItem } from '@/core/storage';
import tw from 'twrnc'


export default function TimingSettings() {

  const cal_method = useSelector((state: RootState) => state.settings.clacMethod);
  const timing_system = useSelector((state: RootState) => state.settings.twentyFourSystem);
  const asr_cal_method = useSelector((state: RootState) => state.settings.asrCalcMehtod);
  const fajr_angle = useSelector((state: RootState) => state.settings.fajrAngle);
  const ishaa_angle = useSelector((state: RootState) => state.settings.ishaaAngle);
  const city_location = useSelector((state: RootState) => state.settings.cityLocation);
  const auto_location = useSelector((state: RootState) => state.settings.autoLocation);
  const auto_settings = useSelector((state: RootState) => state.settings.autoSettings);
  const dispatch = useDispatch();

  const updateSelectedCity = async (city:string)=>{
    dispatch(updateCityLocation(city));
    dispatch(updateCity(city))
    const cityCode = await geocode(city);
    dispatch(updateLocation(cityCode));
    saveItem({location:cityCode,city:city},'appData');
  }

  const switchLocation = async (e:boolean) => {
    if (e) {
      const loc = await fetchLocation();
      if (loc.lat && loc.long) {
        dispatch(updateLocation(loc))
        const city = await reverseGeocode(loc.lat, loc.long)
        if (city)
          dispatch(updateCity(city))
      }

    }
    else {
      updateSelectedCity(city_location)
    }
  }

  return (
    <SectionContainer
      darkColor={Colors.dark.containerBackground}
      lightColor={Colors.light.containerBackground}>

      <>
        <SettingsItem>
          <SettingsSwitch
            title={i18n.t("auto_settings")}
            value={auto_settings}
            behaviour={(e) => { dispatch(updateAutoSettings(e)); }} />
        </SettingsItem>
        <SettingsItem>
          <SettingsSwitch
            title={i18n.t("timing_system")}
            value={timing_system}
            behaviour={(e) => dispatch(updateTimingSystem(e))} />
        </SettingsItem>

        <View style={tw`my-[6]`}>
          <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("location_settings")}</ThemedText>
          <SettingsItem>
            <SettingsSwitch
              title={i18n.t("auto_location")}
              value={auto_location}
              behaviour={(e) => {dispatch(updateAutoLocation(e));switchLocation(e);}} />
          </SettingsItem>
          {!auto_location&& <>
            <SettingsItem>
              <SelectMenu
                data={cities}
                value={city_location}
                updateSelected={(e) => { updateSelectedCity(e.value) }}
                placeHolder='select city...'
              />


            </SettingsItem>
          </>}
        </View>


        {
          auto_settings == false &&
          <>
            <View style={tw`my-[6]`}>
              <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("calculation_method")}</ThemedText>
              <SettingsItem >
                <SelectMenu
                  data={clacMethods}
                  value={cal_method.toString()}
                  updateSelected={(e) => { dispatch(updateCalcMethod(e.label)) }}
                  placeHolder={cal_method}>
                </SelectMenu>
              </SettingsItem>
            </View>


            <View style={tw`my-[6]`}>
              <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t("asr_calulation_method")}</ThemedText>
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

            <SettingsItem >
              <Collapsible title={i18n.t("Adjustments")} isBold>
                <Adjustment label='fajr' action={(e) => { dispatch(updateAdjustments({ label: "fajr", value: e })); }} />
                <Adjustment label='sunrise' action={(e) => dispatch(updateAdjustments({ label: "sunrise", value: e }))} />
                <Adjustment label='dhuhr' action={(e) => dispatch(updateAdjustments({ label: "dhuhr", value: e }))} />
                <Adjustment label='asr' action={(e) => dispatch(updateAdjustments({ label: "asr", value: e }))} />
                <Adjustment label='maghrib' action={(e) => dispatch(updateAdjustments({ label: "maghrib", value: e }))} />
                <Adjustment label='isha' action={(e) => dispatch(updateAdjustments({ label: "isha", value: e }))} />
                <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center',padding:5,backgroundColor:'grey',margin:12, }} onPress={()=>dispatch(resetAdjustments(0))}  >
                  <ThemedText >Reset</ThemedText>
                </TouchableOpacity>
              </Collapsible>
            </SettingsItem>
          </>
        }


        <View style={tw`my-[6]`}>
          <SettingsItem>
            <Collapsible
              title={i18n.t("custom_angels")}
              isBold>
              <SettingsSlider
                label={'Fajr'}
                minimumValue={-19}
                maximumValue={19}
                step={.5}
                value={fajr_angle}
                behviour={(e) => dispatch(updateFajrAngle(e))} />

              <SettingsSlider
                label={'Isha'}
                minimumValue={-19}
                maximumValue={19}
                step={.5}
                value={ishaa_angle}
                behviour={(e) => dispatch(updateIshaaAngle(e))} />
              <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center', padding: 5, backgroundColor: 'grey', margin: 12, }} onPress={()=>{dispatch(updateIshaaAngle(12));dispatch(updateFajrAngle(12))}} >
                <ThemedText >Reset</ThemedText>
              </TouchableOpacity>
            </Collapsible>
          </SettingsItem>
        </View>
      </>
    </SectionContainer>

  );
}

