import { useAppColorScheme } from 'twrnc';
import { Colors } from '@/constants/Colors';
import tw from 'twrnc'
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const theme = colorScheme ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
