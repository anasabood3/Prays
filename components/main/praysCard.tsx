import { ReactNode } from "react";
import { ThemedText } from "../ThemedText";
import tw from 'twrnc'
import { Settings, Text, useColorScheme, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { i18n } from "@/core/translate";

import { CapitalPrayerName, PrayerName } from "@/constants/GeneralConstans";
import { ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/store";
import { Colors } from "@/core/theming";

interface PryasCardInterface {
    nexPrayer: PrayerName | CapitalPrayerName | null;
    remainingTime: ReactNode;
    location: string | null | undefined;
    loading: boolean;
}

const cover = require('@/assets/images/praysCover2.png');
const darkCover = require('@/assets/images/praysCover3.png');

export function PraysCard(props: PryasCardInterface) {
    const colorScheme = useColorScheme();
    const lang = useSelector((state: RootState) => state.settings.language);
    // const color = useThemeColor({ light:Colors.light.text, dark: Colors.dark.text }, 'text');
    // let path = require('../../assets/images/dhuhr.png');
    // if (colorScheme == 'light') {
    //     switch (props.nexPrayer?.toLocaleLowerCase()) {
    //         case 'fajr':
    //             path = require('../../assets/images/fajr.png');
    //             break;
    //         case 'dhuhr':
    //             path = require('../../assets/images/dhuhr.png');
    //             break;
    //         case 'asr':
    //             path = require('../../assets/images/asr.png');
    //             break;
    //         case 'maghrib':
    //             path = require('../../assets/images/maghrib.png');
    //             break;
    //         case 'isha':
    //             path = require('../../assets/images/isha.png');
    //             break;
    //     }
    // }
    // else {
    //     switch (props.nexPrayer?.toLocaleLowerCase()) {
    //         case 'fajr':
    //             path = require('../../assets/images/darkfajr.png');
    //             break;
    //         case 'dhuhr':
    //             path = require('../../assets/images/darkdhuhr.png');
    //             break;
    //         case 'asr':
    //             path = require('../../assets/images/darkasr.png');
    //             break;
    //         case 'maghrib':
    //             path = require('../../assets/images/darkmaghrib.png');
    //             break;
    //         case 'isha':
    //             path = require('../../assets/images/darkisha.png');
    //             break;
    //     }

    // }







    return (
        <ImageBackground source={colorScheme == 'dark' ? darkCover : cover} imageStyle={{ borderRadius: 12 }}>
            <View style={tw`rounded-xl p-3 mx-2`} >

                <View style={tw`justify-between items-start gap-18  max-w-64`}>
                    <View style={tw`flex-row items-center gap-1 border-2 border-white rounded-full px-2 py-1  `}>
                        <Ionicons size={18} name={'location-outline'} style={tw`text-white`} />
                        {props.loading ? <Text style={tw`text-white text-lg`} >{props.location}</Text> : <Text >loading...</Text>}
                    </View>



                    <View style={tw`gap-1 `}>
                        <Text style={tw`text-white text-4xl font-extrabold`}>{(props.nexPrayer) && `${i18n.t(props.nexPrayer)} `}</Text>
                        <Text style={tw`text-white`}> {props.remainingTime}</Text>
                    </View>



                </View>
            </View>
        </ImageBackground>
    )


}