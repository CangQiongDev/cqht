/**
 * Created by spm on 14/07/17.
 */
'use strict';

import * as TYPES from './actionTypes';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';
import { ITEM_LIST_ACTION, ITEM_SEARCH_ACTION } from './Request';
import Util from '../utils/Util';
import ItemDataDAO from '../dao/itemDataDAO';
export function requestData() {
    return {
        type: TYPES.FETCH_ITEM_DATA_REQUEST
    }
}

export function requestMoreData() {
    return {
        type: TYPES.FETCH_ITEM_MORE_DATA_REQUEST
    }
}

function receiveData(json) {
    return {
        type: TYPES.FETCH_ITEM_DATA_SUCCESS,
        dataSource: json
    }
}

function fetchFailure() {
    return {
        type: TYPES.FETCH_ITEM_DATA_FAILURE
    }
}

function fetchEmpty() {
    return {
        type: TYPES.FETCH_ITEM_DATA_EMPTY
    }
}

function fetchMoreDataFailure() {
    return {
        type: TYPES.FETCH_ITEM_MORE_DATA_FAILURE
    }
}

function fetchedFullData() {
    return {
        type: TYPES.FETCH_ITEM_DATA_IS_FULL
    }
}


function isValidData(responseData) {
    if (responseData.data.rlist.length > 0)
        return true;
    return false;
}

function selectToRowData(rowData) {
    return {
        type: TYPES.SELECT_ITEM_ROWDATA,
        rowData: rowData
    }
}

function selectItem() {
    return {
        type: TYPES.SELECT_ITEM_SEND
    }
}

export function selectItemSend(){
    return (dispatch) => {
        dispatch(selectItem());
    }
}

export function selectRowData(rowData){
    return (dispatch) => {
        dispatch(selectToRowData(rowData));
    }
}

export function clearData(){
    return (dispatch) => {
        dispatch(selectRowData([]));
        let dao = new ItemDataDAO();
        dao.removeItemData();
    }
}

export function fetchLocalItemData(fetchkey, gameDataVersion, inputKey) {
    return (dispatch) => {
        let dao = new ItemDataDAO();
        dao.fetchLocalData().then((result) => {
            dispatch(receiveData(result.content));
            if (result.isFullData) {
                dispatch(fetchedFullData()); //读取完全部了
            }
        //dao.removeItemData();
        //Toast.show('获取本地数据', {position: px2dp(-80)});
        }, (error) => {
            dispatch(fetchData(fetchkey, gameDataVersion, inputKey));
        });
    };
}

export function fetchData( /*category*/ fetchkey, gameDataVersion, inputKey) {
    //const url = fetchUrl.appAPI + category;
    return function(dispatch) {
        //dispatch(requestData());
        //setTimeout(() => {
        //使用封装的比较精简
        var url = ITEM_LIST_ACTION + '1'; //初始化显示第一页数据
        if (inputKey.length > 0)
            url = ITEM_SEARCH_ACTION + '1&q=' + inputKey;
        Util.fetchGet(url, fetchkey, gameDataVersion,
            (result) => {
                //console.warn(JSON.stringify(result));
                if (isValidData(result)) {
                    if (inputKey.length === 0) {
                        let dao = new ItemDataDAO();
                        dao.saveData(result.data.rlist);
                    }
                    dispatch(receiveData(result.data.rlist));
                } else {
                    dispatch(fetchEmpty()); //读取完全部了
                }

            }, (error) => {
                dispatch(fetchFailure());
            //已集成 无需再进行错误提示
            }
        );
    //}, 500);
    /*setTimeout(()=> {
        fetchWithTimeout(5000, fetch(url))
            .then(response => response.json())
            .then(json => {
                if (isValidData(json)) {
                    dispatch(receiveData(json));
                } else {
                    dispatch(fetchFailure());
                }
            }).catch((error) => {
                dispatch(fetchFailure());
            });
    }, 500);*/ //the server reaction is fast, add a timeout to show the refresh effect
    }
}

export function fetchMoreLocalItemData(category, fetchkey, gameDataVersion, inputKey) {
    return (dispatch) => {
        if (inputKey.length === 0) {
            let dao = new ItemDataDAO();
            dao.fetchLocalData().then((result) => {
                //dispatch(receiveData(result.content));
                dispatch(fetchMoreData(result.page + 1, fetchkey, gameDataVersion, inputKey, result.content));
            //Toast.show('加载更多', {position: px2dp(-80)});
            }, (error) => {
                //dispatch(fetchMoreData(category, fetchkey, gameDataVersion, inputKey));
            });
        } else {
            dispatch(fetchMoreData(category, fetchkey, gameDataVersion, inputKey));
        }
    };
}

export function fetchMoreData(category, fetchkey, gameDataVersion, inputKey, oldData = null) {
    //const url = fetchUrl.appAPI + category;
    //console.log(url);
    return (dispatch) => {
        //dispatch(requestMoreData());
        setTimeout(() => {
            //使用封装的比较精简
            var url = ITEM_LIST_ACTION + category;
            if (inputKey.length > 0)
                url = ITEM_SEARCH_ACTION + category + '&q=' + inputKey;
            Util.fetchGet(url, fetchkey, gameDataVersion,
                (result) => {

                    if (isValidData(result)) {			
                        if (inputKey.length === 0) {
                            let dao = new ItemDataDAO();
                            const allData = oldData.concat(result.data.rlist); //两个数组对象合并
                            dao.saveData(allData, category);
                        }
                        dispatch(receiveData(result.data.rlist));
                    } else {
                        if (inputKey.length === 0) {
                            let dao = new ItemDataDAO();
                            dao.saveData(oldData, category, true);
                        }
                        dispatch(fetchedFullData()); //读取完全部了
                    }

                }, (error) => {
                    dispatch(fetchMoreDataFailure());
                //已集成 无需再进行错误提示
                }
            );
        /*fetchWithTimeout(5000, fetch(url))
            .then(response => response.json())
            .then(json => {
                if(isValidData(json)){
                    dispatch(receiveData(json));
                }else{
                    dispatch(fetchedFullData());
                }
            }).catch((error) => {
                Toast.show('获取数据失败', {position: px2dp(-80)});
                dispatch(fetchMoreDataFailure());
            });*/
        }, 100);
    }
}