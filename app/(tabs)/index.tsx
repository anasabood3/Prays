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
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { Colors } from '@/constants/Colors';
import { prayersNamesList } from '@/constants/CalcMethods';



interface PrayerTiming {
  name: string;
  time: string;
}

interface Location {
  longitude: number|null;
  latitude: number|null;
}

interface NextPrayer{
  name:string|null;
  remainingTime:string|null;
}



// get String of Date
const formatDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
}

// convert Christian date into hijri date
const converToHijr = (date: Date) => {
  let result = toHijri(date.getFullYear(), date.getMonth(), date.getDay())
  return `${result.hd}, ${hijriMonths[Number(result.hm)]} ${result.hy}`
}


const getTimeOfString= (time:string)=>{
  const now:Date = new Date();
  const timeString:string=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${time}`
  const newDate:Date= new Date(timeString);
  return newDate;
}


const getRmainingHM=(ms:number)=>{
  let minutes = Math.abs(ms / 60000);
  let hours = Math.trunc(minutes / 60);
  return (`${hours} hours and ${Math.trunc(minutes % 60)} minutes`)
}

// get the remaining time for next prayer
const getRemainingTime = (times: PrayerTiming[]) => {
  const nextPray:NextPrayer = {name:null,remainingTime:null};
  const newDay:number=86400000;
  let now: Date = new Date();

  for(let t of times){
    if(now.getTime()<getTimeOfString(t.time).getTime()){
      nextPray.name=t.name;
      nextPray.remainingTime=getRmainingHM(now.getTime()-getTimeOfString(t.time).getTime());
      break;
    }
  }
  if(nextPray.name===null && times.length!=0){
    nextPray.name=times[0].name;
    nextPray.remainingTime=getRmainingHM(now.getTime()-(getTimeOfString(times[0].time).getTime()+newDay))
  }
  return nextPray;
}

export default function HomeScreen() {


  const dispatch = useDispatch()
  const theme = useColorScheme();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');


  const cal_method = useSelector((state: RootState) => state.settings.clacMethod)
  const settings = useSelector((state: RootState) => state.settings);

  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({name:null,remainingTime:null})
  const [times, setTimes] = useState<PrayerTiming[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });


  // fetch prayer times of api
  const getPrayerTimes = async () => {
      setError(`Location not available yet...`)
      if(location.latitude&&location.longitude){
        const link: string = `http://api.aladhan.com/v1/timings/${formatDate(date)}?latitude=${location.latitude.toString()}&longitude=${location.longitude.toString()}&method=${cal_method}`
        fetch(link).then((response)=>{
          response.json().then((data)=>{
            const tempList:PrayerTiming[]=[];
            for (let x of prayersNamesList) {
              tempList.push({
                name:x,
                time:data.data.timings[x],
              })
            }
            setTimes(tempList);
            setError("");
          }).catch((error)=>{
            setError(`Error happened: ${error}`)
          });
        }).catch((error)=>{
          setError(`Error happened: ${error}`)
        });
      }
      else{
        getLocation();
      }

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
      setError("Error hppaned while storing:\n"+ e)
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
      setError("Error while loaidng:\n"+ error)
    }
  };

  const getLocation = async () => {
    CurrLocation.requestForegroundPermissionsAsync().then((result)=>{
      let state=result.status;
      if(state){
        CurrLocation.getCurrentPositionAsync({}).then((result)=>{
          console.log(result.coords)
          setLocation({ latitude: result.coords.latitude, longitude: result.coords.longitude });

        }).catch((error)=>{
          console.error(error)
        });
      }
      else{
        setError("Permission to access location was denied")
      }
    }).catch((error)=>{
      setError("Permission to access location was denied:\n"+error);
    });
  } 




  // on app run load settings
  useEffect(() => {
    fetchSettings();
  }, []);


  // get Location and update prayer times when settings changes
  useEffect(() => {
    getPrayerTimes();
    }, [date,location]);


  // on settings changes save settings and update remaining time
  useEffect(() => {
    saveSettings();
    getPrayerTimes();
  }, [settings]);

  useEffect(()=>{
    setNextPrayer(getRemainingTime(times));
  },[times]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light:'', dark:''}}
      headerImage={
        <Image
          source={theme == 'light' ? require('@/assets/images/cover.jpg') : require('@/assets/images/coverDark.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView >
        <ThemedText type='title'>{converToHijr(date)}</ThemedText>
        {
          (nextPrayer.name!==null&&nextPrayer.remainingTime!==null) &&
          <ThemedText type='subtitle'>{nextPrayer.name} in {nextPrayer.remainingTime}</ThemedText>
        }
       
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
        {times.map((t) => <ThemedView style={styles.praycard} key={t.name} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
          <ThemedText type='subtitle'>{t.name}</ThemedText>
          <ThemedText type='subtitle'>{t.time}</ThemedText>
        </ThemedView>)}

      </ThemedView >

      {error.length !== 0 &&
        <ThemedView style={styles.alertBox}>
          <ThemedText style={styles.alertMessage}>{error}</ThemedText>
        </ThemedView>
      }


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
  alertMessage:{
    color:'red',

  },
  alertBox:{
    borderWidth:2,
    borderColor:'red',
    padding:5,
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
  },

});
