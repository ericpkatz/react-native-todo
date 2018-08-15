import {AsyncStorage} from 'react-native';

const setItem = async(key, value)=> {
  try{
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
  catch(ex){
    throw ex;
  }
};

const getItem = async(key, _default)=> {
  try{
    const value = await AsyncStorage.getItem('key');
    if(value === null){
      return _default;
    }
    console.log(value);
    const parsed = JSON.parse(value);
    return parsed;
  }
  catch(ex){
    console.log(ex);
    return _default;
  }
}

export { setItem, getItem };
