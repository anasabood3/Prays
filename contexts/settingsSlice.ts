import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



type settingsAction =
    | { type: "reset" }
    | { type: "updateTimingSystem"; payload: boolean }
    | { type: "updateCalcMethod"; payload: number }
    | { type: "updateAsrCalMehtod"; payload: number }
    | { type: "updateFajrAngle"; payload: number }
    | { type: "updateIshaaAngle"; payload: number }
    | { type: "updateAutoLocation"; payload: boolean }
    | { type: "updateNotification"; payload: boolean }
    | { type: "updateTheme"; payload: string }
    | { type: "updateLanguage"; payload: string }
    | { type: "loadSettings"; payload: SettingsState }



export interface SettingsState {
    notifications?: boolean;
    theme?: string;
    language?: string;
    twentyFourSystem: boolean;
    asrCalcMehtod: number;
    clacMethod: number;
    fajrAngle: number;
    ishaaAngle: number;
    autoLocation: boolean;
    
}

const initialSettings: SettingsState = {
    notifications: true,
    theme: "light",
    language: "en",
    twentyFourSystem: true,
    asrCalcMehtod: 1,
    clacMethod: 1,
    fajrAngle:12,
    ishaaAngle:12,
    autoLocation: true,
}


export const settingsSlice = createSlice({
    name: 'settings',
    initialState:initialSettings,
    reducers: {
        updateTimingSystem: (state, action: PayloadAction<boolean>) => {
            state.twentyFourSystem = action.payload
        },
        updateCalcMethod: (state, action: PayloadAction<number>) => {
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
        loadSettings: (state, action: PayloadAction<SettingsState>) => {
            state.asrCalcMehtod = action.payload.asrCalcMehtod;
            state.clacMethod = action.payload.clacMethod;
            state.fajrAngle = action.payload.fajrAngle;
            state.ishaaAngle = action.payload.ishaaAngle;
            state.autoLocation = action.payload.autoLocation;
            state.twentyFourSystem = action.payload.twentyFourSystem;
        },
    },
})


export const { updateFajrAngle,updateIshaaAngle,updateAsrCalMehtod,updateAutoLocation,updateCalcMethod,updateTimingSystem,updateNotification,loadSettings } = settingsSlice.actions;

export default settingsSlice.reducer



