import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



type settingsAction =
    | { type: "reset" }
    | { type: "updateTimingSystem"; payload: boolean }
    | { type: "updateCalcMethod"; payload: number }
    | { type: "updateAsrCalMehtod"; payload: number }
    | { type: "updateAngles"; payload: string }
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
    customAngles: string;
    autoLocation: boolean;
    
}

const initialSettings: SettingsState = {
    notifications: true,
    theme: "light",
    language: "en",
    twentyFourSystem: true,
    asrCalcMehtod: 1,
    clacMethod: 1,
    customAngles: "12,12",
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
        updateAngles: (state, action: PayloadAction<string>) => {
            state.customAngles = action.payload
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
            state.customAngles = action.payload.customAngles;
            state.autoLocation = action.payload.autoLocation;
            state.twentyFourSystem = action.payload.twentyFourSystem;
        },
    },
})


export const { updateAngles,updateAsrCalMehtod,updateAutoLocation,updateCalcMethod,updateTimingSystem,updateNotification,loadSettings } = settingsSlice.actions;

export default settingsSlice.reducer



