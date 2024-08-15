import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector } from 'react-redux';
import { RootState } from '@/contexts/store';
import { Image } from 'react-native';
import QiblaDirection from '@/components/QibalDirection';
import { i18n } from '@/scripts/translate';
export default function QiblaTab() {

  const theme = useSelector((state: RootState) => state.settings.theme);

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light:'', dark:''}}
    headerImage={
      <Image
        source={theme == 'light' ? require('@/assets/images/cover.jpg') : require('@/assets/images/coverDark.jpg')}
        style={styles.reactLogo}
      />
    }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{padding:3}}>{i18n.t("qibla")}</ThemedText>
      </ThemedView>
      <QiblaDirection/>
      <ThemedView style={styles.titleContainer}>
      </ThemedView>
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
