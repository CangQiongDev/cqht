/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import SettingsDataDAO from '../dao/SettingsDataDAO';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import * as CacheManager from 'react-native-http-cache';
export function changeColor(color, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveThemeColor(color);
    }

    return {
        type: TYPES.CHANGE_COLOR,
        color: color
    };
}

export function changeShowThumbnail(value, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveShowThumbnail(value);
    }

    if(value) {
        return {
            type: TYPES.OPEN_SHOW_THUMBNAIL
        };
    }else {
        return {
            type: TYPES.CLOSE_SHOW_THUMBNAIL
        };
    }
}

export function changeAutoFetch(value, flag=true, emitter=false) {
    if(flag){
        let dao = new SettingsDataDAO();
        dao.saveAutoFetchHomeData(value);
    }

    if(emitter) // only send notification once
        RCTDeviceEventEmitter.emit('fetch', value);

    if(value){
        return {
            type: TYPES.OPEN_AUTO_FETCH
        };
    }else{
        return {
            type: TYPES.CLOSE_AUTO_FETCH
        };
    }
}

export function changeNightMode(value, flag=true) {
    if(flag){
        let dao = new SettingsDataDAO();
        dao.saveOpenNightMode(value);
    }

    if(value){
        return {
            type: TYPES.OPEN_NIGHT_MODE
        };
    }else{
        return {
            type: TYPES.CLOSE_NIGHT_MODE
        };
    }
}

export function changeDisplayOrder(order, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveDisplayOrder(order);
    }

    return {
        type: TYPES.CHANGE_DISPLAY_ORDER,
        displayOrder: order
    };
}

function fetchShowThumbnailValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getShowThumbnailValue().then((result)=>{
            dispatch(changeShowThumbnail(result, false));
        }, (error)=>{
            dispatch(changeShowThumbnail(error));
        });
    };
}

function fetchOpenNightModelValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getOpenNightModeValue().then((result)=>{
            dispatch(changeNightMode(result, false));
        }, (error)=>{
            dispatch(changeNightMode(error));
        });
    };
}

function fetchAutoFetchValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getAutoFetchHomeDataValue().then((result)=>{
            dispatch(changeAutoFetch(result, false, true));
        }, (error)=>{
            dispatch(changeAutoFetch(error, false, true));
        });
    };
}

function fetchThemeColorValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getThemeColorValue().then((result)=>{
            dispatch(changeColor(result, false));
        }, (error)=>{
            dispatch(changeColor(error));
        });
    };
}
function fetchDisplayOrderValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getDisplayOrderValue().then((result)=>{
            dispatch(changeDisplayOrder(result, false));
        }, (error)=>{
            dispatch(changeDisplayOrder(error));
        });
    };
}
//缓存相关
function CacheState(result) {
    return {
            type: TYPES.GET_CACHE_SIZE,
			getCacheSize: result
        }
	}
export function getCacheSize(){
	return (dispatch) => {
		CacheManager.getCacheSize().then((result)=>{
			dispatch(CacheState(result));
		});
	};
}
//游戏数据版本切换
export function changeGameDataVersion(value, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveGameDataVersion(value);
    }

    return {
        type: TYPES.GAME_DATA_VERSION,
        gameDataVersion: value
    };
}

export function fetchGameDataVersion() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getGameDataVersion().then((result)=>{
            dispatch(changeGameDataVersion(result, false));
        }, (error)=>{
            dispatch(changeGameDataVersion(error)); //默认写入0为怀旧版本
        });
    };
}
export function initialSettingsStateFacade() {
    return (dispatch)=>{
        dispatch(fetchShowThumbnailValue());
        dispatch(fetchThemeColorValue());
        dispatch(fetchDisplayOrderValue());
        dispatch(fetchOpenNightModelValue());
        dispatch(fetchAutoFetchValue());
        dispatch(fetchGameDataVersion());
		//dispatch(getCacheSize());
    }
}
