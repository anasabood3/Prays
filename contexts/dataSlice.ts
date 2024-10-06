import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface Location {
    lat: number;
    long: number;
}
  

export interface DataState {
   location:Location;
   city?:string|null
}

const initialSettings:DataState= {
    location:{lat:49.017833999,long:12.097392},
    city:'Regensburg'
}



export const dataSlice = createSlice({
    name: 'data',
    initialState:initialSettings,
    reducers: {
        updateLocation: (state, action: PayloadAction<Location>) => {
            state.location.lat=action.payload.lat;
            state.location.long=action.payload.long;
        },
        updateCity:(state,action:PayloadAction<string>)=>{
            state.city = action.payload;
        },
        loadData: (state, action: PayloadAction<DataState>) => {
            state.location = {...action.payload.location};
            state.city = action.payload.city;
        },

    },
})


export const {updateLocation,updateCity,loadData  } = dataSlice.actions;

export default dataSlice.reducer;



