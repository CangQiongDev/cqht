/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import SearchDataDAO from '../dao/SearchDataDAO';
import Toast from 'react-native-root-toast';
var searchList = [];

function updateList(list) {
    return {
        type: TYPES.UPDATE_SEARCH_LIST,
        list: list
    };
}

function searchDataSuccess(list) {
    return {
        type: TYPES.SEARCH_DATA_SUCCESS,
        list: list
    };
}

function unSearchDataSuccess(list) {
    return {
        type: TYPES.UNSEARCH_DATA_SUCCESS,
        list: list
    };
}

function updateSearchState(state) {
    return {
        type: TYPES.UPDATE_SEARCH_STATE,
        isStarred: state
    }
}

function updateSearchValue(value) {
    return {
        type: TYPES.UPDATE_SEARCH_INPUT,
        inputValue: value
    }
}
export function getSearchValue(value) {
    return (dispatch) => {
        dispatch(updateSearchValue(value));
    };
}
export function fetchSearchList() {
    return (dispatch) => {
        let dao = new SearchDataDAO();
        dao.getSearchList().then((result)=>{
            searchList = result;
            dispatch(updateList(searchList));
        },(nullList)=>{
            searchList = [];
            dispatch(updateList(searchList));
        });
    };
}

export function getSearchState(rowData) {
    return (dispatch) => {
        for(let i in searchList){
            if(searchList[i].desc === rowData.desc){
                dispatch(updateSearchState(true));
                return;
            }
        }
        dispatch(updateStarState(false));
    };
}

export function searchData(rowData) {
    return (dispatch) => {
        for(let i in searchList){
            if(searchList[i].desc === rowData.desc){
                dispatch(updateSearchState(true));
                return;
            }
        }
        let dao = new SearchDataDAO();
        searchList.unshift(rowData);
        dao.save(searchList).then((msg) => {
            dispatch(searchDataSuccess(searchList));
        },(msg) => {
            searchList.shift();  //save failed, pop the data from the list
        });
    };
}

export function unSearchData() {
    return (dispatch) => {
        let dao = new SearchDataDAO();
        dao.getSearchList().then((result)=>{
            searchList = [];
            dispatch(updateList(searchList));
            dao.removeSearchData().then((results)=>{
                Toast.show(results, {position: Toast.positions.CENTER});
            },(error)=>{
                Toast.show(error, {position: Toast.positions.CENTER});
            });
            
        },(nullList)=>{
            
        });
    }
}