import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

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
            transparent
            visible={props.visible}
            onRequestClose={() => {
                props.setVisible(false);}}>
            <ThemedView
                style={[styles.modalContainer,styles.androidShadow]}>
                <ThemedView  style={styles.modalTile}>
                    <ThemedText type='subtitle'>Timing Settings</ThemedText>
                    <Pressable
                    onPress={() => {
                        props.setVisible(false)
                    }}>
                    <Ionicons size={28}  style={{color}}name='close-outline' />
                </Pressable>
                </ThemedView>
                {props.children}

 
            </ThemedView>
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
        height: '80%',
        marginTop: 'auto',
        padding:10,
        shadowOffset:{
            width:5,
            height:5,
        },
        shadowOpacity:.6,
        shadowRadius:4,
    },
    androidShadow:{
        elevation:5,
    }
})
