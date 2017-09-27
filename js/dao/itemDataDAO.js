/**
 * Created by wangdi on 6/12/16.
 */
'use strict';

const ITEM_DATA = '@ItemData';
const ITEM_DATA_PAGE_NUMBER = '@ItemPageNumber';
import {AsyncStorage} from 'react-native';

export default class ItemDataDAO{

    saveData(data, number=1, isFull=false){
        try {
            AsyncStorage.setItem(ITEM_DATA, JSON.stringify({content: data, page: number, isFullData: isFull}));
        }catch(error) {

        }
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(ITEM_DATA, (error, result) => {
                if(!error){
                    const json = JSON.parse(result);
                    if(json) {
                        resolve(json);
                    }else
                        reject(null);
                }else
                    reject(null);
            });
        });
    }

    removeItemData(){
        AsyncStorage.removeItem(ITEM_DATA);
    }
}