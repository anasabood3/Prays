



export const clacMethods = [
    { label: 'University of Islamic Sciences, Karachi', value: 1 },
    { label: ' Islamic Society of North America', value: 2 },
    { label: 'Muslim World League', value: 3 },
    { label: 'Umm Al-Qura University, Makkah', value: 4 },
    { label: 'Egyptian General Authority of Survey', value: 5 },
    { label: ' Institute of Geophysics, University of Tehran', value: 6 },

  ]

export const asrCalcMethods = [

    { label: 'Earlier Asr Time - Schafii, Malki and Nanbali', value: 1 },
    { label: ' Later Asr Time Hanafi', value: 2 },

]

const anglesRange=[9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5]

export const generateAnglesRange = ()=>{
    let new_list: { label: string, value: number }[] = []
    for(let i of anglesRange){
        new_list.push({label:i.toString(),value:i})
    }
    return new_list;
}

export const hijriMonths = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', "Shawwal", "Dhu al-Qadah","Dhu al-Hijjah"]

export const prayersNamesList:string[]=["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
