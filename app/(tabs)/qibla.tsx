import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { Image } from 'react-native';
import QiblaDirection from '@/components/Qibla/QibalDirection';
import { i18n } from '@/core/translate';
export default function QiblaTab() {

  const theme = useSelector((state: RootState) => state.settings.theme);
  const lang = useSelector((state: RootState) => state.settings.language);

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light:'', dark:''}}
    headerImage={
      <Image
        source={theme == 'light' ? require('@/assets/images/cover.jpg') : require('@/assets/images/coverDark.jpg')}
        style={styles.reactLogo}
      />
    }>
     
      <View style={[styles.titleContainer,{justifyContent:lang=='ar'?'flex-end':'flex-start'}]}>
        <ThemedText type="title" style={{padding:3}}>{i18n.t("qibla")}</ThemedText>
      </View>
      <QiblaDirection/>
   


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
