import type { PropsWithChildren, ReactElement } from 'react';
import { useColorScheme, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import PatternBackground from './PatternBackground';
import tw from 'twrnc';


const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={tw`flex-1`}>
      <PatternBackground>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {
          headerImage &&
          <Animated.View
            style={[
              tw`h-62 overflow-hidden`,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}>
            {headerImage && headerImage}
          </Animated.View>
        }

        <View style={tw`flex-1 p-3 gap-3 overflow-hidden`}>{children}</View>
      </Animated.ScrollView>
      </PatternBackground>
    </ThemedView>
  );
}

