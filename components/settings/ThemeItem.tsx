import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import tw from 'twrnc';
interface SettingsItemProps{
    children:JSX.Element;
  }
  export const SettingsItem = (props:SettingsItemProps)=>{
    return (
      <ThemedView
      style={tw`m-[5] rounded-md p-[5]`}
      lightColor={Colors.light.colorLevel2}
      darkColor={Colors.dark.colorLevel2}>
        {props.children}
      </ThemedView>
    );
  }
 