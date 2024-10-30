import { Image, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/core/theming';
import { loadSettings, updateAutoLocation } from '@/contexts/settingsSlice';
import { RootState } from '@/contexts/store';
// import { useColorScheme } from '@/hooks/useColorScheme';
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
import tw  from 'twrnc'
import { PraysCard } from '@/components/main/praysCard';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {

  const dispatch = useDispatch()
  const appData = useSelector((state: RootState) => state.data);
  const settings = useSelector((state: RootState) => state.settings);


  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({ name: null, nextPrayerTime: null })
  const [date, setDate] = useState<Date>(new Date());
  const [times, setTimes] = useState<Prayer[]>([]);
  const [error, setError] = useState<string>('');
  const [loading,setLoading] = useState<boolean>(false);
  const [isFirstTime,setIsFirstTime] = useState<boolean|null>(null);
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const colorScheme =useColorScheme();

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
    setLoading(true);
    const loc = await fetchLocation();
    if (loc.lat && loc.long) {
      dispatch(updateLocation(loc))
      const city = await reverseGeocode(loc.lat, loc.long)
      if (city)
        dispatch(updateCity(city));
      dispatch(updateAutoLocation(true));
      saveItem({location:{lat:loc.lat,long:loc.long},city:city}, 'appData');
    }

    if(!isFirstTime){
      saveItem(true,'isFirstTime');
      setIsFirstTime(true);
    }
    setLoading(false);
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
    
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <View style={tw`mt-5 flex-row justify-between items-center p-3`}>
        <TouchableOpacity onPress={()=>updateContent()} style={{backgroundColor:colorScheme=='dark'?Colors.dark.containerBackground:Colors.light.containerBackground,borderRadius:5,padding:3}}>
        <Ionicons size={39} name={'refresh-outline'} style={{ color }} />
        </TouchableOpacity>

        <View style={tw`justify-center items-center`}>
          <ThemedText style={tw`text-lg font-bold  font-medium`}>{converToHijr(date, settings.language)}</ThemedText>
          <ThemedText style={tw`text-sm  `}>{date.toDateString()}</ThemedText>
        </View>
        
        <TouchableOpacity onPress={() => { getLocation(); }} disabled={loading} style={{backgroundColor:colorScheme=='dark'?Colors.dark.containerBackground:Colors.light.containerBackground,borderRadius:5,padding:3}}>
          <Ionicons size={39} name={'compass-outline'} style={{ color }} />
        </TouchableOpacity>
      </View>
      <View style={tw`gap-9`}>
      <PraysCard
        nexPrayer={nextPrayer.name}
        remainingTime={<CountDown nextPrayerTime={nextPrayer.nextPrayerTime} />}
        location={appData.city}
        loading={true}
      />
       {/* {!isFirstTime && <ThemedText style={tw`flex-row align:center `}>click to reload Location</ThemedText>} */}

      <SectionContainer darkColor={Colors.dark.containerBackground} lightColor={Colors.light.containerBackground}>
        <>
          {times.map((t) => <ThemedView style={tw`rounded-2 p-3 flex-row justify-between m-1.5`} key={t.name} darkColor={Colors.dark.colorLevel2} lightColor={Colors.light.colorLevel2} >
            <ThemedText type='subtitle'>{i18n.t(t.name)}</ThemedText>
            <ThemedText type='subtitle'>{t.time && getTimeOfDate(t.time, settings.twentyFourSystem)}</ThemedText>
          </ThemedView>)}
        </>
      </SectionContainer >
      </View>
    </ParallaxScrollView>
  );
}


