import { Switch } from "react-native";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/store";
import tw from 'twrnc';

interface SwitchProps {
    value: boolean;
    behaviour: (e: boolean) => void;
    title: string

}

export default function SettingsSwitch(props: SwitchProps) {
    const language = useSelector((state: RootState) => state.settings.language);

    return (
        <View style={[tw`flex-row justify-between items-center p-[12]`,language=='ar'?{flexDirection:'row-reverse'}:{}]}>

            <ThemedText type='default'>{props.title}</ThemedText>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={props.value ? '#003' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(e) => props.behaviour(e)}
                value={props.value} />
        </View>);
}
