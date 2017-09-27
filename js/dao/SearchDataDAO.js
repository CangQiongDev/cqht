/**
 * Created by wangdi on 1/12/16.
 */
'use strict';

const SEARCH_DATA = '@SearchData';

import {AsyncStorage} from 'react-native';

export default class SearchDataDAO{

    save(dataList){
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(SEARCH_DATA, JSON.stringify(dataList), (error)=>{
                if(!error)
                    resolve('操作成功');
                else
                    reject('操作失败');
            });
        });
    }

    getSearchList(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(SEARCH_DATA, (error, result) => {
                if(!error){
                    const list = JSON.parse(result);
                    if(list){
                        resolve(list);
                    }else{
                        reject(null);
                    }
                }else{
                    reject(null);
                }
            });
        });
    }

    removeSearchData(){
       return new Promise((resolve, reject) => {
            AsyncStorage.removeItem(SEARCH_DATA, (error)=>{
                if(!error)
                    resolve('操作成功');
                else
                    reject('操作失败');
            });
        });
    }
}