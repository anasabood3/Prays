import { Image, Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { loadSettings, updateAutoLocation } from '@/contexts/settingsSlice';
import { RootState } from '@/contexts/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { converToHijr, getTimeOfDate } from '@/core/time-functions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPrayer, Prayer, getPrayerTimes, getRemainingTime, saveSettings } from '@/core/prayers-functions';
import { i18n } from '@/core/translate';
import CountDown from '@/components/CountDown';
import { loadData, updateCity, updateLocation } from '@/contexts/dataSlice';
import { SectionContainer } from '@/components/Containers';
import useSkipFirstRender from '@/hooks/useSkipFirstRender';
import { fetchLocation, reverseGeocode } from '@/core/location';
import { loadItem, saveItem } from '@/core/storage';

export default function HomeScreen() {

  const dispatch = useDispatch()
  const theme = useColorScheme();
  
  const appData = useSelector((state: RootState) => state.data);
  const settings = useSelector((state: RootState) => state.settings);


  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({ name: null, nextPrayerTime: null })
  const [date, setDate] = useState<Date>(new Date());
  const [times, setTimes] = useState<Prayer[]>([]);
  const [error, setError] = useState<string>('');
  const [isFirstTime,setIsFirstTime] = useState<boolean|null>(null);

  // load app settings of local storage
  const loadAppData = async () => {
    const data = await loadItem('appData');
    if (data) {
      dispatch(loadData(JSON.parse(data)));
    }
  }

  // load app settings of local storage
  const fetchSettings = async () => {
    const data = await loadItem('settings');
    if (data) {
      dispatch(loadSettings(JSON.parse(data)));
    }
  }

  // get prayers and update location
  const updateContent = () => {
      const prayers = getPrayerTimes(appData.location.lat, appData.location.long, settings.clacMethod, date, settings.fajrAngle, settings.ishaaAngle, settings.asrCalcMehtod, Object.values(settings.adjustments), settings.autoSettings);
      setTimes(prayers);
      setNextPrayer(getRemainingTime(prayers));
  }

  const getLocation = async () => {
    const loc = await fetchLocation();
    if (loc.lat && loc.long) {
      dispatch(updateLocation(loc))
      const city = await reverseGeocode(loc.lat, loc.long)
      if (city)
        dispatch(updateCity(city));
      dispatch(updateAutoLocation(true));
      saveItem(appData, 'appData');
    }
    if(!isFirstTime){
      saveItem(true,'isFirstTime');
      setIsFirstTime(true);
    }
  }

  // on app run load settings
  useEffect(() => {    
    fetchSettings();
    loadAppData();

   ( async ()=>{
      const x  = await loadItem('isFirstTime');
      if(x) {
        setIsFirstTime(JSON.parse(x))
      }
    })();
  }, []);

  useEffect(() => {
    updateContent();
  }, [appData.location]);

  useSkipFirstRender(() => {
    saveSettings(settings);
    updateContent();
  }, [settings]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '', dark: '' }}
      headerImage={
        <Image
          source={theme == 'light' ? require('@/assets/images/cover.jpg') : require('@/assets/images/coverDark.jpg')}
          style={styles.reactLogo}
        />
      }>
      <View>
        <ThemedText style={{ paddingVertical: 7, fontSize: 28 }} type='title'>{converToHijr(date, settings.language)}</ThemedText>
      </View>

      <View style={{ flexDirection: "row" }}>
        <ThemedText type='subtitle'>{(nextPrayer.name) && `${i18n.t(nextPrayer.name)} ${i18n.t("in")}: `}</ThemedText>
        <CountDown nextPrayerTime={nextPrayer.nextPrayerTime} />
      </View>

      <View style={styles.location}>
        <Pressable onPress={() => { getLocation() }}>
          <ThemedText>{appData.city}</ThemedText>
        </Pressable>
        {!isFirstTime && <ThemedText>click to reload Action</ThemedText>}
      </View>

      <SectionContainer darkColor={Colors.dark.containerBackground} lightColor={Colors.light.containerBackground}>
        <>
          {times.map((t) => <ThemedView style={styles.praycard} key={t.name} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
            <ThemedText type='subtitle'>{i18n.t(t.name)}</ThemedText>
            <ThemedText type='subtitle'>{t.time && getTimeOfDate(t.time, settings.twentyFourSystem)}</ThemedText>
          </ThemedView>)}
        </>
      </SectionContainer >
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  alertMessage: {
    color: 'red',
  },
  alertBox: {
    borderWidth: 2,
    borderColor: 'red',
    padding: 5,
  },
  praycard: {
    borderRadius: 5,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 12,
  },
  timing: {
    flexDirection: "row",
    gap: 20,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  date:
  {
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
  },
});
