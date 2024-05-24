import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { updateAdjustments } from '@/contexts/settingsSlice';
import { View } from 'react-native';

interface AdjustProps {
    index:number;
    label:string;
}

export default function Adjustment(props:AdjustProps) {
    const dispatch = useDispatch();

    const adjustments = useSelector((state: RootState) => state.settings.adjustments);
    const adjustTime= (value:number)=>{
        const temp = [...adjustments];
        temp[props.index]=value;
        dispatch(updateAdjustments([...temp]))
    }

    return (
        <View style={[styles.settingsItem,]}>
            <View style={styles.flexItem}>
            <ThemedText>{props.label}</ThemedText>
            <ThemedText>{adjustments[props.index]} minutes</ThemedText>
            </View>
            <Slider
                minimumValue={-59}
                maximumValue={59}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={adjustments[props.index]}
                onValueChange={(e)=>{adjustTime(e)}}
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
