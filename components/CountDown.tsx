import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { i18n } from '@/core/translate';
import tw from 'twrnc';

export default function CountDown({nextPrayerTime=0}:{nextPrayerTime:number|null}){
    const [hours,setHours]=useState(-1);
    const [minutes, setMinutes] = useState(-1);
    const [seconds, setSeconds] = useState(-1);
    const [passed,setPassed]=useState(0);
    const countDown = () => {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        if (nextPrayerTime) {
            let distance = nextPrayerTime - now;
            if (distance>0) {
                setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
                setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
                setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            }
            else{
                setPassed(distance);
            }

        }
    }
    useEffect(() => {
        setPassed(0);
        countDown();
        const interval = setInterval(countDown, 1000);
        return () => clearInterval(interval);
    }, [nextPrayerTime]);
    return (
            <Text style={tw`text-white text-xl font-bold `} > 
                {/* temporarly iqamaa time is 30 minutes (1800000)  */}
                {(hours>0)&& `${i18n.t("hour",{count:hours})}, `}
                {(minutes>0)&&` ${i18n.t("minute",{count:minutes})}`}
                {(hours==0&&minutes==0&&seconds>0)&&` ${i18n.t("second",{count:seconds})}`}
                {(passed<0&&passed>-1800000)&&`${i18n.t("now")}`}
            </Text>
    )
}

