import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { i18n } from '@/core/translate';
import tw from 'twrnc';
import { Text, View } from 'react-native';

interface SelecData {
    data: { label: string, value: number | string }[];
    placeHolder?: string;
    value: string;
    updateSelected: (e: any) => void
}

export function SelectMenu({ data, placeHolder, value, updateSelected }: SelecData) {

    const backgroundColor = useThemeColor({ light: Colors.light.colorLevel2, dark: Colors.dark.colorLevel2 }, 'background');

    const renderItem = (item: { label: string, value: number | string }) => {
        return (
            <View style={[tw`p-1.5 m-1`, { backgroundColor }]}>
                <Text style={tw`p-1.5 text-base dark:text-white`}>{i18n.t(item.label)}</Text>
            </View>
        )
    }
    return (
        <Dropdown
            style={[{ backgroundColor }, tw`px-1 m-1 rounded-md h-10`]}
            placeholderStyle={tw`text-base dark:text-white`}
            placeholder={placeHolder?i18n.t(placeHolder):""}
            selectedTextStyle={tw`dark:text-white`}
            inputSearchStyle={tw`h-10 text-base`}
            value={value.toString()}
            data={data}
            onChange={updateSelected}
            labelField="label"
            valueField="value"
            renderItem={renderItem}
            itemContainerStyle={{ backgroundColor }}
            containerStyle={{ borderRadius: 7, borderWidth: 0 }}>
        </Dropdown>
    );
}

