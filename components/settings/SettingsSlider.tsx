import { ThemedText } from '@/components/ThemedText';
import Slider from '@react-native-community/slider';
import { useColorScheme, View } from 'react-native';
import { i18n } from '@/core/translate';
import tw from 'twrnc'
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
interface SliderProps {
    label: string;
    value: number;
    behviour: (e: number) => void;
    minimumValue: number;
    maximumValue: number;
    step: number;
}

export default function SettingsSlider(props: SliderProps) {
    const lang = useSelector((state: RootState) => state.settings.language);
    return (
        <View>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",marginHorizontal:12}}>
                <ThemedText>{i18n.t(props.label)}</ThemedText>
                <ThemedText>{props.value}°</ThemedText>
            </View>
            <Slider
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                step={props.step}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                value={props.value}
                onValueChange={(e) => props.behviour(e)}
            />
        </View>
    );
}
