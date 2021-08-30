export const URL = 'https://apinodejsbds.herokuapp.com/api/'


export const setItemStorage = async (key,value) => {
        try {
            await AsyncStorage.setItem(key,JSON.stringify(value));
        } catch (error) {
            console.log("Saving data error");
        }
};

export const getItemStorage = async (key) =>{
    try {
        const value = await AsyncStorage.getItem(key);
        if(value!==null){
            return value;
        }
        else{
            console.log("Read data error");
        }
    } catch (error) {
        
    }
}
