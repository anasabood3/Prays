import { CalculationMethod, Coordinates, PrayerTimes,CalculationParameters } from "adhan";
import { msToHoursMinutes } from "./time-functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsState } from "@/contexts/settingsSlice";

export interface Prayer {
    name: string,
    time: Date,
    notifcationType: number   // change into special type <notType>
}

export interface NextPrayer {
    name: string | null;
    nextPrayerTime: number | null; // change into number represnts milliseconds
}

export interface Location {
    longitude: number | null;
    latitude: number | null;
}

/**
 * 
 * @param lat latitude
 * @param long longitude
 * @param cal_method  calculaiton method
 * @param date 
 * @param fajrAngle 
 * @param ishaAngle 
 * @param madhab  asr time madhab shafii or hanafi (late aser time)
 * @param adjstments add or substarct mintues from generated times
 * @returns list of prayers {name,time,notificationsType}
 */

export const getPrayerTimes = (lat:number,long:number,cal_method:string,date:Date,fajrAngle:number,ishaAngle:number,madhab:number,adjstments:number[]):Prayer[]=>{
  const tempDate = new Date();  
  const initialTimings: Prayer[] = [
      {
        name: "Fajr",
        time: tempDate,
        notifcationType: 1,
      },
      {
        name: "Sunrise",
        time: tempDate,
        notifcationType: 1,
      },
      {
        name: "Dhuhr",
        time: tempDate,
        notifcationType: 1,
      },
      {
        name: "Asr",
        time: tempDate,
        notifcationType: 1,
      },
      {
        name: "Maghrib",
        time: tempDate,
        notifcationType: 1,
      },
      {
        name: "Isha",
        time: tempDate,
        notifcationType: 1,
      }
    ]


      const coordinates = new Coordinates(lat,long);
      let params;
      // to be refactored
      // return Calculation method beased on user's selected
      switch (cal_method) {
        case 'Dubai':
          params = CalculationMethod.Dubai();
          break;
        case 'Egyptian':
          params = CalculationMethod.Egyptian();
          break;
        case 'Kuwait':
          params = CalculationMethod.Kuwait();
          break;
        case 'Karachi':
          params = CalculationMethod.Karachi();
          break;
        case 'MoonsightingCommittee':
          params = CalculationMethod.MoonsightingCommittee();
          break;
        case 'MuslimWorldLeague':
          params = CalculationMethod.MuslimWorldLeague();
          break;
        case 'Tehran':
          params = CalculationMethod.Tehran();
          break;
        case 'NorthAmerica':
          params = CalculationMethod.NorthAmerica();
          break;
        case 'Qatar':
          params = CalculationMethod.Qatar();
          break;
        case 'Singapore':
          params = CalculationMethod.Singapore();
          break;
        case 'Turkey':
          params = CalculationMethod.Turkey();
          break;
        case 'UmmAlQura':
          params = CalculationMethod.UmmAlQura();
          break;
        case 'Other':
          params = CalculationMethod.Other();
          break;
        default:
          params = CalculationMethod.MuslimWorldLeague();
      }

      params.fajrAngle = fajrAngle;
      params.ishaAngle = ishaAngle;

      madhab==1?params.madhab="shafi":params.madhab="hanafi";
      // to be refactored
      // add adjustments into params
      params.adjustments.fajr = adjstments[0];
      params.adjustments.sunrise = adjstments[1];
      params.adjustments.dhuhr = adjstments[2];
      params.adjustments.asr = adjstments[3];
      params.adjustments.maghrib = adjstments[4];
      params.adjustments.isha = adjstments[5];

      // to be reafactored
      // save prayers as objects into list to be returned
      const prayerTimes = new PrayerTimes(coordinates, date, params);
      initialTimings[0].time = prayerTimes.fajr;
      initialTimings[1].time = prayerTimes.sunrise;
      initialTimings[2].time = prayerTimes.dhuhr;
      initialTimings[3].time = prayerTimes.asr;
      initialTimings[4].time = prayerTimes.maghrib;
      initialTimings[5].time = prayerTimes.isha;

      return initialTimings;
    }


// get the remaining time for next prayer
export const getRemainingTime = (times:Prayer[]) => {
    const nextPray:NextPrayer = {name:null,nextPrayerTime:null};
    // whole Day in millseconds
    const newDay:number=86400000;
    let now: Date = new Date();
  
    for(let t of times){
      if(now.getTime()<t.time?.getTime()){
        nextPray.name=t.name;
        nextPray.nextPrayerTime=t.time.getTime();
        break;
      }
    }
    // this case happen after passing all prayers meaning after ishaa before 00:00 O'clock
    // you leave for loope with no prayers.
    // 86400000 add whole day to the fajr to make fajr of the next day (ignoring 2-3 minutes difference in remaining time)
    if(nextPray.name===null && times.length!=0){
      nextPray.name=times[0].name;
      nextPray.nextPrayerTime=(times[0].time.getTime()+newDay);
    }
    return nextPray;
  }
  

// save settings global state into local storage
export const saveSettings = (settings:SettingsState) => {
  AsyncStorage.setItem('settings', JSON.stringify(settings));
};