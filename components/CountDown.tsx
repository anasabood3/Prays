import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { i18n } from "@/scripts/translate";

export default function CountDown({nextPrayerTime=0}:{nextPrayerTime:number|null}){
    const [hours,setHours]=useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            if (nextPrayerTime){
                var distance = nextPrayerTime - now;
                setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
                setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
                setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            }
            
        }, 1000)
        return () => clearInterval(interval); }, [nextPrayerTime])



    return (
        <View>
            <ThemedText type='subtitle' > 
                {(hours>0)&& `${i18n.t("hour",{count:hours})}, `}
                {(minutes>0)&&` ${i18n.t("minute",{count:minutes})}`}
                {(hours==0&&minutes==0&&seconds>0)&&` ${i18n.t("second",{count:seconds})}`}
            </ThemedText>
        </View>
    )
}

