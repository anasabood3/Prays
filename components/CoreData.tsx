// import { RootState } from '@/contexts/store';
// import React, { useEffect, useState } from 'react'
// import { View, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThemedText } from './ThemedText';
// import * as CurrLocation from 'expo-location';
// import { Location, updateLocation } from '@/contexts/dataSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loadSettings } from '@/contexts/settingsSlice';



// function CoreData() {
//     const dispatch = useDispatch()
//     const location = useSelector((state: RootState) => state.data.location);
//     const [error, setError] = useState<String | null>(null);
//     const settings = useSelector((state: RootState) => state.settings);
//     const [loaded, setLoaded] = useState<boolean>(false);

//     const saveLocation = (loc: Location) => {
//         AsyncStorage.setItem('location', JSON.stringify(loc)).catch((error) => {
//             setError("Error hppaned while storing location:\n" + error)
//         });
//     }

//     // load app settings of local storage
//     const loadLocation = () => {
//         AsyncStorage.getItem('location').then((data) => {
//             if (data) {
//                 dispatch(updateLocation(JSON.parse(data)));
//             }
//             else
//                 getLocation();
//         }).catch((error) => {
//             setError("Error while loading lcation\n" + error)
//         });
//     }

//     const getLocation = () => {
//         CurrLocation.requestForegroundPermissionsAsync().then((result) => {
//             let state = result.status;
//             if (state) {
//                 CurrLocation.getCurrentPositionAsync({}).then((result) => {
//                     dispatch(updateLocation({ lat: result.coords.latitude, long: result.coords.longitude }));
//                 }).catch((error) => {
//                     console.error(error);

//                 });
//             }
//             else {
//                 console.log("Permission to access location was denied");
//                 setError("Geo Location Access Denied\nApp cannot work properly without location !")

//             }
//         }).catch((error) => {
//             console.log("Error while getting location\n" + error);
//         });
//     }

//     // load app settings of local storage
//     const fetchSettings = () => {
//         AsyncStorage.getItem('settings').then((data) => {
//             if (data) {
//                 const loadedData = JSON.parse(data);
//                 dispatch(loadSettings(loadedData));
//                 setLoaded(true);
//             }
//             else {
//                 setLoaded(true);
//             }
//         })
//             .catch((error) => console.log(error));
//     };



//     // on app run load settings
//     useEffect(() => {
//         fetchSettings();
//     }, []);

//     useEffect(()=>{
//         if(loaded)
//             if(settings.autoLocation)
//                 getLocation();
//             else
//                 loadLocation();

//     },[])

//     return (
//         <View style={styles.location}>
//             <ThemedText type='defaultSemiBold'>{location.lat}{location.long}</ThemedText>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     location: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',

//     },
// });


// export default CoreData;
