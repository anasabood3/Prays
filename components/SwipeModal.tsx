import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { View, TouchableOpacity } from 'react-native';

interface ModalProps {
    visible: boolean;
    setVisible: (x: boolean) => void;
    children: JSX.Element;
    title: string;
}
export default function SwipeModal(props: ModalProps) {
    const color = useThemeColor({ light: "black", dark: "white" }, 'text');

    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            transparent
            onRequestClose={() => {
                props.setVisible(false);
            }}>
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                <ThemedView style={[styles.modalContainer]}>

                    <View style={styles.modalTile}>
                        <ThemedText type='subtitle'>{props.title}</ThemedText>
                        <Pressable
                            onPress={() => {
                                props.setVisible(false)
                            }}>
                            <Ionicons size={28} style={{ color }} name='close-outline' />
                        </Pressable>
                    </View>

                    {props.children}
                </ThemedView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalTile: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 15,
    },
    modalContainer: {
        height: '85%',
        marginTop: 'auto',
        padding: 10,
    },
})
