import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, TouchableOpacity, View, } from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from '@/contexts/store';
import { useSelector } from 'react-redux';
import { i18n } from '@/scripts/translate';
import { useEffect, useState } from 'react';
import CalendarDays, { CalendarItem } from '@/components/CalenderDays';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NextPrayer, Prayer, getPrayerTimes, getPrayerTimes1, getPrayerTimes2, getRemainingTime, saveSettings } from '@/scripts/prayers-functions';
import { Colors } from '../theming';
import { converToHijr, getTimeOfDate } from '@/scripts/time-functions';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const months = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October",
  "November", "December"];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export default function CalendarTab() {

  const [currentDay, setCurrentDay] = useState(new Date());
  const [times, setTimes] = useState<Prayer[]>([]);
  const settings = useSelector((state: RootState) => state.settings);



  const theme = useSelector((state: RootState) => state.settings.theme);
  const lang = useSelector((state: RootState) => state.settings.language);
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  const nextMonth = () => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, currentDay.getDate()));
  const previousMonth = () => setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, currentDay.getDate()));
  const changeCurrentDay = (date: CalendarItem) => setCurrentDay(new Date(date.year, date.month, date.number));
  useEffect(() => {
    console.log(currentDay);
    let tempData: Prayer[] = []
    tempData = getPrayerTimes(49.4, 11.7, settings.clacMethod, currentDay, settings.fajrAngle, settings.ishaaAngle, settings.asrCalcMehtod, Object.values(settings.adjustments), settings.autoSettings)
    setTimes(tempData);
  }, [currentDay]);
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <View style={{display:'flex',justifyContent:'space-between',marginVertical:30,rowGap:30,flexDirection:'column'}}>
      {/*Title */}
      <ThemedView style={[styles.titleContainer, { justifyContent: lang == 'ar' ? 'flex-end' : 'flex-start' }]}>
        <ThemedText type="title" style={{ padding: 3 }}>{i18n.t("Calendar")}</ThemedText>
      </ThemedView>

      {/* Prayers */}
      <ThemedView style={styles.prayersCard} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
        <View style={styles.prayerCardHeader}>
        <ThemedText type='subtitle' style={{alignItems:'center',justifyContent:'center'}}>{converToHijr(currentDay, settings.language)}</ThemedText>

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
          <TouchableOpacity style={{flexGrow:1,alignItems:'center'}} onPress={() => { setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()-1)) }} >
            <ThemedText type='defaultSemiBold'>{i18n.t('previous')}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={{flexGrow:1,alignItems:'center'}} onPress={() => { setCurrentDay(new Date()) }} >
            <ThemedText type='defaultSemiBold'>{i18n.t('today')}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={{flexGrow:1,alignItems:'center'}} onPress={() => { setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()+1)) }} >
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
    flexDirection: 'row',
    gap: 8,
  },
  calenderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 7,

  },
  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomEndRadius:7,
    borderBottomStartRadius:7,
    padding:7
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
  },
  prayersCard: {
    borderRadius: 8,
    padding: 5,
  },
  prayerCardRow: {
    flexDirection: "row",
    justifyContent: 'space-between',

  },
  prayerCardHeader:{
    flexDirection: "row",
    justifyContent: 'center'
  }
});
