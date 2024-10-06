import * as currLocation from 'expo-location'
import { Location } from '@/contexts/dataSlice';


export const reverseGeocode = async (latitude: number, longitude: number) => {
    let city: string | null = ''
    const x = await currLocation.reverseGeocodeAsync({ latitude: latitude, longitude: longitude })
    city = x[0].city;
    return city;
}

export const geocode = async (city: string) => {
    const x = await currLocation.geocodeAsync(city)
    return { lat: x[0].latitude, long: x[0].longitude}
}

// returns result:true/ location coordinatie
export const fetchLocation = async () => {
    const loc:Location = {lat:0,long:0}
    const {status} = await currLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error("Location Access permision not granted!");
    }
    else {
        const location = await currLocation.getCurrentPositionAsync({});
        loc.lat = location.coords.latitude;
        loc.long = location.coords.longitude; 
    }
    return loc;
  }