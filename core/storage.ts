import AsyncStorage from "@react-native-async-storage/async-storage";



// save data in local storage
export const saveItem = (loc: any, index: string) => {

    AsyncStorage.setItem(index, JSON.stringify(loc)).catch((error) => {
        console.error("Error hppaned while storing: " + index + "\n" + error)
    });
}

// load data of local storage
export const loadItem = async (name: string) => {
    try {
        const data = await AsyncStorage.getItem(name);
        return data;
    }
    catch {
        console.error('Error in loading data!')
        return null;
    }
}