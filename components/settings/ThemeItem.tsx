import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { StyleSheet } from "react-native";
interface SettingsItemProps{
    children:JSX.Element;
  }
  export const SettingsItem = (props:SettingsItemProps)=>{
    return (
      <ThemedView
      style={styles.settingsItem}
      lightColor={Colors.light.colorLevel2}
      darkColor={Colors.dark.colorLevel2}>
        {props.children}
      </ThemedView>
    );
  }
  
const styles = StyleSheet.create({
    settingsItem: {
      margin: 5,
      borderRadius: 6,
      padding:5,
    },
  })
  