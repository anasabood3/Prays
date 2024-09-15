import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { i18n } from '@/core/translate';

interface SelecData {
    data: { label: string, value: number | string }[];
    placeHolder?: string;
    value: string;
    updateSelected: (e: any) => void
}

export function SelectMenu({ data, placeHolder, value, updateSelected }: SelecData) {

    const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    const backgroundColor = useThemeColor({ light: Colors.light.colorLevel2, dark: Colors.dark.colorLevel2 }, 'background');

    const renderItem = (item: { label: string, value: number | string }) => {
        return (
            <ThemedView style={[styles.selectMenu, { backgroundColor }]}>
                <ThemedText style={styles.selectItem}>{i18n.t(item.label)}</ThemedText>
            </ThemedView>
        )
    }
    return (
        <Dropdown
            style={[{ backgroundColor }, styles.settingsItem, styles.dropdown]}
            placeholderStyle={[styles.placeholderStyle, { color }]}
            placeholder={placeHolder?i18n.t(placeHolder):""}
            selectedTextStyle={{ color }}
            inputSearchStyle={styles.inputSearchStyle}
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

const styles = StyleSheet.create({
    settingsItem: {
        paddingVertical: 1,
        paddingHorizontal: 6,
        margin: 4,
        borderRadius: 6,
    },
    dropdown: {
        height: 40,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    selectMenu: {
        padding: 6,
        margin: 3,
    },
    selectItem: {
        padding: 4,
    }

});