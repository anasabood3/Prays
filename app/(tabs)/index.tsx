import { Image, Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { loadSettings } from '@/contexts/settingsSlice';
import { RootState } from '@/contexts/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { converToHijr, getTimeOfDate } from '@/core/time-functions';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CurrLocation from 'expo-location';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPrayer, Prayer, getPrayerTimes, getRemainingTime, saveSettings } from '@/core/prayers-functions';
import { i18n } from '@/core/translate';
import CountDown from '@/components/CountDown';
import { updateLocation } from '@/contexts/dataSlice';
import { SectionContainer } from '@/components/Containers';
import useSkipFirstRender from '@/hooks/useSkipFirstRender';


export interface Location {
  lat: number | null;
  long: number | null;
}

export default function HomeScreen() {

  const dispatch = useDispatch()
  const theme = useColorScheme();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const checkFirstRender = useRef(true);

  const [date, setDate] = useState<Date>(new Date());
  const location = useSelector((state: RootState) => state.data.location);
  const cal_method = useSelector((state: RootState) => state.settings.clacMethod)
  const settings = useSelector((state: RootState) => state.settings);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({ name: null, nextPrayerTime: null })
  const [times, setTimes] = useState<Prayer[]>([]);
  const [error, setError] = useState<string>('');



  const [settingsLoaded, setSettingsLoaded] = useState<boolean>(false);
  const [locationLoaded,setLocationLoaded] = useState<boolean>(false);


  const saveLocation = (loc: Location) => {
    AsyncStorage.setItem('location', JSON.stringify(loc)).catch((error) => {
      setError("Error hppaned while storing location:\n" + error)
    });
  }

  // load app settings of local storage
  const getLocation = () => {
    AsyncStorage.getItem('location').then((data) => {
      if (data) {
        dispatch(updateLocation(JSON.parse(data)));
        setLocationLoaded(true);
      }
      else {
        fetchLocation();
      }
        
    }).catch((error) => {
      setError("Error while loading location\n" + error)
    });
  }



  const fetchLocation = () => {
    CurrLocation.requestForegroundPermissionsAsync().then((result) => {
      let state = result.status;
      if (state) {
        CurrLocation.getCurrentPositionAsync({}).then((result) => {
          dispatch(updateLocation(({ lat: result.coords.latitude, long: result.coords.longitude })));
          setLocationLoaded(true);
        }).catch((error) => {
          console.error(error);

        });
      }
      else {
        console.log("Permission to access location was denied");
        setError("Geo Location Access Denied\nApp cannot work properly without location !")
      }
    }).catch((error) => {
      console.log("Error while getting location\n" + error);
    });
  }

  // load app settings of local storage
  const fetchSettings = () => {
    AsyncStorage.getItem('settings').then((data) => {
      if (data) {
        const loadedData = JSON.parse(data);
        dispatch(loadSettings(loadedData));
        setSettingsLoaded(true);
        console.log('settings loaded')
      }
      else {
        setSettingsLoaded(true);
      }
    })
      .catch((error) => console.log(error));
  };



  // get prayers and update location
  const updateContent = () => {
    console.log('update useEffect called: '+location.lat+" : "+location.long);
    if (location.lat && location.long) {
      const prayers = getPrayerTimes(location.lat, location.long, cal_method, date, settings.fajrAngle, settings.ishaaAngle, settings.asrCalcMehtod, Object.values(settings.adjustments), settings.autoSettings);
      setTimes(prayers);
      setNextPrayer(getRemainingTime(prayers));
    }
  }


  
  // on app run load settings
  useEffect(() => {
    // getCityLocation();
    fetchSettings();
  }, []);


  useSkipFirstRender(() => {
    if (settings.autoLocation)
      fetchLocation();
    else
      getLocation();

    console.log('location useEffect called')
  }, [settingsLoaded]);

  useSkipFirstRender(() => {
    updateContent();
    saveLocation(location);
    
  }, [locationLoaded,location])

  useSkipFirstRender(() => {
    console.log('save settings use effect called');
    saveSettings(settings);
    if (settingsLoaded && locationLoaded)
      updateContent();
    
  }, [settings])

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
        <ThemedText type='defaultSemiBold'> </ThemedText>
      </View>


    

      {/* <View style={styles.location}>

        <Pressable onPress={() => { getNewDate(-1) }} >
          <Ionicons size={28} name={'chevron-back-circle-outline'} style={{ color }} />
        </Pressable>



        <View style={styles.date}>
          <Pressable onPress={() => { setDate(new Date()); }} >
            <ThemedText type='defaultSemiBold'>{date.toDateString()}</ThemedText>
          </Pressable>
        </View>

        <Pressable onPress={() => { getNewDate(1) }}>
          <Ionicons size={28} name='chevron-forward-circle-outline' style={{ color }} />
        </Pressable>
      </View> */}

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
    padding: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
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
