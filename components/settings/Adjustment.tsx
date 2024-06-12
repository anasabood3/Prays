import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Slider from '@react-native-community/slider';
import {  useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { View } from 'react-native';
import { i18n } from '@/scripts/translate';

export type PrayerName= "fajr"|"sunrise"|"dhuhr"|"asr"|"maghrib"|"isha";

interface AdjustProps {
    label:PrayerName;
    action:(e:number)=>void;
}

export default function Adjustment(props:AdjustProps) {
    const adjustments = useSelector((state: RootState) => state.settings.adjustments);
    return (
        <View style={[styles.settingsItem,]}>
            <View style={styles.flexItem}>
            <ThemedText>{i18n.t(props.label.slice(0,1).toUpperCase()+props.label.slice(1))}</ThemedText>
            <ThemedText>{adjustments[props.label]} {i18n.t('minute',{count:3})}</ThemedText>
            </View>
            <Slider
                minimumValue={-59}
                maximumValue={59}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={adjustments[props.label]}
                onValueChange={(e)=>{props.action(e);console.log(adjustments)}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    settingsItem: {
        borderRadius: 6,
    
      },
    flexItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:4,
    }
})
