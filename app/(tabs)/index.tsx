import { Image, Pressable, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { loadSettings } from '@/contexts/settingsSlice';
import { RootState } from '@/contexts/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { converToHijr, formatDate, getTimeOfDate } from '@/scripts/time-functions';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CurrLocation from 'expo-location';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPrayer, Prayer, Location, getPrayerTimes, getRemainingTime } from '@/scripts/prayers-functions';
import { i18n } from '../../scripts/translate';

export default function HomeScreen() {

  const dispatch = useDispatch()
  const theme = useColorScheme();
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  const cal_method = useSelector((state: RootState) => state.settings.clacMethod)
  const settings = useSelector((state: RootState) => state.settings);

  const [nextPrayer, setNextPrayer] = useState<NextPrayer>({name:null,remainingTime:null})
  const [times, setTimes] = useState<Prayer[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });


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
        console.log("Settings not found")
      }
    } catch (error) {
      setError("Error while loading sttings\n"+ error)
    }
  };

  const getLocation = async () => {
    CurrLocation.requestForegroundPermissionsAsync().then((result)=>{
      let state=result.status;
      if(state){
        CurrLocation.getCurrentPositionAsync({}).then((result)=>{
          setLocation({ latitude: result.coords.latitude, longitude: result.coords.longitude });
        }).catch((error)=>{
          console.error(error)
        });
      }
      else {
        setError("Permission to access location was denied")
      }
    }).catch((error) => {
      setError("Error while getting location\n" + error);
    });
  }


  //generate next days or previous days
  const getNewDate = (amount: number) => {
    const newDate: Date = new Date(date);
    newDate.setDate(date.getDate() + amount);
    setDate(new Date(newDate));
  }

  // get prayers and update location
  const updateContent = () => {
    if(location.latitude&&location.longitude){
      const prayers = getPrayerTimes(location.latitude,location.longitude, cal_method, date,settings.fajrAngle,settings.ishaaAngle,settings.asrCalcMehtod,settings.adjustments);
      setTimes(prayers);
    }
    else
      getLocation();
  }


  // on app run load settings
  useEffect(() => {
    fetchSettings().catch(()=>updateContent());
  }, []);


  // get Location and update prayer times when settings changes
  useEffect(() => {
    updateContent();
    }, [date]);


  // on settings changes save settings and update prayers page
  useEffect(() => {
    updateContent();
    setNextPrayer(getRemainingTime(times));
  }, [settings,location]);


  // on settings changes save settings
  useEffect(() => {
    saveSettings();
  }, [settings]);

  // useEffect(()=>{
  //   i18n.locale=settings.language;
  // },[settings.language]);

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
          <ThemedText type='subtitle'>{i18n.t(nextPrayer.name)} {i18n.t('in')}: {nextPrayer.remainingTime}</ThemedText>
        }
       
      </ThemedView>

      <ThemedView style={styles.location}>
        <ThemedText type='defaultSemiBold'> </ThemedText>
      </ThemedView>

      <ThemedView style={styles.location}>

        <Pressable onPress={() => {getNewDate(-1)}} >
          <Ionicons size={28} name={'chevron-back-circle-outline'} style={{ color }} />
        </Pressable>



        <ThemedView style={styles.date}>
          <Pressable onPress={() => {setDate(new Date())}} >
            <ThemedText type='defaultSemiBold'>{date.toDateString()}</ThemedText>
          </Pressable>
        </ThemedView>

        <Pressable onPress={() => {getNewDate(1)}}>
          <Ionicons size={28} name='chevron-forward-circle-outline' style={{ color }} />
        </Pressable>
      </ThemedView>

      <ThemedView>
        {times.map((t) => <ThemedView style={styles.praycard} key={t.name} lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2}>
          <ThemedText type='subtitle'>{i18n.t(t.name)}</ThemedText>
          <ThemedText type='subtitle'>{t.time && getTimeOfDate(t.time,settings.twentyFourSystem)}</ThemedText>
        </ThemedView>)}

      </ThemedView >

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
