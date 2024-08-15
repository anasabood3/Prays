
import { sun_rise_set, fajr_calculation, isha_calculation, CalculateAsrTime } from './sunrise.mjs';


export function getPrayerTimes2(timeInfo, long, lat, fajrAngle, IshaaAngle) {
    
  
    const tempDate = new Date();  
    const initialTimings = [
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

    const ZONE_DST = (timeInfo.getHours() - timeInfo.getUTCHours());

    var day = timeInfo.getDate();
    var month = timeInfo.getMonth() + 1;
    var year = timeInfo.getFullYear();



    var fajr = { value: 0.0 };
    var sunrise = { value: 0.0 };
    var noon = { value: 0.0 };
    var asr = { value: 0.0 };
    var sunset = { value: 0.0 };

    var isha = { value: 0.0 };

    sun_rise_set(year, month, day, longitude, latitude, sunrise, sunset);

    noon.value = sunrise.value + (sunset.value - sunrise.value) / 2;

    fajr_calculation(year, month, day, long, lat, IshaaAngle, fajr);

    isha_calculation(year, month, day, long, lat, fajrAngle, isha);

    sunrise.value += ZONE_DST;
    sunset.value += ZONE_DST;

    fajr.value += ZONE_DST;
    noon.value += ZONE_DST;
    CalculateAsrTime(timeInfo, noon, longitude, latitude, asr);
    isha.value += ZONE_DST;
    isha.value = 24.0 > isha.value ? isha.value : isha.value - 24.0;

    initialTimings[0] = FormatTime(fajr.value,timeInfo);
    initialTimings[1] = FormatTime(sunrise.value,timeInfo);
    initialTimings[2] = FormatTime(noon.value,timeInfo);
    initialTimings[3] = FormatTime(asr.value,timeInfo);
    initialTimings[4] = FormatTime(sunset.value,timeInfo);
    initialTimings[5] = FormatTime(isha.value,timeInfo);

    return initialTimings;
}





const z = getPrayerTimes(new Date(), longitude, latitude, -12, -12);

// console.log('Today is Day: ' + day + '\nmonth: ' + month + '\nyear: ' + year);

console.log(z);
console.log(FormatTime(4.43))
