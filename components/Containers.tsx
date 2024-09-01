import React, { ReactNode } from 'react'
import { ThemedView } from './ThemedView';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { i18n } from '@/core/translate';
interface SectionContainerProps {
    darkColor:string;
    lightColor:string;
    // title?:string;
    children:JSX.Element;
}

function SectionContainer(props: SectionContainerProps) {
    const {darkColor,lightColor,children} = props
    return (
        <ThemedView
        darkColor={darkColor}
        lightColor={lightColor}
        style={styles.contianer}
        >
            {children}
        </ThemedView>
    )
}

interface HeaderSectionProps {
    title:string;
    children:JSX.Element;
}

function HeaderSection(props: HeaderSectionProps) {
    const {children,title} = props
    
    return (
        <View
        style={styles.MultipleContainer}>
        <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t(title)}</ThemedText>

            {children}
        </View>
    )
}





const styles = StyleSheet.create({
    MultipleContainer: {
        marginVertical: 6,
    },
    contianer: {
        borderRadius: 5,
        padding: 8,
        margin:7,
    }
})

  

export  {SectionContainer,HeaderSection};
