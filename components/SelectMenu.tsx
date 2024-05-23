import { View, useColorScheme, type ViewProps } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

interface SelecData {
    data: { label: string, value: number }[];
    placeHolder: string;
    value: string;
    updateSelected:(e:any)=>void
}

export function SelectMenu({ data, placeHolder, value,updateSelected }: SelecData) {

    const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    const backgroundColor = useThemeColor({ light: Colors.light.colorLevel2, dark: Colors.dark.colorLevel2 }, 'background');
    const theme = useColorScheme();
    
    const renderItem = (item: { label: string, value: number }) => {
        return (
            <ThemedView lightColor={Colors.light.colorLevel2} darkColor={Colors.dark.colorLevel2} style={styles.selectMenu}>
                <ThemedText style={styles.selectItem}>{item.label}</ThemedText>
            </ThemedView>
        )
    }
    return (
        <Dropdown
            style={[{ backgroundColor }, styles.settingsItem, styles.dropdown]}
            placeholderStyle={[styles.placeholderStyle, { color }]}
            placeholder={placeHolder}
            selectedTextStyle={{ color }}
            inputSearchStyle={styles.inputSearchStyle}
            value={value.toString()}
            data={data}
            onChange={updateSelected}
            labelField="label"
            valueField="value"
            renderItem={renderItem}
            itemContainerStyle={{backgroundColor}}
            containerStyle={{ borderRadius: 7, borderWidth: 0 }}
        >
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