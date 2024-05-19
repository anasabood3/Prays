import { Image, StyleSheet, Platform, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import * as CurrLocation from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '@/contexts/store';
import { useSelector, useDispatch } from 'react-redux'
import { toHijri } from "hijri-converter";
import { loadSettings } from '@/contexts/settingsSlice';
import { hijriMonths } from '@/constants/CalcMethods';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';



type timingNotification = 0 | 1 | 2;

interface PrayerTiming {
  name: string;
  time: string;
  noitfication: timingNotification;
}

interface Location {
  longitude: number;
  latitude: number;
}

const initialTimings: PrayerTiming[] = [
  {
    name: "Fajr",
    time: "00:00",
    noitfication: 1,
  },
  {
    name: "Sunrise",
    time: "00:00",
    noitfication: 1,
  },
  {
    name: "Dhuhr",
    time: "00:00",
    noitfication: 1,
  },
  {
    name: "Asr",
    time: "00:00",
    noitfication: 1,
  },
  {
    name: "Maghrib",
    time: "00:00",
    noitfication: 1,
  },
  {
    name: "Isha",
    time: "00:00",
    noitfication: 1,
  }
]


// get String of Date
const formatDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
}

// convert Christian date into hijri date
const converToHijr = (date: Date) => {
  let result = toHijri(date.getFullYear(), date.getMonth(), date.getDay())
  return `${result.hd}, ${hijriMonths[Number(result.hm)]} ${result.hy}`
}

// get difference of two times
const getTimeDiff = (time1: string, time2: string) => {
  // assume any date for complement and difference
  let c = "1990-12-12"
  let t1: Date = new Date(`${c} ${time1}`)
  let t2: Date = new Date(`${c} ${time2}`)
  return t1.getTime() - t2.getTime();
}

// get the remaining time for next prayer
const getRemainingTime = (times: PrayerTiming[]) => {
  let now: string = new Date().toString().slice(16, 21);
  let nextPrayer: string = "";
  let nexPrayerin = 0;
  for (let i of times) {

    let d: number = getTimeDiff(now, i.time);
    if (d < 0) {
      nexPrayerin = d;
      nextPrayer = i.name;
      break;
    }
  }
  let minutes = Math.abs(nexPrayerin / 60000);
  let hours = Math.trunc(minutes / 60);
  return (`${nextPrayer} in: ${hours} hours and ${minutes % 60} minutes`)

}


export default function HomeScreen() {


  const dispatch = useDispatch()
  const theme = useColorScheme();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');


  const cal_method = useSelector((state: RootState) => state.settings.clacMethod)
  const settings = useSelector((state: RootState) => state.settings);

  const [remaining, setRamining] = useState<string>('')
  const [times, setTimes] = useState<PrayerTiming[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<Location>({ latitude: 34, longitude: -23 });


  // fetch prayer times of api
  const getPrayerTimes = async () => {
    const link: string = `http://api.aladhan.com/v1/timings/${formatDate(date)}?latitude=${location?.latitude.toString()}&longitude=${location.longitude.toString()}&method=${cal_method}`
    const response = await fetch(link);
    const data = await response.json();
    for (let x of initialTimings) {
      x.time = data.data.timings[x.name]
    }
    console.log(link)
    setTimes(initialTimings);
  }

  //generate next days or previous days
  const getNewDate = (amount: number) => {
    const newDate: Date = new Date(date);
    newDate.setDate(date.getDate() + amount);
    setDate(new Date(newDate));
  }

  // save settings global state into local storage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(settings));
    } catch (e) {
      console.log("Error hppaned while storing:" + e)
    }
  };

  // load app settings of local storage
  const fetchSettings = async () => {
    try {
      const value = await AsyncStorage.getItem('settings');
      if (value !== null) {
        dispatch(loadSettings(JSON.parse(value)));

      }
      else {
        console.log("not found settings")
      }
    } catch (error) {
      console.log('could not load user prefernces')
    }
  };

  // get Location and update prayer times when settings changes
  useEffect(() => {
    // get Location
    (async () => {
      let { status } = await CurrLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await CurrLocation.getCurrentPositionAsync({});
      setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    })();
    getPrayerTimes();
  }, [date, cal_method,settings.asrCalcMehtod,settings.fajrAngle,settings.ishaaAngle,settings.twentyFourSystem]);

  // on app run load settings
  useEffect(() => {
    fetchSettings();
  }, []);
  // on settings changes save settings and update remaining time
  useEffect(() => {
    setRamining(getRemainingTime(times));
    saveSettings();
  }, [settings])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={theme == 'light' ? require('@/assets/images/cover.jpg') : require('@/assets/images/coverDark.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView >
        <ThemedText type='title'>{converToHijr(date)}</ThemedText>
        <ThemedText type='subtitle'>{remaining}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.location}>
        <ThemedText type='defaultSemiBold'> </ThemedText>
      </ThemedView>


      <ThemedView style={styles.location}>

        <Pressable onPress={() => { getNewDate(-1) }} >
          <Ionicons size={28} name={'chevron-back-circle-outline'} style={{ color }} />
        </Pressable>



        <ThemedView style={styles.date}>
          <Pressable onPress={() => setDate(new Date())} >
            <ThemedText type='defaultSemiBold'>{date.toDateString()}</ThemedText>
          </Pressable>

        </ThemedView>

        <Pressable onPress={() => { getNewDate(1) }}>
          <Ionicons size={28} name='chevron-forward-circle-outline' style={{ color }} />
        </Pressable>
      </ThemedView>

      <ThemedView>

        {times.map((t) => <ThemedView style={styles.praycard} key={t.name} lightColor='#FFE6A7' darkColor='#22333B'>
          <ThemedText type='subtitle'>{t.name}</ThemedText>
          <ThemedText type='subtitle'>{t.time}</ThemedText>
        </ThemedView>)}
      </ThemedView>
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
  }
});
