import { PrayerName } from '@/components/settings/Adjustment';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Appearance } from 'react-native';



// type settingsAction =
//     | { type: "reset" }
//     | { type: "updateTimingSystem"; payload: boolean }
//     | { type: "updateCalcMethod"; payload: string }
//     | { type: "updateAsrCalMehtod"; payload: number }
//     | { type: "updateFajrAngle"; payload: number }
//     | { type: "updateIshaaAngle"; payload: number }
//     | { type: "updateAutoLocation"; payload: boolean }
//     | { type: "updateNotification"; payload: boolean }
//     | { type: "updateTheme"; payload: string }
//     | { type: "updateLanguage"; payload: string }
//     | { type: "updateAdjustments"; payload: number[]}
//     | { type: "updateTheme"; payload: string }
//     | { type: "loadSettings"; payload: SettingsState }
//     | { type: "resetSettings"; payload: SettingsState }
//     | { type: "updateLocation"; payload: Location }

export interface Adjustments{
    fajr:number;
    sunrise:number;
    dhuhr:number;
    asr:number;
    maghrib:number;
    isha:number;
    
}

export interface SettingsState {
    notifications?: boolean;
    theme: string;
    language: string;
    twentyFourSystem: boolean;
    asrCalcMehtod: number;
    clacMethod: string;
    fajrAngle: number;
    ishaaAngle: number;
    autoLocation: boolean;
    adjustments:Adjustments; 
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
    autoLocation: false,
    adjustments:{fajr:0,sunrise:0,dhuhr:0,asr:0,maghrib:0,isha:0},
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
        updateAutoLocation: (state, action: PayloadAction<boolean>) => {
            state.autoLocation = action.payload
        },
        updateNotification: (state, action: PayloadAction<boolean>) => {
            state.notifications = action.payload
        },
        updateAdjustments: (state, action: PayloadAction<{label:PrayerName,value:number}>) => {
            state.adjustments[action.payload.label] = action.payload.value;
        },
        updateTheme:(state,action:PayloadAction<string>)=>{
            state.theme=action.payload
        },
        updateLanguage:(state,action:PayloadAction<string>)=>{
            state.language=action.payload
        },
        loadSettings: (state, action: PayloadAction<SettingsState>) => {
            state.asrCalcMehtod = action.payload.asrCalcMehtod;
            state.clacMethod = action.payload.clacMethod;
            state.fajrAngle = action.payload.fajrAngle;
            state.ishaaAngle = action.payload.ishaaAngle;
            state.autoLocation = action.payload.autoLocation;
            state.language = action.payload.language;
            state.twentyFourSystem = action.payload.twentyFourSystem;
            state.adjustments = {...action.payload.adjustments};
            state.theme = action.payload.theme;
        },

    },
})


export const { updateLanguage,updateAdjustments,updateTheme,updateFajrAngle,updateIshaaAngle,updateAsrCalMehtod,updateAutoLocation,updateCalcMethod,updateTimingSystem,updateNotification,loadSettings } = settingsSlice.actions;

export default settingsSlice.reducer;



