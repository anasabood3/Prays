import { PrayerName } from '@/constants/GeneralConstans';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface Adjustments{
    fajr:number;
    sunrise:number;
    dhuhr:number;
    asr:number;
    maghrib:number;
    isha:number;
    
}

export interface SettingsState {
    notifications?: boolean; /// !!!refix!!!!
    theme: string;
    language: string;
    twentyFourSystem: boolean;
    asrCalcMehtod: number;
    clacMethod: string;
    fajrAngle: number;
    ishaaAngle: number;
    cityLocation: string;
    autoLocation:boolean;
    adjustments:Adjustments; 
    autoSettings:boolean;
}



const initialSettings: SettingsState = {
    notifications: true,
    theme: "dark",
    language: "en",
    twentyFourSystem: true,
    asrCalcMehtod: 1,
    clacMethod: "MuslimWorldLeague",
    fajrAngle:12,
    ishaaAngle:12,
    cityLocation: 'Regensburg',
    adjustments:{fajr:0,sunrise:0,dhuhr:0,asr:0,maghrib:0,isha:0},
    autoSettings:false,
    autoLocation:true,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState:initialSettings,
    reducers: {
        updateTimingSystem: (state, action: PayloadAction<boolean>) => {
            state.twentyFourSystem = action.payload
        },
        updateCalcMethod: (state, action: PayloadAction<string>) => {
            state.clacMethod = action.payload
        },
        updateAsrCalMehtod: (state, action: PayloadAction<number>) => {
            state.asrCalcMehtod = action.payload
        },
        updateFajrAngle: (state, action: PayloadAction<number>) => {
            state.fajrAngle = action.payload
        },
        updateIshaaAngle: (state, action: PayloadAction<number>) => {
            state.ishaaAngle = action.payload
        },
        updateCityLocation: (state, action: PayloadAction<string>) => {
            state.cityLocation = action.payload
        },
        updateAutoLocation: (state, action: PayloadAction<boolean>) => {
            state.autoLocation = action.payload
        },
        updateNotification: (state, action: PayloadAction<boolean>) => {
            state.notifications = action.payload
        },
        updateAdjustments: (state, action: PayloadAction<{label:PrayerName,value:number}>) => {
            state.adjustments[action.payload.label] = action.payload.value;
        },
        resetAdjustments: (state, action: PayloadAction<number>) => {
            state.adjustments.fajr = action.payload;
            state.adjustments.sunrise = action.payload;
            state.adjustments.dhuhr = action.payload;
            state.adjustments.asr = action.payload;
            state.adjustments.maghrib = action.payload;
            state.adjustments.isha = action.payload;
        },
        updateTheme:(state,action:PayloadAction<string>)=>{
            state.theme=action.payload
        },
        updateLanguage:(state,action:PayloadAction<string>)=>{
            state.language=action.payload
        },
        updateAutoSettings:(state,action:PayloadAction<boolean>)=>{
            state.autoSettings=action.payload
        },
        loadSettings: (state, action: PayloadAction<SettingsState>) => {
            state.asrCalcMehtod = action.payload.asrCalcMehtod;
            state.clacMethod = action.payload.clacMethod;
            state.fajrAngle = action.payload.fajrAngle;
            state.ishaaAngle = action.payload.ishaaAngle;
            state.cityLocation = action.payload.cityLocation;
            state.autoLocation = action.payload.autoLocation;
            state.language = action.payload.language;
            state.twentyFourSystem = action.payload.twentyFourSystem;
            state.adjustments = {...action.payload.adjustments};
            state.theme = action.payload.theme;
            state.autoSettings = action.payload.autoSettings;
        },

    },
})


export const { updateLanguage,resetAdjustments,updateAdjustments,updateAutoLocation,updateTheme,updateFajrAngle,updateIshaaAngle,updateAsrCalMehtod,updateCityLocation,updateCalcMethod,updateTimingSystem,updateNotification,loadSettings,updateAutoSettings } = settingsSlice.actions;

export default settingsSlice.reducer;



