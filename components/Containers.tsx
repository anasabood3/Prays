import React, { ReactNode } from 'react'
import { ThemedView } from './ThemedView';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { i18n } from '@/core/translate';
import tw from 'twrnc'
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
        style={tw`rounded-sm p-2 m-2`}
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
        style={tw`mx-[6]`}>
        <ThemedText type='defaultSemiBold' style={{ paddingLeft: 12 }}>{i18n.t(title)}</ThemedText>

            {children}
        </View>
    )
}







  

export  {SectionContainer,HeaderSection};
