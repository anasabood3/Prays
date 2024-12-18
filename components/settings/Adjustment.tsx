import { ThemedText } from '@/components/ThemedText';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { View } from 'react-native';
import { i18n } from '@/core/translate';
import { PrayerName } from '@/constants/GeneralConstans';
import tw from 'twrnc'

interface AdjustProps {
    label:PrayerName;
    action:(e:number)=>void;
}

export default function Adjustment(props: AdjustProps) {
    const adjustments = useSelector((state: RootState) => state.settings.adjustments);
    return (
        <View style={tw`rounded-[6]`}>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",marginHorizontal:12}}>
                <ThemedText>{i18n.t(props.label.slice(0, 1).toUpperCase() + props.label.slice(1))}</ThemedText>
                <ThemedText>{i18n.t('minute', { count: adjustments[props.label] })}</ThemedText>
            </View>
            <Slider
                minimumValue={-59}
                maximumValue={59}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={adjustments[props.label]}
                onValueChange={(e) => { props.action(e)}}
            />
        </View>
    );
}

