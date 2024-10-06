import { Switch } from "react-native";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/store";

interface SwitchProps {
    value: boolean;
    behaviour: (e: boolean) => void;
    title: string

}

export default function SettingsSwitch(props: SwitchProps) {
    const language = useSelector((state: RootState) => state.settings.language);

    return (
        <View style={[styles.settingsItem,language=='ar'?{flexDirection:'row-reverse'}:{}]}>

            <ThemedText type='default'>{props.title}</ThemedText>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={props.value ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(e) => props.behaviour(e)}
                value={props.value} />
        </View>);
}

const styles = StyleSheet.create({
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});