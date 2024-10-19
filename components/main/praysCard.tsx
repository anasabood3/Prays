import { ReactNode, useState } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import tw from 'twrnc'
import { Colors } from "@/constants/Colors";
import { Image, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { i18n } from "@/core/translate";
import { moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/store";
import { PrayerName } from "@/constants/GeneralConstans";


interface PryasCardInterface {
    nexPrayer: PrayerName | null;
    remainingTime: ReactNode;
    location: string | null | undefined;
    loading:boolean;
}



export function PraysCard(props: PryasCardInterface) {
    const theme = useSelector((state: RootState) => state.settings.theme);
    let path = require('../../assets/images/dhuhr.png');
    if (theme == 'light') {
        switch (props.nexPrayer?.toLocaleLowerCase()) {
            case 'fajr':
                path = require('../../assets/images/fajr.png');
                break;
            case 'dhuhr':
                path = require('../../assets/images/dhuhr.png');
                break;
            case 'asr':
                path = require('../../assets/images/asr.png');
                break;
            case 'maghrib':
                path = require('../../assets/images/maghrib.png');
                break;
            case 'isha':
                path = require('../../assets/images/isha.png');
                break;
        }
    }
    else {
        switch (props.nexPrayer?.toLocaleLowerCase()) {
            case 'fajr':
                path = require('../../assets/images/darkfajr.png');
                break;
            case 'dhuhr':
                path = require('../../assets/images/darkdhuhr.png');
                break;
            case 'asr':
                path = require('../../assets/images/darkasr.png');
                break;
            case 'maghrib':
                path = require('../../assets/images/darkmaghrib.png');
                break;
            case 'isha':
                path = require('../../assets/images/darkisha.png');
                break;
        }

    }







    return (
        <ThemedView style={tw`bg-[${Colors.light.colorLevel2}] dark:bg-[${Colors.dark.colorLevel2}] rounded-xl p-3 mx-2`}>
            <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`justify-between items-start gap-18`}>
                    <View style={tw`flex-row items-center gap-1 border-2 border-white rounded-full px-2 py-1`}>
                        <Ionicons size={18} name={'location-outline'} style={tw`dark:text-white`} />
                        {props.loading?<ThemedText type="defaultSemiBold" >{props.location}</ThemedText>:<ThemedText>loading...</ThemedText>}
                    </View>

                    <View style={tw`gap-1`}>
                        <ThemedText type='defaultSemiBold'>{(props.nexPrayer) && `${i18n.t(props.nexPrayer)} ${i18n.t("in")}: `}</ThemedText>
                        <Text> {props.remainingTime}</Text>
                    </View>

                </View>
                <View style={tw`justify-center items-center`}>
                    {props.nexPrayer && <Image source={path} style={{
                        height: 125,
                        width: 125,
                    }} />}

                </View>
            </View>
        </ThemedView>
    )


}