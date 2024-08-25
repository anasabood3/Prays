import { RootState } from '@/contexts/store';
import React from 'react'
import { ImageBackground } from 'react-native'
import { useSelector } from 'react-redux';
import { PropsWithChildren } from 'react';
import { StyleSheet, } from 'react-native';
   


function PatternBackground({ children }: PropsWithChildren) {
    const pattern = require('@/assets/images/pattern.png');
    const darkPattern = require('@/assets/images/darkPattern.png')
    const theme = useSelector((state: RootState) => state.settings.theme);

    return (
        <ImageBackground imageStyle={{ opacity: .03 }}
         style={styles.image}
         source={theme=='dark'?darkPattern:pattern}
         resizeMode='cover' >
            {children}
        </ImageBackground>


    )
}
const styles = StyleSheet.create({
image:{
    flex:1,
}
})
export default PatternBackground
