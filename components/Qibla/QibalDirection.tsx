import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle } from 'react';

import { Image, View, Text, StyleSheet, ActivityIndicator, useColorScheme } from 'react-native';

import { moderateScale } from 'react-native-size-matters';
import { ThemedText } from '@/components/ThemedText';
import { useQiblaCompass } from '@/core/Qibla';
import { i18n } from '@/core/translate';
import { useAppColorScheme } from 'twrnc';
import tw from 'twrnc'

interface QilaDirectionAttributes {
    backgroundColor?: string,
    color?: string,
    textStyles?: {},
    compassImage?: (path: string) => any,
    kaabaImage?: (path: string) => any
}
const QiblaDirection = forwardRef(
    (
        { backgroundColor = 'transparent', color = '#000', textStyles = {}, compassImage, kaabaImage }: QilaDirectionAttributes,
        ref
    ) => {
        const {
            qiblad,
            compassDirection,
            compassDegree,
            compassRotate,
            kabaRotate,
            error,
            isLoading,
            reinitCompass,
        } = useQiblaCompass();
        const colorScheme = useColorScheme();
        useImperativeHandle(
            ref,
            () => {
                return {
                    reinitCompass,
                };
            },
            []
        );

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={50} color={color} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {error && (
                    <Text
                        style={{
                            color: '#f00',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingHorizontal: 20,
                            fontSize: moderateScale(16, 0.25),
                            ...textStyles,
                        }}
                    >
                        Error: {error}
                    </Text>
                )}

                <View
                    style={{
                        width: '100%',
                        height: moderateScale(300, 0.25),
                        position: 'relative',
                    }}
                >
                    <Image
                        source={colorScheme=='dark'?require('../../assets/images/compassDark.png'):require('../../assets/images/compass.png')}
                        style={[
                            styles.image,
                            {
                                transform: [
                                    {
                                        rotate: `${compassRotate}deg`,
                                    },
                                ],
                                zIndex: 100,
                            },
                        ]}
                    />
                    <View
                        style={{
                            width: moderateScale(300, 0.25),
                            height: moderateScale(300, 0.25),
                            position: 'absolute',
                            alignSelf: 'center',
                            transform: [
                                {
                                    rotate: `${kabaRotate}deg`,
                                },
                            ],
                            flexDirection: 'row',
                            justifyContent: 'center',
                            zIndex: 999,
                            elevation: 999,
                        }}
                    >
                        <Image
                            source={colorScheme=='dark'?require('../../assets/images/kaabaDark.png'):require('../../assets/images/kaaba.png')}
                            style={{
                                resizeMode: 'center',
                                height: 100,
                                width: 40,
                                zIndex: 1000,
                            }}
                        />
                    </View>
                </View>
                {/* 
                <View>
                    <View style={styles.flexContrainer}>
                        <ThemedText style={styles.tableItem}>Qibla Dirction</ThemedText>
                        <ThemedText style={styles.tableItem}>Distance</ThemedText>
                    </View>
                    <View style={styles.flexContrainer}>
                        <ThemedText>{qiblad.toFixed(2)}</ThemedText>
                        <ThemedText>23435 km</ThemedText>
                    </View>
                </View>
                


                <View style={styles.direction}>
                    <ThemedText type='defaultSemiBold'>
                        {compassDirection + '     '}
                    </ThemedText>
                    <ThemedText type='defaultSemiBold'>
                        {compassDegree}°
                    </ThemedText>
                </View> */}
                <View>
                    <ThemedText type='defaultSemiBold'>
                        {Math.abs(qiblad - compassDegree) <= 5 ? i18n.t('facing_qibla') : ''}
                        {qiblad - compassDegree > 5 ? i18n.t('turn_right') : ''}
                        {qiblad - compassDegree < -5 ? i18n.t('turn_left') : ''}
                    </ThemedText>
                </View>
            </View>
        );
    }
);


const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
        width: moderateScale(300, 0.25),
        height: moderateScale(300, 0.25),
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        
    },
    direction: {
        textAlign: 'center',
        zIndex: 300,
        flexDirection: 'row',
    },
    directionText: {
        textAlign: 'center',
        fontSize: 30,
        color: '#468773',
    },
    flexContrainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableItem:{
        backgroundColor:'yellow',
        margin:3,
        width:120,
    }
});

export default QiblaDirection;