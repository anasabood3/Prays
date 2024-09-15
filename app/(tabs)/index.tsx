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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPrayer, Prayer, getPrayerTimes, getRemainingTime, saveSettings } from '@/core/prayers-functions';
import { i18n } from '@/core/translate';
import CountDown from '@/components/CountDown';
import { updateLocation } from '@/contexts/dataSlice';

export interface Location {
  lat: number | null;
  long: number | null;
}

export default function HomeScreen() {

  const dispatch = useDispatch()
  const theme = useColorScheme();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');


  const [date, setDate] = useState<Date>(new Date());
  const location = useSelector((state:RootState)=>state.data.location);
  const cal_method = useSelector((state: RootState) => state.settings.clacMethod)
  const settings = useSelector((state: RootState) => state.settings);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({ name: null, nextPrayerTime: null })
  const [times, setTimes] = useState<Prayer[]>([]);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);


  const saveLocation = (loc: Location) => {
    AsyncStorage.setItem('location', JSON.stringify(loc)).catch((error) => {
      setError("Error hppaned while storing location:\n" + error)
    });
  }

  // load app settings of local storage
  const loadLocation = () => {
    AsyncStorage.getItem('location').then((data) => {
      if (data) {
        dispatch(updateLocation(JSON.parse(data)));
      }
      else
        getLocation();
    }).catch((error) => {
      setError("Error while loading lcation\n" + error)
    });
  }

  // load app settings of local storage
  const fetchSettings = () => {
    AsyncStorage.getItem('settings').then((data) => {
      if (data) {
        const loadedData = JSON.parse(data);
        dispatch(loadSettings(loadedData));
        setLoaded(true);
      }
      else {
        setLoaded(true);
      }
    })
      .catch((error) => console.log(error));
  };

  const getLocation = () => {
    CurrLocation.requestForegroundPermissionsAsync().then((result) => {
      let state = result.status;
      if (state) {
        CurrLocation.getCurrentPositionAsync({}).then((result) => {
          dispatch(updateLocation(({ lat: result.coords.latitude, long: result.coords.longitude })));
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


  //generate next days or previous days
  const getNewDate = (amount: number) => {
    const newDay: number = 86400000;
    setDate(new Date(date.getTime() + (amount * newDay)));
  }

  // get prayers and update location
  const updateContent = () => {
    if (settings.autoLocation) {
      if (location.lat && location.long) {
        const prayers = getPrayerTimes(location.lat, location.long, cal_method, date, settings.fajrAngle, settings.ishaaAngle, settings.asrCalcMehtod, [],settings.autoSettings);
        setTimes(prayers);
      }
      else
        getLocation();
    }
    else {
      if (location.lat && location.long) {
        const prayers = getPrayerTimes(location.lat, location.long, cal_method, date, settings.fajrAngle, settings.ishaaAngle, settings.asrCalcMehtod, Object.values(settings.adjustments),settings.autoSettings);
        setTimes(prayers);
      }
      else
        loadLocation();
    }
    
  }

  // on app run load settings
  useEffect(() => {
    fetchSettings();
  }, []);

  // get Location and update prayer times when settings changes
  useEffect(() => {
    if (loaded) {
      updateContent();
    }
  }, [date]);

  useEffect(() => {
    if (loaded) {
      updateContent();
      setNextPrayer(getRemainingTime(times));
    }
  }, [loaded]);

  useEffect(() => {
    updateContent();
    setNextPrayer(getRemainingTime(times));
    saveLocation(location);
  }, [location]);

  useEffect(()=>{
    setDate(new Date());
  },[settings]);

  // on settings changes save settings and update prayers page
  useEffect(() => {
    if (loaded) {
      updateContent();
      setNextPrayer(getRemainingTime(times));
      saveSettings(settings);
    }
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
        <ThemedText style={{ paddingVertical: 7,fontSize:28 }} type='title'>{converToHijr(date, settings.language)}</ThemedText>

      </View>
      <View style={settings.language=="ar"?{flexDirection:'row-reverse'}:{flexDirection:"row"}}>
        <ThemedText type='subtitle'>{(nextPrayer.name)&&`${i18n.t(nextPrayer.name)} ${i18n.t("in")}: `}</ThemedText>
        <CountDown nextPrayerTime={nextPrayer.nextPrayerTime} />
      </View>

      <View style={styles.location}>
        <ThemedText type='defaultSemiBold'> </ThemedText>
      </View>



      <View style={styles.location}>

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
      </View>

      <View>
        {times.map((t) => <ThemedView style={styles.praycard} key={t.name} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
          <ThemedText type='subtitle'>{i18n.t(t.name)}</ThemedText>
          <ThemedText type='subtitle'>{t.time && getTimeOfDate(t.time, settings.twentyFourSystem)}</ThemedText>
        </ThemedView>)}
      </View >


      {/* {error.length !== 0 &&
        <ThemedView style={styles.alertBox}>
          <ThemedText style={styles.alertMessage}>{error}</ThemedText>
        </ThemedView>
      } */}
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
    opacity:12,
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
