import { i18n }  from '@/core/translate';


// get String of Date
export const formatDate = (date: Date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

// convert Christian date into hijri date
export const converToHijr = (date: Date, lang: string) => {

    let local = 'en';
    if (lang === 'ar')
        local = 'ar'
    else if (lang === 'de')
        local = 'en'
    let result = new Intl.DateTimeFormat(`${local}-u-ca-islamic-umalqura`, { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(date)
    return `${result}`
}


// !!!!!!!!!!!!!!!!!! this function needs to be recreated !!!!!!!!!!!!!!!!!!
// get time of full-date supporting 12-hour system
export const getTimeOfDate = (date: Date, twentyFour: boolean = true) => {
    const dateString = date.toTimeString();
    let hours = dateString.slice(0, 2);
    let hoursNumber = Number(hours);
    let minutes = dateString.slice(3, 5);
    if (!twentyFour)
        if (hoursNumber > 12)
            return `${hoursNumber - 12}:${minutes}  PM`;
        else
            return `${hours}:${minutes}  AM`;
    else
        return `${hours}:${minutes}`;
}

//!!!!!!!!!!!!!!!!!! this function needs to be recreated !!!!!!!!!!!!!!!!!!
// convert milliseconds into HH:MM
export const msToHoursMinutes = (ms: number) => {
    let minutes = Math.abs(ms / 60000);
    let hours = Math.trunc(minutes / 60);
    const h:string = `${i18n.t("hour",{count:hours})}`
    const m:string = `${Math.trunc(minutes%60)} ${i18n.t("minute",{count:minutes})}`
    if(hours&&minutes)
        return (`${h}, ${m}`)
    else if(!hours&&minutes)
        return (`${m}`)
    else if(hours&&!minutes)
        return (`${h}`)
    else
        return "Now"
}


export const FormatTime = function (time: number, date: Date): Date {
    var h = Math.trunc(time);
    var m = Math.trunc(((time - h) * 60.0)).toFixed(2);
    const d = new Date(date)
    d.setHours(h, parseInt(m),0);
    return d;
}

// get Millisceonds of date since the same day
export const getMilliSeconds=(date:Date)=>(date.getHours()*3600000)+(date.getMinutes()*60000)+(date.getSeconds()*1000);



