import { ThemedText } from '@/components/ThemedText';
import Slider from '@react-native-community/slider';
import { View } from 'react-native';
import { i18n } from '@/core/translate';
import tw from 'twrnc'
interface SliderProps {
    label: string;
    value: number;
    behviour: (e: number) => void;
    minimumValue: number;
    maximumValue: number;
    step: number;
}

export default function SettingsSlider(props: SliderProps) {

    return (
        <View>
            <View style={tw`flex-row content-between items-center my-[12]`}>
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
