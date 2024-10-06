import AsyncStorage from "@react-native-async-storage/async-storage";



export const saveItem = (loc: Object, index: string) => {
    AsyncStorage.setItem(index, JSON.stringify(loc)).catch((error) => {
        console.error("Error hppaned while storing location:\n" + error)
    });
}

 // load app settings of local storage
 export const loadItem = async (name:string) => {
    try{
        const data = await AsyncStorage.getItem(name);
        return data
    }
    catch {
        console.error('Error in loading data!')
        return null;
    }
  }