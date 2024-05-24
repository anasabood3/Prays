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

interface SliderProps {
    label:string;
    value:number;
    behviour:(e:number)=>void;
    minimumValue:number;
    maximumValue:number;
    step:number;
}

export default function SettingsSlider(props:SliderProps) {

    return (
        <View>
            <View style={styles.flexItem}>
            <ThemedText>{props.label}</ThemedText>
            <ThemedText>{props.value}°</ThemedText>
            </View>
            <Slider
            style={styles.slider}
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                step={props.step}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={props.value}
                onValueChange={(e)=>props.behviour(e)}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    flexItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:12,
    },
    slider:{
        
    }
    
})
