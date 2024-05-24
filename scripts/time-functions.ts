import { hijriMonths } from "@/constants/GeneralConstans";
import { toHijri } from "hijri-converter";
  


// get String of Date
export const formatDate = (date: Date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

// convert Christian date into hijri date
export const converToHijr = (date: Date) => {
    let result = toHijri(date.getFullYear(), date.getMonth(), date.getDay())
    return `${result.hd}, ${hijriMonths[Number(result.hm)]} ${result.hy}`
}

// get tiem of full-date supporting 12-hour system
export const getTimeOfDate = (date: Date, twentyFour: boolean = true) => {
    const dateString = date.toTimeString();
    let hours = Number(dateString.slice(0, 2));
    let minutes = dateString.slice(3, 5);
    if (!twentyFour)
        if (hours > 12)
            return `${hours - 12}:${minutes}  PM`;
        else
            return `${hours}:${minutes}  AM`;
    else
        return `${hours}:${minutes}`;
}


// convert milliseconds into HH:MM
export const msToHoursMinutes = (ms: number) => {
    let minutes = Math.abs(ms / 60000);
    let hours = Math.trunc(minutes / 60);
    return (`${hours} hours and ${Math.trunc(minutes % 60)} minutes`)
}




