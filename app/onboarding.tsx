import { Redirect } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
// import { useIsFirstTime } from '@/hooks/use-is-first-time';
import * as CurrLocation from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnBoardingScreen() {
    const [warning,setWarning] = useState(false);

    // const saveFiratTime = (firstTime:boolean) => {
    //     AsyncStorage.setItem('firstTime', JSON.stringify(firstTime)).catch((error) => {   
    //         console.log('error')
    //     });
    // }
    // const [_, setIsFirstTime] = useIsFirstTime();
    // const getLocation = () => {
    //     CurrLocation.requestForegroundPermissionsAsync().then((result) => {
    //       let state = result.status;
    //       if (state) {
    //         // setIsFirstTime(false);
    //        return <Redirect href={'/'}/>
    //       }
    //       else {
    //         console.log("Permission to access location was denied");
    //         setWarning(true);
    //       }
    //     }).catch((error) => {
    //       console.log("Error while getting location\n" + error);
    //     });
    // }

    // useEffect(()=>{
    //     getLocation();
    // },[])
  return (


          <ThemedView style={styles.container}>
            <Ionicons name="location-sharp" size={128} color="white" style={{marginVertical:5}} />
            <ThemedText type="title" style={{fontSize:22}}>Location is Required</ThemedText>
           
           { warning &&<ThemedText type='default'>
            pleas go to settings and enable location permission
            </ThemedText>
           } 
          </ThemedView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

});
