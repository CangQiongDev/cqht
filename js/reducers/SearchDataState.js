/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import * as TYPES from '../actions/actionTypes';

const initialState = {
    dataSource: [],
    isStarred: false,
    inputValve: ''
};

export default function searchDataState(state=initialState, action) {
    switch(action.type){
        case TYPES.UPDATE_SEARCH_LIST:
            return Object.assign({}, state, {
                ...state,
                dataSource: action.list
            });

        case TYPES.SEARCH_DATA_SUCCESS:
            return Object.assign({}, state, {
                isStarred: true,
                dataSource: action.list
            });

        case TYPES.UNSEARCH_DATA_SUCCESS:
            return Object.assign({}, state, {
                isStarred: false,
                dataSource: action.list
            });

        case TYPES.UPDATE_SEARCH_STATE:
            return Object.assign({}, state, {
                ...state,
                isStarred: action.isStarred
            });
        case TYPES.UPDATE_SEARCH_INPUT:
            return Object.assign({}, state, {
                inputValve: action.inputValve
            });
        default:
            return state;
    }
}