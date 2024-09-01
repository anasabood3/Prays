import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground, Pressable, StyleSheet, TouchableOpacity, View, } from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from '@/contexts/store';
import { useSelector } from 'react-redux';
import { i18n } from '@/core/translate';
import { useCallback, useEffect, useState } from 'react';
import CalendarDays, { CalendarItem } from '@/components/calendar/CalenderDays';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NextPrayer, Prayer, getPrayerTimes, getPrayerTimes1, getPrayerTimes2, getRemainingTime, saveSettings } from '@/core/prayers-functions';
import { Colors } from '../theming';
import { converToHijr, getTimeOfDate } from '@/core/time-functions';
import PatternBackground from '@/components/PatternBackground';


const months = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October",
  "November", "December"];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export default function CalendarTab() {

  const [currentDay, setCurrentDay] = useState(new Date());
  // const [times, setTimes] = useState<Prayer[]>([]);
  const settings = useSelector((state: RootState) => state.settings);
  const location = useSelector((state:RootState)=>state.data.location);  

  const lang = useSelector((state: RootState) => state.settings.language);
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const nextMonth = () => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate()));
  const previousMonth = () => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate()));
  const changeCurrentDay = (date: CalendarItem) => setCurrentDay(new Date(date.year, date.month, date.number));
  let times:Prayer[] = [];
  console.log(location)
  if (location.lat && location.long) {


    times = getPrayerTimes(location.lat, location.long, settings.clacMethod, currentDay, settings.fajrAngle, settings.ishaaAngle, settings.asrCalcMehtod, Object.values(settings.adjustments), settings.autoSettings);
  }
  
  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <View style={[styles.titleContainer, { justifyContent: lang == 'ar' ? 'flex-end' : 'flex-start' }]}>
        <ThemedText type="title" style={{ padding: 3 }}>{i18n.t("Calendar")}</ThemedText>
      </View>
      <View style={{ display: 'flex', justifyContent: 'space-between', marginVertical: 8, rowGap: 30, flexDirection: 'column' }}>
        {/*Title */}


        {/* Prayers */}

        <ThemedView  style={styles.prayersCard} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
          <View style={styles.prayerCardHeader}>
            <ThemedText type='subtitle' style={{ alignItems: 'center', justifyContent: 'center' }}>{converToHijr(currentDay, settings.language)}</ThemedText>

          </View>

          <View style={styles.prayerCardRow}>
            {times.map((prayer) => { return (<ThemedText type='defaultSemiBold' style={{ margin: 7 }} key={prayer.name}>{i18n.t(prayer.name)}</ThemedText>) })}
          </View>
          <View style={styles.prayerCardRow}>
            {times.map((prayer) => { return (<ThemedText type="defaultSemiBold" style={{ margin: 7 }} key={prayer.name}>{prayer.time && getTimeOfDate(prayer.time, settings.twentyFourSystem)}</ThemedText>) })}
          </View>
         
        </ThemedView>
        {/* Calender */}
        <ThemedView lightColor={Colors.light.containerBackground} darkColor={Colors.dark.containerBackground} style={{ borderRadius: 8 }}>
        
          <View id='calender-header' style={styles.calenderHeader}>
            <Pressable onPress={() => { previousMonth() }} >
              <Ionicons size={28} name={'chevron-back-circle-outline'} style={{ color }} />
            </Pressable>

            <ThemedText type='subtitle'>{months[currentDay.getMonth()]}  {currentDay.getFullYear()}</ThemedText>
            <Pressable onPress={() => { nextMonth() }} >
              <Ionicons size={28} name={'chevron-forward-circle-outline'} style={{ color }} />
            </Pressable>

          </View>
          <View style={styles.weekDaysHeader}>
            {
              weekDays.map((day) => <ThemedText type='defaultSemiBold' key={day} style={{ fontSize: 18, alignItems: 'center' }}>{day}</ThemedText>)
            }
          </View>


          <View style={styles.titleContainer}>
            <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
          </View>

          <ThemedView style={styles.calendarFooter} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
            <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center' }} onPress={() => { setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 1)) }} >
              <ThemedText type='defaultSemiBold'>{i18n.t('previous')}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center' }} onPress={() => { setCurrentDay(new Date()) }} >
              <ThemedText type='defaultSemiBold'>{i18n.t('today')}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center' }} onPress={() => { setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1)) }} >
              <ThemedText type='defaultSemiBold'>{i18n.t('next')}</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    padding: 6,
    marginTop:22,
  },
  calenderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 7,

  },
  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    padding: 7
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
  },
  prayersCard: {
    borderRadius: 8,
    padding: 5,
    paddingVertical: 12,
  },
  prayerCardRow: {
    flexDirection: "row",
    justifyContent: 'space-between',

  },
  prayerCardHeader: {
    flexDirection: "row",
    justifyContent: 'center'
  }
});
