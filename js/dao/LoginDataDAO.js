/**
 * Created by wangdi on 4/12/16.
 */
'use strict';

const USER_LOGIN_INFO = '@userLoginInfo';
const APP_KEY = '@AppKey';
import {AsyncStorage} from 'react-native';

export default class LoginDataDAO{

    saveUserInfo(data){
        AsyncStorage.setItem(USER_LOGIN_INFO, JSON.stringify(data));
    }

    getUserInfoValue(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(USER_LOGIN_INFO, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    //judge whether the data is updated
                    if(data) {
                        resolve(data.data); //后面这个data是服务端返回的json数据
                    }else{ //no any data records
                        reject(null);
                    }
                }else{ // must fetch server data
                    reject(null);
                }
            });
        });
    }
	
	removeUserInfo(){
        AsyncStorage.removeItem(USER_LOGIN_INFO);
    }
	//通用headers KEY
	saveAppKey(data){
        AsyncStorage.setItem(APP_KEY, data); //这里传入的就是字串 无需JSON.stringify解析成字串
    }
	
	getAppKeyValue(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(APP_KEY, (error, result)=>{
                if(!error){
					const data = JSON.parse(result);
                    //judge whether the data is updated
                    if(result) {
                        resolve(data); //
                    }else{ //no any data records
                        reject(null);
                    }
                }else{ // must fetch server data
                    reject(null);
                }
            });
        });
    }
	
	removeAppKey(){
        AsyncStorage.removeItem(APP_KEY);
    }
}