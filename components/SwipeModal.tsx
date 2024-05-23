import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { View,TouchableOpacity } from 'react-native';

interface ModalProps {
    visible:boolean;
    setVisible:(x:boolean)=>void;
    children:JSX.Element;
}
export default function SwipeModal(props:ModalProps) {
    const color = useThemeColor({ light: "black", dark: "white" }, 'text');

    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            transparent
            onRequestClose={() => {
                props.setVisible(false);}}>
            <View style={{backgroundColor:"rgba(0, 0, 0, 0.6)"}}>
            <TouchableOpacity onPress={()=>console.log("hello")} >
            <ThemedView
                style={[styles.modalContainer]}>
                <ThemedView  style={styles.modalTile}>
                    <ThemedText type='subtitle'>Timing Settings</ThemedText>
                    <Pressable
                    onPress={() => {
                        props.setVisible(false)
                    }}>
                    <Ionicons size={28}  style={{color}} name='close-outline' />
                </Pressable>
                </ThemedView>
                {props.children}
            </ThemedView>
            </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalTile:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom:15,
    },
    modalContainer:{
        height: '70%',
        marginTop: 'auto',
        padding:10,
    },
})
