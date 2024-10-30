import { Colors } from '@/core/theming';
import { useColorScheme } from 'react-native';


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  //twrnc color scheme still not working as expected
  // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const colorScheme2 = useColorScheme();
  const theme = colorScheme2 ?? 'light';
  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
