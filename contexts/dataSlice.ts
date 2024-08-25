import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface Location {
    lat: number | null;
    long: number | null;
  }
  

export interface DataState {
   location:Location;
}

const initialSettings:DataState= {
    location:{lat:null,long:null}
}



export const dataSlice = createSlice({
    name: 'data',
    initialState:initialSettings,
    reducers: {
        updateLocation: (state, action: PayloadAction<Location>) => {
            state.location.lat=action.payload.lat;
            state.location.long=action.payload.long;
        },
        loadData: (state, action: PayloadAction<DataState>) => {
            state.location = {...action.payload.location};
        },

    },
})


export const {updateLocation,loadData  } = dataSlice.actions;

export default dataSlice.reducer;



