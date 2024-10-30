import { RootState } from '@/contexts/store';
import React from 'react'
import { ImageBackground, useColorScheme } from 'react-native'
import { useSelector } from 'react-redux';
import { PropsWithChildren } from 'react';
import tw from 'twrnc';


function PatternBackground({ children }: PropsWithChildren) {
    const pattern = require('@/assets/images/pattern.png');
    const darkPattern = require('@/assets/images/darkPattern.png')
    const colorScheme = useColorScheme();
    return (
        <ImageBackground imageStyle={{ opacity: .06 }}
         style={tw`flex-1`}
         source={colorScheme=='dark'?darkPattern:pattern}
         resizeMode='cover' >
        {children}
        </ImageBackground>
    )
}

export default PatternBackground
